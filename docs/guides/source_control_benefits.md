---
slug: source_control_benefits
title: Source control integration benefits
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Source control integrations ([GitHub App](/docs/integrations/github_app/) or [GitLab App](/docs/integrations/gitlab_app/)) have three key benefits over [CI/CD integrations](/docs/integrations/cicd/#cicd-integration):

1. You can quickly add Infracost to multiple repos with one click, no need to install or update CLI versions in your CI/CD pipeline. Infracost runs on our infrastructure and we keep it up to date.

2. Infracost runs significantly faster as only changed folders are run based on the GitHub/GitLab App events.

3. If you use Infracost Cloud (our SaaS product), all features work without you needing to make any changes to your CI/CD pipelines. If you use CI/CD integrations, you should implement the following extra steps.

## Extra steps needed for CI/CD integrations and Infracost Cloud

### 1. Required CLI version

Currently, version 0.10.25+ of the Infracost CLI is needed for the Infracost Cloud features to work correctly.

### 2. Guardrails

To make the [Guardrails](/docs/infracost_cloud/guardrails/) blocking/unblocking pull requests feature work:
  - In your CI/CD integration, you should check the exit code of the `infracost comment` command (or `infracost upload`), and fail the build if it returns an exit code of `1`. That indicates that Guardrails failed.
  - When a pull request is reviewed and unblocked in Infracost Cloud, the engineer needs to re-run the Infracost CLI (or pipeline). This is so it can pick up the unblocked status from Infracost Cloud and return an exit code of `0` (meaning success).

### 3. Tagging policies
To make the [Tagging policies](/docs/infracost_cloud/tagging_policies/) blocking/unblocking pull requests feature work:
  - In your CI/CD integration, you should check the exit code of the `infracost comment` command (or `infracost upload`), and fail the build if it returns an exit code of `1`. That indicates that tagging policies failed. Once the engineer fixes the issue, the CLI returns exit code `0` (meaning success).

### 4. Branch details
To show costs and tagging policy failures on default branches (e.g. master or main):
  - In your CI/CD integration, on each default branch push, you should run these steps to run Infracost breakdown and upload the results:
  ```sh
  infracost breakdown --config-file=infracost.yaml \
    --format=json --out-file=/tmp/infracost.json
  
  infracost upload --path=/tmp/infracost.json
  ```

### 5. Pull request status

To set the pull request status (e.g. open, closed, merged), use the following API call. This will enable you to see the pull request status in Infracost Cloud and use them in dashboard filters or reports.

```shell
curl -X POST -H "Content-Type: application/json" \
-H "X-API-Key: $INFRACOST_API_KEY" \
-d '{ "query": "mutation { updatePullRequestStatus(url: \"https://github.com/YOUR_ORG/YOUR_REPO/pull/323\", status: MERGED) }" }' \
https://dashboard.api.infracost.io/graphql
```

The pull request status can be one of three:
  - `OPEN`: the pull request is currently open, thus if you want to review the most expensive pull requests that are in-flight, only focus on these.
  - `CLOSED`: the pull request was closed without being merged. These pull requests can probably be ignored altogether as most of the time they're just noise.
  - `MERGED`: the pull request was merged into the base branch, these can be checked when auditing actual cloud costs to see what happened.


<details><summary>Example GitLab CI code to set status to Merged</summary>

  ```yaml
  stages:
    - infracost # the main infracost stage from https://gitlab.com/infracost/infracost-gitlab-ci
    - infracost:update-mr-status # new stage below to update the merge request status

  # Set the MR status to Merged in Infracost Cloud
  infracost:update-mr-status:
    image: bash:latest
    before_script:
      - apk add curl --upgrade
      # Extract Merge Request ID from the Commit Message
      - if [[ ${CI_COMMIT_MESSAGE} =~ ${PATTERN} ]];
        then MR_ID=${BASH_REMATCH[1]};
        else echo "${VTY_RB}Unable to extract Merge Request ID${VTY_P}"; exit 1;
        fi;
    script:
      - |
        curl \
          --request POST \
          --header "Content-Type: application/json" \
          --header "X-API-Key: ${INFRACOST_API_KEY}" \
          --data "{ \"query\": \"mutation {updatePullRequestStatus( url: \\\"${CI_PROJECT_URL}/merge_requests/${MR_ID}\\\", status: MERGED )}\" }" \
          "https://dashboard.api.infracost.io/graphql";
    variables:
      PATTERN: "See merge request.+?!([0-9]+)"
      INFRACOST_API_KEY: $INFRACOST_API_KEY
    rules:
      - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH && $CI_COMMIT_TITLE =~ /^Merge branch/
  ```
</details>

<details><summary>Example Azure Pipelines code to set status to Merged</summary>

  ```yaml
  trigger:
    - main
  
  pool:
    vmImage: ubuntu-latest
  
  steps:
    - bash: |
        PATTERN="Merged PR ([0-9]+):"
        if [[ "$(Build.SourceVersionMessage)" =~ $PATTERN ]]; then 
          PR_ID=${BASH_REMATCH[1]}
          echo "Updating status of $PR_ID"
          curl \
            --request POST \
            --header "Content-Type: application/json" \
            --header "X-API-Key: $(infracostApiKey)" \
            --data "{ \"query\": \"mutation {updatePullRequestStatus( url: \\\"$(Build.Repository.Uri)/pullrequest/${PR_ID}\\\", status: MERGED )}\" }" \
            "https://dashboard.api.infracost.io/graphql";
        else 
          echo "No Pull Request ID detected"
        fi
      displayName: 'Update PR status in Infracost'

  ```
</details>
