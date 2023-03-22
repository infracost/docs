---
slug: aws-cost-calculator-vs-infracost
title: "AWS cost calculator vs Infracost"
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: "Comapring the AWS Cost Calculator to Infracost"
hide_table_of_contents: false
image: img/blog/aws-cost-calculator-vs-infracost/aws-cost-calculator-vs-infracost.png
date: "2023-03-22"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Since launching Infracost two years ago, I've been asked about the key differences between the AWS Cost Calculator and Infracost. In this blog post, I will compare the two tools.

<!--truncate-->

**Update** *AWS has now deprecated AWS simple cost calculator - the only other option left is the AWS Pricing calculator. *

<img src={useBaseUrl("img/blog/aws-cost-calculator-vs-infracost/aws-cost-calculator-vs-infracost.png")} alt="Infracost is now SOC2 certified" width="60%" />

The AWS Cloud Cost Calculator is a web-based UI that enables users to design key parts of their infrastructure and obtain a monthly running cost estimate.

Infracost is an open-source tool that automates the cost estimation of infrastructure written in Infrastructure as Code (IaC) languages, such as Terraform (Cloud Formation, Pulumi and Azure ARM to come). Integrated within your CI/CD system (such as GitHub, GitLab, Atlantis, etc.), Infracost provides detailed cost breakdowns of all the resources that are being added, changed, or removed each time an engineer modifies the IaC code. For example, Infracost may leave a comment like "this change will increase costs by 25%," along with a breakdown of the cost impact.

### Key differences: AWS Cloud Cost Calculator vs Infracost

- The AWS cost calculator is a web-based user interface that requires the user to manually recreate their infrastructure setup in order to obtain a cost estimate. Infracost, on the other hand, takes existing Terraform code and automatically generates cost estimates.
- Infracost comes in many forms, including a VSCode extension, CLI, CI/CD tool, and a web UI. The AWS cost calculator is a web-based user interface.
- As Infracost can be integrated into CI/CD, it can generate a cost estimate "diff" based on the user's changes. For example, if the user changes an instance from medium to large, Infracost will show the total cost, as well as the cost increase from medium to large. In contrast, the AWS Cost Calculator shows a snapshot in time, and can only display the total cost of either the medium or large instance at that moment.
- Infracost automates cost estimation directly in the engineering workflow (CI/CD), without requiring any additional work from the user. On the other hand, the AWS cost calculator requires the user to manually input infrastructure changes in order to generate a cost estimate.
- Infracost enables users to enter their Enterprise Discount Program and Enterprise Agreement discounts to be used during cost estimation. The AWS cost calculator does not offer this feature.
- Infracost can be integrated into multiple systems, including source control systems like GitHub, GitLab, Bitbucket, and Azure DevOps. It can also be integrated into issue tracking systems like JIRA, so that different stakeholders can see the cost impact of changes. In contrast, the AWS cost calculator is a standalone tool that does not integrate into other systems.
- When estimating costs for usage-based resources like S3, Lambda, and data transfer, AWS allows the user to input these directly. with Infracost, multiple "usage profiles" can be created (e.g. low-usage or high-usage), which can be reused during each cost estimation.
- AWS cost calculator is AWS only, whereas Infracost covers costs of AWS, Microsoft Azure and Google Cloud Platform (GCP).
- AWS cost calculator is a free tool. Infracost offers a free Open Source version as well as paid management dashboards and tools.

Overall, the AWS Cost calculator is designed for one-off cost estimates that can be easily shared with others via screenshots. It is best suited for new, greenfield applications that have not yet undergone engineering work.

Infracost has been designed to help engineers understand how their code changes will impact cloud costs before launching anything into production. It automates cost estimation when writing infrastructure and speeds up engineering. Since Infracost can be integrated into the CI/CD workflow, engineering management, FinOps, and Cloud Centre of Excellence teams can design central guardrails and policies that are automatically checked against code before infrastructure changes are shipped to production.

### Comparison table


| Feature     | AWS Cost Calculator | Infracost |
| ----------- | ------------------- | --------- |
| Generates cost estimates      | Manually       | Automatically |
|  Works with IaC  | No | Yes |
|  Cost estimate type  | Snapshot cost estimate at one point in time | <ul><li>Snapshot estimate</li><li>Difference in changes being made</li><li>Change details with cost breakdown</li></ul>|
|  Integrates into CI/CD  | No | Yes |
|  Supports enterprise discounts  | No | Yes |
|  Integrations  | None | Yes<ul><li>GitHub, GitLab</li><li>CI/CD systems</li><li>Jira</li><li>Terraform Cloud & enterprise</li></ul> |
|  Usage profile design  | Yes, one time | Yes, reusable |
|  Clouds supported  | AWS | AWS, Azure, Google Cloud |
|  Cost  | Free | Free, Open Source and Paid offerings |
|  Best suited for  | One off cost estimates for green-field applications | Helping engineers understand how their code changes will impact cloud costs as they ship. |

Give Infracost a try now; CI/CD integrations and cost estimation are free and Open Source and can be setup and running in a matter of minutes: https://dashboard.infracost.io/