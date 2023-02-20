---
slug: cloud-cost-guardrails-cidi
title: "Cloud cost budget guardrails in engineering workflow (CI/CD)"
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: ""
hide_table_of_contents: false
image: img/blog/cloud-cost-guardrails-cicd/pull-request-filters-and-thresholds.png
date: "2023-02-23"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can now set cloud cost budget guardrails directly in CI/CD using the Infracost Cloud Guardrails. If a pull request exceeds a budget threshold, a custom notification is sent out; the PR can even be blocked till the budget has been approved.

<!--truncate-->

Cloud costs have traditionally been managed after money has been spent; our industry as a whole is reactive in this regard. In my last blog, I wrote about how [Infracost is changing this](https://www.infracost.io/blog/cloud-costs-in-jira/) by putting cloud cost estimates before resources are launched into CI/CD for engineers, and into Jira for product managers. This enables us to act before budgets are broken.

Engineers want to move fast, and companies are establishing [Platform Engineering](https://www.infracost.io/blog/infracost-gartner-cool-vendor-platform-engineering/) teams to enable self service. As this decentralised approach to infrastructure provisioning happens, cloud costs and budgets are not communicated to engineering teams. Naturally, engineers will use what they want, and budgets break. This is an important problem to solve.

Today, I’m excited to share Infracost Guardrails. 

With guardrails, product owners, Cloud Center of Excellence (CCoE), FinOps, and Platform teams can set central budget thresholds. As teams make changes to infrastructure, Infracost will calculate the cost impact of the change and if a threshold is exceeded, notifications are sent to predefined people and groups (via email, Slack, Microsoft Teams). The engineers are also informed of the budget threshold via custom messages in the pull request. If you are using our [GitHub App](https://www.infracost.io/docs/integrations/github_app/), you can also select to block the pull request until it has been approved (or overridden by an engineering lead in case of an emergency).

<img src={useBaseUrl("img/blog/cloud-cost-guardrails-cicd/pull-request-filters-and-thresholds.png")} alt="Cloud cost guardrails in Infracost Cloud"/>

If a pull request triggers a guardrail, you will also get an audit trail of when and where the guardrail was triggered, as well as how much money has been saved using that guardrail.

<img src={useBaseUrl("img/blog/cloud-cost-guardrails-cicd/cost-saving.png")} alt="Cloud cost guardrails money savings"/>

A customer recently told us about Azure [PowerBI Embedded](https://azure.microsoft.com/en-us/pricing/details/power-bi-embedded/) instances, where the cheapest instance starts at $735/month and it goes up to $23,500/month. Their engineering team was adding two of the cheapest instances, which costs $1500/month. Guardrails enabled the manager to review the change and check if two instances are really necessary; in this case it turned out that one instance was enough. This was a quick conversation between the engineer and their manager, and it saved the company $9000/year.

I’d love to invite you to try it now, and provide your feedback on where this feature should go next: [https://www.infracost.io/docs/infracost_cloud/guardrails/](https://www.infracost.io/docs/infracost_cloud/guardrails/)