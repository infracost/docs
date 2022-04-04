---
slug: atlantis_migration
title: Atlantis migration
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Follow this page to migrate from our old [infracost_atlantis_diff.sh bash script](https://github.com/infracost/infracost-atlantis/blob/c510d9d8c3f8d226be1d0882d95f3f477b3fe058/README.md) to our new [integration](https://github.com/infracost/infracost-atlantis).

If you encounter any issues while migrating, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

<img src={useBaseUrl("img/screenshots/atlantis-comment.png")} alt="Cost estimate comment for Atlantis" width="650px" />

## What's new?

🚀 The new [Infracost Atlantis integration](https://github.com/infracost/infracost-atlantis) enables you to post a separate cost estimate pull request comment. This uses the new comment format that includes a cost summary table; different behaviors are supported so you can control when comments are be posted.

We've also updated our [`infracost/infracost-atlantis`](https://github.com/infracost/infracost-atlantis/tree/master#a-use-our-docker-images-recommended) Docker images to tag the versions of Atlantis and Infracost, so you can upgrade Infracost independently of Atlantis.

### Docker images

We provide pre-built Docker images that extend the official Atlantis image and include Infracost. We maintain tags for the latest two 0.x versions of Atlantis:

* `infracost/infracost-atlantis:atlantis0.19-infracost0.9` latest patch version of Atlantis v0.19 and Infracost v0.9
* `infracost/infracost-atlantis:atlantis0.18-infracost0.9` latest patch version of Atlantis v0.18 and Infracost v0.9
* `infracost/infracost-atlantis:latest` latest versions of Atlantis and Infracost

If you already use a custom Docker image for Atlantis, copy the top RUN command from [this Dockerfile](https://github.com/infracost/infracost-atlantis/blob/master/Dockerfile) into your Dockerfile.

### Separate comments

As shown in the screenshot at the top of this page, a separate Infracost comment is posted to show the total cost diff for any projects that have changed alongside the Atlantis comment.

This uses the new `infracost comment` command to generate and post the comment. [Our examples](https://github.com/infracost/infracost-atlantis/tree/master/examples) show how to use this wth different GitHub, GitLab, Azure Repos and Bitbucket.

#### Comment behaviors

The `infracost comment` command has a `behavior` flag, which can be used to describe how and when comments should be posted. We support four options:
- `new`: Create a new cost estimate comment. Pull request followers will be notified on each comment. This is the option we recommend for Atlantis, since by default Atlantis posts a new comment for each plan, so the Infracost comment will appear next to that.
- `hide-and-new`: Minimize previous cost estimate comments and create a new one. Pull request followers will be notified on each comment. This behavior is available only for GitHub and offers the same functionality as the Atlantis `--hide-prev-plan-comments` flag.
- `update`: Create a single comment and update it on changes. This is the "quietest" option. For GitLab/Azure DevOps Repos users, comments will simply be overwritten. GitHub users have additional UI that shows [what/when changed](https://docs.github.com/en/communities/moderating-comments-and-conversations/tracking-changes-in-a-comment) when the comment is updated. Pull request followers will only be notified on the comment create (not updates), and the comment will stay at the same location in the comment history.
- `delete-and-new`: Delete previous cost estimate comments and create a new one. Pull request followers will be notified on each comment.

## Migration guide

1. If you're already using one of the `infracost-atlantis` Docker images, we recommend you lock-down your deployment to one of the following tags so you get the latest backward-compatible patch upgrades without worrying about your deployment breaking:
    * `infracost/infracost-atlantis:atlantis0.19-infracost0.9` latest patch version of Atlantis v0.19 and Infracost v0.9
    * `infracost/infracost-atlantis:atlantis0.18-infracost0.9` latest patch version of Atlantis v0.18 and Infracost v0.9

2. If you're already creating your own custom Docker image, you can edit your Dockerfile to remove `node`, `npm`, `compost` and the old `atlantis_diff.sh` bash script. So you only need this:
    ```Dockerfile
    FROM ghcr.io/runatlantis/atlantis:v0.19.2

    # Install required packages and latest 0.9 version of Infracost
    RUN apk --update --no-cache add ca-certificates openssl openssh-client curl git jq
    RUN \
      curl -s -L https://infracost.io/downloads/v0.9/infracost-linux-amd64.tar.gz | tar xz -C /tmp && \
      mv /tmp/infracost-linux-amd64 /usr/bin/infracost
    ```

3. If you want to use the new `infracost comment` command to post cost estimates as separate pull request comments, upgrade Infracost to v0.9.17 and update your repo.yml to follow one of these examples:
<table>
  <thead>
    <tr>
        <th></th>
        <th>If you're using Atlantis 0.18.2 or newer</th>
        <th>If you're using older than Atlantis 0.18.2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>a) Recommended:</b> combine cost estimates from multiple Terraform directories/workspaces into one Infracost pull request comment. Enables you to see the total cost estimate in one table.</td>
      <td><a href="https://github.com/infracost/infracost-atlantis/tree/master/examples/combined-infracost-comment/README.md">Use this option</a></td>
      <td>Not possible since post_workflow_hooks were added in Atlantis 0.18.2</td>
    </tr>
    <tr>
      <td><b>b)</b> Post one Infracost pull request comment per Terraform directory/workspace. This is the best option for users who cannot upgrade Atlantis yet.</td>
      <td colspan="2" align="center"><a href="https://github.com/infracost/infracost-atlantis/tree/master/examples/multiple-infracost-comments/README.md">Use this option</a></td>
    </tr>
  </tbody>
</table>

4. If you were previously using the `post_condition` environment variable, we recommend you switch to using [Conftest](https://github.com/infracost/infracost-atlantis/tree/master/examples/conftest) or our [thresholds example](https://github.com/infracost/infracost-atlantis/tree/master/examples/thresholds) that uses `jq` and `bash`.

If you encounter any issues while migrating, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄
