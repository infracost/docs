---
slug: native-cost-policies
title: "New cost policies: catch mistakes and budget-breaking changes in CI"
author: Ali Khajeh-Hosseini
author_url: https://twitter.com/alikhajeh
author_image_url: /img/avatars/ali.jpg
description: Build guardrails for engineering team with Infracost's native Open Policy Agent support.
hide_table_of_contents: true
image: img/screenshots/policy-failure-github.png
date: "2022-03-15"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Cost policy checks are now reported directly inside pull request comments! **Native integration with Open Policy Agent simplifies writing policies** that are checked before resources are launched.

<!--truncate-->

I love shipping fast! And to ship fast, as engineers we usually automate things:
- unit tests quickly tell me if my change broke something.
- linting tools quickly tell me about obvious errors and coding standard mishaps.
- security scanning tools quickly tell me if there are potential issues in my code.

The key benefit of these guardrails is that they **fit into my workflow and tell me something I didn't know**. And I like that because the earlier I know about issues, the easier they are to fix.

<div className="img-box">
  <img
      src={useBaseUrl("img/screenshots/policy-failure-github.png")}
      alt="Example cost policy failing in GitHub Actions"/>
</div>

Cost policies enable you to do the same with cloud costs; engineering teams need confidence to **ship fast** without slowing down to check things manually, for example:
- *Am I making any mistakes?* Many users have told us about cases when they saw an unexpected cost estimate when using Infracost. There are 3 million price points between AWS, Azure and Google; it's easy to make mistakes with this amount of complexity. Just like unit tests, policies enable you to write your own <span style={{color: 'green'}}><strong>pass</strong></span> or <span style={{color: 'red'}}><strong>fail</strong></span> checks. For example, if a pull request increases the cost estimate by $1000, add a note so I review it in details; 80% of the time, this won't kick-in so I ship fast with confidence, I'm looking to flag that 20%.
- *Am I within the cloud budget?* Instead of asking management or FinOps about the budget for a product/project, we can code that in a policy file and check it automatically in CI/CD. If the budget is already set in cloud accounts, we can fetch/check it dynamically before deploying changes.

  <img src={useBaseUrl("img/blog/native-cost-policies/giphy.gif")} alt="Ship fast!" width="600" height="300" />

Back in January [we announced](/blog/cloud-cost-policies/) integration with various policy engines like Open Policy Agent (OPA) and HashiCorp Sentinel. That enabled teams to write policies but the integration was not easy and the output was hidden in CI/CD logs.

Today we're excited to release Infracost [v0.9.20](/docs/#1-install-infracost) that includes native integration with OPA! You can now evaluate cost policies written in OPA's policy language (Rego) directly through the Infracost CLI, and see the output inside pull request comments.

Check out the following video for a guided tour of this new feature and read [our docs](/docs/features/cost_policies/) to get started. Contribute to [this GitHub issue](https://github.com/infracost/infracost/issues/1472) if you have feedback about the policy behaviors.

<iframe width="90%" height="350" src="https://www.youtube.com/embed/jFv9Gi_Vfyo" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
