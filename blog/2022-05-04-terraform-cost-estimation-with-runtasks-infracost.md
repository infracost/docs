---
slug: terraform-cost-estimation-with-runtasks-infracost
title: "HashiCorp Terraform Cost Estimation with Infracost and Run Tasks now GA"
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: Get Terraform Cost Estimation directly in Terraform Cloud using Run Tasks with Infracost
hide_table_of_contents: false
image: img/blog/terraform-cost-estimation-with-runtasks-infracost/hashicorp-terraform-official-partner.png
date: "2022-05-05"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Today, I’m super excited to announce, alongside our partner HashiCorp, that we have launched a direct integration into Terraform Cloud using the new Terraform run tasks feature.


<!--truncate-->
<a href="/blog/terraform-cost-estimation-with-runtasks-infracost"><img src={useBaseUrl("img/blog/terraform-cost-estimation-with-runtasks-infracost/hashicorp-terraform-official-partner.png")} alt="Hashicorp Terraform Run Tasks now generally available to all"/></a>

We started Infracost to show engineers how their Infrastructure as Code changes will impact cloud costs before anything goes to production. It felt unfair not to have a ‘checkout screen’ for developers because when budgets were breached, they would not only be blamed but also be tasked with bringing costs down (again, with no indication of whether their changes are having the right cost impact).

We didn’t want to create something that would slow engineers down. They want to ship great and efficient products fast. So we brought costs directly into the workflow by integrating into CI/CD systems. Infracost now leaves a comment like ‘this change will increase your costs by 15% next month’ with a detailed breakdown.

Today, I’m super excited to announce, alongside our partner HashiCorp, that we have launched a direct integration into Terraform Cloud using the new Terraform run tasks feature. If you are using Terraform Cloud, you can show everyone a cost estimate of the infrastructure changes without leaving the TFC dashboard. The setup takes 3 minutes.

### The 3 minute setup - start here

1. Log into [Terraform Cloud](https://app.terraform.io) > go to Settings (top menu) > Run tasks (left menu) > Create run task (button top right).

<img src={useBaseUrl("img/blog/terraform-cost-estimation-with-runtasks-infracost/runtasks-step1.png")} alt="step 1 - Create a Terraform Run Task"/>

2. Log into [Infracost Cloud](https://dashboard.infracost.io/tfc-sign-up) > go to Integrations > Terraform Cloud > Enable.

<img src={useBaseUrl("img/blog/terraform-cost-estimation-with-runtasks-infracost/runtasks-step2.png")} alt="step 2 - Create an Infracost API key"/>

3. Enter the Endpoint URL and the HMAC key from step 2 into Terraform Cloud (step 1).  Give the Run Task a name like ‘Infracost cost estimation’.

4. Now we need to add a Run Task to a Workspace in Terraform Cloud, so go to Workspaces (top menu) > select your workspace > Settings > Run Tasks, and click the (+) button next to the ‘Infracost cost estimation’ Run Task that you just created.

<img src={useBaseUrl("img/blog/terraform-cost-estimation-with-runtasks-infracost/runtasks-step3.png")} alt="step 3 - Add Run Tasks to workspaces"/>

5. Select ‘Advisory’ as the enforcement level - this means that the cost estimation does not block a run from competing. Infracost does not yet support Mandatory enforcement in which a run can be blocked due to increased costs, but this will be a feature in the future.

6. Click Create. That’s it. You are now showing everyone how the TF code changes will impact cloud costs. You can now add Infracost to as many workspaces as you like.

You can get up and running with Terraform Run Tasks and Infracost within a few minutes. Here is a live walkthrough of Terraform Run Tasks with Infracost:

<iframe width="90%" height="350" src="https://www.youtube.com/embed/UVAadtvsYSk" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
