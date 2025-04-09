---
slug: engineer_guide
title: Engineer guide
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page is for engineers seeing Infracost pull request comments for the first time. It provides an overview of Infracost and what to do next.

### 1. What is Infracost?
Infracost ensures your Terraform code changes follow your organization's tagging and FinOps policies **before deployment** (shift left). This helps you adopt FinOps best practices from the start, avoiding the need for time-consuming corrections later. This also prevents money from being wasted in the cloud. Cost estimates shown by Infracost are based on your custom cloud pricing.

### 2. What should I do when I see Infracost comments in pull requests?
You should review the Infracost pull request comment and push commits to fix issues before you merge the pull request. See an example below, notice how this pull request is not following two FinOps best practices, and is also missing the important "component" tag.

<img src={useBaseUrl("img/infracost-cloud/engineer-guide/pr-comment.png")} alt="Infracost pull request comment" />

### 3. What if I can't fix it or don't have time just now?
First fix any issues you can. Then you can add a pull request comment with `@infracost help` to get more information on how to dismiss or snooze remaining issues.

<img src={useBaseUrl("img/infracost-cloud/engineer-guide/help-command.png")} alt="Infracost pull request help command" />

### 4. How can I see all issues for my repos?
You can see all issues from Infracost Cloud dashboard:
1. Go to https://dashboard.infracost.io
2. Just enter using your company email address (leave the password empty) and click on Log In. You will be redirected to login with SSO. If you do not get redirected to SSO, that means your company has not enabled SSO and you need to be invited to the account so please reach out to your FinOps lead or engineering management.
  
  <img src={useBaseUrl("img/infracost-cloud/engineer-guide/login.png")} alt="Infracost Cloud login" />
3. From the organization selector in the top menu, select your organization.
4. In the top menu, click on Visibility > Repos, and search for your repo name. If you cannot see your repo, reach out to your FinOps lead or engineering management to add the repo as that requires Admin access to Infracost.
5. Click on the repo to see all FinOps and tagging issues.
6. You can also download a CSV of all current issues on the repo base branches (e.g. master or main) and filter or group things in Excel:
    - To download a CSV of all tagging issues, from the top menu, goto Governance > Tagging policies > Export CSV.
    - To download a CSV of all FinOps issues, from the top menu, goto Governance > FinOps policies > Export CSV.
