---
slug: key_concepts
title: Key concepts
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Organizations

In Infracost Cloud, organizations are used to manage API keys and associated settings. Every Infracost user has a default organization for personal use. We recommend creating a new organization for your company API key as in the future you'll be able to add other users to organizations.

### API keys

Infracost API keys are associated with organizations and can be retrieved from the Org Settings page. If you revoke an API key and generate a new one in its place, you must update all CI/CD integrations and CLI installations that used the old API key.

### Multi-user support

Coming soon! You'll be able to invite other users to your organization and also change the organization owner.

## Projects

Projects are a flexible concept in Infracost that are used to represent code repos, deployment environments, workspaces etc.

Infracost auto-generates project names based on the user-provided path, or git repo name. The name appears in the CLI output, pull request comments and Infracost Cloud as shown below.

<img src={useBaseUrl("img/infracost-cloud/cli-project-name.png")} alt="Auto-generated project name in CLI" />

---

<img src={useBaseUrl("img/infracost-cloud/pr-comment-project-name.png")} alt="Project name in pull request comments" />

---

<img src={useBaseUrl("img/infracost-cloud/infracost-cloud-project-name.png")} alt="Project name in Infracost Cloud" />

### Override project names

There are two main reasons why you might want to override the project name:
1. When a path such as `/tmp/plan.json` is used, the name can become long and hard to understand. This feature lets you set the name to something more understandable.
2. Infracost Cloud groups projects with the same name together, so if you'd like multiple cost estimates to be associated with a project, use the same name for them.

Use the `--project-name` flag with `infracost breakdown` and `diff` to override the auto-generated project name. This flag can also be set in CI/CD integrations, where you can also use environment variables to customize the value.

```shell
infracost breakdown --path plan.json --project-name my-project-123

infracost diff --path plan.json --project-name my-project-123
```

:::tip
The `--project-name` flag should be set to the same value for both `infracost breakdown` and `diff` commands in CI/CD integrations. Otherwise the diff command will not be able to match the projects from the first breakdown run. Failing to do this results in odd diffs.
:::

The `name` attribute in [config-files](/docs/features/config_file/) provides the same functionality as `--project-name`.
