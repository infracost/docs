---
slug: troubleshooting
title: Troubleshooting
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Please try the following troubleshooting steps and if they don't help, either [create an issue](https://github.com/infracost/infracost/issues/new/choose) or join our [community Slack channel](https://www.infracost.io/community-chat) - we'll help you very quickly 😄🚀

1. The Infracost CLI parses Terraform plan JSON files to estimate costs. If you're having trouble generating plan JSON files, see the relevant [Terraform CLI](#terraform-cli), [Terraform Cloud](#terraform-cloud) or [Terragrunt](#terragrunt) sections below.
2. Use `ls -lah` in the CI build to check for any `.terraform*` files/folders that might be confusing Terraform running in CI vs previous runs that were used to create them. Removing those files might help.
3. Check the Terraform version matches what you expect. Infracost works with Terraform v0.12 and above.
4. If the Infracost CLI fails, re-run it with `--log-level=debug` or the `INFRACOST_LOG_LEVEL=debug` environment variable in case that provides helpful details.

## Generating plan JSON files

### Terraform CLI

The Terraform CLI can be used to produce a plan JSON file as shown below:

#### Single project

```shell
cd path/to/code
terraform init
# See https://www.terraform.io/language/values/variables#assigning-values-to-root-module-variables if your project needs variables
terraform plan -out tfplan.binary
terraform show -json tfplan.binary > plan.json

infracost breakdown --path plan.json
```

#### Multi-projects/workspaces

We recommend that you use an Infracost [config-file](/docs/features/config_file/) to define paths to the project/workspace plan JSON files. If that doesn't work for your use-case, use [this bash script](/docs/features/config_file/#bulk-run) to combine Infracost commands.

### Terraform Cloud

When Terraform Cloud's [remote execution mode](https://www.terraform.io/cloud-docs/workspaces/settings#execution-mode) is used, the Terraform CLI doesn't allow you to save the plan output directly. Thus the following bash script is needed to fetch the plan JSON from Terraform Cloud:

```shell
# If you're using Terraform Enterprise update this to your Terraform enterprise hostname (without https://)
export TFC_HOST=app.terraform.io
# Create a Team API Token or User API Token that can be used to fetch the plan, see https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html
export TFC_TOKEN=my_token_here

# This file is used by the Terraform CLI to authenticate with Terraform Cloud, it might also live in /root/.terraformrc on Linux CI/CD machines
cp ~/.terraformrc ~/.terraformrc.old
cat <<EOF > /root/.terraformrc
credentials "$TFC_HOST" {
  token = "$TFC_TOKEN"
}
EOF

cd path/to/code
terraform init

# When using TFC remote execution, terraform doesn't allow us to save the plan output.
# So we have to save the plan logs so we can parse out the run ID and fetch the plan JSON
terraform plan -no-color | tee /tmp/plan_logs.txt

# Parse the run URL and ID from the logs
run_url=$(grep -A1 'To view this run' /tmp/plan_logs.txt | tail -n 1)
run_id=$(basename $run_url)

# Get the run plan response and parse out the path to the plan JSON
run_plan_resp=$(wget -q -O - --header="Authorization: Bearer $TFC_TOKEN" "https://$TFC_HOST/api/v2/runs/$run_id/plan")
plan_json_path=$(echo $run_plan_resp | sed 's/.*\"json-output\":\"\([^\"]*\)\".*/\1/')

# Download the plan JSON
wget -q -O plan.json --header="Authorization: Bearer $TFC_TOKEN" "https://$TFC_HOST$plan_json_path"

infracost breakdown --path plan.json
```

### Terragrunt

Terragrunt does not provide a quick way of creating a Terraform plan JSON file for the whole project, thus the following bash script is needed:

```shell
# This is path to the top-level terragrunt directory
cd path/to/code

# Generate plan JSON files for all Terragrunt modules and add them to an Infracost config file
terragrunt run-all plan -out plan.cache

# Find the plan files
plans=($(find . -name plan.cache | tr '\n' ' '))

# Generate plan JSON files by running terragrunt show for each plan file
planjsons=()
for plan in "${plans[@]}"; do
  # Find the Terraform working directory for running terragrunt show
  # We want to take the dir of the plan file and strip off anything after the .terraform-cache dir
  # to find the location of the Terraform working directory that contains the Terraform code
  dir=$(dirname $plan)
  dir=$(echo "$dir" | sed 's/\(.*\)\/\.terragrunt-cache\/.*/\1/')

  echo "Running terragrunt show for $(basename $plan) for $dir";
  terragrunt show -json $(basename $plan) --terragrunt-working-dir=$dir --terragrunt-no-auto-init > $dir/plan.json
  planjsons=(${planjsons[@]} "$dir/plan.json")
done

# Sort the plan JSONs so we get consistent project ordering in the config file
IFS=$'\n' planjsons=($(sort <<<"${planjsons[*]}"))

# Generate Infracost config file
echo -e "version: 0.1\n\nprojects:\n" > infracost.yml
for planjson in "${planjsons[@]}"; do
  echo -e "  - path: $planjson" >> infracost.yml
done

infracost breakdown --config-file=infracost.yml
```

## Combining plan JSON files

Once you have multiple Terraform plan JSON files, you can
1. run [`infracost breakdown`](/docs/features/cli_commands/#breakdown-and-diff) with `--path plan-1.json --format json --out-file infracost-1.json` to generate an Infracost JSON file for each.
2. run [`infracost output`](/docs/features/cli_commands/#combined-output-formats) with `--path "infracost-*.json" --format diff` (glob patterns need quotes) to combine the Infracost JSON files into one output format. The `infracost output --help` command shows the other options.

These steps are used by our [CI/CD integrations](/docs/#4-add-to-cicd) to post pull request comments.
