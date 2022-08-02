---
slug: third_party_integrations
title: Third-party integrations
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Our [CI/CD integrations](/docs/integrations/cicd/) can be used to integrate with either a [Terraform directory](/docs/features/cli_commands/#option-1-terraform-directory) or [Terraform plan JSON](/docs/features/cli_commands/#option-2-terraform-plan-json). Infracost can also be used alongside third-party systems including:
- [Terraform Cloud/Enterprise Run Tasks](/docs/integrations/terraform_cloud_enterprise/)
- [Scalr](https://docs.scalr.com/en/latest/cost_estimate.html)
- [Spacelift](https://docs.spacelift.io/vendors/terraform/infracost)
- [Env0](https://docs.env0.com/docs/cost-monitoring#cost-estimation)
- [Terrateam](https://docs.terrateam.io/integrations/infracost)
- [Terraspace](https://terraspace.cloud/docs/cloud/cost-estimation)
- [Terranetes](https://terranetes.appvia.io/terranetes-controller/admin/costs)
- [Keptn](https://artifacthub.io/packages/keptn/keptn-integrations/infracost)

## Creating an integration

Please follow these steps when creating a third-party integration with Infracost:
1. **User-specific API keys**: ask your users to sign up for their own free Infracost API key and enter that into your product's settings page. This approach is used by our partners, including HashiCorp, as it enables users to use custom price books and other user-specific Infracost features. Your docs should mention something like:
    - [Sign up](https://dashboard.infracost.io) and go to the Org Settings page to get your free Infracost API key.
    - [Install Infracost](https://www.infracost.io/docs/#2-get-api-key) to get your free API key.
2. **CLI JSON format**: Infracost's CLI has a [JSON format](/docs/features/cli_commands/#examples) that you should use, e.g. get total cost estimate. We do not have language-specific clients so your application needs to run the Infracost CLI. You can also use [this API](/docs/integrations/infracost_api/) if you have a Terraform plan JSON file already.
3. **Link to cost estimates**: If you want to link to a cost estimate, use the [share links](/docs/features/share_links/) feature to generate unique links such as [this one](https://dashboard.infracost.io/share/p7696wnyb4zmdvpr2k4x0nwq7p8pd2tz). Your product integration can show a cost estimate summary and use share links for the full cost breakdown and diff. The Infracost JSON format has a `shareUrl` key with the link for that run.
4. **Email us**: Our email is [hello@infracost.io](mailto:hello@infracost.io), contact us if you need help or advice on the best ways to integrate, or would like to be featured in this page!
