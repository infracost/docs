---
slug: cloud-cost-guardrails-cidi
title: "Cloud cost budgets and guardrails in engineering CI/CD workflows"
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: "Infracost Cloud guardrails helps central teams set budget thresholds and have all Pull Requests get checked in CI/CD"
hide_table_of_contents: false
image: img/blog/cloud-cost-guardrails-cicd/pull-request-filters-and-thresholds.png
date: "2023-02-22"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The new Infracost Guardrails feature enables you to setup cloud cost guardrails directly in CI/CD. If a pull request's cost estimate exceeds a threshold, a custom notification is sent; the pull request can even be blocked till it has been approved.

<!--truncate-->

### Status quo

Cloud costs have traditionally been managed after money has been spent; our industry as a whole is reactive in this regard. In my last blog, I wrote about how [Infracost is changing this](/blog/cloud-costs-in-jira/) by estimating costs before resources are launched. The estimates are put into CI/CD for engineers, and into Jira for product managers. This enables us to act before budgets are broken.

Engineers want to move fast, and companies are establishing [Platform Engineering](/blog/infracost-gartner-cool-vendor-platform-engineering/) teams to enable self-service. As this decentralized approach to infrastructure provisioning plays out, cloud costs and budgets are not communicated to development teams. Naturally, engineers will use what they want, and budgets break. That's bad for two reasons: a) the money that has already been wasted is not coming back, and b) engineering teams now need to burn more time to fix the cloud cost issues.

### Introducing Guardrails

A customer recently told us about Azure [PowerBI Embedded](https://azure.microsoft.com/en-us/pricing/details/power-bi-embedded/) instances, where the cheapest instance starts at $735/month and it goes up to $23,500/month. One of their engineering teams was adding two of the cheapest instances, which costs $1500/month. Guardrails enabled the manager to review the change and check if two instances are really necessary; in this case it turned out that one instance was enough. This was a quick conversation between the engineer and their manager, and it saved the company $9,000/year.

With guardrails, product owners, Cloud Center of Excellence (CCoE), FinOps, and Platform teams can set central budget thresholds. As teams make changes to infrastructure, Infracost will calculate the cost impact of the change and if a threshold is exceeded, notifications are sent via email, Slack, Microsoft Teams. The engineers are also informed of the budget threshold via custom messages in the pull request. If you are using our [GitHub App](/docs/integrations/github_app/), you can also select to block the pull request until it has been approved (or overridden by an engineering lead in case of an emergency).

<img src={useBaseUrl("img/blog/cloud-cost-guardrails-cicd/pull-request-filters-and-thresholds.png")} alt="Cloud cost guardrails in Infracost Cloud"/>

If a pull request triggers a guardrail, you will also see an audit trail of when and where the guardrail was triggered, as well as how much money has been saved by using that guardrail.

<img src={useBaseUrl("img/blog/cloud-cost-guardrails-cicd/cost-saving.png")} alt="Cloud cost guardrails money savings"/>

I'd love to invite you to [**try guardrails**](/docs/infracost_cloud/guardrails) and provide your feedback on where this feature should go next.
