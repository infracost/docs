---
slug: tagging_policies
title: Tagging policies
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Tagging is fundamental to many FinOps capabilities and domains. FinOps, DevOps and Platform teams are responsible for defining tagging policies to enable tasks such as cost allocation and showback.

Most companies write wiki pages to communicate tagging policies to engineering teams, but this does not scale to decentralized infrastructure provisioning, and cannot be enforced. AWS Service Control Policies (SCP) and Azure Policy are checked too late in the development process as they fail the deployment pipelines (`terraform apply` fails). This slows down the engineers as they need to create new pull requests, wait for another code review and try to deploy again.

Infracost enables you to define your tagging policies so you can communicate and enforce required tag keys/values in pull requests. This enables you to shift-left on your tagging practices and provide engineers with the fastest possible feedback loop vs asking them to clean up tagging issues post-deployment.

## 1. Create tagging policies

You can create multiple tagging policies, for example one policy that applies to all resources, and another one that applies to certain resource types. To create a tagging policy, log in to [Infracost Cloud](https://dashboard.infracost.io) and go to the Governance > Tagging policies page, and follow the steps below.

### a. Scope of tagging policy

Give your tagging policy a name, and select the whether the policy should be evaluated against all or specific resource types. Resource-type specific tags are useful in cases you want resources such as EC2 instances to have specific tags such as shutdown schedules.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/name-and-scope.png")} alt="Define tagging policy name and scope." />

### b. Define tag keys and values

You can define what tag keys are mandatory, which tag values are allowed, and make it easy for engineers to take action. You can also validate tag values using a regular expression.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/define-tags.png")} alt="Define tag keys and values." />

### c. Optionally block pull requests

Next you can define whether pull requests that fail this policy should be blocked until the policy failure is fixed. Depending on how your source control system is configured, your admins can usually bypass this for edge cases.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/actions-to-take.png")} alt="You can optionally block pull requests that fail a policy." />

### d. Custom pull request message 

We recommend you leave "Include details in pull requests" as enabled so engineers are shown details of tagging policy failures. However, during testing, you can disable this so you can see the details in Infracost Cloud but not in pull request comments.

You can also set a custom message to be included in pull request comments to give additional context or instructions. For example, you can describe why tagging policies are important or link to your internal wiki page.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/customizations.png")} alt="You can customize the pull request message." />

### e. Pull requests to monitor

Usually users monitor all pull requests for tagging policies. However, you can also set filters, e.g. only monitor pull requests in certain repositories so you can do gradual rollouts of your policy. Once you are done, save the tagging policy.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/filters.png")} alt="Create a tagging policy using pull request filters." />

## 2. See policy failures on repos

Once you have created a tagging policy, Infracost Cloud shows you a central dashboard of any tagging policy failures that are currently happening on your main or master branch across all of your code repos.

This means that you do not need to wait for a pull request to test your policy. Go to one of your repos from Visibility > Repos, and click on the Re-run estimate button. Any tagging policy failures will be shown.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/branch-policies.png")} alt="Infracost Cloud shows you any tagging policy failures that are currently happening on your main or master branch too." />

## 3. Analytics on policy coverage

From the Governance > Tagging policy page, you can see the percentage of resources that are passing your tagging policies over the last 6 months. Whilst cloud vendor tools such as AWS Cost Explorer show the percentage of untagged costs, Infracost Cloud shows the percentage of infrastructure-as-code resources that are strictly following your tagging policies, which is much clearer for engineers to action and improve. This is an important KPI that FinOps teams track and improve over time to reduce the percentage of costs that cannot be categorized and allocated.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/coverage-chart.png")} alt="Infracost Cloud shows you the percentage of resources that are following your tagging policies." />

You can also see pull requests that failed policies (shown above). Each of these pull requests would have been deployed with missing or incorrect tags had Infracost not flagged them for engineers to action. Fixing these issues before code is deployed saves significant engineering time as otherwise engineers need to create new pull requests, wait for code reviews, and re-deploy their changes.

## 4. Test pull requests

When engineers create a pull request to change infrastructure, Infracost scans the code and checks the tagging policies against all changed resources. It notifies the engineer immediately of any issues; the pull request comment (shown below) tells them exactly what file and line number they need to change to resolve the issue. This shifts-left on the tagging policy and results in the fastest possible feedback loop.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/pull-request-tags.png")} alt="Create a pull request to test your tagging policy." />

:::note
If you do not use source control integrations ([GitHub App](/docs/integrations/github_app/) or [GitLab App](/docs/integrations/gitlab_app/)), you must [implement some extra steps](/docs/guides/source_control_benefits/) for CI/CD integrations to work with tagging policies. Tagging policies do not currently work with the [Terraform Plan JSON](/docs/features/cli_commands/#option-2-terraform-plan-json) method; [contact us](mailto:hello@infracost.io) for assistance.
:::

## How tagging policies work

Tagging policies check all AWS, Azure and Google Terraform resources that support tagging, including resources that Infracost does not show cost estimates for yet. The following list describes are things that are checked by tagging policies:
- Default tags that are applied as part of Terraform `provider` blocks are also checked.
- For Google Cloud resources, label keys and values are checked.

<!--
TODO: Add these after v0.10.27 is released
- For `aws_autoscaling_group` and `aws_autoscaling_group_tag`, if the `propagate_at_launch` attribute is not set to true, the resource fails tagging policies as resources launched from those Auto Scaling groups will not get the required tags.
- For `aws_instance`, the `volume_tags` attribute is also checked.
- For `aws_launch_template`, the `tag_specifications` attribute is also checked.
-->
