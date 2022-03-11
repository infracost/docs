---
slug: native-cost-policies
title: "Announcing cost policies inside pull request comments!"
author: Ali Khajeh-Hosseini
author_url: https://twitter.com/alikhajeh
author_image_url: /img/avatars/ali.jpg
description: Build guardrails for engineering team with Infracost's native Open Policy Agent support.
hide_table_of_contents: true 
image: img/blog/cloud-cost-policies/InfracostCloudCostPolicies.png
date: "2022-03-14T00:00:00Z"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

**Cost policy checks are now reported directly inside pull request comments! Our new native integration with Open Policy Agent simplifies writing cost policies that are checked before resources are launched.**

<!--truncate-->

I love cost policies! They give engineering teams confidence to **ship fast** without slowing down to check thingsgi manually, for example:
- *Am I within the cloud budget?* Instead of asking management or FinOps about the budget for a product/project, we can code that in a policy file and check it automatically in CI/CD. If the budget is already set in cloud accounts, we can fetch/check it dynamically before deploying changes.
- *Am I making any mistakes?* Many users have told us about cases when they saw an unexpected cost estimate when using Infracost. There are 3 million price points between AWS, Azure and Google; it's easy to make mistakes with this amount of complexity. Policies enable you to write <span style={{color: 'green'}}><strong>pass</strong></span> or <span style={{color: 'red'}}><strong>fail</strong></span> checks and catch mistakes in the development workflow: the earlier we catch mistakes, the easier they are to fix.

  <img src={useBaseUrl("img/blog/native-cost-policies/giphy.gif")} alt="Ship fast!" width="600" height="300" />

Back in January [we announced](/blog/cloud-cost-policies/) integration with various policy engines like Open Policy Agent (OPA) and HashiCorp Sentinel. That enabled teams to write policies but the integration was not easy and the output was hidden in CI/CD logs.

Today we're excited to release Infracost [v0.9.20](/docs/#1-install-infracost) that includes native integration with OPA! You can now evaluate cost policies written in OPA's policy language (Rego) directly through the Infracost CLI, and see the output inside pull request comments:

<div className="img-box">
  <img 
      src={useBaseUrl("img/screenshots/policy-failure-github.png")} 
      alt="Example cost policy failing in GitHub Actions"/>
</div>

<iframe width="90%" height="350" src="https://www.youtube.com/embed/jFv9Gi_Vfyo" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>

<br/><br/>

Check out the above video for a guided tour of this new feature and read [our docs](/docs/features/cost_policies/) to get started.
