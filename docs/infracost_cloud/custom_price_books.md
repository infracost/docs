---
slug: custom_price_books
title: Custom price books
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Infracost CLI uses public prices by default. Infracost Cloud users can apply enterprise discounts and custom price books to customize their prices.

## Enterprise discounts

Many organizations that have significant cloud spend get enterprise discounts from cloud vendors such as:
- AWS Enterprise Discount Program (EDP)
- Azure Prepayment, also known as Azure Monetary Commitment. These are part of Azure Enterprise Agreements
- Google Commitment Agreement

You can apply these discounts in Infracost Cloud:
1. Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in.
2. Switch to the desired organization and go to Org Settings > Custom price books page.
3. Define the percentage discounts that should be applied for AWS, Azure and Google and click Save:
  <img src={useBaseUrl("img/infracost-cloud/custom-price-books.png")} alt="Infracost Cloud supports custom price books" />

### How it works
- All **new** cost estimates (CLI outputs, pull requests and Infracost Cloud estimates) for your organization will apply the discount going forward.
- Older cost estimates will not be changed. There is currently no way to distinguish between the older cost estimates and ones that have a discount.
- The discount will also be applied to usage-based resources such as AWS Lambda or S3 **prices**, even if there is no [usage file](/docs/features/usage_based_resources/).

## Custom price books

We can also apply SKU-level custom cloud pricing to your Infracost Cloud organization. Please [contact us](mailto:support@infracost.io) to set this up. We would need details of the services or SKUs that you'd like to customize. For example, AWS customers can get this information in the Cost & Usage Reports, and Azure customers can use the [Price Sheet CSV export](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/ea-pricing?wt.mc_id=searchAPI_azureportal_inproduct_rmskilling&sessionId=e5ed2c1e32b5482c8c7c9a1ecf3b13b2#download-pricing-for-an-enterprise-agreement).

## Reserved Instances and Savings Plans

For cost estimation purposes, engineers often prefer a simple price point that they can use in their calculations and when making design decisions. Reserved Instances (RIs) and Savings Plans (SPs) complicate this due to the dynamic nature of their discounts, which is applied after resources are launched. Companies usually manage this by having:
- Central FinOps teams often change RIs and SPs regularly to match instance usage.
- Engineers compare like-for-like using on-demand prices; FinOps team ensures maximum savings of RIs/SPs; Engineers ship fast.
- Engineers use consistent number & make upfront design decisions quickly.
- Custom price books include main discounts already.

Showing engineers on-demand prices means that only the FinOps team is changing things, vs engineers also trying to second-guess the RI/SP discount allocation.

However, some companies prefer to use "blended rate" of resources, which combines on-demand and discounted prices into one price point. The blended rate is shown in cloud vendor Cost and Usage Reports (e.g. AWS CUR) and we can import them into your Infracost Cloud organization so they can be used instead of on-demand prices.

Please [contact us](mailto:support@infracost.io) to discuss what works best for your organization.
