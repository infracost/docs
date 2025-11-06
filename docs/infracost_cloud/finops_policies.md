---
slug: finops_policies
title: FinOps policies
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The [cloud cost optimization formula](https://www.infracost.io/blog/cloud-cost-optimization-formula/) has a _usage_ and a _unit price_ that contributes to your cloud bill. The usage component of that formula is fully dependent on engineering teams taking action to change the usage, whereas the unit price can be done in a centralized manner via FinOps tasks such as purchasing reserved instances.

Tackling waste requires engineering involvement at every level. FinOps policies give you a way to prioritize, organize, and fix issues at the source. It's more than just reporting waste; it empowers engineers to take direct action in _their_ workflows.

FinOps policies make waste reduction of the usage a team-wide, actionable process. No meetings or Jira tickets, just a streamlined approach to cut unnecessary costs from day one.

## Usage

### 1. Two steps to cut waste

1. **Seal the leaks.** With cloud resources controlled by infrastructure-as-code, adding waste-reducing policies directly into CI/CD workflows is the best way to stop problems before they start.
2. **Burndown existing issues.** The best way to do this is to empower engineering teams to action waste within _their_ code and workflow, by pinpointing the exact files and lines they need to change.

<img src={useBaseUrl("img/infracost-cloud/finops-policies/chart.png")} alt="FinOps policies provide a streamlined approach to cut unnecessary costs from day one." />

### 2. Use policies to drive action, not meetings & Jira tickets

Too often, waste reports lead to long meetings and endless Jira tickets. FinOps policies flip the script with an actionable, streamlined approach. It identifies which of the 70+ AWS, Azure, and Google best practices from the Well-Architected Frameworks aren’t being followed. From there, FinOps teams can decide which policies are most critical to their organization, picking the top 3-5 to focus on each quarter.

Once priorities are set, Infracost takes care of the rest: FinOps teams simply enable pull request comments for those selected policies, and Infracost automatically checks all pull requests against them. Engineers can then focus on fixing these high-priority issues directly in their code, reducing waste without the need for extra meetings or task-tracking.

<img src={useBaseUrl("img/infracost-cloud/finops-policies/policies.png")} alt="See all FinOps and Tagging policy failures for each repo" />

### 3. Track your improvements in real time

Results matter, and we made sure Infracost makes it easy to track wins. Here’s a snapshot of a customer's progress on their tagging policy:

- **Proactive prevention:** Out of 8.1K new issues since July 1, 80% (6.5K) were prevented before the code was merged.
- **Burning down the backlog:** The team has resolved 41% (39K) of existing tagging issues since July, which translates to 13K fixes per month. At this pace, they’re on track to clear-out all 55K remaining issues in four months!

<img src={useBaseUrl("img/infracost-cloud/finops-policies/burndown-chart.png")} alt="Infracost Cloud shows you a burndown chart of how you're doing." />

## Test pull requests

When engineers create a pull request to change infrastructure, Infracost scans the code and checks the FinOps policies against all changed resources. Infracost shows the best practices alongside an explanation of why it's important to consider implementing the change. Infracost also shows the exact file and line numbers that need to be changed if the engineer chooses to implement the change. This shifts-left on FinOps policies and results in the fastest possible feedback loop.

<img src={"https://dashboard.infracost.io/images/get_started/comment.png"} alt="The pull request comment shows exactly what file and line number need to be updated to fix the issue." />

## Update policy settings

From the Governance > FinOps page, you can click on the 3 dots for any policy and update its settings. These settings include the option to block requests that fail the policy, and the ability to customize the message shown to engineers in pull requests. This is useful if you need to customize the message to recommend your company's specific policy or a link to internal wiki pages where engineers can learn more.

You can also define whether a policy should trigger only when new resources are being added. This is useful when changing an existing resource, such as a database's instance type, requires downtime and thus you prefer engineers to not do that within their existing open pull request.

<img src={useBaseUrl("img/infracost-cloud/finops-policies/policy-settings.png")} alt="Each policy has settings that can be updated to enforce it in pull requests or customize the message shown in the pull request." />

### Customizable policies

Infracost provides several policies (for AWS, Azure, and GCP) that enable FinOps teams to encourage or enforce the regions and instance types that engineers should use. This is useful for a number of reasons depending on your organizations goals, and is therefore customizable via each policy's settings page.

#### Using preferred regions

In many cases, enterprises want to encourage their engineers to use specific cloud regions. For example, some enterprises want to encourage [low CO2 Google Cloud regions](https://cloud.google.com/sustainability/region-carbon), and others want to only allow certain AWS or Azure regions due to compliance reasons.

To set this up, go to Infracost Cloud > Governance > FinOps policies > Inactive tab and click on the "General - consider using preferred regions" policy. You can enter the list of regions that you'd like to encourage engineers to use, and whether pull requests that fail this policy should be blocked or not.

Use the region identifiers below for this policy:

- AWS: [list of regions](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/), e.g. `us-east-1`.
- Azure: [list of regions](https://cloud.google.com/about/locations/), e.g. `eastus`. You can also run `az account list-locations -o table` to see the list for your account.
- Google: [list of regions](https://cloud.google.com/about/locations/), e.g. `us-west1`

#### Using preferred instance types

Many enterprises have Reserved Instances, Savings Plans or Committed Use Discounts. In all three cases, these are limited to specific regions and instance types or families. It is often useful to encourage or limit engineers to the instance types that your organization has standardized upon for cost savings purposes.

To set this up, go to Infracost Cloud > Governance > FinOps policies > Inactive tab and click on the "General - consider using preferred instance types" policy. You can specify any number of region/instance type or family pairs to allow as shown in the screenshot below. One pair should be specified per line, with each region and instance type separated by a colon. Wildcards (`*`) can be used to match any region or instance type, on a full or partial basis.

<img src={useBaseUrl("img/infracost-cloud/finops-policies/preferred.png")} alt="Preferred instance types are configurable via the policy settings page." />

You can override wildcard settings with more specific ones. For example, adding the pair `*:t1.micro` will allow the use of `t1.micro` instances in all regions, but adding the more specific pair `us-west-2:t2.micro` will override this, meaning only `t2.micro` instances can be used in the `us-west-2` region, but `t1.micro` instances can still be used in all other regions.

## Policies for non-production environments

Some FinOps policies are only applicable to non-production environments, for example, consider using single-AZ databases in non-production environments. These policies are often overlooked as engineers tend to use the same infra-as-code logic for production; however, they provide easy and significant cost savings. In Infracost Cloud, go to the Governance > FinOps policies page, and search for "non-production" to see these policies and the resources that are failing the policies.

Infracost supports such policies by allowing you to define filters that identify your production environments (e.g. projects within repos, entire repos or branches that are considered production). You only need to define the filters that match your production environments; Infracost considers everything else as non-production. By default, projects with the words "production", "prod" and "prd" are considered production. You can customize the filters from the Org Settings > Production filters page. Anytime you update this page, you need to go to the Governance > FinOps policies page and click on **Re-run policies** to see the latest failing resources.

Module repositories are skipped during the evaluation of non-production FinOps policies. Instead, the repositories that utilize these modules are checked for those policies.

<img src={useBaseUrl("img/infracost-cloud/finops-policies/production-filters.png")} alt="Production filters can be defined in the Org Settings." />

## Potential savings

Potential savings values may vary due to the nature or compounding effects of multiple configurations in your IaC. Here are some known cases:

### Extended support

Some cloud providers calculate extended support costs per resource (e.g., per vCPU/hour). In these cases, updating an instance type may increase your extended support costs, which will reduce your net savings.

### Modernization policies

Certain policies that target instance modernization (eg. migrating from [gp2 to gp3](https://docs.aws.amazon.com/prescriptive-guidance/latest/optimize-costs-microsoft-workloads/ebs-migrate-gp2-gp3.html) for AWS RDS) may incur minor base cost increases affecting potential savings. This is due to the fact that these kinds of policies target right-sizing of instances for access to newer features or improved scalability (such as with IOPS heavy workloads).
