---
slug: show-costs-in-self-service-portals-easily
title: 'Show costs in self service portals easily'
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: Show cloud cost estimates in enterprise self service portals.
image: img/blog/show-costs-in-self-service-portals/self-service-portal.png
hide_table_of_contents: true
date: "2021-02-01"
---

Over the last 10 years we’ve seen a lot of shadow IT with AWS being used as the infrastructure provider. The AWS bills were put on company credit cards and expensed. Individual business units could spin up the resources they needed and work in an incredibly agile manner. Unfortunately, for the enterprise as a whole this resulted in shadow spend, less control and security issues. To address these issues, central IT departments built “Self Service” portals with single sign-on (SSO). Business units could still spin up resources as needed, and the enterprise gained some visibility and control.

<!--truncate-->

This caused a new issue. When successful shadow IT projects started consuming more resources, bills went up until the company credit card limits were reached. Then someone would have to go up the ranks to figure out what rules the business unit broke and how to solve it going forward. Self service portals addressed the credit card limit issue by enabling usage, and adding showback and chargeback via spend reports at the end of the month. Optimization was left to the end user to figure out after getting the bill.

A great way to help the end user optimize cloud costs before the showback/chargeback report is to let them see how much resources cost *before* they are launched. Multiple enterprises have achieved this with Infracost, and I want to share how:

![Self Service Portal](/img/blog/show-costs-in-self-service-portals/self-service-portal.png)

#### 1. Show costs in your self service portal to the end user
The first step is to show cost estimates in your self service portal. If you are using Terraform to launch resources, this is easy to do by integrating with Infracost. Read our [API documentation](https://www.infracost.io/docs/integrations/infracost_api) for more information. Infracost is free and open source.

#### 2. Set expectations in management and finance
The next step is to set expectations by giving visibility of the cost estimates to management and finance. You can use our [HTML output reports](https://www.infracost.io/blog/terraform-cloud-costs-directly-from-pull-request-to-management) to achieve this.

#### 3. Monitor ongoing costs
Finally, set up alerts and reports for ongoing costs. There are many companies who can help with this, including the cloud providers themselves.

<br/>

Our users have connected their self service portal in a matter of hours. Their end users immediately begin seeing cost estimates. You can start using [Infracost now](https://www.infracost.io/docs/), or email us for a deeper engagement with our team (hello@infracost.io).
