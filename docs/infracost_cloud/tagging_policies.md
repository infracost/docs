---
slug: tagging_policies
title: Tagging policies
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::info
Coming soon! email [hello@infracost.io](mailto:hello@infracost.io) if you'd like early access.
:::

Tagging is fundamental to many FinOps capabilities and domains. FinOps team is responsible for defining tagging policies to enable tasks such as cost allocation and showback. Most companies write wiki pages to communicate tagging policies to engineering teams, but this does not scale to decentralized infrastructure provisioning, and cannot be enforced. AWS Service Control Policies (SCP) and Azure Policy are checked too late in the development process as they fail the deployment pipelines (`terraform apply` fails). This slows down the engineers as they need to create new pull requests, wait for another peer review and try to deploy again.

## Usage

1. **Create tagging policy**: Infracost enables FinOps, DevOps and Platform teams to codify their tagging policies, and enforce them in pull requests. You can define what tag keys are mandatory, which tag values are allowed, and make it easy for engineers to take action. You can also define resource-type specific policies (e.g. EC2 instances must have an operating-system tag).

2. **Infracost enforces policies**: When engineers create a pull request to change infrastructure, Infracost scans the code and checks the tagging policies. It notifies them immediately of any issues; the pull request comment (shown below) tells them exactly what file and line number they need to change to resolve the issue. This shifts-left on the tagging policy and results in the fastest possible feedback loop.

  <img src={useBaseUrl("img/infracost-cloud/tagging-policies/pull-request-comment.png")} alt="Tagging policies" />

3. **Analytics on policy coverage**: Infracost Cloud shows a central dashboard of percentage of resources that are following the tagging policies, and the pull requests that failed the policies so they can be tracked over time.
