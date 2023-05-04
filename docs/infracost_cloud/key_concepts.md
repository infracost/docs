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

From the Members page, you can invite your team members to join your organization. Currently three roles are supported:
- Org Owner: they own and have complete control over the organization. We currently treat the Org Owner as the main billing contact for the organization too. From the Members page, you can change the Org Owner to another member.
- Org Admin: they can do everything in the organization except deleting the organization..
- Org Viewer: they can view everything in the organization except the API key. They cannot make any changes.

## Repos

Repos, short for code repositories, is where your code lives in GitHub, GitLab or any other source control system. Repo is our top-level required grouping concept. If Infracost cannot detect it, you can provide it via [new environment variables](/docs/features/environment_variables/#environment-variables-to-set-metadata), otherwise cost estimates only show in the "All estimates" tab in Infracost Cloud (and not the dashboard, which shows pull request costs).

A repo contains one or more projects. Infracost Cloud lets you track how the costs of repos and projects change over time.

## Projects

Projects are an optional sub-grouping concept within a repo. The majority of Infracost users will have repos that have many projects, these include:
- code paths for mono repos, each path represents a deployment environment such as dev, stage, prod
- workspaces, same idea as above but done using Terraform workspaces, e.g. for dev, stage, prod
- Terraform or Terragrunt modules, which are components of a repo, e.g. core-api or data-stack

If you setup Infracost for a Terraform module repo, you will not need projects as there is no need for a sub-group.

Infracost auto-generates project names based on code paths, workspaces or Terraform/Terragrunt modules. The name appears in the CLI output and pull request comments and Infracost Cloud as shown below.

<img src={useBaseUrl("img/infracost-cloud/cli-project-name.png")} alt="Auto-generated project name in CLI" />

---

<img src={useBaseUrl("img/infracost-cloud/pr-comment-project-name.png")} alt="Project name in pull request comments" />

---

<img src={useBaseUrl("img/infracost-cloud/infracost-cloud-project-name.png")} alt="Project name in Infracost Cloud" />

### Customize project names

When a long Terraform directory path exists, or paths such as `/tmp/plan.json` are used, the project name might be hard to understand. In such cases we recommend using a [**config file**](/docs/features/config_file/) to set project names to something more understandable.

Alternatively, the `--project-name` flag can also be used; you should set the same project name for both `diff` and `breakdown` commands, failing to use the same name for both breakdown and diff will result in odd diffs.
