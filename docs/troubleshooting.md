---
slug: troubleshooting
title: Troubleshooting
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Please try the following troubleshooting steps and if they don't help, either [create an issue](https://github.com/infracost/infracost/issues/new/choose) or join our [community Slack channel](https://www.infracost.io/community-chat) - we'll help you very quickly 😄🚀

## 1. Enable additional logging

If the Infracost CLI fails, re-run it with `--log-level=debug` or the `INFRACOST_LOG_LEVEL=debug` environment variable in case that provides helpful details.

If the Terraform CLI fails, check their [debugging page](https://www.terraform.io/internals/debugging) for help. Likewise, if the Terragrunt CLI fails, check their [debugging page](https://terragrunt.gruntwork.io/docs/features/debugging/) for help.

## 2. Generating plan JSON files

By default, the Infracost CLI parses Terraform HCL code to estimate costs. If that does not work for your use-case, or you already have a Terraform plan JSON file, Infracost can also parse that. See the relevant [Terraform CLI](#terraform-cli), [Terraform Cloud](#terraform-cloud) or [Terragrunt](#terragrunt) sections below on how to generate plans. These bash scripts can be modified and used in your CI/CD pipelines.

### Terraform CLI

The Terraform CLI can be used to produce a plan JSON file as shown below:

#### Single project

```bash
cd path/to/code
terraform init

# Customize this to how you run Terraform
# e.g. if you are using variables you can pass them with -var or -var-file
terraform plan -out tfplan.binary
terraform show -json tfplan.binary > plan.json

infracost breakdown --path plan.json
```

#### Multi-projects

We recommend that you use an Infracost [config file](/docs/features/config_file/) to define paths to the projects plan JSON files. If that doesn't work for your use-case, you can use the following bash script to generate Terraform plan JSON files, dynamically create a config file and pass it to Infracost.

```bash
# Path to Terraform code
TF_ROOT=path/to/code

cd $TF_ROOT

# Find all subfolders that have .tf files, but exclude "modules" folders, can be customized
tfprojects=($(find . -type f -name '*.tf' | sed -E 's|/[^/]+$||' | grep -v modules | sort -u))

plans=()
planjsons=()
for project in "${tfprojects[@]}"; do
  # You can remove this if Terraform is already init'd
  echo "Running terraform init for $project"
  terraform -chdir=$project init

  # Customize this to how you run Terraform
  # e.g. if you are using variables you can pass them with -var or -var-file
  echo "Running terraform plan for $project"
  terraform -chdir=$project plan -out tfplan.binary

  echo "Running terraform show for $project"
  terraform -chdir=$project show -json tfplan.binary > $project/plan.json

  plans=(${plans[@]} "$project/tfplan.binary")
  planjsons=(${planjsons[@]} "$project/plan.json")
done

# Generate Infracost config file
echo -e "version: 0.1\n\nprojects:\n" > infracost-generated.yml
for planjson in "${planjsons[@]}"; do
  echo -e "  - path: $planjson" >> infracost-generated.yml
done

# Infracost CLI commands can be run now
infracost breakdown --config-file=infracost-generated.yml

# Cleanup generated files
rm infracost-generated.yml
rm $plans
rm $planjsons
```

### Terraform Cloud

When Terraform Cloud/Enterprise's [remote execution mode](https://www.terraform.io/cloud-docs/workspaces/settings#execution-mode) is used, the Terraform CLI doesn't allow you to save the plan output directly. Thus the following bash script is needed to fetch the plan JSON from Terraform Cloud:

```bash
# Path to Terraform code
TF_ROOT=path/to/code
# If you're using Terraform Enterprise update this to your Terraform enterprise hostname (without https://)
TFC_HOST=app.terraform.io
# Create a Team API Token or User API Token that can be used to fetch the plan, see https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html
TFC_TOKEN=my_token_here

# This file is used by the Terraform CLI to authenticate with Terraform Cloud, it might also live in /root/.terraformrc on Linux CI/CD machines
cp ~/.terraformrc ~/.terraformrc.old
cat <<EOF > /root/.terraformrc
credentials "$TFC_HOST" {
  token = "$TFC_TOKEN"
}
EOF

cd $TF_ROOT

# You can remove this if Terraform is already init'd
echo "Running terraform init"
terraform init

# When using TFC remote execution, terraform doesn't allow us to save the plan output.
# So we have to save the plan logs so we can parse out the run ID and fetch the plan JSON
echo "Running terraform plan"
terraform plan -no-color | tee /tmp/plan_logs.txt

echo "Retrieving the plan JSON"
# Parse the run URL and ID from the logs
run_url=$(grep -A1 'To view this run' /tmp/plan_logs.txt | tail -n 1)
run_id=$(basename $run_url)

# Get the run plan response and parse out the path to the plan JSON
run_plan_resp=$(wget -q -O - --header="Authorization: Bearer $TFC_TOKEN" "https://$TFC_HOST/api/v2/runs/$run_id/plan")
plan_json_path=$(echo $run_plan_resp | sed 's/.*\"json-output\":\"\([^\"]*\)\".*/\1/')

# Download the plan JSON
wget -q -O plan.json --header="Authorization: Bearer $TFC_TOKEN" "https://$TFC_HOST$plan_json_path"

# Infracost CLI commands can be run now
infracost breakdown --path plan.json

# Cleanup generated files
rm /tmp/plan_logs.txt
rm plan.json
```

### Terragrunt

If the built-in [CLI integration with Terragrunt](/docs/features/terragrunt/#how-the-terragrunt-integration-works) does not work for your use-case, we recommend using/customizing the following bash script. This is required as Terragrunt does not provide a quick way of creating a Terraform plan JSON file for the whole project.

```bash
# Path to Terraform code
TF_ROOT=path/to/code

cd $TF_ROOT

# Generate plan JSON files for all Terragrunt modules and add them to an Infracost config file
terragrunt run-all --terragrunt-ignore-external-dependencies plan -out tfplan.binary

# Find the plan files
plans=($(find . -name tfplan.binary))

# Generate plan JSON files by running terragrunt show for each plan file
planjsons=()
for plan in "${plans[@]}"; do
  # Find the Terraform working directory for running terragrunt show
  # We want to take the dir of the plan file and strip off anything after the .terraform-cache dir
  # to find the location of the Terraform working directory that contains the Terraform code
  dir=$(dirname $plan)
  dir=$(echo "$dir" | sed 's/\(.*\)\/\.terragrunt-cache\/.*/\1/')

  # Customize this to how you run Terragrunt
  echo "Running terragrunt show for $(basename $plan) for $dir"
  terragrunt show -json $(basename $plan) --terragrunt-working-dir=$dir --terragrunt-no-auto-init > $dir/plan.json
  planjsons=(${planjsons[@]} "$dir/plan.json")
done

# Sort the plan JSONs so we get consistent project ordering in the config file
IFS=$'\n' planjsons=($(sort <<<"${planjsons[*]}"))

# Generate Infracost config file
echo -e "version: 0.1\n\nprojects:\n" > infracost-generated.yml
for planjson in "${planjsons[@]}"; do
  echo -e "  - path: $planjson" >> infracost-generated.yml
done

# Infracost CLI commands can be run now
infracost breakdown --config-file=infracost-generated.yml

# Cleanup generated files
rm infracost-generated.yml
rm $plans
rm $planjsons
```

## 3. Check supported versions

Check the Terraform version matches what you expect. Infracost works with Terraform v0.12 and above.
Use `ls -lah` in the CI build to check for any `.terraform*` files/folders that might be confusing Terraform running in CI vs previous runs that were used to create them. Removing those files might help.

## 4. Combining plan JSON files

Once you have multiple Terraform plan JSON files, you can
1. run [`infracost breakdown`](/docs/features/cli_commands/#breakdown) with `--path plan-1.json --format json --out-file infracost-1.json` to generate an Infracost JSON file for each.
2. run [`infracost output`](/docs/features/cli_commands/#combined-output-formats) with `--path "infracost-*.json" --format diff` (glob patterns need quotes) to combine the Infracost JSON files into one output format. The `infracost output --help` command shows the other options.

These steps are used by our [CI/CD integrations](/docs/#4-add-to-cicd) to post pull request comments.

## 5. Posting comments

If you're having issues posting pull request comments, please review the troubleshooting section for your version control system:

- [GitHub](https://github.com/infracost/actions/#permissions-issue)
- [GitLab](https://gitlab.com/infracost/infracost-gitlab-ci#troubleshooting)
- [Azure Repos](https://github.com/infracost/infracost-azure-devops#troubleshooting)
- [Bitbucket](https://bitbucket.org/infracost/infracost-bitbucket-pipeline) > see the Troubleshooting section

## 6. Infracost Cloud dashboard

Try the following troubleshooting steps and join our [community Slack channel](https://www.infracost.io/community-chat) - we'll help you very quickly 😄🚀

If Infracost is **erroring or running too slow**, email us at [hello@infracost.io](mailto:hello@infracost.io) so we can arrange a debugging session with you quickly.

If your pull requests comments are being posted but they are **not showing in the dashboard**, ensure that the:
1. [Cost estimate dashboard](/docs/infracost_cloud/get_started/#3-setup-infracost-cloud) organization setting is enabled.
2. Infracost CLI version (`infracost --version`) being used is latest patch version of v0.10.
3. [Required environment variables](/docs/features/environment_variables/#environment-variables-to-set-metadata) are set before the `infracost breakdown` and `infracost diff` commands are run. You can verify this by running `cat infracost.json | jq .metadata` or `infracost breakdown --path /code --format json | jq .metadata` and checking the Infracost JSON block shows your pull request metadata.
4. Either [`infracost comment`](/docs/features/cli_commands/#comment-on-pull-requests) or [`infracost upload`](/docs/features/cli_commands/#upload-runs) is used in your CI/CD integration. If Infracost Cloud is enabled (step 2 above), these commands send the Infracost JSON data to your organization in Infracost Cloud.

Notes for legacy users:
1. Old Infracost API keys, ones that **do not** start with `ico-`, will continue to work in the CLI and Cloud Pricing API, but not with Infracost Cloud.
2. Currently there is no automated migration of your old API keys since they were only used by the CLI to retrieve prices from our Cloud Pricing API, e.g. get prices for instance types. We recommend you switch to using your API key from Infracost Cloud if you'd like to create organizations or regenerate API keys. You can simply discard your old API keys.
3. We recommend [Terraform Cloud Run Task](/docs/integrations/terraform_cloud_enterprise/#option-2-terraform-run-tasks) users to sign up to Infracost Cloud and create a new Run Task integration so they can associate that with an organization.
