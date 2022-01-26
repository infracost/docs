---
slug: cloud-cost-policies
title: "Cloud cost policies with Open Policy Agent and Sentinel"
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: You can now set proactive cloud cost policies with Open Policy Agent, Sentinel and Conftest.
hide_table_of_contents: false
image: img/blog/cloud-cost-policies/InfracostCloudCostPolicies.png
date: "2022-01-26T00:00:00Z"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

**Today, we are excited to release an integration between Infracost and Open Policy Agent (OPA), HashiCorp Sentinel and Conftest. This enables DevOps teams to set policies on cost estimates before resources are launched.**

<img src={useBaseUrl("img/blog/cloud-cost-policies/InfracostCloudCostPolicies.png")} width="100%" alt="Infracost OPA integration"/>

<!--truncate-->

<br /><br />

Today, we are excited to release an integration between Infracost and Open Policy Agent (OPA), HashiCorp Sentinel and Conftest. This enables DevOps teams to set policies on cost estimates before resources are launched. For example, you can write three policies to provide guardrails: if the changes to Terraform increase the total cost more than 15%, or the instance cost per hour increases more than $2/hour or if the IOPS cost more than the instances, then the change needs to be approved by the team lead.

This feature is a great addition to your developer workflow. It enables self-service of infrastructure for your team and the wider engineering organization by creating the guardrails needed to stay within an acceptable cloud infrastructure budget. Everyone wants to make the right choice, but it’s hard to choose between services without cost information. As one of our users put it: if you tell the team we need to get from point A to B, then offer them a Ford or a Ferrari with no price tag, guess what? Most people will choose the Ferrari.

<img src={useBaseUrl("img/blog/cloud-cost-policies/fordvsferrari.png")} width="100%" alt="Infracost OPA integration"/>

Many companies have been using after-the-fact alerts and cloud cost management reports from their cloud providers and 3rd parties, but ask any engineer and they will tell you that it is distracting, hard and time-consuming to retro fix infrastructure after something has gone to production. You need to catch costly components earlier in the process, ideally in Continuous Integration / Continuous Delivery (CI/CD) as part of the code review process.

Infracost is an open source project which sits in the CI/CD pipeline and combined with policy engines can provide these guardrails at the right time, directly in the developer workflow. Here is an end to end demo of the Infracost and Open Policy Agent integration:

<iframe width="90%" height="350" src="https://www.youtube.com/embed/1rMIfebfd8M" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>

<br /><br />

You can get this up and running using our policy example in less than 15 mins, start here: [Infracost Docs](https://www.infracost.io/docs/features/cost_policies/)

This capability is also live in our partner products: [Env0](https://docs.env0.com/docs/custom-flows); [SpaceLift](https://docs.spacelift.io/vendors/terraform/infracost); [Scalr](https://docs.scalr.com/en/latest/opa.html#using-opa-in-scalr);
