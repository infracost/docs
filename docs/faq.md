---
slug: /faq
title: FAQ
---

## How does Infracost work?

Infracost has a [CLI](https://github.com/infracost/infracost) and a [Cloud Pricing API](https://github.com/infracost/cloud-pricing-api) backend service, as well as many [CI/CD integrations](/docs/integrations/cicd).

When the CLI is run, it:

1. **Extracts cost-related parameters**<br />
  The CLI runs any required Terraform commands to generate the Terraform plan JSON and extracts only [cost-related parameters](/docs/faq#example-request), such as the instance type or disk size, to retrieve applicable cloud prices for that resource.

2. **Retrieves prices from the Cloud Pricing API**<br />
  The CLI retrieves prices from the Cloud Pricing API. The CLI **does not** send the actual plan JSON file, or any cloud credentials or secrets to the Cloud Pricing API. The API [returns the prices](/docs/faq#example-response).

3. **Calculates the monthly costs**<br />
  The CLI calculates the monthly costs. The results can be output in table, JSON format or [other formats](/docs/features/cli_commands/#combined-output-formats).

## Security and Privacy

Security is of paramount importance to us. If you have any questions or concerns, please [contact us](mailto:hello@infracost.io).

### What data is sent to the Cloud Pricing API?

No cloud credentials or secrets are sent to the Cloud Pricing API. Infracost does not make any changes to your Terraform state or cloud resources.

The Cloud Pricing API needs the relevant data to return a unique cloud price point. The plan JSON file is parsed by the Infracost CLI to extract the relevant data to make requests to the Cloud Pricing API. We also send the count of Terraform resource types to the Cloud Pricing API to enable us to better prioritize support for new resources. Additional context such as the operating system, Terraform version, type of CI system, and Infracost version are also sent alongside error tracking events so we can identify and fix issues quickly.

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

It depends on how you run Infracost, since we run Terraform internally, which sometimes needs cloud credentials. These credentials are used by the Terraform CLI locally and not sent to our Cloud Pricing API.

Infracost **doesn't need** cloud credentials when:
- It is run against a [Terraform plan JSON file](/docs/#option-2-terraform-plan-json), cloud credentials are not needed since the CLI parses the plan JSON file directly.

Infracost **does need** cloud credentials when:
- It is run against a [Terraform directory](/docs/#option-1-terraform-directory), Terraform will need access to cloud credentials, e.g. when running `terraform init` and `terraform plan`. These commands are only used to produce [plan JSON files](https://www.terraform.io/docs/commands/show.html#json-output) and no changes are made to your Terraform state or cloud resources.
- You are using Infracost with the [sync-usage-file](/docs/features/usage_based_resources#generate-usage-file) flag and want to pull usage data from your AWS account. In this case Infracost needs read-only access to some resources, as per this [example IAM](/docs/features/usage_based_resources#fetch-from-cloud-watch).

### Does the Infracost CLI send the Terraform plan to the Cloud Pricing API?

No. The Infracost CLI parses the Terraform plan JSON file to find [cost-related parameters](/docs/faq#example-request) and uses those to lookup cloud prices.

### Do you sell my data?

No. Infracost is backed by top-tier investors including Y Combinator and Sequoia. In the future we intend on making money by developing an [enterprise product](/pricing). For more information about how we handle data see our [Privacy Policy](/docs/privacy-policy).


### How should I report a security vulnerability?

If you believe you have found a vulnerability within Infracost, please let us know right away. Follow the process [outlined here](https://github.com/infracost/infracost/blob/master/SECURITY.md).

## Features

### What's the difference between Infracost and Terraform Cloud's cost estimation?

The key differences are:
1. Infracost [supports over 230 resources](/docs/supported_resources/overview). Terraform Cloud supports 43 resources.
2. Infracost can be used to model [usage-based resources](/docs/features/usage_based_resources) and do what-if analysis.
3. Infracost has a [CLI tool](/docs#installation) that can be used in your terminal or [integrated](/docs/integrations/cicd) into your workflows regardless of the source control and CI/CD system being used.
4. Infracost can be used with [Terragrunt](/docs/features/terragrunt).
5. Infracost can output JSON and be used to create [cost policies](/docs/features/cost_policies) with Open Policy Agent, Conftest and HashiCorp Sentinel.

### What Terraform versions are supported?

Infracost works with Terraform v0.12 and above.

To change the path to the `terraform` binary, set the `INFRACOST_TERRAFORM_BINARY` environment variable:
```shell
INFRACOST_TERRAFORM_BINARY=~/bin/terraform_0.13 infracost breakdown --path /path/to/code
```

Terragrunt users should see [this page](/docs/features/terragrunt).

### Can I show costs in a different currency?

Sure! Use `infracost configure` to set your preferred [ISO 4217 currency](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) (e.g. EUR, BRL or INR):
```shell
infracost configure set currency CURRENCY_CODE
```

The environment variable `INFRACOST_CURRENCY` can be used to set the currency in CI/CD pipelines. Cloud vendors usually publish prices in USD so the costs will be converted from USD to your preferred currency using the current exchange rate when the CLI is run.

### Do you offer support?

Yes! We're happy to help you, see our [support page](/docs/support).
