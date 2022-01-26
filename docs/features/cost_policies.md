---
slug: cost_policies
title: Cost policies
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost can be integrated with [Open Policy Agent](https://github.com/open-policy-agent/opa) (OPA), [HashiCorp Sentinel](https://www.hashicorp.com/sentinel) and [Conftest](https://github.com/open-policy-agent/conftest/). This enables DevOps teams to set policies on cost estimates before resources are launched. You can write policies to provide guardrails and ask a team lead to review changes that, for example:
- Increase costs by more than 15%.
- Increase per hour instance costs to more than $25/hour.
- Result in provisioned IOPS to cost more than the instances.
- Any combination of resource types, provisioning parameters, cloud regions, costs, percentages etc!

<img src={useBaseUrl("img/screenshots/cost-policy-fail.png")} alt="Example cost policy failing in GitHub Actions" />

### Benefits of cost policies

Cost policies enable self-service of infrastructure for your team and the wider engineering organization by creating the guardrails needed to stay within an acceptable cloud infrastructure budget. Everyone wants to make the right choice, but it's hard to choose between services without cost information. As one of our users put it: if you tell the team we need to get from point A to B, then offer them a Ford or a Ferrari with no price tag; most people will choose the Ferrari.

Many companies have been using after-the-fact alerts and cloud cost management reports from their cloud providers and 3rd parties, but ask any engineer and they will tell you that it is distracting, hard and time-consuming to retro fix infrastructure after something has gone to production. You need to catch costly components earlier in the process, ideally in CI/CD as part of the code review process.

### Quick start

Infracost has a [JSON format](/docs/features/cli_commands/#usage) that can be used by policy tools to create cost policies. The following examples show how this could be done with GitHub Actions, GitLab CI and Atlantis. The same can be achieved with other CI/CD tools:
  - [GitHub Actions](https://github.com/infracost/actions#cost-policy-examples)
  - [GitLab CI](https://gitlab.com/infracost/infracost-gitlab-ci#cost-policy-examples)
  - [Atlantis](https://github.com/infracost/infracost-atlantis/tree/master/examples/conftest)
  - [Azure DevOps](https://github.com/infracost/infracost-azure-devops#cost-policy-examples)

Here is an end to end demo of the Infracost and Open Policy Agent integration:

<iframe width="90%" height="450" src="https://www.youtube.com/embed/1rMIfebfd8M" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
