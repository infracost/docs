---
slug: infracost-cloud-costs-for-devs
title: "Infracost - cloud costs for devs"
author: Alistair Scott
author_url: https://twitter.com/aliscott
author_image_url: /img/avatars/alistair.jpg
description: Infracost, our open source project, helps developers and DevOps engineers get cloud cost estimates from their Terraform code.
image: /img/blog/infracost-cloud-costs-for-devs/infracost_example.png
hide_table_of_contents: true
date: "2020-08-17T00:00:00Z"
---

[Infracost](https://github.com/aliscott/infracost) helps developers and DevOps engineers get cost estimates from their IaC (Infrastructure as Code). Here's an example of it running:

[![Infracost example](/img/blog/infracost-cloud-costs-for-devs/infracost_example.png)](https://asciinema.org/a/353843)

The complexity of cloud costs keeps increasing - When we were building PlanForCloud in 2012 AWS had just hit 10,000 different pricing points for their services - now there are over 300,000.

We found existing tools fit in too late in the process and are not aimed at the people in control of the infrastructure. It's difficult to get cost estimations when you are building and deploying your services, which often leads to bill shock and no easy way to track down these costs. So we wanted to build a CLI tool that can plug into your existing development and operations processes and bring cost visibility to the engineers.

Currently Infracost supports AWS and Terraform, but we will add support for more cloud vendors ([GCP](/docs/supported_resources#google-cloud-platform-gcp), [Azure](https://github.com/infracost/infracost/issues/64)) and other IaC tools ([Pulumi](https://github.com/infracost/infracost/issues/187)).

**Update 25 Nov 2020 : We have now added initial support for Google cloud.**

We also want to go beyond just the baseline costs of infrastructure - data transfer costs and other usage-based costs can often be a significant portion of a cloud bill, and are also the hardest to predict and track down. If you have any ideas about the best way to handle these then please [reach out to me on Twitter](https://twitter.com/aliscott).

Infracost is open source, you can check it out at [https://github.com/infracost/infracost](https://github.com/infracost/infracost).
