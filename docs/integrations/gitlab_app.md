---
slug: gitlab_app
title: GitLab App
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Infracost GitLab App is an automated integration meaning that Infracost runs on our infrastructure and we keep it up to date. Infracost is trusted by thousands of companies around the world, including many of the Fortune 500. We are <a href="https://www.infracost.io/security/" target="_self" rel="">SOC 2 Type II</a> certified.

| 1. Install the Infracost GitLab App | 2. Get merge request comments |
|--------------|-----------|
<img src={useBaseUrl("img/screenshots/gitlab-app-install.png")} alt="Install the GitLab App into any GitLab organization" width="100%"/> | <img src={useBaseUrl("img/screenshots/gitlab-app-comment.png")} alt="Infracost automatically leaves a comment on every merge request"/>

## Benefits

There are two key benefits of using the GitLab App over manual CI/CD integrations:
1. You can add Infracost to multiple repos with one click, no need to install or update CLI versions in your CI/CD pipeline.
2. Infracost runs significantly faster as only changed folders are run based on the GitLab App events.

## Usage

1. Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in to start your free trial (no credit card is needed).

2. Every Infracost user has a default organization for personal use. Create a new organization for your company using the organization dropdown at the top of the page.

  <img src={useBaseUrl("img/infracost-cloud/create-orgs.png")} alt="Create new organization" />

3. Click on Settings > Org Settings > Integrations > GitLab and follow the wizard to select the repos you want to give Infracost access to.

  Infracost has an [OAuth Application](https://docs.gitlab.com/api/applications/) that is used to connect to your GitLab.
  Note that you should create or use a bot GitLab user with "Maintainer" access to the projects you want to use with Infracost. You must be logged in to GitLab UI with that bot user before proceeding to connect, as the Infracost GitLab App will be installed using that user’s account. [GitLab Service Accounts](https://docs.gitlab.com/ee/user/profile/service_accounts.html) cannot be used to install apps as they cannot login to the GitLab UI.

4. If you use private modules, see [this docs section](/docs/features/terraform_modules/#source-control-integrations).

5. If you need to customize how Infracost runs, add an `infracost.yml` or `infracost.yml.tmpl` [config file](/docs/features/config_file/) in the Repo > my repo > Settings tab, or to the root of your repo. The GitLab App will automatically use that file if it's present. The app will also apply any usage values defined in the `infracost-usage.yml` [usage file](/docs/features/usage_based_resources/) at the root of the repo.

6. Open a test merge request and wait for Infracost to leave a merge request comment. The [Infracost Cloud dashboard](https://dashboard.infracost.io) should also show the cost estimate too.

7. When the merge request is merged the Infracost Cloud dashboard will show you the time it was merged, who approved it, who merged it, and any labels associated with it on GitLab.

## GitLab Enterprise and self-managed

Our automated GitLab App integration works with both GitLab Enterprise and GitLab self-managed installations too. Directly integrating Infracost Cloud to GitLab self-managed means you'll get the latest features, the fastest cost estimates and the most robust solution.

Follow the same [usage steps](#usage) as the regular GitLab App above but note that in the installation wizard, you will need to provide your GitLab's domain, and create a new OAuth application in GitLab. The Application ID and Secret from your OAuth application will be needed by Infracost Cloud.

### Incoming and outgoing traffic with GitLab

If you use GitLab's IP allow-list to restrict access to your GitLab installation, or have restricted out-going traffic from your instance, see the [IP allowlisting section in our FAQ](/docs/faq#how-can-i-allowlist-infracost-ip-addresses) for the required IP addresses and domains.

### Other network/security requirements

Email us at [support@infracost.io](mailto:support@infracost.io) if you have custom network or security requirements, for example the use of TLS certificates, or private tunnels.

## How the GitLab App works

The GitLab App needs access to code repos so it can run the CLI against them, and post merge request comments with any cost estimates, tagging, and FinOps policy issues. Therefore the bot/user that is installing the GitLab App should have "Maintainer" access to repos; "Developer" and lower does not work as those roles are not authorized to create repo webhooks (that are used to notify Infracost Cloud about new merge requests).

Each time a merge request is opened or a new commit is pushed to an open merge request, the Infracost GitLab App shows any tagging or FinOps policy issues that were introduced by the merge request along with the cost difference between the most recent commit of the merge request branch and the merge base of the base branch. This mirrors GitLab merge request diff logic and shows only the changes the merge request introduces.

The GitLab App automatically reflects the following changes in Infracost:
- Repos that are **renamed** are automatically updated in Infracost.
- When a repo is **moved** from one GitLab Org to another, that change is reflected in Infracost. When the source and destination GitLab Orgs are in different Infracost Orgs, the move is also performed as long as the Infracost Cloud orgs are in the same Enterprise.
- Repos that are **deleted** or **archived** are marked as archived in Infracost and preserved for audit purposes. Their issues no longer show in the dashboard.

### Disable merge request comments

From the Org Settings > Integrations > GitLab App page, you can disable merge request comments so cost estimates, guardrails and tagging policies are only shown in Infracost Cloud. This enables you to test these features without impacting engineering workflows.

### Dismiss or snooze blocking policy issues

Infracost FinOps and Tagging issues can be dismissed or snoozed directly from the GitLab merge request UI, even if the policy is set to block merge requests. This allows engineers to ship critical changes without having to fix all issues. During non-emergency circumstances, we recommend engineers fix the issues they can, and dismiss/snooze any that they cannot fix.

GitLab merge request comments contain information on how to dismiss/snooze the issues.

Engineers can add a merge request comment `@infracost help` to get more information on how to dismiss/snooze the issues.

<img src={useBaseUrl("img/gitlab/help.png")} alt="help" className="img-rounded" />

#### Dismiss

The dismiss command makes Infracost ignore the detected blocking issues going forward. If you simply need to unblock a MR merge and intend to address the issue later, consider using the snooze command.

Dismissing a policy issue works as follows:
- The engineer adds a comment to the merge request to dismiss the issue using the command `@infracost dismiss <optional reason>`.
- The Infracost GitLab App will then read the comment and react to the comment to let the engineer know the issue is queued for dismissal.
  <img src={useBaseUrl("img/gitlab/dismiss.png")} alt="reaction" className="img-rounded" />
- Infracost will then run another status check on the merge request once the issue is dismissed. This will update the Infracost comment to remove all the blocking issues.
- Any blocking status checks will be updated to succeeded, enabling the engineer to merge the merge request.
  <img src={useBaseUrl("img/gitlab/complete.png")} alt="passing" className="img-rounded" />
- Dismissed issues are shown in Infracost Cloud in the policies pages. You can filter by dismissed issues to see all the issues your engineers have dismissed and their reasons.
  <img src={useBaseUrl("img/github/dismissed-table.png")} alt="dismissed table" className="img-rounded" />  

#### Snooze

The snooze command allows you to unblock the merging of a MR when Infracost detects any blocking policy issues. This is useful for urgent tasks, such as bug fixes.

Snoozing a blocked MR works as follows:
- The engineer adds a comment to the merge request to snooze the issue using the command `@infracost snooze <optional reason>`.
  <img src={useBaseUrl("img/gitlab/snooze.png")} alt="snooze" className="img-rounded" />
- The Infracost GitLab App will then read the comment and react to the comment to let the engineer know the issue is queued for snoozing.
- Any blocking Infracost status checks will be updated to succeeded, enabling the engineer to merge the merge request.
- The next opened MR that touches the related code will display a comment with the snoozed issues and block merging, just like the original.
