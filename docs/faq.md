---
slug: /faq
title: FAQ
---

## Does Infracost need my AWS credentials?

Infracost itself does not need any AWS credentials, but Infracost uses your existing `terraform` binary to execute `terraform init` and `terraform plan` to produce [plan JSON files](https://www.terraform.io/docs/commands/show.html#json-output). This process requires Terraform to have access to your cloud credentials. The Terraform commands used by Infracost do not make any changes to your Terraform state or cloud resources,

## How does Infracost get its prices?

Infracost gets its prices from a [pricing API](https://github.com/infracost/cloud-pricing-api). These prices are continually updated with the latest AWS prices.

We offer a free hosted pricing API. There is also the option of running your own pricing API and configuring your infracost installation to point to it.

## What data is sent to the hosted pricing API?

The pricing API needs the relevant data to return a unique AWS price point. The count of Terraform resource types is also sent to the pricing API to enable us to better prioritize adding new resources. No cloud credentials, secrets, tags or Terraform resource identifiers are sent to the pricing API.

Here is an example request to the pricing API for a t3.micro instance and the returned response:

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

## Can I run my own pricing API?

Yes! The [pricing API repo](https://github.com/infracost/cloud-pricing-api) has instructions on how it can be run. Set the `INFRACOST_PRICING_API_ENDPOINT` environment variable to point `infracost` to it.
