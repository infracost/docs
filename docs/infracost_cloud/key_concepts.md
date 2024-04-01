---
slug: key_concepts
title: Key concepts
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Authentication

You can sign up or log in via the the web and the CLI. Infracost Cloud supports logging in via GitHub, Google, an email/password, or Enterprise SSO.

### Web
1. Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in.
2. Switch to the desired organization. Every Infracost user has a default organization for personal use. You should create a new organization for your company using the organization dropdown at the top of the page.
3. Go to Org Settings page and copy your API key:
  <img src={useBaseUrl("img/infracost-cloud/org-api-key.png")} alt="Copy organization API key" />
3. To use it in CI/CD, set the `INFRACOST_API_KEY` environment variable.
4. To use it in the CLI, run `infracost configure set api_key MY_API_KEY`.
5. Run Infracost [commands](/docs/features/cli_commands) or [CI/CD integrations](/docs/integrations/cicd/) as usual.

If you signed up using an email/password, you can change your password by logging out and clicking on "Don't remember your password?".

Email addresses are unique in Infracost Cloud. Thus when you log in with GitHub, Google or an email/password, if the email associated with the login is the same as a previous login, you will be given the option to link the accounts together, so you can log in using either method.

### CLI
1. [Upgrade](/docs/#1-install-infracost) to the latest version.
2. Run `infracost auth login`.
  This opens an authentication web page and saves the API key locally. If you run into issues, follow the [web](#web) log in and set the CLI API key manually.
3. Run Infracost [commands](/docs/features/cli_commands) as usual. If you need to create a new organization or retrieve your API key, use our [web](#web) UI.

### Enterprise Single Sign On (SSO)
Infracost Cloud also supports authenticating with [Enterprise SSO providers](/docs/infracost_cloud/sso/overview).

## Organizations

In Infracost Cloud, organizations are used to manage API keys and associated settings. Every Infracost user has a default organization for personal use. We recommend creating a new organization for your company API key as in the future you'll be able to add other users to organizations.

### API keys

Infracost API keys are associated with organizations and can be retrieved from the Org Settings page. If you revoke an API key and generate a new one in its place, you must update all CI/CD integrations and CLI installations that used the old API key.

### Team management

From the Members page, you can invite your team members to join your organization. Currently these roles are supported:
- Org Owner: they have complete control over the organization. From the Members page, the owner can make another member the owner instead. We recommend giving the main billing contact the owner role. Only the owner can delete the organization or change its name or slug.
- Org Admin: they can do everything in the organization except deleting it, or changing its name or slug. We recommend giving FinOps/Platform team members the admin role so they can setup the Infracost integrations for everyone and manage custom price books etc.
- Org Editor: they can change everything except things in the Org Settings area and data exports. This means they cannot invite members to the organization either. We recommend giving team leads/managers the editor role so they can also add guardrails, policies and reports for their teams if required.
- Org Viewer: they can view everything in the organization except things in the Org Settings area. They cannot make any changes apart from their personal user settings such as their password or multi-factor-authentication setup. We recommend giving engineers the viewer role so they can see preexisting issues and fix them.

## Repos

Repos, short for code repositories, is where your code lives in GitHub, GitLab or any other source control system. Repo is our top-level required grouping concept. If Infracost cannot detect it, you can provide it via [new environment variables](/docs/features/environment_variables/#environment-variables-to-set-metadata), otherwise cost estimates only show in the "All estimates" tab in Infracost Cloud (and not the dashboard, which shows pull request costs).

A repo contains one or more projects. Infracost Cloud lets you track how the costs of repos and projects change over time.

## Projects

Projects map to repo sub-groups. The majority of Infracost users will have repos that have many projects, these include:
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
