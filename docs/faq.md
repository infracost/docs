---
slug: /faq
title: FAQ
---

## How does Infracost work?

Infracost has a [CLI](https://github.com/infracost/infracost) and a [Cloud Pricing API](https://github.com/infracost/cloud-pricing-api) backend service, as well as many [CI/CD integrations](/docs/integrations/cicd). There is also a SaaS product, [Infracost Cloud](/pricing/), that complements the open source CLI by giving teams advanced visibility and controls.
When the CLI runs, it:

1. **Extracts cost-related parameters**<br />
  The CLI parses Terraform HCL code to extract only [cost-related parameters](/docs/faq#example-request), such as the instance type or disk size.

2. **Retrieves prices from the Cloud Pricing API**<br />
  The CLI retrieves prices from the Cloud Pricing API. The CLI **does not** send the actual plan JSON file, or any cloud credentials or secrets to the Cloud Pricing API. The API [returns the prices](/docs/faq#example-response).

3. **Calculates the monthly costs**<br />
  The CLI calculates the monthly costs. The results can be output in table, JSON format or [other formats](/docs/features/cli_commands/#combined-output-formats).

4. **Infracost Cloud**<br />
  If you have enabled this product, the CLI sends the final cost estimate in JSON format to your account in Infracost Cloud.

## Security and Privacy

Security is of paramount importance to us. We are SOC 2 Type II certified. Our [Security page](/security) gives an overview of the processes and systems Infracost has in place to ensure we are continually protecting our users' data.

If you have any questions or concerns, please [contact us](mailto:hello@infracost.io).

### What data is sent to the Cloud Pricing API?

No cloud credentials or secrets are sent to the Cloud Pricing API. Infracost does not make any changes to your Terraform state or cloud resources.

The Cloud Pricing API needs the relevant data to return a unique cloud price point. The Terraform HCL code is parsed by the Infracost CLI to extract the relevant data to make requests to the Cloud Pricing API. We also send the count of Terraform resource types to the Cloud Pricing API to enable us to better prioritize support for new resources. Additional context such as the operating system, Terraform version, type of CI system, and Infracost version are also sent alongside error tracking events so we can identify and fix issues quickly.

Here is an example request to the Cloud Pricing API for a t3.micro instance and the returned response:

#### Example request:
```graphql
query {
  products(
    filter: {
      vendorName: "aws",
      service: "AmazonEC2",
      productFamily: "Compute Instance",
      region: "us-east-1",
      attributeFilters: [
        { key: "instanceType", value: "t3.micro" },
        { key: "tenancy", value: "Shared" },
        { key: "capacitystatus", value: "Used" },
        { key: "operatingSystem", value: "Linux" },
        { key: "preInstalledSw", value: "NA" }
      ]
    },
  ) {
    prices(
      filter: {
        purchaseOption: "on_demand"
      }
    ) { USD }
  }
}
```

#### Example response:
```json
{
  "data": {
    "products": [
      {
        "prices": [
          {
            "USD": "0.0104000000"
          }
        ]
      }
    ]
  }
}
```

### Can I run my own Cloud Pricing API?

Yes! Please see the [self-hosting guide](/docs/cloud_pricing_api/self_hosted) for details.

### Does Infracost need cloud credentials?

No. However, if you want Infracost to fetch usage data from your AWS account, you need to give it [read-only access](/docs/features/usage_based_resources/#credentials).

### Does the Infracost CLI send the Terraform plan to the Cloud Pricing API?

No. The Infracost CLI parses the Terraform plan JSON file to find [cost-related parameters](/docs/faq#example-request) and uses those to lookup cloud prices.

### What data is sent to Infracost Cloud?

If you have [enabled](/docs/infracost_cloud/get_started/) this, the CLI sends its [JSON output](/docs/features/cli_commands/#examples) to your account in Infracost Cloud; you can generate and inspect this JSON. It does not contain any cloud credentials or secrets.

### Do you sell my data?

No. Infracost is backed by top-tier investors including Y Combinator and Sequoia. We also have an [paid product](/pricing). For more information about how we handle data see our [Privacy Policy](/docs/privacy-policy).

### How should I report a security vulnerability?

If you believe you have found a vulnerability within Infracost, please let us know right away. Follow the process [outlined here](https://github.com/infracost/infracost/blob/master/SECURITY.md).

## Features

### What's the difference between Infracost and Terraform Cloud's cost estimation?

The key differences are:
1. Infracost [supports over 230 resources](/docs/supported_resources/overview). Terraform Cloud supports 43 resources.
2. Infracost parses HCL code directly, which makes it super-fast as a Terraform plan is not needed.
3. Infracost can be used to model [usage-based resources](/docs/features/usage_based_resources) and do what-if analysis.
4. Infracost has a [CLI tool](/docs#installation) that can be used in your terminal or [integrated](/docs/integrations/cicd) into your workflows regardless of the source control and CI/CD system being used.
5. Infracost can be used with [Terragrunt](/docs/features/terragrunt).
6. Infracost can be used with [Terraform modules](/docs/features/terraform_modules).
7. Infracost can output JSON and be used to create [cost policies](/docs/features/cost_policies) with Open Policy Agent, Conftest and HashiCorp Sentinel.

### What Terraform versions are supported?

Infracost works with Terraform v0.12 and above.

### Can I show costs in a different currency?

Sure! See the [currency](/docs/features/environment_variables/#infracost_currency) docs section.

### Do you offer support?

Yes! We're happy to help you, see our [support page](/docs/support).
