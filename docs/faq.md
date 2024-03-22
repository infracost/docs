---
slug: /faq
title: FAQ
---

## How does Infracost work?

Infracost has a [CLI](https://github.com/infracost/infracost) and a [Cloud Pricing API](/docs/supported_resources/cloud_pricing_api) backend service, as well as many [CI/CD integrations](/docs/integrations/cicd). There is also a SaaS product, <a href="https://www.infracost.io/pricing/" target="_self" rel="">Infracost Cloud</a>, that complements the open source CLI by giving teams advanced visibility and controls.
When the CLI runs, it:

1. **Extracts cost-related parameters**<br />
  The CLI parses Terraform HCL code to extract only [cost-related parameters](/docs/faq#example-request), such as the instance type or disk size.

2. **Retrieves prices from the Cloud Pricing API**<br />
  The CLI retrieves prices from the Cloud Pricing API. The CLI **does not** send the Terraform plan JSON file, or any cloud credentials or secrets to the Cloud Pricing API. The API [returns the prices](/docs/faq#example-response).

3. **Calculates the monthly costs**<br />
  The CLI calculates the monthly costs. The results can be output in [various formats](/docs/features/cli_commands/#combined-output-formats) including JSON or text table.

4. **Infracost Cloud**<br />
  If you use Infracost Cloud, the CLI sends the final cost estimate in JSON format to your dashboard, the JSON does not contain any cloud credentials or secrets.

## Security and Privacy

Security is of paramount importance to us. We are SOC 2 Type II certified. Our <a href="https://www.infracost.io/security/" target="_self" rel="">Security page</a> gives an overview of the processes and systems Infracost has in place to ensure we are continually protecting our users' data.

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

### Does Infracost need cloud credentials?

No! Infracost parses code directly and uses pricing data to estimate costs.

### Does the Infracost CLI send the Terraform plan to the Cloud Pricing API?

No. The Infracost CLI parses the Terraform HCL code directly or the plan JSON file to find [cost-related parameters](/docs/faq#example-request) and uses those to lookup cloud prices.

### What data is sent to Infracost Cloud?

If you use [Infracost Cloud](/docs/infracost_cloud/get_started/), the CLI sends its [JSON output](/docs/features/cli_commands/#combined-output-formats) to your dashboard; you can generate and inspect this JSON. It does not contain any cloud credentials or secrets.

### Do you sell my data?

No. Infracost is backed by top-tier investors including Y Combinator and Sequoia. We also have an <a href="https://www.infracost.io/pricing/" target="_self" rel="">paid product</a>. For more information about how we handle data see our [Privacy Policy](/docs/privacy-policy).

### How should I report a security vulnerability?

If you believe you have found a vulnerability within Infracost, please let us know right away. Follow the process [outlined here](https://github.com/infracost/infracost/blob/master/SECURITY.md).

### How can I whitelist Infracost IP addresses?

Infracost provides static IPs for its Cloud Pricing API and Infracost Cloud services. You can whitelist these IPs in your firewall rules.

| Name | Source | Destination | Domains | Port | IPs |
|-|-|-|-|-|-|
| Inbound | Infracost Cloud | Your CI/CD system | N/A | 443 | 3.133.40.66 |
| Outbound | Your CI/CD system | Infracost Cloud | dashboard.api.infracost.io <br />pricing.api.infracost.io | 443 | 76.223.127.201 <br /> 52.223.24.69 |

## Features

### What's the difference between Infracost and Terraform Cloud's cost estimation?

There are three key areas of differentiation.

#### 1. Cost estimation differences
- Terraform Cloud (TFC) cost estimation does not cover many of the cloud resources from AWS, Azure and GCP. Infracost supports over 1,100 resources from AWS, Azure and GCP; TFC covers around 200. Here's a quick comparison: [Infracost Azure coverage](/docs/supported_resources/azure/) vs [TFC Azure coverage](https://developer.hashicorp.com/terraform/enterprise/cost-estimation/azure).
- Cost estimation of usage based resources: Infracost supports estimating usage-based resources such as AWS Lambda or Azure Blob storage with usage profiles (e.g. use 100GB to estimate S3 costs). TFC does not support estimating usage-based resources.
- Your discount rates: Infracost supports your discount levels including AWS EDP, Azure EA and custom price books. Terraform Cloud only support public prices.

#### 2. FinOps guardrails, policies, and tag checker
Infracost supports FinOps guardrails (budget checks, and kicking-off approval workflows), a set of best practice policies, and checking for the right tag keys and tag values - all out of the box.

TFC does not provide these; it does enable you to write code to check for policies, but you will have to either teach FinOps practitioners and managers to code, and enable them to do it (there is no user interface), or have an engineering team do all that and maintain it. On top of these, Infracost provides an inventory of all resources that are failing tags and policies so you can see where your biggest issues are and how to fix them.

#### 3. Infracost can be run on engineering machines
Since Infracost does not need a Terraform plan file, cloud credentials or secrets, engineers can install the Infracost [VSCode Extension](/docs/integrations/vscode/) or the CLI and get cost estimates before sending pull requests, directly on their machines. Infracost also supports cost estimation of Terraform modules as well as Terragrunt projects. TFC cost estimation does not have these capabilities.

### What Terraform versions are supported?

Infracost works with Terraform v0.12 and above.

### How do you deal with auto-scaling groups?

Auto-scaling groups have a dynamic instance count so it's useful for engineers to get a cost estimate for them as their cost can vary significantly.

By default, Infracost parses the code to detect the instance count, thus it has to follow the static logic from the autoscaling group in AWS, Azure or Google. For example, the `aws_autoscaling_group` resource has a `desired_capacity` that is used, and if that is not set, the `min_size` is used, and otherwise we default to an instance count of 1.

You can override the instance count manually in the [usage file](/docs/features/usage_based_resources/).

### Can I show costs in a different currency?

Sure! See the [currency](/docs/features/environment_variables/#infracost_currency) docs section.

### What's the difference between source control and CI/CD integration?

Source control integration is when you connect Infracost directly to your GitHub or GitLab. CI/CD integration is when you install the Infracost CLI in your CI/CD pipelines and run commands. We recommend source control integration as it is simpler to setup and faster to run.

### Do you offer support?

Yes! We're happy to help you, see our [support page](/docs/support).
