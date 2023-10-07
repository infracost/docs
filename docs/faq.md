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

#### 1. Infracost is the de-facto standard cost estimation tool as it provides *the most accurate estimates*:
- Infracost [supports over 1,100 resources](/docs/supported_resources/overview) across AWS, Azure and Google. Terraform Cloud only supports 200 resources.
- Infracost supports estimating [usage-based resources](/docs/features/usage_based_resources) and what-if analysis, e.g. what-if my AWS Lambda calls double. Terraform Cloud only supports fixed-cost resources.
- Infracosts support [custom price books](/docs/infracost_cloud/custom_price_books/), including Enterprise Discount Programs, and SKU-level price overrides, so your organization's costs can be accurately estimated. Terraform Cloud only support public prices.

#### 2. In addition to cost estimates, Infracost enables you to *establish FinOps policies and governance* using the following unique features:
- [Tagging policies](/docs/infracost_cloud/tagging_policies/): Infracost provides FinOps practitioners and team leads an easy no-code method of communicating and enforcing required tag key/values in engineering workflows (for cost allocation and reporting). This feature also provides analytics across all code repos and pin-points the files/lines that engineers need to update to fix any tagging issues such as invalid values being used.
- [FinOps policies](/docs/infracost_cloud/cost_policies/): Infracost includes a suite of best practice FinOps policies, including detecting previous generation instance types, storage types, and requiring retention policies on object storage and log groups. This feature also provides analytics that shows where the biggest issues are and how they can be fixed.
- [Guardrails](/docs/infracost_cloud/guardrails/): Infracost helps you control costs by monitoring pull requests and triggering notifications and approvals when your defined thresholds are exceeded. Infracost also has a projects concept as well as [Jira integration](/docs/infracost_cloud/jira_integration/) that shows the sum of pull request costs for a project or Jira issue.

#### 3. Finally, Infracost has the following *technical benefits* over Terraform Cloud:
- Infracost parses HCL code directly, which means it does not need a Terraform plan or access to cloud credentials or secrets. This enables all engineers to run Infracost using a [VSCode Extension](/docs/integrations/vscode/) or CLI from their development machines thus giving them the fastest possible feedback loop without requiring everyone to have access to secrets.
- Infracost has a [CLI tool](/docs#installation) that can be [integrated](/docs/integrations/cicd) into any workflow regardless of the source control and CI/CD system being used.
- Infracost can be used with [Terragrunt](/docs/features/terragrunt).
- Infracost can be used with [Terraform modules](/docs/features/terraform_modules).

### What Terraform versions are supported?

Infracost works with Terraform v0.12 and above.

### How do you deal with auto-scaling groups?

Auto-scaling groups have a dynamic instance count so it's useful for engineers to get a cost estimate for them as their cost can vary significantly.

By default, Infracost parses the code to detect the instance count, thus it has to follow the static logic from the autoscaling group in AWS, Azure or Google. For example, the `aws_autoscaling_group` resource has a `desired_capacity` that is used, and if that is not set, the `min_size` is used, and otherwise we default to an instance count of 1.

You can override the instance count manually in the [usage file](/docs/features/usage_based_resources/). The usage file can also be [populated](/docs/features/usage_based_resources/#fetch-from-cloud-apis) from the last 30-day average from CloudWatch; if this is not available Infracost will fetch the current instance count from the AWS API instead.

### Can I show costs in a different currency?

Sure! See the [currency](/docs/features/environment_variables/#infracost_currency) docs section.

### What's the difference between source control and CI/CD integration?

Source control integration is when you connect Infracost directly to your GitHub or GitLab. CI/CD integration is when you install the Infracost CLI in your CI/CD pipelines and run commands. 

We recommend source control integration as it is much simpler to setup, and faster to run. [This page](/docs/guides/source_control_benefits/) explains more about the benefits of source control integrations over CI/CD integrations.

### Do you offer support?

Yes! We're happy to help you, see our [support page](/docs/support).
