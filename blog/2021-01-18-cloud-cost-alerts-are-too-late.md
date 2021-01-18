---
slug: cloud-cost-alerts-are-too-late
title: 'Cloud cost alerts are too late: trigger notifications before launching'
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: Cloud cost estimates in pull requests with thresholds.
image: /img/blog/the-prius-effect-for-cloud-costs/infracost-pull-request.png
hide_table_of_contents: true
Date: "2021-01-18T00:00:00Z"
---

Most cloud providers enable users to set budget alerts on their actual cloud spend. This is a critical safety net as usage-based resources could incur a lot of cost (e.g. data transfer). There is also another safety net that companies should set up, and that is catching significant cost changes to their infrastructure before going live. For example, finding out how much increasing the RAM for a Lambda function costs before putting the new function into production. Usage estimates can also be considered during cost estimation.

[Infracost](https://github.com/infracost/infracost) is an open source tool that can be put into CI/CD pipelines (GitHub, GitLab, CircleCI, Bitbucket and Atlantis…) and will leave a comment with the cloud cost implications of changes to your infrastructure-as-code: "this change to your terraform file will increase your cloud bill by 25% next month".

In some cases, you may only want an Infracost comment when a threshold is reached. For example, if the cost implications of the change are minor (e.g. under 3%), then no comment is needed. We have now added this ability into Infracost - from our [CI/CD integration docs](https://www.infracost.io/docs/integrations/), select your CI system, and set the `percentage_threshold` flag.

We hope Infracost can help your enterprise become more cost-aware when it comes to cloud spend, and maybe we can help reduce that 30% cloud waste! <sup>[1]</sup>

As always, if you have any feedback, add an issue to our [GitHub repo](https://github.com/infracost/infracost), join our [community Slack channel](https://www.infracost.io/community-chat), or reach out to me directly on Twitter: [@hassankhosseni](https://twitter.com/hassankhosseini).

\[1\] [Flexera 2020 State of the Cloud Report](https://info.flexera.com/SLO-CM-REPORT-State-of-the-Cloud-2020)
