---
slug: /faq
title: FAQ
---

## What Terraform versions are supported?

Infracost works with Terraform v0.12 and above.

To change the path to the `terraform` binary, set the `INFRACOST_TERRAFORM_BINARY` environment variable:
```shell
INFRACOST_TERRAFORM_BINARY=~/bin/terraform_0.13 infracost breakdown --path /path/to/code
```

Terragrunt users should see [this page](/docs/iac_tools/terragrunt).

## Does Infracost need cloud credentials?

Infracost itself does not need any cloud credentials.

Infracost runs Terraform internally and if Infracost is run against a [Terraform directory](/docs/#terraform-directory), **Terraform** will need access to cloud credentials, e.g. when running `terraform init` and `terraform plan`. These commands are only used to produce [plan JSON files](https://www.terraform.io/docs/commands/show.html#json-output) and no changes are made to your Terraform state or cloud resources.

## How does Infracost get cloud prices?

Infracost gets prices from the Cloud Pricing API, which we continually updated with the latest cloud vendor prices.

## What data is sent to the Cloud Pricing API?

**No** cloud credentials, secrets, tags or resource identifiers are sent to the Cloud Pricing API. That API does not become aware of your cloud spend; it simply returns cloud prices to the CLI so calculations can be done on your machine. Infracost does not make any changes to your Terraform state or cloud resources.

The Cloud Pricing API needs the relevant data to return a unique cloud price point. We also send the count of Terraform resource types to the Cloud Pricing API to enable us to better prioritize support for new resources. Additional context such as the operating system, Terraform version, type of CI system, and Infracost version are also sent alongside error tracking events so we can identify and fix issues quickly.

Here is an example request to the Cloud Pricing API for a t3.micro instance and the returned response:

Request:
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
    ) { priceHash, USD }
  }
}

```

Response:
```json
{
  "data": {
    "products": [
      {
        "prices": [
          {
            "priceHash": "2f1bc092c9e34dc084a4d96d19ef47ca-d2c98780d7b6e36641b521f1f8145c6f",
            "USD": "0.0104000000"
          }
        ]
      }
    ]
  }
}
```

## Can I run my own Cloud Pricing API?

Yes! Please email <a href="mailto:hello@infracost.io" target="_blank">hello@infracost.io</a> for details.

## What's the difference between Infracost and Terraform Cloud's cost estimation?

The key differences are:
1. Infracost is free and open-source, Terraform Cloud's cost estimation is paid and closed source.
2. Infracost [supports more resources](/docs/supported_resources) than Terraform Cloud's cost estimation feature.
3. Infracost has a [CLI tool](/docs#installation) that can be used in your terminal or [integrated](/docs/integrations/cicd) into your workflows regardless of what source control and CI/CD system you use.
4. Infracost can be used with [Terragrunt](/docs/iac_tools/terragrunt).
5. Infracost can output [HTML reports](/docs/multi_project/report) or JSON and be used alongside other tools.

## Do you offer support?

Yes! If you need help integrating Infracost in to your workflow, or want to talk about something else, please email [hello@infracost.io](mailto:hello@infracost.io). You can also join our [community Slack channel](https://www.infracost.io/community-chat) to chat with us.
