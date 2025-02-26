---
slug: azure_repos_app
title: Azure Repos App
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Infracost Azure Repos App is an automated integration meaning that Infracost runs on our infrastructure and we keep it up to date. Infracost is trusted by thousands of companies around the world, including many of the Fortune 500. We are <a href="https://www.infracost.io/security/" target="_self" rel="">SOC 2 Type II</a> certified.

| 1. Install the Infracost Azure Repos App | 2. Get pull request comments |
|--------------|-----------|
<img src={useBaseUrl("img/screenshots/azure-app-install.png")} width="70%" alt="Install the Infracost Azure Repos App into any Azure organization"/> | <img src={useBaseUrl("img/screenshots/azure-app-comment.png")} alt="Infracost automatically leaves a comment on every pull request"/>

## Benefits

There are two key benefits of using the Azure Repos App over manual CI/CD integrations:
1. You can add Infracost to multiple repositories with a few clicks, no need to install or update CLI versions in your CI/CD pipeline. The Infracost Azure Repos App uses a service principal and operates independently of Azure users.
2. Infracost runs faster as only changed folders are run based on Azure Repos App events.

## Usage

1. Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in to start your free trial (no credit card is needed).

2. Every Infracost user has a default organization for personal use. Create a new organization for your company using the organization dropdown at the top of the page.

   <img src={useBaseUrl("img/infracost-cloud/create-orgs.png")} alt="Create new organization" />

3. Click on **Settings** > **Org Settings** > **Integrations** > **Azure Repos** and follow the wizard to select the projects you want to give Infracost access to.

4. To install the Infracost Azure Repos App, the user must have either the **Cloud Application Administrator** or **Application Administrator** role in Azure Active Directory. The App itself will be installed with read permissions to Azure repos, using the `vso.code` scope.

5. The Infracost Azure Repos App also requires **admin consent** during setup. This step ensures that the app has the necessary permissions to manage service hooks and policies across the selected projects. [Learn more about admin consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview#admin-consent).

6. During setup, Infracost will need a short-lived Personal Access Token (PAT) with additional permissions to do the following. The PAT can be deleted in Azure Repos after the setup is done.
   - Create an Azure Active Directory (AAD) group that can manage service hooks and branch policies.
   - Add the Infracost service principal to this group. The Azure DevOps Access Level for the Infracost service principal needs to be "Basic" (not the free Stakeholder one) so it has permission to list repos.
   - Add selected projects to this group so Infracost can manage webhooks and policies in those projects.
   Ensure that the short-lived PAT belongs to an Owner or Project Collection Administrator and has the following scopes:
      - **Graph (Read & Manage)** - to create the Infracost group.
      - **Identity (Read)** - to find the group’s identity descriptor.
      - **Security (Manage)** - to assign service hooks permissions to the group.
      - **Project and Team (Read)** - to list projects.
      - **Member Entitlement Management (Read & Write)** - to add projects to the Infracost group.

   > **Note**: If you add new projects in the future, you will need to provide a PAT again to temporarily elevate access for setting up that project.

7. If you use private modules, see [this docs section](/docs/features/terraform_modules/#source-control-integrations).

8. If you need to customize how Infracost runs, add an `infracost.yml` or `infracost.yml.tmpl` [config file](/docs/features/config_file/) in the **Repo** > **My repo** > **Settings** tab, or to the root of your repo. The Azure Repos App will automatically use that file if it’s present. The app will also apply any usage values defined in the `infracost-usage.yml` [usage file](/docs/features/usage_based_resources/) at the root of the repo.

9. Open a test pull request and wait for Infracost to leave a pull request comment. The [Infracost Cloud dashboard](https://dashboard.infracost.io) should also show the cost estimate.

10. When the pull request is merged, the Infracost Cloud dashboard will show you the time it was merged, who approved it, who merged it, and any labels associated with it on Azure Repos.

## How the Azure Repos App works

The Infracost Azure Repos App needs read access to your code repositories to run the CLI and write access to pull requests to post comments with any cost estimates, tagging, and FinOps policy issues. The app is installed at the organization level, and you can select the projects and repositories you want to grant access to.

Each time a pull request is opened or a new commit is pushed to an open pull request, the Infracost Azure Repos App shows the any tagging or FinOps policies issues that were introduced by the by the pull request along with the cost difference between the most recent commit of the pull request branch and the merge base of the base branch. This mirrors Azure DevOps pull request diff logic and shows only the changes the pull request introduces.

The Azure Repos App automatically reflects the following changes in Infracost:
- Repos that are **renamed** are updated in Infracost.
- When a repo is **moved** from one Azure DevOps project to another, the change is reflected in Infracost as long as the projects belong to the same Azure organization.
- Repos that are **deleted** or **disabled** (also known as archived) are marked as archived in Infracost for audit purposes. Their issues will no longer show in the dashboard.

### Disable pull request comments

From the **Org Settings** > **Integrations** > **Azure Repos App** page, you can disable pull request comments so cost estimates, guardrails, and tagging policies are only shown in Infracost Cloud. This allows testing these features without impacting the development workflow.

### Dismiss or snooze blocking policy issues

Infracost FinOps and Tagging issues can be dismissed or snoozed directly from the Azure Repos pull request UI, even if the policy is set to block pull requests. This allows engineers to ship critical changes without having to fix all issues. During non-emergency circumstances, we recommend engineers fix the issues they can, and dismiss/snooze any that they cannot fix.

Azure Repos pull request comments contain information on how to dismiss/snooze the issues.

Engineers can add a pull request comment `@infracost help` to get more information on how to dismiss/snooze the issues.

<img src={useBaseUrl("img/gitlab/help.png")} alt="help" className="img-rounded" />

#### Dismiss

The dismiss command makes Infracost ignore the detected blocking issues going forward. If you simply need to unblock a PR merge and intend to address the issue later, consider using the snooze command.

Dismissing a policy issue works as follows:
- The engineer adds a comment to the pull request to dismiss the issue using the command `@infracost dismiss <optional reason>`.
- The Infracost Azure Repos App will then read the comment and react to the comment to let the engineer know the issue is queued for dismissal.
- Infracost will then run another status check on the pull request once the issue is dismissed. This will update the Infracost comment to remove all the blocking issues.
  <img src={useBaseUrl("img/azure/dismiss.png")} alt="passing" className="img-rounded" />
- Any blocking status checks will be updated to succeeded, enabling the engineer to merge the pull request.
- Dismissed issues are shown in Infracost Cloud in the policies pages. You can filter by dismissed issues to see all the issues your engineers have dismissed and their reasons.
  <img src={useBaseUrl("img/github/dismissed-table.png")} alt="dismissed table" className="img-rounded" />  

#### Snooze

The snooze command allows you to unblock the merging of a PR when Infracost detects any blocking policy issues. This is useful for urgent tasks, such as bug fixes.

Snoozing a blocked PR works as follows:
- The engineer adds a comment to the pull request to snooze the issue using the command `@infracost snooze <optional reason>`.
  <img src={useBaseUrl("img/azure/snooze.png")} alt="snooze" className="img-rounded" />
- The Infracost Azure Repos App will then read the comment and react to the comment to let the engineer know the issue is queued for snoozing.
- Any blocking Infracost status checks will be updated to succeeded, enabling the engineer to merge the pull request.
- The next opened PR that touches the related code will display a comment with the snoozed issues and block merging, just like the original.

## Azure DevOps to Infracost App migration

1. Follow the [usage steps](#usage) to install the app. You can do this from the same Infracost organization you are already using. Go to **Org Settings** > **Integrations**.
2. Test it by [sending a pull request](/docs/infracost_cloud/get_started/#4-send-a-pull-request).
3. Remove any Infracost-related steps from your Azure Pipelines.
