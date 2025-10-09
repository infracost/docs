---
slug: campaigns
title: Campaigns
---

# Campaigns

![Track campaign performance](/img/infracost-cloud/campaigns/campaigns-performance.png)

Campaigns help you focus engineering efforts on the FinOps policies that matter most to your business, turning scattered optimization initiatives into coordinated, measurable actions across all your teams.

## How it works

Campaigns follow the [S.M.A.R.T. framework](https://en.wikipedia.org/wiki/SMART_criteria) (Specific, Measurable, Achievable, Relevant, and Time-bound) to transform FinOps initiatives from endless backlogs into focused sprints. Instead of overwhelming engineers with dozens of issues, campaigns prioritize the most impactful policies, track progress automatically, and measure both fixes and prevention of new issues.

## Before You Begin

- ✅ Infracost Cloud account with admin access
- ✅ At least one repository connected to Infracost
- ✅ FinOps policies configured (built-in or custom)
- ✅ Baseline scan completed on main branches

## Getting started

### 1. Review your policy violations

Navigate to the [Issue Explorer](/infracost_cloud/issue_explorer/) to see which policies are failing the most across your organization. Infracost automatically analyzes all connected repositories and provides data-driven insights about where to focus.

### 2. Create your first campaign

![Campaign navigation flow](/img/infracost-cloud/campaigns/campaigns-navigation.png)

Go to the Campaigns page and click `Create Campaign` to configure a new campaign:

- **Campaign name:** e.g., "Q1 Graviton Migration - Lambda & ECS"
- **Campaign description:** Provide an explanation for why this campaign matters
- **Choose policies:** Select 1 or more high-impact policies to focus on
- **Campaign objectives**
  - **Goal**: Set an achievable target, e.g., "Fix 80% of issues"
  - **Start and end dates**: When this campaign should being and end
  - **Advisory period**: The number of days this campaign will run in advisory only mode, giving engineers a warning of upcoming changes to policy enforcement.
- **AutoFix:** Enable to automatically generate pull requests to fix issues (optional)

![Create a new campaign](/img/infracost-cloud/campaigns/campaigns-create.png)

### 3. Launch and communicate

Once configured, launch your campaign. Infracost will:

- Start tracking progress automatically
- Generate AutoFix PRs if enabled
- Update dashboards with campaign metrics

We recommend you communicate with your engineering teams ahead of time so they are not surprised by new policies being enforced.

### 4. Monitor progress (ongoing)

![Track campaign performance](/img/infracost-cloud/campaigns/campaigns-performance.png)

Track two key metrics on your campaign dashboard:

- **Issues Fixed:** Percentage of targeted issues resolved
- **New Issues Prevented:** How well teams follow the policy going forward

## Example use cases

### Graviton Migration Campaign

Focus on migrating Lambda and ECS services to Graviton for cost savings. These new instances are 20%
cheaper with better performance, but replatforming can be an engineering heavy task depending on
whether your dependencies' support for ARM chipsets. Scoping the initial campaign to just
containerized workloads could provide a viable incremental step:

- **Campaign name:** Q1 Graviton Migration - Lambda & ECS
- **Campaign description:** Lambda and ECS accounts for $2M of our annual spend — migrating to Graviton will save us $400K/yr
- **Choose policies:**
  - `Lambda - consider using Graviton`
  - `ECS - consider using Graviton instances`
- **Campaign objectives**
  - **Goal**: 80%
  - **Start and end dates**: 2025-01-01 – 2025-03-31
  - **Advisory period**: 7 days

### Tagging Compliance Sprint

Ensure all resources have required tags:

- **Campaign name:** February Tagging Sprint
- **Campaign description:** Tagging resources is essential for effective cost allocation, governance, and automation. By ensuring all resources have required tags (such as cost center, owner, and environment), we can accurately track spending, improve accountability, and streamline reporting.
- **Choose policies:**
  - `FinOps tags`
- **Campaign objectives**
  - **Goal**: 90%
  - **Start and end dates**: 2025-02-01 – 2025-02-28
  - **Advisory period**: 7 days

### Instance Modernization

- **Campaign name:** Q2 Instance Modernization
- **Campaign description:** Upgrading to more recent instance types can significantly reduce costs and boost performance. By modernizing our compute resources, we can take advantage of better price-to-performance ratios, improved efficiency, and new features—helping us optimize over $10M/yr in compute spend. This campaign will focus on identifying and upgrading outdated instances where the savings and performance gains justify the engineering effort.
- **Choose policies:**
- `Compute - consider using current generation machine types`
- `EC2 - consider using latest generation instances for c family instances`
- `Virtual Machines - consider using the latest generation of Da series instances`
- **Campaign objectives**
  - **Goal**: 50%
  - **Start and end dates**: 2025-04-01 – 2025-06-30
  - **Advisory period**: 14 days

### Rightsizing Quick Wins

- **Campaign name:** Q3 Instance Optimizations
- **Campaign description:** AWS has numerous recommendations on how we could optimize over $10M/yr in compute spend. Let's prioritize addressing any low hanging fruit, and anything where the return is worth the engineering effort to make the change.
- **Choose policies:**
- `Auto Scaling - consider rightsizing recommendation from AWS`
- `EC2 - consider rightsizing recommendation from AWS`
- `RDS - consider rightsizing recommendation from AWS`
- **Campaign objectives**
  - **Goal**: 30%
  - **Start and end dates**: 2025-07-01 – 2025-09-30
  - **Advisory period**: 7 days

## Common Mistakes to Avoid

| ❌ Don't                                                 | ✅ Do                                                |
| -------------------------------------------------------- | ---------------------------------------------------- |
| Don't: Launch campaigns with 20+ policies at once        | Do: Focus on a few high-impact policies per campaign |
| Don't: Set unrealistic 100% completion goals             | Do: Aim for 70-90% to account for valid exceptions   |
| Don't: Run multiple conflicting campaigns simultaneously | Do: Sequence campaigns or ensure clear separation    |
| Don't: Launch without team communication                 | Do: Brief engineering leads before campaign start    |
