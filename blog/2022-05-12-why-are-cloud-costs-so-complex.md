---
slug: why-are-cloud-costs-so-complex
title: "Why are cloud computing costs so complicated? A walkthrough"
author: Ali Khajeh-Hosseini
author_url: https://twitter.com/alikhajeh
author_image_url: /img/avatars/ali.jpg
description: A look at the history of cloud computing costs, why are they so complex and an example walkthrough
hide_table_of_contents: false
image: img/blog/why-are-cloud-costs-so-complex/infracost-cloud-pricing-api.png
date: "2022-05-12"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In 2009 I started my PhD research to focus on the decisions that needed to be made for an organization to adopt public clouds. These included the benefits, the risks and the costs of using such systems. My aim was to create a set of vendor neutral tools that would assist decision makers during the process.

<!--truncate-->


At the end, I had developed three tools:
1. Cloud Suitability Checklist: A set of questions to help asses the suitability of public clouds for a given application.
2. Benefits & Risk assessment: A list of benefits and risks that provides a starting point for organizations to talk about cloud adoption.
3. Cloud cost modeling: A tool that enables architects to design a system (compute, databases, storage, network etc) with built-in elasticity and growth, and create a 3-year cloud cost forecast using public cloud prices. This tool turned into a startup called PlanForCloud and was acquired by RightScale:


<img width="85%" src={useBaseUrl("img/blog/why-are-cloud-costs-so-complex/planforcloud.png")} alt="PlanForCloud was developed by the Infracost founders"/>

<br /><br />
Over the last 13 years of working in cloud computing costs, many things have changed, but two things remained consistent:

1. Cloud costs are an ever-green topic of discussion.
2. Cloud cost complexity has increased exponentially.

Back in 2012 when we were building PlanForCloud (the above tool), we were tracking around 10,000 price points from cloud providers. Today, as part of our new startup Infracost.io, our [Cloud Pricing API](https://www.infracost.io/docs/cloud_pricing_api/overview/) is tracking almost 4 million price points.

## What is the price of cloud computing?
To see why there are so many price points, let me use an example. At the highest point of our Cloud Pricing API tree, are the cloud providers: AWS, Azure and Google. Each provider has many services (compute, storage, network and so on). Each of these in turn has a completely different pricing structure, and this is where the complexity increases by multiple magnitudes.

### An example: Finding out the price of a simple app on EC2 instance
Let’s say I want to run an app on an AWS EC2 instance. First we have to choose the instance type. Depending on your region, there are 5 different instance families. Within those instance families are 438 instance types. Then we have to select an operating system, of which there are around 16. Now, we choose our AWS region, there are about 26 of those. Finally, we need to decide how we should purchase and pay for the instances. The options are on-demand, upfront pricing (on what term and how much you’d like to pay upfront), or maybe even a spot pricing model. That’s over a million prices just for the EC2 options I have listed here (438 x 16 x 26 x 6 = 1,093,248 - there are even more nuanced options).

<img width="100%" src={useBaseUrl("img/blog/why-are-cloud-costs-so-complex/infracost-cloud-pricing-api.png")} alt="PlanForCloud was developed by the Infracost founders"/>

## What is the impact of cloud cost complexity
As the complexity has grown exponentially over time, it’s become impossible to manually calculate the cost impact of changes to infrastructure. In 2012 I remember a lot of companies trying to calculate the potential cost of the cloud using spreadsheets. Now such efforts are futile.

This has resulted in three big impacts:

1. Costs have become harder to predict, and so budgets and actuals are mis-aligned. We see this happen all the time and is sometimes covered under the umbrella ‘bill shock’.
2. Costs have become so complex that sometimes we don’t actually know if the cloud providers are charging us the right amount. We’ve found on multiple occasions where the listed price on a cloud providers website is different to the charges that appear on the bill. One of our users [Tweeted about a $4K surprise](https://twitter.com/rpadovani93/status/1523610219011788800) he found.
3. It is painful and time consuming for the people responsible for designing systems and provisioning infrastructure to estimate the costs. DevOps, SREs and platform engineers are under tremendous pressure to deliver, and end-up being the ones facing the sharp edge of the knife from management when something goes wrong.

Here is what happens. Someone in the finance or management team gets surprised by a high bill. They need to understand what happened and that task requires context that only the engineering team has. First, the engineers get pulled away from the current sprint work to answer the ‘what happened’ question. Then, they are tasked with figuring out how to fix it, which usually comes in the form of a change that has to go through a release process (test, deploy to stage, then to prod) all the way to redesigning systems ‘to optimize cloud costs’.

This is incredibly frustrating to the engineers.

## Cloud cost frustration
This frustration is not easy to fix. There is no single tool/product or process you can run to fix it. It will always be around and an ever-green discussion. But whatever solution we try has to start with the engineers because they hold the context and the keys to fixing it.

We started an open source project called [Infracost.io](http://Infracost.io) ([GitHub link](https://github.com/infracost/infracost)), which sits in the CI/CD workflow (GitHub Actions, GitLab CI, Atlantis, Azure DevOps etc), and after analyzing Terraform code, leaves a comment with a detailed cost breakdown of the infrastructure changes. This ensures that engineers know how code changes will impact cloud costs, which of the millions of price points will be triggered, and can set expectations with management of significant upcoming changes to the cloud bill.

<img width="100%" src={useBaseUrl("img/blog/why-are-cloud-costs-so-complex/github-actions-screenshot.png")} alt="PlanForCloud was developed by the Infracost founders"/>

Since 2009, I’ve had this unhealthy obsession with cloud costs! I love reading and talking about it and finding solutions that have worked, and ones which did not work. If you want to connect with me and chat, here is my [Twitter](https://twitter.com/AliKhajeh) and [LinkedIn](https://www.linkedin.com/in/alikhajeh1/). If you want to try Infracost out, here is our [getting started guide](https://www.infracost.io/docs/).
