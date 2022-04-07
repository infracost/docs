---
slug: terraform-runtasks-what-why-how
title: "Terraform RunTasks: The What, Why and How"
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: Hashicorp Terraform RunTasks enables third party tools to plug into Terraform Cloud
hide_table_of_contents: false
image: img/blog/terraform-runtasks/terraform-runtasks-partners.png
date: "2022-04-07T00:00:00Z"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In September 2021, Hahshicorp announced a beta feature called Terraform RunTasks. In this blog, I’d like to give the why, how and what of this feature as well as which tools currently work with it.

<a href="/blog/terraform-runtasks-what-why-how/"><img src={useBaseUrl("img/blog/terraform-runtasks/terraform-runtasks-partners.png")} alt="Hashicorp Terraform RunTasks: what, why, how and partners"/></a>

<!--truncate-->

### What is Terraform RunTasks
Terraform RunTasks is a way to plug-in 3rd party tools directly into the Terraform Cloud workflow so that additional checks can be done on your TF code without leaving the dashboard. RunTasks sits between the Plan stage, when the previous and new state of all resources is evaluated, and the Apply stage, when the changes to the resources are actually carried out.

### Why Terraform RunTasks
RunTasks is beneficial for both Hashicorp and the ecosystem. Hashicorp can become the platform where all Infrastructure as Code (IaC) changes can be made, reviewed and applied. These include security, costs and other policy checks. And the ecosystem can benefit by helping more users with the features and products they have built.

### Prerequisites and requirements
The RunTasks feature needs to be enabled for your Terraform organization, and for that you will need the ‘organization owner’ permission; then the RunTask has to be enabled for a Terraform Cloud workspace, which will require the ‘workspace administrator’ permission.

Note also that RunTasks is currently a feature within Hashicorp’s paid Terraform products (Terraform Cloud; and coming soon to Terraform Enterprise).

### How does Terraform RunTasks work

During the setup between Terraform Cloud and the 3rd party tool, a hook endpoint URL and a HMAC key are set (used to verify the data integrity and authenticity of messages). When a RunTask is triggered, a call is made to the endpoint to establish a connection, and once an HTTP ‘200 OK' is received, the plan JSON can be fetched by the 3rd party tool (see the [RunTasks API docs](https://www.terraform.io/cloud-docs/api-docs/run-tasks-integration) for more details). The 3rd party then can send back the results, including a message, a passed or failed status, and a URL for more information. These details are then in turn shown to the end user within Terraform Cloud.

<img src={useBaseUrl("img/blog/terraform-runtasks/terraform-runtasks-screenshot-cost.png")} alt="Hashicorp Terraform RunTasks screenshot cost run"/>

### What can I do with Terraform RunTasks

The overall aim of RunTasks is to enable external checks and validations on your Terraform changes before you hit apply. Things like ‘How much will this change increase our cloud costs by’ (Infracost plugin), or ‘am I introducing any security issues or vulnerabilities with this change’ (Snyk plugin). As the product and the ecosystem matures, I’m sure many more integrations will become available.

The current integration partners are:

- **[Infracost](https://www.infracost.io/)** - Shows how your code changes will impact cloud costs, like “This change will increase your cloud bill by 20% next month” with a link to the detailed pricing of each resource being changed. See the [Infracost RunTasks docs](/docs/integrations/terraform_cloud_enterprise/#terraform-cloud-run-tasks) to get started.
- **[Snyk](https://snyk.io/) & [Bridgecrew](https://bridgecrew.io/)** - Shows security issues and misconfigurations.
- **[Kion](https://kion.io/)** - Cloud management (provisioning, integrations) and governance controls.
- **[Lightlytics](https://www.lightlytics.com/)** - Security checks and additional dependency changes in a visual format.
- **[Moderne](https://moderne.io/)** - Applies recommendations to your code to keep them within best practices.
