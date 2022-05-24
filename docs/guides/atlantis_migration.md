---
slug: atlantis_migration
title: Atlantis migration
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Follow this page to migrate your [Infracost Atlantis integration](https://github.com/infracost/infracost-atlantis).

If you encounter any issues while migrating, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

## What's new?

With the v0.10 release, we'll support two ways to run Infracost with Terraform via `--path`:
1. **Parsing HCL code**: this is the default CLI option as it has [5 key benefits](/docs/guides/v0.10_migration/#1-faster-cli).
    ```shell
    # Terraform variables can be set using --terraform-var-file or --terraform-var
    infracost breakdown --path /code
    ```

2. **Parsing plan JSON file**: this will continue to work as before and is recommended for deployment systems such as Atlantis which are already generating a plan JSON. This page describes how you can migrate to this option.

## Infracost Atlantis migration guide

1. If you are using the `infracost-atlantis` Docker image update the tag to use v0.10 of Infracost. For examples if you were using `infracost/infracost-atlantis:atlantis0.19-infracost0.9` Docker image you should update to `infracost/infracost-atlantis:atlantis0.19-infracost0.10`.

    If you already use a custom Docker image for Atlantis, change the line that's installing Infracost to download from `https://infracost.io/downloads/v0.10/infracost-linux-amd64.tar.gz`. This downloads the latest 0.10.x version and lets you pick up bug fixes and new resource costs each time you build your image. You can also use lock the version using our [releases](https://github.com/infracost/infracost/releases).

2. If you are calling Infracost with `--path=$PLANFILE` you should change this to `--plan=$SHOWFILE` to pass the plan JSON file instead of the plan binary file, since Infracost will be supporting that long term. This might require you to add a `show` step after the `plan` step of the workflow, e.g:
    ```yaml
    workflows:
    terraform-infracost:
      plan:
        steps:
          - init
          - plan
          - show # this writes the plan JSON to $SHOWFILE
          ...
    ```

3. You can see [our full examples](https://github.com/infracost/infracost-atlantis/tree/master/examples) and find one that is the closest to your use-case and adapt as required.
