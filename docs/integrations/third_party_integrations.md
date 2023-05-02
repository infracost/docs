---
slug: third_party_integrations
title: Third-party integrations
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost can also be used alongside third-party systems including:
- [Terraform Cloud/Enterprise Run Tasks](/docs/integrations/terraform_cloud_enterprise/)
- [Scalr](https://docs.scalr.com/en/latest/cost_estimate.html)
- [Spacelift](https://docs.spacelift.io/vendors/terraform/infracost)
- [Env0](https://docs.env0.com/docs/cost-monitoring#cost-estimation)
- [Terrateam](https://docs.terrateam.io/integrations/infracost)
- [Terraspace](https://terraspace.cloud/docs/cloud/cost-estimation)
- [Terranetes](https://terranetes.appvia.io/terranetes-controller/admin/costs)
- [Terrakube](https://docs.terrakube.org/user-guide/cost-estimation)
- [Keptn](https://artifacthub.io/packages/keptn/keptn-integrations/infracost)
- [Brainboard](https://www.brainboard.co/integrations/infracost)
- [Semaphore](https://docs.semaphoreci.com/examples/estimating-cloud-costs-with-infracost/)

## Creating an integration

Please follow these steps when creating a third-party integration with Infracost:
1. **User-specific API keys**: ask your users to sign up for their own free Infracost API key and enter that into your product's settings page. This approach is used by our partners, including HashiCorp, as it enables users to use custom price books and other user-specific Infracost features. Your docs should mention something like:
    - [Sign up](https://dashboard.infracost.io) and go to the Org Settings page to get your free Infracost API key.
    - [Install Infracost](https://www.infracost.io/docs/#2-get-api-key) to get your free API key.
2. **Use Terraform directory method**: we recommend you run Infracost against a [Terraform directory](/docs/features/cli_commands/#option-1-terraform-directory) (as opposed to a Terraform plan JSON file) as that is faster and does not require you to set cloud credentials or secrets.
3. **CLI JSON format**: Infracost's CLI has a [JSON format](/docs/features/cli_commands/#examples) that you should use, e.g. get total cost estimate. We do not have language-specific clients so your application needs to run the Infracost CLI. You can also use [this API](/docs/integrations/infracost_api/) if you have a Terraform plan JSON file already.
4. **Email us**: Our email is [hello@infracost.io](mailto:hello@infracost.io), contact us if you need help or advice on the best ways to integrate, or would like to be featured in this page!
