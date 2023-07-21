---
slug: generic_cicd
title: Generic CI/CD integration
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page is useful if you cannot use one of our [existing CI/CD](/docs/integrations/cicd/) integration. Infracost can be used in any CI/CD system using the following steps. Follow our [GitLab CI integration](https://gitlab.com/infracost/infracost-gitlab-ci/) to see examples of how the following steps are used.

1. Use one of the following options to add the Infracost CLI into your CI/CD:

    <Tabs
      defaultValue="docker"
      values={[
        {label: 'Docker images', value: 'docker'},
        {label: 'CLI executable', value: 'cli-executable'},
    ]}>
      <TabItem value="docker">

      We maintain specific [CI Docker images](https://hub.docker.com/r/infracost/infracost/tags):
      ```text
      infracost/infracost:ci-0.10   - Recommended, uses latest patch version of 0.10 to pickup bug fixes and new resources
      infracost/infracost:ci-latest - Use latest Infracost image, might break when new minor/major versions are released
      ```

      </TabItem>
      <TabItem value="cli-executable">

      Use `curl -O -L https://infracost.io/downloads/v0.10/infracost-linux-amd64.tar.gz` to download the latest patch version of 0.10 to pickup bug fixes and new resource costs. You can also use [latest](https://github.com/infracost/infracost/releases/latest/download/infracost-linux-amd64.tar.gz), which might break when new minor/major versions are released.

      </TabItem>
    </Tabs>

2. If your infra code is in GitHub, GitLab, Azure Repos, or Bitbucket, run the [`breakdown`, `diff` and `comment` commands](/docs/features/cli_commands/#comment-on-pull-requests) to generate a cost estimate and post a comment directly.

  Otherwise, run the [`breakdown`, `diff` and `output` commands](/docs/features/cli_commands/#combined-output-formats) to save the comment markdown (e.g. using `--format github-comment`) and post it from your CI/CD system using curl or other command line tools.

  You should also set the [required environment variables](/docs/features/environment_variables/#environment-variables-to-set-metadata).
