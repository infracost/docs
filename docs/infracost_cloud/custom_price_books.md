---
slug: custom_price_books
title: Custom price books
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Infracost CLI uses public prices by default. Many organizations that have significant cloud spend get discounts from cloud vendors, including the following. You can apply these discounts in Infracost Cloud.
- AWS Enterprise Discount Program (EDP)
- Azure Prepayment, also known as Azure Monetary Commitment. These are part of Azure Enterprise Agreements
- Google Commitment Agreement

### Usage

1. Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in.
2. Switch to the desired organization and go to Org Settings page.
3. Define the percentage discounts that should be applied for AWS, Azure and Google and click Save:
  <img src={useBaseUrl("img/infracost-cloud/custom-price-books.png")} alt="Infracost Cloud supports custom price books" />

### How it works
- All **new** cost estimates (CLI outputs, pull requests and Infracost Cloud estimates) for your organization will apply the discount going forward.
- Older cost estimates will not be changed. There is currently no way to distinguish between the older cost estimates and ones that have a discount.
- The discount will also be applied to usage-based resources such as AWS Lambda or S3 **prices**, even if there is no [usage file](/docs/features/usage_based_resources/).
