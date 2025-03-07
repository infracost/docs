---
slug: cloud_pricing_api
title: Cloud Pricing API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Cloud Pricing API is a GraphQL-based API that includes all public prices from AWS, Azure and Google; it contains over **3 million prices!** The prices are automatically updated via a weekly job. This API is used by the [Infracost CLI](https://github.com/infracost/infracost), thus you do not need to interact with it directly, however, you can also use it independently.

GraphQL is a natural fit for cloud pricing as it can model the JSON structure used by cloud vendors. This enables you to query nested JSON structures using vendor-specific parameters, and request only the attributes you need to be returned in the response. For example, you can find all prices that match AWS EC2 m3.large instance in us-east-1 (over 400 prices), then explore the 30+ attributes that AWS return to describe instances (e.g. `clockSpeed` or `networkPerformance`).

## Concepts

The API has two main types: Products and Prices. Each product can have many Prices. This simple high-level schema provides flexibility to model the exact values that the cloud vendor APIs return at the same time as having useful top-level product filters. The values returned by the API are the same ones that the cloud vendors return in their APIs.

The main properties of Products are:

| Name | AWS examples | Microsoft Azure examples | Google Cloud Platform examples |
| ---  | ---          | ---                      | ---                            |
| `vendorName` | `aws` | `azure` | `gcp` |
| `service` | `AmazonEC2`, `AWSLambda`, `awskms` | `Virtual Machines`, `Functions`, `Azure DNS` | `Compute Engine`, `Cloud Functions`, `Cloud DNS` |
| `productFamily` | `Dedicated Host`, `Provisioned Throughput`, `Elastic Graphics` | `Compute`, `Storage`, `Databases` | `Compute Instance`, `License`, `Network` |
| `region` | `us-east-1`, `cn-north-1`, `us-gov-east-1` | `eastus`, `uknorth`, `US Gov` | `us-east1`, `europe`, `australia-southeast1` |
| `attributes` (array of key-value pairs) | `usagetype: UGE1-Lambda-Edge-Request`, `clockSpeed: 2.5 GHz` | `productName: Premium Functions`, `meterName: vCPU Duration` | `machineType: n2-highmem-64`, `description: Static Ip Charge` |

The main properties of Prices are:

| Name | Description | Example |
| ---       | ---    | ---   |
| `USD` | Price from the cloud vendor in the preferred [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) (e.g. EUR, BRL or INR).  For non-USD currencies, prices are converted from USD to the preferred currency at query time. | `USD: 0.2810000000` |
| `unit` | Unit for the price | `unit: Hrs` |
| `description` | Any additional description | `description: Upfront Fee` |
| `startUsageAmount` | Start usage amount for price tier, only applicable for tiered pricing | `startUsageAmount: 0` |
| `endUsageAmount` | End usage amount for price tier, only applicable for tiered pricing | `endUsageAmount: 10000`
| `purchaseOption` | Purchase option varies between vendors | `on_demand`, `reserved`, `spot`, `Consumption`, `preemptible` |
| `termPurchaseOption` | Term of the purchase option | `termPurchaseOption: All Upfront`
| `termLength` | Length of the purchase option | `termLength: 1yr` |
| `termOfferingClass` | Offering class or type of the term | `termOfferingClass: standard` |

## Usage

Infracost runs a hosted version of this API that you can use:
1. Register for an API key by [downloading infracost](/docs/#quick-start) and running `infracost auth login`.
2. Pass the above API key using the `X-Api-Key: xxxx` HTTP header when calling [https://pricing.api.infracost.io/graphql](https://pricing.api.infracost.io/graphql). The following example fetches the latest price for an AWS EC2 m3.large instance in us-east-1.

<Tabs
  defaultValue="curl_request"
  values={[
    {label: 'Curl request', value: 'curl_request'},
    {label: 'GraphQL playground request', value: 'graphql_request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="curl_request">

  ```shell
  curl https://pricing.api.infracost.io/graphql \
    -X POST \
    -H 'X-Api-Key: YOUR_API_KEY_HERE' \
    -H 'Content-Type: application/json' \
    --data '
    {"query": "{ products(filter: {vendorName: \"aws\", service: \"AmazonEC2\", productFamily: \"Compute Instance\", region: \"us-east-1\", attributeFilters: [{key: \"instanceType\", value: \"m3.large\"}, {key: \"operatingSystem\", value: \"Linux\"}, {key: \"tenancy\", value: \"Shared\"}, {key: \"capacitystatus\", value: \"Used\"}, {key: \"preInstalledSw\", value: \"NA\"}]}) { prices(filter: {purchaseOption: \"on_demand\"}) { USD } } } "}
    '
  ```

  </TabItem>
  <TabItem value="graphql_request">

  The [GraphQL Playground](https://pricing.api.infracost.io/graphql) can be used with any browser extension that allows you to set custom request headers so you can set the HTTP header `X-Api-Key` to your Infracost API key.

  ```shell
  query {
    products(
      filter: {
        vendorName: "aws",
        service: "AmazonEC2",
        productFamily: "Compute Instance",
        region: "us-east-1",
        attributeFilters: [
          { key: "instanceType", value: "m3.large" }
          { key: "operatingSystem", value: "Linux" }
          { key: "tenancy", value: "Shared" }
          { key: "capacitystatus", value: "Used" }
          { key: "preInstalledSw", value: "NA" }
        ]
      },
    ) {
      prices(
        filter: {purchaseOption: "on_demand"}
      ){ USD }
    }
  }
  ```

  </TabItem>
  <TabItem value="response">

  ```json
  {"data":{
    "products":[
      {
        "prices":[
          {
            "USD":"0.1330000000"
          }
        ]
      }
    ]
  }}
  ```

  </TabItem>
</Tabs>
