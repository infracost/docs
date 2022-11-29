---
slug: infracost-gartner-cool-vendor-platform-engineering
title: "Infracost is a Gartner cool vendor in platform engineering"
author: Alistair Scott
author_url: https://twitter.com/aliscott
author_image_url: /img/avatars/alistair.jpg
description: "Infracost has been named a cool vendor on Gartner’s Platform Engineering list"
hide_table_of_contents: false
image: img/blog/gartner-list/infracost-gartner.png
date: "2022-11-28"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost was recently named a cool vendor on Gartner’s Platform Engineering list. This is super exciting for us as a project, but also a great direction forward for engineers and our community as a whole 🎉

<!--truncate-->

<img src={useBaseUrl("img/blog/gartner-list/infracost-gartner.png")} width="50%" alt="Infracost VS Code GIF"/>

Let me take a step back. In the cloud cost space, every solution designed has started from the same data source - the cloud bill. Everything was reactive. Someone gets a bill, it is out of sync with budget expectations, and so engineering is asked to ‘fix it’. When engineers push back because their current sprint is already overloaded, they are blamed for ‘not taking action’. Hassan wrote a whole blog about the broken relationship between [engineering and cloud bill owners](/blog/broken-relationship-between-eng-and-cloud-bill-owners/) a few months ago.

Imagine every time you went shopping, all the price labels were removed, and you were given a budget for your shopping. It’s impossible to know when that budget is going to run out. This is what DevOps, SRE and platform engineers are faced with on a daily basis when trying to provision infrastructure - there is no checkout screen! This is clearly unfair, and it only benefits the cloud providers.

Infracost acts as that checkout screen. It’s open source, it’s free. Every engineer, DevOps and SRE deserves the checkout screen, so we know what we are buying and how much it will cost. That happens in two ways:

###  VS Code Extension
Prices being shown as we type code using [Infracost VS Code extension](https://github.com/infracost/vscode-infracost):

<img src={useBaseUrl("img/blog/gartner-list/infracostvscode-small.gif")} width="100%" alt="Infracost VS Code GIF"/>

### Infracost CI/CD
When a pull request is opened, [Infracost CI/CD](https://www.infracost.io/docs/integrations/cicd/) creates a cost estimate of all the changes, additions and removal of resources from your Terraform code and creates a super easy to read PR comment of the cost impact of your specific change. We can now review the code for cost impact in the PR, at the same time we review the quality and security:

<img src={useBaseUrl("img/blog/gartner-list/infracostcicd.png")} width="100%" alt="Infracost CI/CD"/>

There is a lot more to build, and to make sure we are building in the right direction, please keep contributing, commenting, upvoting, and sending us feedback. But also for a quick minute, let’s take a deep breath and celebrate this big milestone of recognition of the problem that we face on a daily basis from a massive voice, Gartner.

Cheers. Let’s build. 🙏
