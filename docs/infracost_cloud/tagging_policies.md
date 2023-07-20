---
slug: tagging_policies
title: Tagging policies
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Tagging is fundamental to many FinOps capabilities and domains. FinOps, DevOps and Platform teams are responsible for defining tagging policies to enable tasks such as cost allocation and showback.

Most companies write wiki pages to communicate tagging policies to engineering teams, but this does not scale to decentralized infrastructure provisioning, and cannot be enforced. AWS Service Control Policies (SCP) and Azure Policy are checked too late in the development process as they fail the deployment pipelines (`terraform apply` fails). This slows down the engineers as they need to create new pull requests, wait for another peer review and try to deploy again.

Infracost enables you to define your tagging policies so you can communicate and enforce the required tag keys/values in pull requests. This enables you to shift-left on your tagging practices and provide engineers with the fastest possible feedback loop vs asking them to clean up tagging issues post-deployment.

## Usage

You can create multiple tagging policies, for example one policy that applies to all resources, and another one that applies to certain resource types.

To create a tagging policy, log in to [Infracost Cloud](https://dashboard.infracost.io) and go to the Governance > Tagging policies page.

### 1. Scope of tagging policy

Give your tagging policy a name, and select the whether the policy should be evaluated against all or specific resource types. Resource-type specific tags are useful in cases you want resources such as EC2 instances to have specific tags such as shutdown schedules.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/name-and-scope.png")} alt="Define tagging policy name and scope." />

### 2. Define tag keys and values

You can define what tag keys are mandatory, which tag values are allowed, and make it easy for engineers to take action. You can also validate tag values using a regular expression.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/define-tags.png")} alt="Define tag keys and values." />

### 3. Optionally block pull requests

Next you can define whether pull requests that fail this policy should be blocked until the policy failure is fixed. Depending on how your source control system is configured, your admins can usually bypass this for edge cases.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/actions-to-take.png")} alt="You can optionally block pull requests that fail a policy." />

### 4. Custom pull request message 

We recommend you leave "Include details in pull requests" as enabled so engineers are shown details of tagging policy failures. However, during testing, you can disable this so you can see the details in Infracost Cloud but not in pull request comments.

You can also set a custom message to be included in pull requests to give additional context or instructions. For example, you can describe why tagging policies are important or link to your internal wiki page.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/customizations.png")} alt="You can customize the pull request message." />

### 5. Pull requests to monitor

Usually users monitor all pull requests for tagging policies. However, you can also set filters, e.g. only monitor pull requests in certain repositories so you can do gradual rollouts of your policy.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/filters.png")} alt="Create a tagging policy using pull request filters." />

### 6. Test it

When engineers create a pull request to change infrastructure, Infracost scans the code and checks the tagging policies against all changed resources. It notifies the engineer immediately of any issues; the pull request comment (shown below) tells them exactly what file and line number they need to change to resolve the issue. This shifts-left on the tagging policy and results in the fastest possible feedback loop.

:::note
If you do not use source control integrations ([GitHub App](/docs/integrations/github_app/) or [GitLab App](/docs/integrations/gitlab_app/)), you must [implement some extra steps](/docs/guides/source_control_benefits/) for CI/CD integrations to work with tagging policies. Tagging policies do not currently work with the [Terraform Plan JSON](/docs/features/cli_commands/#option-2-terraform-plan-json) method; [contact us](mailto:hello@infracost.io) for assistance.
:::

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/pull-request-tags.png")} alt="Create a pull request to test your tagging policy." />

### 7. Analytics on policy coverage

Infracost Cloud shows a central dashboard of any tagging policy failures that are currently happening on your main or master branch across all of your code repos. You can also see pull requests that failed policies so they can be tracked over time.

Coming soon you'll also be able to see the percentage of resources that are passing your tagging policies over the last 6 months. This is an important KPI that FinOps teams track and improve over time to reduce the percentage of costs that cannot be categorized and allocated.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/triggered-pull-requests.png")} alt="Infracost Cloud provides analytics on tagging policy failures." />

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/branch-policies.png")} alt="Infracost Cloud shows you any tagging policy failures that are currently happening on your main or master branch too." />
