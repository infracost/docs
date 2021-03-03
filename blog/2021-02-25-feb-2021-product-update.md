---
slug: feb-2021-product-update
title: 'Feb 2021 update - faster runs, new resources and Atlantis!'
author: Ali Khajeh-Hosseini
author_url: https://twitter.com/alikhajeh
author_image_url: /img/avatars/ali.jpg
description: We shipped quite a lot in February - big thanks to the community contributors! Upgrade to pickup these goodies.
hide_table_of_contents: true
Date: "2021-02-26T00:00:00Z"
---

Here's what we released in February - big thanks to the community contributors! You can [**upgrade**](/docs/#1-install-infracost) to the latest version (v0.7.20) to pickup these goodies:

### 🚀 Speed improvements

The CLI now only runs `terraform init` if required since Terraform commands aren't the fastest in the world (init usually takes 20+ secs for me, but it depends on how many plugins you have). Furthermore, calls to the Cloud Pricing API have been switched from sequential to parallel. Infracost should run much faster than before.

### ⚙️ Config file

Depending on your Terraform workflow, you'll run Infracost with [different options](/docs/#usage-methods). Things can get complicated when you have multiple projects in a repo, each requiring their own Terraform variables. For example, if you have two workspaces and want to see their total cost estimate, you would run something like this:

```sh
terraform workspace select dev
infracost --terraform-dir code --format json \
          --terraform-plan-flags "-var-file=env.dev.tfvars" > dev.json

terraform workspace select prod
infracost --terraform-dir code --format json \
          --terraform-plan-flags "-var-file=env.prod.tfvars" > prod.json

infracost report --format table dev.json prod.json
```

You can now create an `infracost.yml` [config file](/docs/config_file) in your repo to describe your setup, then just run `infracost --config-file infracost.yml`.

### 🌎 Atlantis integration

Infracost now [integrates with Atlantis](/docs/integrations#atlantis), which is a popular CI/CD tool that enables Terraform pull request automation.

### 🗒️ Diff functionality in JSON output

You can now get the monthly cost diff from the Infracost JSON output, e.g. the following shows the monthly cost is going to be increased by $1530 if the Terraform plan is applied. You can also get `totalHourlyCost`, or add `--no-color=true --log-level=warn` if you don't want the spinners/logs/color.

```
infracost --terraform-dir=. --format=json | jq '[.projects[].diff.totalMonthlyCost | select (.!=null) | tonumber] | add'
"+1530"
```

### ⛅ New cloud resources

We also shipped support for the following cloud resources:
- **AWS**: Config, ECS on EC2, EventBridge, Route 53 Resolver, CodeBuild
- **Google**: Key Management Service (KMS), Google Cloud Functions
- **Azure**: great progress is being made, [stay tuned](https://github.com/infracost/infracost/issues/64) for exciting news soon

The [usage file](/docs/usage_based_resources) params for Google Cloud Functions are pretty cool; as shown below you can define 3 simple params and we'll estimate the cost for you, no need for you to decode how function memory maps to GHz-seconds and rounding.

```yml
google_cloudfunctions_function.my_function:
  request_duration_ms: 150 # milliseconds
  monthly_function_invocations: 10000000
  monthly_outbound_data_gb: 50
```

```
NAME                              MONTHLY QTY  UNIT         MONTHLY COST

google_cloudfunctions_function.hi
├─ CPU                                800,000  GHz-seconds  8.0000
├─ Memory                             500,000  GB-seconds   1.2500
├─ Invocations                     10,000,000  invocations  4.0000
└─ Outbound data transfer                  50  GB           6.0000
Total (USD)                                                 19.2500
```

As always, looking forward to your feedback ([hello@infracost.io](mailto:hello@infracost.io)).
