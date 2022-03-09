---
slug: native-cost-policies
title: "Announcing native OPA cost policies with Infracost"
author: Hugo Rut
author_url: https://twitter.com/hugo_rut
author_image_url: /img/avatars/hugo.jpg
description: Build easier guardrails for your team with Infracost's new builtin OPA support.
hide_table_of_contents: true 
image: img/blog/cloud-cost-policies/InfracostCloudCostPolicies.png
date: "2022-03-09T00:00:00Z"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

**Today, we are excited to announce our native support for OPA policy language, Rego. This simplifies writing robust cost policies against your team's infrastructure changes. Policy checks are now reported directly into your PR comments!**

<div className="img-box">
  <img 
      src={useBaseUrl("img/screenshots/policy-failure-github.png")} 
      alt="Example cost policy failing in GitHub Actions"/>
</div>

<!--truncate-->


At Infracost we love cost policies! Policies enable you to write rules for your team so that they stay within an acceptable budget. This means you have protections against costly infrastructure changes **before your deploy the resources**. Policies give your team the confidence they need to ship fast. 

<iframe src="https://giphy.com/embed/cOFB74VjN0OqvRmJGK" width="600" height="300" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

<br /><br />

Back in January [we announced](/blog/cloud-cost-policies/) improvements to Infracost to allow users to integrate infracost with various policy providers like OPA & Hashicorp Sentinel. Since then, we've been hard at work making it easier for users to add cost policies into their pipelines.

Today we've released a tighter integration with [OPA](https://www.openpolicyagent.org/). This enables users to write cost policies in [OPA's policy language](https://www.openpolicyagent.org/docs/latest/policy-language/), Rego, and evaluate policy rules directly through Infracost!

Evaluated policies will be added **directly into the Infracost comment body**. Giving you and your team the visibility they need to make informed decisions quickly. Check out the video below for a guided tour of this new feature:

<iframe width="90%" height="350" src="https://www.youtube.com/embed/1rMIfebfd8M" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>

<br /><br />

Integrate cost policies into **your pipeline today**. Read our [docs](https://www.infracost.io/docs/features/cost_policies/) to get started and then write your own policy rules using our [OPA playground](https://play.openpolicyagent.org/p/o1MLyC74CJ).