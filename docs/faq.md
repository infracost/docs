---
slug: /faq
title: FAQ
---

## How does Infracost work?

Infracost has a [CLI](https://github.com/infracost/infracost) and a [Cloud Pricing API](https://github.com/infracost/cloud-pricing-api) backend service, as well as many [CI/CD integrations](/docs/integrations/cicd).

The CLI parses the Terraform plan JSON file to find [supported resources](/docs/supported_resources/overview) and uses [cost-related parameters](/docs/faq#example-request), such as the instance type or disk size, to find applicable cloud prices for that resource. The Cloud Pricing API [returns the prices](/docs/faq#example-response), which the CLI then uses to calculate the monthly costs. The results can be output in table, HTML or JSON format.

## Does Infracost need cloud credentials?

That depends on how you run Infracost, since we run Terraform internally, which sometimes needs cloud credentials:
- When Infracost is run against a [Terraform directory](/docs/#option-1-terraform-directory), Terraform will need access to cloud credentials, e.g. when running `terraform init` and `terraform plan`. These commands are only used to produce [plan JSON files](https://www.terraform.io/docs/commands/show.html#json-output) and no changes are made to your Terraform state or cloud resources.
- When Infracost is run against a [Terraform plan JSON file](/docs/#option-2-terraform-plan-json), cloud credentials are not needed.

## How does Infracost get cloud prices?

Infracost gets prices from the Cloud Pricing API, which we continually update with the latest cloud vendor prices.

## Does the CLI send the Terraform plan to the Cloud Pricing API?

No. The CLI parses the Terraform plan JSON file to find [cost-related parameters](/docs/faq#example-request) and uses those to lookup cloud prices. See the following FAQ for more details.

## What data is sent to the Cloud Pricing API?

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

## Can I run my own Cloud Pricing API?

Yes! Please see the [self-hosting guide](/docs/cloud_pricing_api/self_hosted) for details.

## What's the difference between Infracost and Terraform Cloud's cost estimation?

The key differences are:
1. Infracost [supports over 200 resources](/docs/supported_resources/overview). Terraform Cloud supports 43 resources.
2. Infracost can be used to model [usage-based resources](/docs/usage_based_resources) and do what-if analysis.
3. Infracost has a [CLI tool](/docs#installation) that can be used in your terminal or [integrated](/docs/integrations/cicd) into your workflows regardless of the source control and CI/CD system being used.
4. Infracost can be used with [Terragrunt](/docs/iac_tools/terragrunt).
5. Infracost can output JSON and be used alongside other tools such as Open Policy Agent.

## What Terraform versions are supported?

Infracost works with Terraform v0.12 and above.

To change the path to the `terraform` binary, set the `INFRACOST_TERRAFORM_BINARY` environment variable:
```shell
INFRACOST_TERRAFORM_BINARY=~/bin/terraform_0.13 infracost breakdown --path /path/to/code
```

Terragrunt users should see [this page](/docs/iac_tools/terragrunt).

## Can I show costs in a different currency?

Sure! Use `infracost configure` to set your preferred [ISO 4217 currency](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) (e.g. EUR, BRL or INR):
```shell
infracost configure set currency CURRENCY_CODE
```

The environment variable `INFRACOST_CURRENCY` can be used to set the currency in CI/CD pipelines. Cloud vendors usually publish prices in USD so the costs will be converted from USD to your preferred currency using the current exchange rate when the CLI is run.

## Do you offer support?

Yes! If you need help integrating Infracost in to your workflow, or want to talk about something else, please email [hello@infracost.io](mailto:hello@infracost.io). You can also join our [community Slack channel](https://www.infracost.io/community-chat) to chat with us.
