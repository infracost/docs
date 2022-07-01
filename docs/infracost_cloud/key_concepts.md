---
slug: key_concepts
title: Key concepts
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Organizations

In Infracost Cloud, organizations are are used to manage API keys and associated settings. Every Infracost user has a default organization for personal use. We recommend creating a new organization for your company API key as in the future you'll be able to add other users to organizations.

### Multi-user support

As a temporary workaround until we add support for multiple users and permissions, you can log in using a team email/password and share access to your account.

Email addresses are unique in Infracost Cloud. Thus when you log in with GitHub, Google or an email/password, if the email associated with the login is the same as a previous login, you will be given the option to link the accounts together, so you can log in using either method.

### API keys

Infracost API keys are associated with organizations and can be retrieved from the Org Settings page. If you revoke an API key and generate a new one in its place, you must update all CI/CD integrations and CLI installations that used the old API key.

## Projects

Projects are a flexible concept in Infracost that are used to represent code repos, deployment environments, workspaces etc.

Project names default to the path or git repo name, and appear in the CLI output, pull request comments, and Infracost Cloud as shown below.

<img src={useBaseUrl("img/infracost-cloud/cli-project-name.png")} alt="Auto-generated project name in CLI" />

---

<img src={useBaseUrl("img/infracost-cloud/pr-comment-project-name.png")} alt="Project name in pull request comments" />

---

<img src={useBaseUrl("img/infracost-cloud/infracost-cloud-project-name.png")} alt="Project name in Infracost Cloud" />

### Override default project names

In Infracost Cloud, projects with the same name are grouped together, so it can be useful to override default project names. This is specially useful when running Infracost with [plan JSON files](/docs/features/cli_commands/#option-2-terraform-plan-json) as the auto-generated project name is the file path.

Use the `--project-name` flag with `infracost breakdown` and `diff` to override the auto-generated project name:

```shell
infracost breakdown --path plan.json --project-name my-project-123

infracost diff --path plan.json --project-name my-project-123
```

:::tip
The `--project-name` flag should be set to the same value for both `infracost breakdown` and `diff` commands in CI/CD integrations. Otherwise the diff command will not be able to match the projects from the first breakdown run. Failing to do this results in odd diffs.
:::

The `name` attribute in [config-files](/docs/features/config_file/) provides the same functionality as `--project-name`.
