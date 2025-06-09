---
slug: tagging_policies
title: Tagging policies
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Tagging is fundamental to many FinOps capabilities and domains. FinOps, DevOps and Platform teams are responsible for defining tagging policies to enable tasks such as cost allocation and showback.

Most companies write wiki pages to communicate tagging policies to engineering teams, but this does not scale to decentralized infrastructure provisioning, and cannot be enforced. AWS Service Control Policies (SCP) and Azure Policy are checked too late in the development process as they fail the deployment pipelines (`terraform apply` fails). This slows down the engineers as they need to create new pull requests, wait for another code review and try to deploy again.

Infracost enables you to define your tagging policies so you can communicate and enforce required tag keys/values in pull requests. This enables you to shift-left on your tagging practices and provide engineers with the fastest possible feedback loop vs asking them to clean up tagging issues post-deployment.

## 1. Create tagging policies

You can create multiple tagging policies, for example one policy that applies to all resources, and another one that applies to certain resource types. To create a tagging policy, log in to [Infracost Cloud](https://dashboard.infracost.io) and go to the **Governance** > **Tagging policies** page, and follow the steps below.

### a. Define tag keys and values

You can define what tag keys are mandatory, which tag values are allowed, and make it easy for engineers to take action.

You can also validate tag values using a regular expression (ECMAScript is used). Partial matches are used, so for example `dev` will match `dev`, `development` and `api-development`; but `.*-dev-.*` will not match `development`. In this case, it's helpful to include a brief description of allowed values and examples in the tag key's custom message box.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/define-tags.png")} alt="Define tag keys and values." />

### b. Custom pull request message

You should also set a custom message to be included in pull request comments to give additional context or instructions. For example, you can describe **why** tagging is important for your organization and link to your internal wiki page.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/customizations.png")} alt="You can customize the pull request message." />

### c. Optionally block pull requests

Next you can define whether pull requests that fail this policy should be blocked until the policy failure is fixed. We recommend giving engineering teams a warning period of 1-3 months before putting policies into enforcement mode. Depending on how your source control system is configured, your admins can usually bypass this for edge cases.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/actions-to-take.png")} alt="You can optionally block pull requests that fail a policy." />

### d. Advanced settings

We recommend you leave "Include details in pull requests" as enabled so engineers are shown details of tagging policy failures. However, during testing, you can disable this so you can see the details in Infracost Cloud but not in pull request comments.

The "Resource types filter" filter is specially useful for Azure users, as they often only require tags to be set for `azurerm_resource_group` resources, and enable an Azure feature so resources inherit tags from their resource group.

Usually users monitor all pull requests for tagging policies. However, you can also set filters, e.g. only monitor pull requests in certain repositories so you can do gradual rollouts of your policy. Once you are done, save the tagging policy.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/filters.png")} alt="Create a tagging policy using pull request filters." />

## 2. See all tagging issues

Once you have created a tagging policy, click on the "Re-run policies" button. This will scan all of your repositories main or master branch and show all tagging issues. This means that you do not need to wait for a pull request to test your policy.

Whilst cloud vendor tools such as AWS Cost Explorer show the percentage of untagged costs, Infracost Cloud shows the exact infrastructure-as-code resources that are not using your allowed tag keys and values. You can also filter on specific repos or VCS organizations to zoom-in on a subset of the issues.

<img src={useBaseUrl("img/infracost-cloud/tagging-policies/coverage-chart.png")} alt="Infracost Cloud shows all resources that are not using your allowed tag keys or values." />

Infracost makes tagging actionable for engineers. Tracking the percentage of resources that are tagged correctly is an important KPI that FinOps teams track and improve over time. This reduces the percentage of costs that cannot be categorized and allocated.

## 3. Test pull requests

When engineers create a pull request to change infrastructure, Infracost scans the code and checks the tagging policies against all changed resources. It notifies the engineer immediately of any issues; the pull request comment (shown below) tells them exactly what file and line number they need to change to resolve the issue. This shifts-left on the tagging policy and results in the fastest possible feedback loop.

<img src={"https://dashboard.infracost.io/images/get_started/comment.png"} alt="Create a pull request to test your tagging policy." />

From the Visibility > Pull requests page, you can also see pull requests that failed policies. Each of these pull requests would have been deployed with missing or incorrect tags had Infracost not flagged them for engineers to action. Fixing these issues before code is deployed saves significant engineering time as otherwise engineers need to create new pull requests, wait for code reviews, and re-deploy their changes.

## How tagging policies work

Tagging policies check all AWS, Azure and Google Terraform resources that support tagging, including resources that Infracost does not show cost estimates for yet. The following list describes things that are checked by tagging policies:

- Default tags that are applied as part of Terraform `provider` blocks are also checked.
- For Google Cloud resources, `label` keys and values are checked.
- For tags set in modules, the actual module version being used is checked.

<details><summary>AWS-specific notes</summary>

- For `aws_autoscaling_group`, if the `propagate_at_launch` attribute is not set to true, the resource fails tagging policies as resources launched from those Auto Scaling groups will not get the required tags.
- For `aws_instance` with `ebs_block_device` or `root_block_device` definitions, tags for the attached volumes are checked as follows:
  - if `volume_tags` attribute is set it is checked. Otherwise, `.tags` for the `root_block_device` and each `ebs_block_device` are checked.
  - provider `default_tags` are automatically applied to each `*_block_device.tags` (or `volume_tags`, if used) unless you are using an AWS provider version earlier than `5.39`.
- For `aws_launch_template`, the `tag_specifications` attribute is also checked. If the `resource_type` is `instance` or `volume` these tags are then associated with either the `aws_instance` or `aws_autoscaling_group` resource that references the `aws_launch_template` and checked as part of those resources.
- The `propagate_tags` attribute is checked for any resource that requires that to be set for tags to propagate to dynamically created resources: `aws_ecs_service`, `aws_scheduler_schedule`, `aws_batch_job_definition`, `aws_dynamodb_table`, `aws_pipes_pipe`, and `aws_cloudwatch_event_target`.
- The following individual tag resources are not checked as these are used to tag resources defined outside of Terraform: `aws_autoscaling_group_tag`, `aws_ec2_tag`, `aws_transfer_tag`, `aws_ecs_tag`, `aws_dynamodb_tag`.

</details>

<details><summary>Google-specific notes</summary>

- For the following resources, `user_labels` are checked: `google_monitoring_alert_policy`, `google_monitoring_custom_service`, `google_monitoring_notification_channel`, `google_monitoring_service`, `google_sql_database_instance`, `google_monitoring_slo`.

</details>

Please email [support@infracost.io](mailto:support@infracost.io) if you have any feedback on how tagging policies work.
