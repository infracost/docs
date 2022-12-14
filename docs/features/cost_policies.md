---
slug: cost_policies
title: Cost policies
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip
We recommend using the new [Centralized cost policies](/docs/infracost_cloud/cost_policies) feature instead.
:::

Cost policies enable DevOps and FinOps teams to help engineers to take action around cloud costs. Policies are usually written by centralized teams so they can send advice or set guardrails for all engineering teams. Policies are checked in CI/CD and trigger when pre-defined conditions are hit.

## Benefits

Infracost policies enable centralized teams, who are often helping others with cloud costs, to:
- **Provide advice before** resources are launched: "Whilst you're changing this EC2 instances, consider changing its GP2 volume type to GP3 as it's cheaper and offers better performance".
- **Setup guardrails**: "This change puts the monthly costs above $10K, which is the budget for this product. Consider asking the team lead to review it". 
- **Prevent human error**: "This change is blocked as it increases monthly costs by more than $100K!".

Infracost is often used in addition to budget alerts and cost management reports to provide an addition layer of communication and protection in CI/CD. Engineers often find it distracting, and time-consuming to retro fix infrastructure after something has gone to production, thus it's better to help them earlier as part of their workflow.

## Usage options

Infracost supports [Open Policy Agent](#quick-start-open-policy-agent-opa) policies out of the box. If you're new to policy-as-code, we recommend this option as Infracost has native support for it. However, since the Infracost CLI can [output JSON](/docs/features/cli_commands/#examples), it can also be integrated with [HashiCorp Sentinel](#option-2-hashicorp-sentinel) and other policy checking tools such as [Conftest](https://github.com/open-policy-agent/conftest/).

If you need help writing policy code, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

## Option 1: Open Policy Agent (OPA)

The [`infracost comment`](/docs/features/cli_commands/#comment-on-pull-requests) command has native support for OPA. By the end of this quick start guide, you'll be able to see passing/failing policies in Infracost pull request comments (shown below) without having to install anything else.

<Tabs
  defaultValue="failed-opa"
  values={[
    {label: 'Failing policy', value: 'failed-opa'},
    {label: 'Passing policy', value: 'passed-opa'}
  ]}>
  <TabItem value="failed-opa">
    <p>You write the policy logic and the message that is shown, e.g. "talk to John in FinOps for advice". You can block pull requests from being merged by configuring your source control system to deny merges if a CI/CD task fails.</p>
    <div className="img-box">
      <img 
          src={useBaseUrl("img/screenshots/policy-failure-github.png")} 
          alt="Example cost policy failing in GitHub Actions"/>
    </div>
  </TabItem>
  <TabItem value="passed-opa">
    <div className="img-box">
      <img 
          src={useBaseUrl("img/screenshots/policy-passing-github.png")} 
          alt="Example cost policy passing in GitHub Actions"/>
    </div>
  </TabItem>
</Tabs>

### Cost policy basics

Policy files are written in OPA's native query language, [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/). Infracost leverages Rego to enable you to write flexible and powerful cost policies defined through **rules**. Rules dictate what checks infrastructure changes must **pass** before being merged. Rules are defined in text files as such:

```bash
package infracost # You must specify infracost as the Rego package name

# Each file can have a number of "deny" rules that must return an "out" object
# with keys "msg" & "failed". You can write as many "deny[out]" rule sets as you wish. 
# You can read more about rule definitions in Rego here: https://www.openpolicyagent.org/docs/latest/policy-language/#rules
deny[out] {
  # maxDiff defines the threshold that you require the cost estimate to be below
  maxDiff = 5000.0

  # msg defines the output that will be shown in PR comments under the Policy Checks/Failures section
  msg := sprintf(
    "Total monthly cost diff must be less than $%.2f (actual diff is $%.2f)",
    [maxDiff, to_number(input.diffTotalMonthlyCost)],
  )

  # out defines the output for this policy. This output must be formatted with a `msg` and `failed` property.
  out := {
    # the msg you want to display in your PR comment, must be a string
    "msg": msg,
    # a boolean value that determines if this policy has failed.
    # In this case if the Infracost breakdown output diffTotalMonthlyCost is greater that $5000
    "failed": to_number(input.diffTotalMonthlyCost) >= maxDiff
  }
}
```

### Quick start

To help you write cost policies we've created an [OPA playground](https://play.openpolicyagent.org/p/o1MLyC74CJ) with some example policy rules and Infracost output. Use this and the following steps to generate your very own policies.

1. Generate a new Infracost [breakdown](/docs/features/cli_commands/#breakdown) output using `infracost breakdown --path plan.json --format json --out-file infracost.json`, and paste the contents of `infracost.json` into the **INPUT** section to the right of the playground.

  <img src={useBaseUrl("img/screenshots/paste-output.png")}/>

2. Rewrite, duplicate or delete the rules in the policy section of the playground. Being sure to stick to the format defined in [the last section](#cost-policy-basics). Please add a comment to [this GitHub discussion](https://github.com/infracost/infracost/discussions/1278) if you have any feedback about the Infracost JSON output.

3. Click the **Evaluate** button and make sure that you have an output with a single property `deny` which contains an array of rule outputs. These rules must contain both a `failed` boolean and a `msg` property (see the [last section](#cost-policy-basics) for more info):
  ```json
  {
      "deny": [
          {
              "failed": false,
              "msg": "AWS instance IOPS must cost less than compute usage (aws_instance.web_app IOPS $0.07\\hr, usage $0.77\\hr)."
          },
          {
              "failed": false,
              "msg": "AWS instances must cost less than $2.00\\hr (aws_instance.web_app costs $1.02\\hr)."
          }
      ]
  }
  ```

4. Save the contents of the policy editor to a file in your code repository, e.g. `infracost-policy.rego`.

5. In your CI/CD integration, modify the [`infracost comment`](/docs/features/cli_commands/#comment-on-pull-requests) command to include the `--policy-path=infracost-policy.rego` flag. For example, in GitHub Actions this would be:

  ```bash
  infracost comment github \
    --path /tmp/infracost.json \
    --github-token $GITHUB_TOKEN \
    --pull-request $PR_NUMBER \
    --repo $GITHUB_REPOSITORY \
    --behavior update \
    --policy-path infracost-policy.rego
  ```

6. The above command does an `exit 1` if the policy checks fail. Thus you can block pull requests from being merged by configuring your source control system to deny merges if a CI/CD task fails.

7. Breath easy... now your team's infrastructure changes are protected against costly mistakes 🚀
  Contribute to [this GitHub issue](https://github.com/infracost/infracost/issues/1472) if you have feedback about the policy behaviors.

### Demo

Here is an end to end demo of the Infracost and Open Policy Agent integration:

<iframe width="90%" height="450" src="https://www.youtube.com/embed/jFv9Gi_Vfyo" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>

## Option 2: HashiCorp Sentinel

Integrating Infracost with HashiCorp [Sentinel](https://www.hashicorp.com/sentinel) enables you to output the policy pass/fail results into CI/CD logs. We recommend you follow one of the following examples to get started:
- [GitHub Actions](https://github.com/infracost/actions/tree/master/examples/sentinel)
- [GitLab CI](https://gitlab.com/infracost/infracost-gitlab-ci/-/tree/master/examples/sentinel)
- [Azure DevOps](https://github.com/infracost/infracost-azure-devops/tree/master/examples/sentinel)
