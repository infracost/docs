---
slug: cost_policies
title: Cost policies
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost can be integrated with [HashiCorp Sentinel](https://www.hashicorp.com/sentinel), [Conftest](https://github.com/open-policy-agent/conftest/) and has **native support for [Open Policy Agent](https://github.com/open-policy-agent/opa) (OPA).** 

<div className="img-box">
  <img 
      src={useBaseUrl("img/screenshots/policy-failure-github.png")} 
      alt="Example cost policy failing in GitHub Actions"/>
</div>

This enables DevOps teams to set policies on cost estimates before resources are launched. You can write policies to provide guardrails and ask a team lead to review changes that, for example:
- Increase costs by more than 15%.
- Increase per hour instance costs to more than $25/hour.
- Result in provisioned IOPS to cost more than the instances.
- Any combination of resource types, provisioning parameters, cloud regions, costs, percentages etc!



## Benefits of cost policies

Cost policies enable self-service of infrastructure for your team and the wider engineering organization by creating the guardrails needed to stay within an acceptable cloud infrastructure budget. Everyone wants to make the right choice, but it's hard to choose between services without cost information. As one of our users put it: if you tell the team we need to get from point A to B, then offer them a Ford or a Ferrari with no price tag; most people will choose the Ferrari.

Many companies have been using after-the-fact alerts and cloud cost management reports from their cloud providers and 3rd parties, but ask any engineer and they will tell you that it is distracting, hard and time-consuming to retro fix infrastructure after something has gone to production. You need to catch costly components earlier in the process, ideally in CI/CD as part of the code review process.

## Native policy support

The `infracost comment` command comes with native OPA policy support. This enables you to see passing/failing policies right in Infracost PR comments! Using policies with `infracost comment` is simple - pass one or more OPA policy files to the command using the `--policy-path` flag, e.g:

```bash
infracost comment github \
  --path /tmp/infracost.json \
  --github-token $GITHUB_TOKEN \
  --pull-request 32 \
  --repo your-org/your-repo \
  --behavior update \
  --policy-path your-cost-policy.rego
```

`--policy-path` will parse provided files and evaluate them against the provided Infracost output. Infracost will now modify PR comments with a handy dropdown with passing or failing policies:

**Failing policy:**

<div className="img-box">
  <img 
      src={useBaseUrl("img/screenshots/policy-failure-github.png")} 
      alt="Example cost policy failing in GitHub Actions"/>
</div>

**Passing policy:**

<div className="img-box">
  <img 
      src={useBaseUrl("img/screenshots/policy-passing-github.png")} 
      alt="Example cost policy passing in GitHub Actions"/>
</div>

### Cost policy definition

Infracost policy files are written in OPA's native query language, Rego. You can read more about the [language here](https://www.openpolicyagent.org/docs/latest/policy-language/).

Infracost leverages Rego to enable you to write flexible and powerful cost policies defined through **rules**. Rules dictate what checks infrastructure changes must **pass** before being merged. 

Infracost cost policy rules are defined as such:


```bash
package infracost # You must specify infracost as the Rego package name

# each file can have a number of "deny" rules that must return an "out" object
# with keys "msg" & "failed". You can write as many "deny[out]" rule sets as you wish. 
# You can read more about rule definitions in Rego here: https://www.openpolicyagent.org/docs/latest/policy-language/#rules.
deny[out] {
  # maxDiff defines the threshold that you require the cost estimate to be below.
  maxDiff = 500.0

  # msg defines the output that will be shown in PR comments under the Policy Checks/Failures section.
  msg := sprintf(
    "Total monthly cost diff must be less than $%.2f (actual diff is $%.2f)",
    [maxDiff, to_number(input.diffTotalMonthlyCost)],
  )

  # out defines the output for this policy. This output must be formatted with a `msg` and `failed` property.
  out := {
    # the msg you want to display in your PR comment, must be a string
    "msg": msg,
    # a boolean value that determines if this policy has failed.
    # In this case if the Infracost breakdown output diffTotalMonthlyCost is greater that $500 
    "failed": to_number(input.diffTotalMonthlyCost) >= maxDiff
  }
}

```

### Writing your own cost policies

To help you write cost policies we've created an [OPA playground](https://play.openpolicyagent.org/p/o1MLyC74CJ) with some example policy rules and Infracost output.

Use [the playground](https://play.openpolicyagent.org/p/o1MLyC74CJ) and the following steps to generate your very own policies.

1. generate a new Infracost breakdown output using `infracost breakdown --path plan.json --format json --out-file infracost.json` and then pasting the contents of `infracost.json` into the **INPUT** section to the right of [the playground](https://play.openpolicyagent.org/p/o1MLyC74CJ).

<img src={useBaseUrl("img/screenshots/paste-output.png")}/>

3. Rewrite, duplicate or delete the rules in the policy section of [the playground](https://play.openpolicyagent.org/p/o1MLyC74CJ). Being sure to stick to the format defined in [the last section](/docs/features/cost_policies/#cost-policy-definition).
4. Run the **Evaluate** button and make sure that you have an output with a single property `deny` which contains an array of rule outputs. These rules must contain both a `failed` boolean and a `msg` property (see the [last section](/docs/features/cost_policies/#cost-policy-definitions) for more info):
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
4. Save the contents of the policy editor to a file in your project, e.g: **policy.rego**.
5. Modify the `infracost comment` command that posts your cost estimates PR comment to include the `--policy-path=policy.rego` flag.
6. Breath easy... now your team's infrastructure are protected against costly changes 🚀🚀🚀

## CI Quick start

The following examples show how Infracost's native support for OPA can be integrated with GitHub Actions, GitLab CI, Atlantis and Azure. The same can be achieved with other CI/CD tools:
  - [GitHub Actions](https://github.com/infracost/actions#cost-policy-examples)
  - [GitLab CI](https://gitlab.com/infracost/infracost-gitlab-ci#cost-policy-examples)
  - [Atlantis](https://github.com/infracost/infracost-atlantis/tree/master/examples/conftest)
  - [Azure DevOps](https://github.com/infracost/infracost-azure-devops#cost-policy-examples)

Here is an end to end demo of the Infracost and Open Policy Agent integration:

<iframe width="90%" height="450" src="https://www.youtube.com/embed/1rMIfebfd8M" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>

