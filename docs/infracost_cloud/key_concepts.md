---
slug: key_concepts
title: Key concepts
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Organizations

In Infracost Cloud, organizations are used to manage API keys and associated settings. Every Infracost user has a default organization for personal use. We recommend creating a new organization for your company API key as in the future you'll be able to add other users to organizations.

### API keys

Infracost API keys are associated with organizations and can be retrieved from the Org Settings page. If you revoke an API key and generate a new one in its place, you must update all CI/CD integrations and CLI installations that used the old API key.

### Team management

From the Members page, you can invite your team members to join your organization. Currently only one role is supported:
- Org Admin: they can do everything in the organization except delete the organization.

From the Members page, you can also change the Org Owner to another member. We treat the Org Owner as the main billing contact for the organization.

## Repos

Repos (short for "code repositories") are the typical method of code organization used by infrastructure-as-code teams. A repo contains one or more projects. Infracost Cloud lets you track how the costs of the projects within a repo may change in the future.

## Projects

Projects are a flexible concept in Infracost that are used to represent deployment environments, workspaces, code paths (i.e. modules) etc.

Infracost auto-generates project names based on the repo name, detected workspaces or code paths, or user-provided path. The name appears in the CLI output and pull request comments and Infracost Cloud as shown below.

<img src={useBaseUrl("img/infracost-cloud/cli-project-name.png")} alt="Auto-generated project name in CLI" />

---

<img src={useBaseUrl("img/infracost-cloud/pr-comment-project-name.png")} alt="Project name in pull request comments" />

---

<img src={useBaseUrl("img/infracost-cloud/infracost-cloud-project-name.png")} alt="Project name in Infracost Cloud" />

### Override project names

Sometimes, like when a path such as `/tmp/plan.json` is used, the name can become long and hard to understand. In those cases you may want to set the name to something more understandable.

Use the `--project-name` flag with `infracost breakdown` and `diff` to override the auto-generated project name. This flag can also be set in CI/CD integrations, where you can also use environment variables to customize the value.

```shell
infracost breakdown --path plan.json --project-name my-project-123

infracost diff --path plan.json --project-name my-project-123
```

:::tip
The `--project-name` flag should be set to the same value for both `infracost breakdown` and `diff` commands in CI/CD integrations. Otherwise the diff command will not be able to match the projects from the first breakdown run. Failing to do this results in odd diffs.
:::

The `name` attribute in [config-files](/docs/features/config_file/) provides the same functionality as `--project-name`.
