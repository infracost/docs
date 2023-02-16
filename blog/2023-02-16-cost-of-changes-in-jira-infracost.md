---
slug: cloud-costs-in-jira
title: "Cloud costs directly in Jira"
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: "Infracost can now be integrated into Jira, showing the cost impact of feature requests to product managers"
hide_table_of_contents: false
image: img/blog/cost-changes-in-jira/infracost-jira.png
date: "2023-02-16"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can now show the cloud cost impact of feature requests to Product Managers and Owners directly in their workflow, before features are shipped to production.

<!--truncate-->

#### Overview

Cloud costs are hard to understand due to the complex pricing models used by the cloud providers. If cloud pricing was easy to understand it would be easier to forecast, which would make it easier to budget and track costs against that budget.

When budgets are broken, engineering is usually blamed for not taking action to reduce cloud costs. This is unfair – one of the reasons the budget broken is exactly the opposite; engineers took action to build features, tools and capabilities, which require more cloud resources, which is incredibly complex to estimate costs for, which after being shipped to production broke the pre-set budget.

Instead of blaming engineers for breaking the budget, we should look at where the budget number came from in the first place.  In a typical company, it is set by a cross-functional team of managers from engineering, product, finance, and execs.  They rely on tools that “slice and dice” cloud bills to help them guess where money will be spent in the future. Unfortunately, because they can only show past costs, any budgeting approach relying exclusively on cloud bills is fundamentally reactive: They can’t reflect the costs of newly delivered features and capabilities.

#### Shift Cloud Costs Left

We believe our industry can and should be more proactive when it comes to budgeting cloud costs.  A growing army of more than [8000 engineers agree.](https://github.com/infracost/infracost/stargazers)

[Infracost](https://www.infracost.io/) is a free open source tool which sits in the engineering workflow (CI/CD). When infrastructure code changes, before the code is shipped live, it shows the engineers how much those changes will cost: e.g. ‘This change will increase costs by $500 per month’ with a detailed breakdown.

Once engineers know how much their infrastructure changes will cost, they can show their product managers and product owners how much their new feature will cost. The team can then decide to ship it to production, work on it to reduce costs, or set expectations with finance that more budget is needed. This is all proactive, not reactive after budgets break.

I’m super excited to announce the [Infracost Jira integration](https://www.infracost.io/docs/infracost_cloud/jira_integration/). Engineers can keep building features, and see cost estimates in the CI/CD.  These estimates are pushed directly into Jira under the relevant issue so that product teams can see the cost impact of each feature they have requested. This is a bidirectional connection, meaning you can see cloud cost estimates in Jira and also filter by Jira issues in Infracost Cloud to see the Pull Requests which went into building the capability. If there are many PRs for a Jira issue, they are all summed up and sent to Jira. I’d love to invite you to try it now, and provide your feedback on where this feature should go next: [https://www.infracost.io/docs/infracost_cloud/jira_integration/](https://www.infracost.io/docs/infracost_cloud/jira_integration/)

<img src={useBaseUrl("img/blog/cost-changes-in-jira/cloud-costs-in-jira.png")} alt="Cloud Costs directly in Jira"/>