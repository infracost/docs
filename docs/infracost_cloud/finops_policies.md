---
slug: finops_policies
title: FinOps policies
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost enables you to pro-actively check FinOps best practices in the engineering workflow, before you deploy infrastructure code. This approach boosts developer productivity by providing quick feedback and encouraging the creation of efficient infrastructure code from the outset, removing the need for post-deployment revisions. Additionally, it spares FinOps teams from the continual effort of urging engineers to adhere to best practices, thereby preventing significant amounts of money being wasted in the cloud.

<img src={useBaseUrl("img/infracost-cloud/finops-policies/policies.png")} alt="Infracost includes many AWS, Azure and Google FinOps policies out of the box" />

## Usage

This section assumes you have already setup the Infracost source control integration with [GitHub or GitLab](/docs/integrations/cicd/#source-control-integrations-recommended) (or added Infracost to your CI/CD pipeline).

## 1. See policy failures on repos

Once you've connected a repo to Infracost, it scans your code and checks for over **50 AWS, Azure and Google** FinOps policies out of the box. This gives you immediate analytics on how well you're following the best practices.

Go to the Visibility > Repos page to see which FinOps policies the repo is failing on; for example, the following screenshot shows a repo that is failing 3 policies. The file and line numbers are also shown with a suggested fix so engineers can easily take action.

<img src={useBaseUrl("img/infracost-cloud/finops-policies/repo-page.png")} alt="See all FinOps and Tagging policy failures for each repo" />

## 2. Analytics on policy coverage

The Governance > FinOps page shows the status of all policies (screenshot on top of this page), and which policies have the highest number of failing resources. A weekly chart showing the percentage of applicable resources passing FinOps policies is also shown on this page. This shows how well you're progressing on implementing FinOps best practices across all of your repos over time.

<img src={useBaseUrl("img/infracost-cloud/finops-policies/coverage-chart.png")} alt="Infracost Cloud shows you the percentage of resources that are passing your FinOps policies." />

## 3. Test pull requests

When engineers create a pull request to change infrastructure, Infracost scans the code and checks the FinOps policies against all changed resources. Infracost shows the best practices alongside an explanation of why it's important to consider implementing the change. Infracost also shows the exact file and line numbers that need to be changed if the engineer chooses to implement the change. This shifts-left on FinOps policies and results in the fastest possible feedback loop.

<img src={useBaseUrl("img/infracost-cloud/pull-request-comment.png")} alt="Create a pull request to test FinOps policies." />

<img src={useBaseUrl("img/infracost-cloud/finops-policies/pr-comment-expanded.png")} alt="The pull request comment shows exactly what file and line number need to be updated to fix the issue." />

## 4. Update policy settings

From the Governance > FinOps page, you can click on the details of any policy and update its settings. These settings include the option to block requests that fail the policy, and the ability to customize the message shown to engineers in pull requests. This is useful if you need to customize the message to recommend your company's specific policy or a link to internal wiki pages where engineers can learn more.

You can also define whether a policy should trigger only when new resources are being added. This is useful when changing an existing resource, such as a database's instance type, requires downtime and thus you prefer engineers to not do that within their existing open pull request.

<img src={useBaseUrl("img/infracost-cloud/finops-policies/policy-settings.png")} alt="Each policy has settings that can be updated to enforce it in pull requests or customize the message shown in the pull request." />
