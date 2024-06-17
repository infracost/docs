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

### Customizable policies

Infracost provides several policies (for AWS, Azure, and GCP) that enable FinOps teams to encourage or enforce the regions and instance types that engineers should use. This is useful for a number of reasons depending on your organizations goals, and is therefore customizable via each policy's settings page.

#### Using preferred regions
In many cases, enterprises want to encourage their engineers to use specific cloud regions. For example, some enterprises want to encourage [low CO2 Google Cloud regions](https://cloud.google.com/sustainability/region-carbon), and others want to only allow certain AWS or Azure regions due to compliance reasons.

To set this up, go to Infracost Cloud > Governance > FinOps policies > Inactive tab and click on the "General - consider using preferred regions" policy. You can enter the list of regions that you'd like to encourage engineers to use, and whether pull requests that fail this policy should be blocked or not.

#### Using preferred instance types
Many enterprises have Reserved Instances, Savings Plans or Committed Use Discounts. In all three cases, these are limited to specific regions and instance types or families. It is often useful to encourage or limit engineers to the instance types that your organization has standardized upon for cost savings purposes.

To set this up, go to Infracost Cloud > Governance > FinOps policies > Inactive tab and click on the "General - consider using preferred instance types" policy. You can specify any number of region/instance type or family pairs to allow as shown in the screenshot below. One pair should be specified per line, with each region and instance type separated by a colon. Wildcards (`*`) can be used to match any region or instance type, on a full or partial basis.

<img src={useBaseUrl("img/infracost-cloud/finops-policies/preferred.png")} alt="Preferred instance types are configurable via the policy settings page." />

You can override wildcard settings with more specific ones. For example, adding the pair `*:t1.micro` will allow the use of `t1.micro` instances in all regions, but adding the more specific pair `us-west-2:t2.micro` will override this, meaning only `t2.micro` instances can be used in the `us-west-2` region, but `t1.micro` instances can still be used in all other regions.
