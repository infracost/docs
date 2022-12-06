---
slug: death-of-the-cloud-cost-calcultor
title: "The death of the Cloud Cost Calculator"
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: "We have our targets set on killing cloud cost calculators!"
hide_table_of_contents: false
image: img/blog/death-cost-calculator/rip.png
date: "2022-12-06"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In 2012, we built a Total Cost of Ownership (TCO) calculator for cloud. Companies could use our online calculator to design their desired cloud infrastructure, and our tool would calculate how much it would cost.

Now in 2022, 10 years later, we want to kill *all* cloud cost calculators ☠️

<!--truncate-->

<img src={useBaseUrl("img/blog/death-cost-calculator/rip.png")} width="70%" alt="RIP Cloud Cost Calculators"/>

Back in 2012, there were no pricing APIs available so we had to scrape the AWS, Azure, and GCP marketing sites to discover prices. Our database held 10,000 price points from these cloud providers. Back then, there were two ways companies calculated their potential cloud costs: Excel spreadsheets and cloud cost calculators.

Today we count nearly 4 million prices in our Cloud Pricing API from AWS, Azure and GCP. A few months ago we wrote about why [cloud pricing is so complex](https://www.infracost.io/blog/why-are-cloud-costs-so-complex/). It has become impossible to do estimation using Excel because it’s not possible to model both the complex cloud pricing, and complex system architectures. That leaves us with one target: kill cloud cost calculators!

For us to achieve this aim, we need to build a product which is 10x better. The dimensions we want to improve on are: speed and accuracy.

**Speed**: Engineers are already overloaded with sprint work. Adding a distinct step to calculate the cost of a change slows feature delivery by adding another task. But worse, the design and cost of a system are so tightly coupled that trying to separate cost estimation work from development work means a bigger potential for rework - if you design a system and then find out it costs too much, you have to redesign it.

**Accuracy**: If you try to use any of the cloud provider calculators, you will immediately see the problem with getting accurate cost estimates. You first need to select a region, then select a service from a massive list, then select the optionality of that service (e.g. instance type, OS, EBS block attachment etc). It has become so complex that AWS’ calculator now has an option to make it simpler by removing accuracy (called ‘quick estimate’):

<img src={useBaseUrl("img/blog/death-cost-calculator/awsCalculator.png")} width="70%" alt="AWS Cost calculator"/>

**We think we have achieved an 11x better product** (See Spinal Tap the movie) by automating the cost calculator to perform estimations while the engineer types their code. Because the code describes exactly what will be launched, we automatically get accuracy.

<img src={useBaseUrl("img/blog/death-cost-calculator/spinaltap.gif")} width="70%" alt="Spinaltap GIF"/>

VS Code extension: Integrate directly into VS Code so that as you type infrastructure code, a cost estimate is generated and displayed inline. Just install the plugin and you are good to go.

<img src={useBaseUrl("img/blog/death-cost-calculator/infracostVSCode.gif")} width="70%" alt="Infracost VS Code GIF"/>


We currently only support VS Code ([IntelliJ](https://github.com/infracost/infracost/issues/1814) is coming next). If you are working in a team, the best solution is [Infracost CI/CD](https://www.infracost.io/docs/integrations/cicd/), where the cost estimate is still automated and appears in the CI/CD in your Pull Request.

Now, we are setting our targets on automating the end to end flow. From Jira to cost estimation and back. Follow [@infracost](https://twitter.com/infracost) on Twitter for updates!
