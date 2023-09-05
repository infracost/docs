---
slug: cloud-cost-optimization-formula

title: "Cloud Cost Optimization: A Formula"
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: "When optimizing cloud costs, think through the problem using this formula."
hide_table_of_contents: false
image: img/blog/optimization-formula/infracost-cost-optimization-formula.png
date: "2023-03-15"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When considering cost optimization for the cloud, an equation can be used to structure the problem. Each component of the formula can be refined and delegated to the appropriate roles.

**The formula is: Cloud Costs = Usage x Unit Price**

<!--truncate-->

A few years ago, I spoke with a user who proposed the equation above for optimizing cloud costs. They use it to tell teams and executives what needs to be done, as well as assign tasks to individuals. I have since referred to it many times.

<img src={useBaseUrl("img/blog/optimization-formula/infracost-cost-optimization-formula.png")} alt="cloud costs = usage x unit price" width="100%" />

In this blog, I'll explain when and how to use this equation. I'll cover who in an organization is best suited to influence each component, and provide examples from AWS, Microsoft Azure, and Google Cloud (GCP).

Changing the unit price is usually easier than altering usage; however, usage is the most vital factor. If a resource isn't used, it has 100% waste, regardless of a 60% price reduction - 40% still goes to waste.

## Unit Price Optimization

### Overview
The unit price is the rate you pay per-service per time-unit. For example, when launching an AWS EC2 instance, you will pay a rate based on instance size/type, region, and operating system. This rate can be on a per-hour or per-second basis, depending on the factors listed above. See [AWS EC2 Pricing on Demand](https://aws.amazon.com/ec2/pricing/on-demand/) for more information.

The unit price can be reduced by carefully selecting payment timing and method. This is a financial decision which should be made by the finance or FinOps team, although there are exceptions which will be mentioned below (*).

### Commitments

You can commit to use a resource for a period of time or a dollar amount and receive a standard off-the-shelf discount (self-service). For example, we can optimize the unit price of a standard EC2 instance in two ways:

- **Reserved Instances (RIs):** You commit to a specific amount of compute capacity for a certain duration of time in exchange for a lower unit price.
- **Savings Plans (SPs):** You commit to a specific amount of compute usage, measured in dollars per hour, for a term of either 1 or 3 years.

The key distinction between AWS Savings Plans and Reserved Instances is flexibility. With Savings Plans, you commit to an instance family and region only. Other cloud providers also offer similar pricing models.

### Negotiation
Optimizing the unit price can also be done through negotiating an overall discount (not related to the service), tailored specifically for you, with cloud providers. There is much secrecy concerning how much can be negotiated, but it usually comes down to the amount spent on the cloud provider, your negotiation strength, and the commitment to annual total spend in the future. The cloud providers don't want customers to know other rates, as it would make them unhappy if they knew they were paying 50% more for the same service. This is why such custom prices are usually cloaked with NDAs. Refer to [AWS EDPs](https://aws.amazon.com/pricing/enterprise/) and [Microsoft EAs](https://www.microsoft.com/en-us/licensing/licensing-programs/enterprise?activetab=enterprise-tab%3aprimaryr2) for more information.

(*) An exception requiring engineering involvement in unit price reduction is AWS Spot instances. Here, a user can select to run the instance only when not in use by another AWS customer. They get a lower unit price, but if another customer is willing to pay a higher rate, the instance is taken away and all data and access is removed. This requires specific architectures to handle the situation without disrupting the business.

### Where to start

For optimizing the unit price, you can wait until resources are launched and running before taking action; let's call that "shifting right" 😉

We want to ascertain our current usage and if any major infrastructure changes are expected from engineering. Once we have this information, we can negotiate our unit price or commit to it.

Analysis can begin with the existing cost and usage reports provided by the cloud providers. For example, in AWS, this would be [Cost Explorer](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html), in Azure it is [Cost Analysis](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/quick-acm-cost-analysis) and in GCP it is [Cloud Billing](https://cloud.google.com/support/billing).

In this stage, we aim to segment the data to a level where we can adjust the unit price. For small or medium companies, you can take the whole bill and begin, but for larger enterprises, usually the first step is to divide the data into business units, teams, or products. After that, we try to further divide the data into specific resources where commitments can be made.

For example, when looking an EC2 instances, we need to consider the type/family, region, OS etc. After gathering this info, we'll have an idea of our past usage levels and can make an informed decision on the number of large Linux instances to commit to (e.g. 100 in US-East). Next, we'll evaluate rate optimization options (e.g. 1 or 3 year commitment, upfront payment) and create a set of scenarios covering the upfront cost and reduced monthly bill.

I won't go into detail on how to do this here. Instead, I want to focus on the equation versus the tasks. For now, let's just say:

- We should stay in contact with engineering teams to inquire about any major changes to resources currently in use. If there are, delay committing to a rate.
- This exercise must be repeated regularly, not just once. Infrastructure is continually evolving and you must keep up.
- In some cases, you can buy and sell commitments on marketplaces for more options than initially thought.
- Each cloud provider offers distinct choices, making it challenging to understand and assess your options.

Learn by doing, and don’t be afraid to start small.

<img src={useBaseUrl("img/blog/optimization-formula/aws-azure-reserved-instances.png")} alt="AWS and Azure Reserved Instances" width="60%" / >

## Usage Optimization

### Overview

The usage component of the equation refers to the cloud resources you use and how they are incorporated into your software's architecture. For example, have you chosen an EC2 instance or serverless Lambda functions to run the software.

Before discussing usage optimization, consider this fact that might be surprising if you're not an engineer: when setting up infrastructure, there's no checkout screen! There's nothing indicating the cost of the resources you're about to buy. Our Cloud Pricing API holds nearly 4 million price points from AWS, Azure and Google (GCP). This illustrates one of the major challenges with cloud costs - they're [incredibly complex](https://www.infracost.io/blog/why-are-cloud-costs-so-complex/).

When optimizing the usage of a system, remember that engineering time is necessary. Accordingly, it's helpful to consider each optimization item in terms of:

- Minimal engineering effort, such as shutting down unused resources.
- Medium engineering effort, like changing certain infrastructure components.
- High engineering effort, for example, redesigning the system for greater efficiency.

### Where to start

There are many tasks you can do, depending on the size of your company, cloud bill, how you set up infrastructure, and engineering organization. The best people to ask about the effort are the engineers who work with these systems daily.

It is essential to help your engineers comprehend where the money is being allocated:

- If you are using Terraform, put a checkout screen in the CI/CD system, so engineers start to understand how their code changes will impact cloud costs. Infracost CI/CD is fully free and open source: [https://www.infracost.io/docs/](https://www.infracost.io/docs/)
- Slice your cloud bill down to a level where engineers have the ability to change it, and show them the current running costs. This will require your to have good cloud bill hygiene setup already (tagging etc)

Your engineers are then able to spend time and assign an estimated effort level to each task. From here, it’s up to the engineers, product managers, FinOps, and management to decide which ones to do.

I won’t go further into the specific items to be looked at in this blog, but if you’d like to me to write more on this topic, please tweet at me: [@hassankhosseini](https://twitter.com/hassankhosseini)

Trust your engineers - you are on the same team.

## Conclusion

In conclusion, optimizing cloud costs requires a combination of financial decisions, engineering, and an understanding of the equation: Cloud Costs = Usage x Unit Price. 

Unit Price optimization can be done through committing to use a resource for a certain duration or dollar amount, or through negotiating an overall discount with the cloud provider. 

Usage optimization requires engineering effort, and is the main component of the equation to impact for long term optimization.