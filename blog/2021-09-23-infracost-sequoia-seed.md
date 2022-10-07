---
slug: infracost-sequoia-seed
title: " Announcing Infracost’s seed fundraising from Sequoia, Y Combinator & SV Angel"
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: Cloud costs shifting left with Infracost
hide_table_of_contents: true
image: img/blog/infracost-sequoia-seed/seed_investment_banner.png
date: "2021-09-23"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

I’m very excited to announce that Infracost has raised $2.2M in seed funding from Sequoia, Y Combinator, SV Angel and Yun-Fang Juan as an angel investor.

<div style={{textAlign: 'center'}}>
  <img src={useBaseUrl("img/blog/infracost-sequoia-seed/smile.gif")} width="50%" alt="smile"/>
</div>

People are often surprised to learn that DevOps and SREs, who are launching cloud resources are never shown how much these resources are going to cost until they are charged for them. That is like going to a supermarket and having no price tags, and no checkout; then being told that your card will be charged later. This is not fair as when bills exceed budgets, the DevOps and SREs are asked to fix it.

The way we solve this problem is to show engineering teams how much resources, and the specific options they have selected, cost. This happens within their workflow before anything goes to production.

<!--truncate-->

<div style={{textAlign: 'center'}}>
  <img src={useBaseUrl("img/blog/infracost-sequoia-seed/mindblown.gif")} width="50%" alt="smile"/>
</div>

Ali, Alistair and I launched Infracost in late 2020 as an open source project, and have gained over 4,000 GitHub stars, with a community who are helping direct the roadmap as well as contributing code. We currently track over 3 million price points from AWS, Google Cloud and Microsoft Azure; have support for popular CI/CD systems such as GitHub Actions, GitLab CI, CircleCI, Bitbucket Pipelines, Jenkins; and support Terraform, with more IaC tools coming soon.

There are many super interesting problems we still need to solve, ranging from supporting many different types of cloud resources, cloud providers and charges, custom pricing discounts for large enterprises, usage-based resources and their consumption estimates (e.g. how much data-transfer will go through these resources, so we can calculate the cost) just to name a few. Just check out our [GitHub issue board](https://github.com/infracost/infracost/issues).

I want to thank our amazing open source community of users and contributors for helping us reach this milestone. I hope to see you around 😊

Hassan, Ali, Alistair
