---
slug: azure_repos_app
title: Azure Repos App
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Infracost Azure Repos App is an automated integration meaning that Infracost runs on our infrastructure and we keep it up to date. Infracost is trusted by thousands of companies around the world, including many of the Fortune 500. We are <a href="https://www.infracost.io/security/" target="_self" rel="">SOC 2 Type II</a> certified.

<iframe width="100%" height="450" src="https://www.loom.com/embed/c01e93a940524da6a1f221083592f77b?sid=802ceb07-c4bc-4a6e-bca2-bd360f61f350" frameborder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen={true}></iframe>

## Benefits

There are two key benefits of using the Azure Repos App over manual CI/CD integrations:

1. You can add Infracost to thousands of repositories with a few clicks, no need to install or update CLI versions in your CI/CD pipeline. The Infracost Azure Repos App uses a service principal and operates independently of Azure users.
2. Infracost runs faster as only changed folders are run based on Azure Repos App events.

## Usage

1. Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in to start your free trial (no credit card is needed).

2. Create a new organization for your company using the organization dropdown at the top of the page.

   <img src={useBaseUrl("img/infracost-cloud/create-orgs.png")} alt="Create new organization" />

3. Click on **Settings** > **Org Settings** > **Integrations** > **Azure Repos** and enter your details in the form then click on Connect.

   <img src={useBaseUrl("img/azure/azure-app-install-1.png")} alt="Fill in form to create the Azure Repos App" />

4. Infracost will redirect you to the Azure Portal so you can accept to install the Infracost Azure Repos App (also called an <a href="https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal">Azure Enterprise App</a>). You must have either the **Cloud Application Administrator** or **Application Administrator** role in Azure Active Directory (Microsoft Entra ID) as this step creates the Infracost service principal. The app will be installed with permission "**Sign in and read user profile**", which uses the `vso.profile` scope.

   <img src={useBaseUrl("img/azure/azure-app-install-2.png")} alt="Install the Infracost Azure Repos App" />

5. After the Infracost Azure Repos App is installed, you will be redirected back to Infracost. Infracost will need a **short-lived Personal Access Token (PAT)** belonging to **Project Administrator** user. The PAT will need the following scopes and can be deleted in Azure Repos after the setup is done:
   - **Graph (Read & Manage)** - to create Infracost groups in selected projects.
   - **Identity (Read)** - to find the group’s identity descriptor.
   - **Security (Manage)** - to assign permissions to the project groups.
   - **Project and Team (Read)** - to list projects.

If you add new projects in the future, you will need to provide a PAT again to temporarily elevate access for setting up that project. Infracost will use the PAT to do:

- Create an Azure Active Directory (AAD) group in each selected project.
- Add the Infracost service principal to this group. The Azure DevOps Access Level for the Infracost service principal needs to be "Basic" (not the free Stakeholder one) so it has permission to list repos.
- Set permissions to the groups so Infracost can manage webhooks and policies in those projects.

NB: If you have projects added, but you keep seeing a warning that Infracost can't detect any repos, please ensure that the Infracost service principal has **Basic** access level in Azure DevOps Organization settings > Users. Azure can randomly switch it to **Stakeholder**, and we don't have control over this.

6. Once the repos are added to Infracost, you can [send a pull request](/docs/infracost_cloud/get_started/#4-send-a-pull-request) to test the integration.

   <img src={useBaseUrl("img/screenshots/azure-app-comment.png")} alt="Infracost Azure PR comment" />

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
