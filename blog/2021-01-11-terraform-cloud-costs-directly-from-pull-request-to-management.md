---
slug: terraform-cloud-costs-directly-from-pull-request-to-management
title: Terraform cloud costs directly from pull request to management
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: Give direct cloud access to DevOps teams, and get cloud cost estimates to the team leads and management.
image: /img/blog/terraform-cloud-costs-directly-from-pull-request-to-management/infracost_html_output.png
hide_table_of_contents: true
date: "2021-01-11"
---

Last week I wrote about [giving cloud cost estimates to DevOps teams via pull requests](/blog/the-prius-effect-for-cloud-costs) as they make changes to infrastructure components. The hope is to create a “Prius Effect” for cloud costs:  it was observed that many Prius drivers would drive more efficiently simply because they were presented with immediate feedback on the Prius dashboard.

In this blog, I'd like to answer a question that a user posed to us:
>We need to know when significant budget changes are expected so we can plan for them before the money is spent. Billing alerts help us react to unexpected changes but they still can be a surprise. My DevOps now have costs in pull requests. What about my team leads and managers? They can’t go through every pull request to see what the cost changes are.

When you have a single engineer with access to change infrastructure a simple discussion about significant cost changes will suffice. Once your team grows to multiple engineers or multiple teams a process can really help.

Infracost now has a new `infracost report` command which generates a table or HTML report from multiple Infracost JSON files. The output shows a breakdown of all the cost information in a straightforward format alongside tags. You can then upload these reports to AWS S3 and share them with management and team leads.

Example command:
```
infracost --terraform-dir /path/to/module1 --format json > module1.json
infracost --terraform-dir /path/to/module2 --format json > module2.json

infracost report --format html "module*.json" > report.html
```

This is the output you'd get in HTML format. Notice that the filename and all tags are shown:
![Infracost output in HTML format](/img/blog/terraform-cloud-costs-directly-from-pull-request-to-management/infracost_html_output.png)


This is our first solution to this use-case. I'd love to hear your feedback so we can iterate on it and improve it! This is available now. Please see our [Infracost Docs: Report](/docs/#report) section for usage instructions.

If you have any feedback add an issue to our [GitHub repo](https://github.com/infracost/infracost), join our [Community Slack channel](https://www.infracost.io/community-chat), or reach out to me directly on Twitter: [@hassankhosseni](https://twitter.com/hassankhosseini).
