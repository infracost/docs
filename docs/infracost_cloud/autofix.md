---
slug: autofix
title: AutoFix
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# AutoFix

AutoFix automatically generates fixes for policy failures, enabling you to resolve 
infrastructure issues directly in your pull requests with suggested code changes.

## How it works

When Infracost detects policy failures in your infrastructure code, AutoFix analyzes these violations and generates precise, actionable code fixes for review. The process is designed to be intelligently paced: rather than opening all eligible pull requests at once, AutoFix spaces out PR creation to avoid overwhelming engineering teams and to support a sustainable remediation workflow.

Each suggested fix is created by combining context from the static analysis engine, your organization's policy definitions, and any custom price books in use. AutoFix then generates a pull request containing the proposed code changes, assigning it to the appropriate engineer or team. This ensures that the right people are notified and responsible for reviewing and merging the fix.

Before a pull request is opened, every fix is validated with static analysis to confirm that it addresses the original policy violation and does not introduce new costs or breaking changes. This validation helps maintain code quality and avoids unnecessary disruptions to your infrastructure or development process.

By combining targeted policy enforcement, static analysis validation, and automated assignment of code reviews, AutoFix streamlines the resolution of cost and compliance issues directly within your development workflow.

## Before You Begin

* ✅ Infracost CLI
* ✅ The GitHub integration configured
* ✅ At least one policy enabled in your organization
* ✅ Repository access with read & write permissions

## Getting started

### Creating individual AutoFix fixes

Start by visiting the **Issue Explorer** page in Infracost Cloud, where you can see a list of open policy issues detected within your repositories. Here you can [filter for specific issues](/docs/infracost_cloud/issue_explorer/#filtering) you want to address.

![Browse detected issues in the Issue Explorer](/img/infracost-cloud/autofix/issue-browse.png)

Click on a specific issue to view more details. On the issue detail page, you'll see the option to automatically resolve the violation using AutoFix. Click the **"Open AutoFix PR"** button to generate a pull request that contains the suggested fix.

![AutoFix PR button on an issue detail page](/img/infracost-cloud/autofix/autofix-button.png)

Once the AutoFix PR is created, you’ll see a confirmation message in the UI letting you know that the pull request was successfully opened.

![Success message indicating the AutoFix PR was created](/img/infracost-cloud/autofix/autofix-created.png)

Click the link in the message to review the new pull request. The PR description includes a summary of the problem, which policy triggered the fix, risk information, and relevant deployment details so you can understand the context behind the recommended change.

![The generated AutoFix pull request, showing policy details and deployment information](/img/infracost-cloud/autofix/autofix-pr.png)

Finally, review the diff of the proposed change. For example, in this case, AutoFix is suggesting to switch the architecture to `arm64` to address the policy violation.

![Diff showing the change to 'arm64' architecture in the code](/img/infracost-cloud/autofix/diff.png)

Any build pipelines and checks that are configured to run within you CI/CD system will execute as usual. Once you've reviewed the
change and happy with the result you can merge it.

### Adding AutoFix to a campaign

To enable AutoFix for an entire campaign, start by reviewing your policies within Issue Explorer. Select a policy in the list of open issues, and the popup for creating a new campaign and enabling PR comments will appear. Click `Apply` to create a campaign with the selected policy/policies.

![List of policies showing open issues and the popup to create a campaign with PR comments enabled](/img/infracost-cloud/autofix/create-campaign.png)

Within the campaign creation workflow, you’ll find the option to enable AutoFix. Toggle the AutoFix setting directly in your campaign settings before launching the campaign.

![Toggle to enable AutoFix in the campaign settings page](/img/infracost-cloud/autofix/autofix-enabled.png)

Once enabled and the campaign goes live, Infracost will automatically generate pull requests to fix any open issues associated with the selected policies. This ensures that fixes are systematically applied across all the repositories and teams included in your campaign, accelerating issue resolution with minimal manual effort.

## Assigning AutoFix PRs to team members

By default, AutoFix uses the GitHub [`CODEOWNERS`](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) file to determine which engineers should be assigned to newly generated pull requests. For each proposed fix, AutoFix consults the `CODEOWNERS` file in your repository to identify the relevant code owners for the files being changed. These code owners are automatically set as assignees on the AutoFix PR, ensuring your organization's established code review responsibilities are respected and that the right people are notified.

If your repository does not have a `CODEOWNERS` file set up, we recommend adding one to enable efficient and clear assignment of AutoFix pull requests to responsible engineers or teams. See [GitHub's documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) for more details on configuring a `CODEOWNERS` file.

## Customizing remediation logic 

You can provide organization-specific instructions to guide AutoFix on how it should resolve policy violations. These instructions are defined directly within each policy, allowing you to communicate precise remediation steps or best practices for your team to follow.

To add guidance, go to the policy page for the relevant policy and edit it. In the policy settings, you will find a section where you can enter remediation instructions. This guidance will be used by AutoFix to shape the proposed fixes and will also be included in the pull request description when a fix is generated.

For example, you might add step-by-step remediation advice, command-line examples, or configuration file templates:

> Set the retention days to 15 days for the bucket lifecycle rule or use Glacier for the noncurrent version transision

Be as specific as possible to ensure the fixes align with your organization's standards and engineering workflows. Providing clear, actionable guidance helps AutoFix create more accurate PRs and assists reviewers in understanding the rationale behind each change.


![Autofix prompt](/img/infracost-cloud/autofix/autofix-prompt.png)