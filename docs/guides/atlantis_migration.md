---
slug: atlantis_migration
title: Atlantis migration
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Follow this page to migrate from our old [infracost_atlantis_diff.sh bash script](https://github.com/infracost/infracost-atlantis/blob/c510d9d8c3f8d226be1d0882d95f3f477b3fe058/README.md) to our new [integration](https://github.com/infracost/infracost-atlantis).

<img src={useBaseUrl("img/screenshots/atlantis-comment.png")} alt="Cost estimate comment for Atlantis" width="650px" />

## What's new?

🚀 The new [Infracost Atlantis integration](https://github.com/infracost/infracost-atlantis) enables you to post a separate cost estimate pull request comment. This uses the new comment format that includes a cost summary table; different behaviors are supported so you can control when comments are be posted.

We've also updated our [`infracost/infracost-atlantis`](https://github.com/infracost/infracost-atlantis/tree/master#a-use-our-docker-images-recommended) Docker images to tag the versions of Atlantis and Infracost, so you can upgrade Infracost independently of Atlantis.

### Docker images

We provide pre-built Docker images that extend the official Atlantis image and include Infracost. We maintain tags for the latest two 0.x versions of Atlantis:

* `infracost/infracost-atlantis:atlantis0.18-infracost0.9` latest patch version of Atlantis v0.18 and Infracost v0.9
* `infracost/infracost-atlantis:atlantis0.17-infracost0.9` latest patch version of Atlantis v0.17 and Infracost v0.9
* `infracost/infracost-atlantis:latest` latest versions of Atlantis and Infracost

If you already use a custom Docker image for Atlantis, copy the top RUN command from [this Dockerfile](https://github.com/infracost/infracost-atlantis/blob/master/Dockerfile) into your Dockerfile.

### Separate comments

As shown in the screenshot at the top of this page, a separate Infracost comment is posted to show the total cost diff for any projects that have changed alongside the Atlantis comment.

This uses the new `infracost comment` command to generate and post the comment. [Our examples](https://github.com/infracost/infracost-atlantis/tree/master/examples) show how to use this wth different GitHub, GitLab and Azure Repos.

If you are using Atlantis with BitBucket, please 👍 [this GitHub issue](https://github.com/infracost/infracost/issues/1173) so you get a notification when we support it.

#### Comment behaviors

The `infracost comment` command has a `behavior` flag, which can be used to describe how and when comments should be posted. We support four options:
- `new`: Create a new cost estimate comment. Pull request followers will be notified on each comment. This is the option we recommend for Atlantis, since by default Atlantis posts a new comment for each plan, so the Infracost comment will appear next to that.
- `hide-and-new`: Minimize previous cost estimate comments and create a new one. Pull request followers will be notified on each comment. This behavior is available only for GitHub and offers the same functionality as the Atlantis `--hide-prev-plan-comments` flag.
- `update`: Create a single comment and update it on changes. This is the "quietest" option. For GitLab/Azure DevOps Repos users, comments will simply be overwritten. GitHub users have additional UI that shows [what/when changed](https://docs.github.com/en/communities/moderating-comments-and-conversations/tracking-changes-in-a-comment) when the comment is updated. Pull request followers will only be notified on the comment create (not updates), and the comment will stay at the same location in the comment history.
- `delete-and-new`: Delete previous cost estimate comments and create a new one. Pull request followers will be notified on each comment.

## Migration guide

Follow the [infracost-atlantis README](https://github.com/infracost/infracost-atlantis) to see how to integrate Infracost with your existing Atlantis workflow. Since Atlantis does not have a plugins concept, you need to make two decisions to integrate it with Infracost, both of these are described in the readme.

If you encounter any issues while migrating, please [create an issue](https://github.com/infracost/infracost-atlantis/issues/new) or join our [community Slack](https://www.infracost.io/community-chat) and we'll address them as soon as possible.
