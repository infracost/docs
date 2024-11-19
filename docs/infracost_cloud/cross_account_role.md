---
slug: cross_account_role
title: Cross account role
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost supports gathering right sizing recommendations for resources in your AWS account by assuming a cross account role. This is allows us to access your AWS resources and provide you with recommendations in your code based on Trusted Advisor and Compute Optimizer data.

:::info
This feature is currently early stage, please email [hello@infracost.io](mailto:hello@infracost.io) for more information.
:::

For more information about cross account roles, please see the [AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html)

## Setup of the cross account role

We have provided a Terraform module to help you set up the cross account role. You can find the module [here](https://github.com/infracost/cross-account-link)

### Prerequisites

- You have an AWS account
- You need your Infracost Cloud organization ID - find this in the settings of the [Infracost Dashboard](https://dashboard.infracost.io)

### Steps

1. Use the module to create the cross account role in your AWS account

   ```hcl
   provider "aws" {
    region = "us-west-2"
   }

    module "infracost" {
        source                = "github.com/infracost/cross-account-link?ref=0.1.0"
        infracost_external_id = "INFRACOST_ORGANIZATION_ID"

        providers = {
            aws = aws
        }
    }

    output "infracost_cross_account_role_arn" {
        value = module.infracost.role_arn
    }
   ```

2. Run `terraform init` and `terraform apply` to create the cross account role
3. Share the `infracost_cross_account_role_arn` output with the Infracost team by email email [hello@infracost.io](mailto:hello@infracost.io)
