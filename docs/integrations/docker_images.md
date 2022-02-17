---
slug: docker_images
title: Docker images
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost can be used in any CI/CD system using our CI [Docker images](https://hub.docker.com/r/infracost/infracost/tags):
- `infracost/infracost:ci-0.9` - **Recommended**. Use the latest 0.9.x version to pick up bug fixes and new resource costs.
- `infracost/infracost:ci-0.9.17` - Lock the version.
- `infracost/infracost:ci-latest` - Use the latest Infracost image. This might break when new minor or major versions are released.

Using our docker images to integrate Infracost into your CI/CD pipeline is simple:

1. Run an [infracost breakdown](/docs/features/cli_commands/#breakdown-and-diff) and save the output to a JSON file.
2. Run [infracost comment](/docs/features/cli_commands/#comment-on-pull-requests) to post a cost estimate on your PR.

You might also find the [environment variables](/docs/integrations/environment_variables) page useful.
