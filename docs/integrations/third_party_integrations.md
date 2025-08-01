---
slug: third_party_integrations
title: Third-party integrations
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost can be used in the following third-party systems. You should only consider using them if you cannot use our [CI/CD integrations](/docs/integrations/cicd/) as these integrations are very minimal, do not post pull request comments nor do they work with other Infracost Cloud features such as [FinOps policies](/docs/infracost_cloud/finops_policies/), [Tagging policies](/docs/infracost_cloud/tagging_policies/) or [Guardrails](/docs/infracost_cloud/guardrails/).

- [Terraform Cloud/Enterprise Run Tasks](/docs/integrations/terraform_cloud_enterprise/)
- [Scalr](https://docs.scalr.com/en/latest/cost_estimate.html)
- [Spacelift](https://docs.spacelift.io/vendors/terraform/infracost)
- [Env0](https://docs.env0.com/docs/cost-monitoring#cost-estimation)
- [Harness Infrastructure as Code Management](https://www.harness.io/products/infrastructure-as-code-management)
- [Terrateam](https://docs.terrateam.io/integrations/infracost)
- [Terraspace](https://terraspace.cloud/docs/cloud/cost-estimation)
- [Terranetes](https://terranetes.appvia.io/terranetes-controller/admin/costs)
- [Terrakube](https://docs.terrakube.io/user-guide/cost-estimation)
- [Keptn](https://artifacthub.io/packages/keptn/keptn-integrations/infracost)
- [Brainboard](https://docs.brainboard.co/ci-cd-engine/supported-plugins#cost-estimation)
- [Semaphore](https://docs.semaphoreci.com/using-semaphore/recipes/infracost)
- [cloud-concierge](https://docs.cloudconcierge.io/how-it-works/pull-request-output#resource-cost-calculations)

## Creating an integration

Please follow these steps when creating a third-party integration with Infracost:
1. **User-specific API keys**: ask your users to sign up for their own free Infracost API key and enter that into your product's settings page. This approach is used by our partners, including HashiCorp, as it enables users to use custom price books and other user-specific Infracost features. Your docs should mention something like:
    - [Sign up](https://dashboard.infracost.io) and go to the Org Settings page to get your free Infracost API key.
    - [Install Infracost](/docs/#2-get-api-key) to get your free API key.
2. **Use Terraform directory method**: we recommend you run Infracost against a [Terraform directory](/docs/features/cli_commands/#option-1-terraform-directory) (as opposed to a Terraform plan JSON file) as that is faster and does not require you to set cloud credentials or secrets.
3. **CLI JSON format**: Infracost's CLI has a [JSON format](/docs/features/cli_commands/#examples) that you should use, e.g. get total cost estimate. We do not have language-specific clients so your application needs to run the Infracost CLI. You can also use [this API](/docs/integrations/infracost_api/) if you have a Terraform plan JSON file already.
4. **Email us**: Our email is [support@infracost.io](mailto:support@infracost.io), contact us if you need help or advice on the best ways to integrate, or would like to be featured in this page!
