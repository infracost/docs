---
slug: support
title: Support
---

## I found a bug

Please first [upgrade](/docs#installation) to the latest version of `infracost` to see if the bug has already been fixed. If not, [create an issue](https://github.com/infracost/infracost/issues/new/choose) and describe the issue.

## The resource I want isn't supported

Please [see this section](supported_resources#the-resource-i-want-isnt-supported)

## Infracost fails to run in CI/CD

Please check the following and if that doesn't help, [create an issue](https://github.com/infracost/infracost/issues/new/choose) or join our [community Slack channel](https://www.infracost.io/community-chat) to chat with us.

1. Set the [`INFRACOST_LOG_LEVEL`](/docs/environment_variables#infracost_log_level) environment variable to `debug` in case that provides more useful details. For Atlantis, also set [`atlantis_debug=true`](https://github.com/infracost/infracost-atlantis/#atlantis_debug).
2. Check the Terraform version that Infracost is using matches the version you need. Use the [`INFRACOST_TERRAFORM_BINARY`](/docs/environment_variables/#infracost_terraform_binary) environment variable to change that.
3. Use `ls -lah` in the CI build to check for any `.terraform*` files/folders that might be confusing Terraform running in CI vs previous runs that were used to create them. Removing those files might help.
4. Check the [Terraform Cloud/Enterprise](/docs/terraform_cloud_enterprise) or [Terragrunt](/docs/terragrunt) docs pages if applicable.

## I want to talk to you about something else

If you need help integrating Infracost in to your workflow, or want to talk about something else, please email [hello@infracost.io](mailto:hello@infracost.io). You can also join our [community Slack channel](https://www.infracost.io/community-chat) to chat with us.
