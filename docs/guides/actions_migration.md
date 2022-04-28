---
slug: actions_migration
title: GitHub Actions migration
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Follow this page to migrate your [Infracost GitHub actions](https://github.com/infracost/actions) from V1 to V2. If you encounter any issues while migrating, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

<img src={useBaseUrl("img/screenshots/actions-pull-request.png")} alt="Cost estimate comment for multiple projects" />

## What's new?

The V1 actions used v0.9.x of the Infracost CLI, whereas V2 actions use v0.10.x, which parses Terraform HCL by default. This has three main benefits:
1. Cost estimates can be generated without generating a Terraform plan. This removes our dependency on the Terraform binary - the Infracost CLI is now lightning-fast 🚀
2. Since a Terraform plan is not needed, cloud credentials and Terraform secrets are also not required.
3. Different Infracost runs can now be compared using a new `--compare-to` flag.

## Migration guide

Changing your workflow to work with the prase HCL option requires the following changes:

1. You can remove any mention of `hashicorp/setup-terraform` or `autero1/action-terragrunt@` actions. These are no longer required 🎉
2. You'll need to generate an Infracost JSON file from the target branch that the pull request references (e.g. main/master). This is required as the parse HCL option needs an Infracost run to compare against. Otherwise, your cost estimates will just show a 100% increase from a starting value of $0. You'll want to add the following to the top of your workflow:

    ```yaml
    - name: Checkout target branch
      uses: actions/checkout@v2
      with:
        ref: '${{ github.event.pull_request.base.ref }}'

    - name: Generate Infracost JSON from target branch
      run: |
        infracost breakdown --path path/to/your/terraform \
                            --format json \
                            --out-file /tmp/prior.json
    ```

3. Use the above Infracost JSON to compare against the Infracost run in your pull request. Make sure that you switch your git branch back to one that holds the pull request changes:

    ```yml
    - name: Checkout PR branch
      uses: actions/checkout@v2

    - name: Run Infracost
      run: |
        infracost breakdown --path path/to/your/terraform \
                            --format json \
                            --compare-to /tmp/prior.json \ # point this to the JSON output we generated in step 2
                            --out-file /tmp/infracost.json
    ```

If we put this all together in a working example, it would look like this:

```yml
name: Terraform directory
on: [pull_request]

jobs:
  terraform-directory:
    name: Terraform directory
    runs-on: ubuntu-latest

    steps:
      - name: Checkout target branch
        uses: actions/checkout@v2
        with:
          ref: '${{ github.event.pull_request.base.ref }}'

      - name: Setup Infracost
        uses: infracost/actions/setup@v1
        with:
          api-key: ${{ secrets.INFRACOST_API_KEY }}

      - name: Generate Infracost JSON from target branch
        run: |
          infracost breakdown --path path/to/your/terraform \
                              --format json \
                              --out-file /tmp/prior.json

      - name: Checkout PR branch
        uses: actions/checkout@v2

      - name: Run Infracost
        run: |
          infracost breakdown --path path/to/your/terraform \
                              --format json \
                              --compare-to /tmp/prior.json \
                              --out-file /tmp/infracost.json

      - name: Post Infracost comment
        run: |
          infracost comment github --path /tmp/infracost.json \
                                   --repo $GITHUB_REPOSITORY \
                                   --github-token ${{github.token}} \
                                   --pull-request ${{github.event.pull_request.number}} \
                                   --behavior update
```

We've updated [all our examples](https://github.com/infracost/actions/#examples) to use the new parsing HCL option. You can find one that is the closest to your use-case and adapt as required.

<details>
  <summary>Migrating from infracost/infracost-gh-actions (legacy) to infracost/actions</summary>

Follow this page to migrate from our old [infracost-gh-actions](https://github.com/infracost/infracost-gh-action) repo to our new [actions](https://github.com/infracost/actions/) repo. The infracost-gh-actions is deprecated.

If you encounter any issues while migrating, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

## What's new?

🚀 The new Infracost actions repo provides a composable way of using our actions in your workflow. These JavaScript (not Docker) actions simplify integrating Infracost into your GitHub Actions. In addition, we've added CI-specific output formats, a cost summary table, and different behaviors so you can control when comments are be posted.

### Composable actions

The actions repo contains two main actions as well as many examples demonstrating how they can be used in different workflows. One of the workflows this enables is matrix builds, where one cost estimate comment can be created from a group of Terraform projects. The new actions are:
- setup: install the Infracost CLI in your GitHub Actions workflow.
- comment: adds comments to pull requests.

Composable actions provide three key benefits:
1. No need for a bloated Docker image: The Infracost CLI setup has been split out from the Terraform/Terragrunt setup. This avoids needing a large Docker image and enables other actions to be used to to install required versions of [Terraform](https://github.com/hashicorp/setup-terraform) and [Terragrunt](https://github.com/autero1/action-terragrunt).
2. Safe version upgrades: the Infracost setup action has a `version` field for the CLI, which supports [SemVer ranges](https://www.npmjs.com/package/semver#ranges). So instead of a [full version](https://github.com/infracost/infracost/releases) string, you can use `0.9.x`. This enables you to automatically get the latest backward compatible changes in the 0.9 release (e.g. new resources/features and bug fixes) without worrying about CI/CD pipelines breaking.
3. Versioning for the integration itself: the integration has a version, `infracost/action@v1`, which also supports Semver. So you can use v1 to get backward compatible updates for the integration (e.g. bug fixes).

### CI-specific formats

The `infracost output` command now has two new format options: `github-comment` and `slack-message`. We will be adding formats for GitLab, Azure DevOps repos and Bitbucket later.

### Cost summary

As shown by in the screenshot at the top of this page, comments now include a summary table showing the total cost diff for any projects that have changed.

### Comment behaviors

The comment action includes a `behavior` and a `target-type` attribute.

Behavior describes how and when comments should be posted; we support four options:
- `update`: Create a single comment and update it on changes. This is the "quietest" option. The GitHub comments UI shows [what/when changed](https://docs.github.com/en/communities/moderating-comments-and-conversations/tracking-changes-in-a-comment) when the comment is updated. Pull request followers will only be notified on the comment create (not updates), and the comment will stay at the same location in the comment history.
- `delete-and-new`: Delete previous cost estimate comments and create a new one. Pull request followers will be notified on each comment.
- `hide-and-new`: Minimize previous cost estimate comments and create a new one. Pull request followers will be notified on each comment.
- `new`: Create a new cost estimate comment. Pull request followers will be notified on each comment.

The `target-type` describes where the comment should be posted against, which can be either `pull-request` (default) or `commit`.

## Migration guide

1. Follow the [Quick start guide](https://github.com/infracost/actions/#quick-start) to see how the actions can be used together with `setup-terraform`.

2. Find [an example](https://github.com/infracost/actions/#examples) that is the closest to your use-case and adapt the example as required.

If you encounter any issues while migrating, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄
</details>

