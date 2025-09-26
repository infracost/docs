---
slug: key_concepts
title: Key concepts
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Authentication

Infracost Cloud supports logging in via [GitHub](/docs/faq/#can-i-log-in-with-github), Google, an email/password, or [enterprise SSO providers](/docs/infracost_cloud/sso).

1. Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in.
2. Switch to the desired organization. Every Infracost user has a default organization for personal use. You should create a new organization for your company using the organization dropdown at the top of the page.
3. Follow the onboarding steps in the dashboard.

If you signed up using an email/password, you can change your password by logging out and clicking on "Don't remember your password?".

Email addresses are unique in Infracost Cloud. Thus when you log in with GitHub, Google or an email/password, if the email associated with the login is the same as a previous login, you will have to link the accounts together in Infracost, so you can log in using either method.

## Organizations

In Infracost Cloud, organizations are used to group repos, policies and other associated settings.

## Team management

From the Org Settings > Members page, you can invite your team members to join your organization. Currently these roles are supported:
- **Org Owner**: they have complete control over the organization. We recommend giving the main billing contact the owner role. From the Members page, the owner can transfer this role to another member. Only the owner can delete the organization or change its name or slug.
- **Org Admin**: they can do everything except deleting the organization, or changing its name or slug. We recommend giving FinOps/Platform team members the admin role so they can setup integrations for everyone, manage users, custom price books, and configure other Org Settings.
- **Org Editor**: they can change everything except Org Settings and data exports. This means they cannot invite members to the organization either. They can view everything except the following Org Settings: API keys, Members, Plan and billing, Custom price books, Integrations. We recommend giving team leads/managers the editor role so they can also add guardrails, policies and reports for their teams if required.
- **Org Viewer**: they can view everything except the following Org Settings: API keys, Members, Plan and billing, Custom price books, Integrations. They cannot make any changes apart from their personal user settings such as their password or multi-factor-authentication setup. We recommend giving engineers the viewer role so they can see preexisting issues and fix them.

## Repos

Repos, short for code repositories, is where your code lives in GitHub, Azure Repos, GitLab or any other source control system. A repo contains one or more projects. Infracost Cloud lets you track how the costs and policy issues of repos and projects change over time.

## Projects

Projects map to repo sub-groups. The majority of Infracost users will have repos that have many projects, these include:
- code paths for mono repos, each path represents a deployment environment such as dev, stage, prod
- workspaces, same idea as above but done using Terraform var files or workspaces
- Terraform or Terragrunt modules, which are components of a repo, e.g. core-api or data-stack

Infracost auto-generates project names based on code paths, workspaces or Terraform/Terragrunt modules. The name appears in the CLI output and pull request comments and Infracost Cloud as shown below. If Infracost cannot detect your projects, or if you would like to customize them, we recommend using a [**config file**](/docs/features/config_file/).

<img src={useBaseUrl("img/infracost-cloud/cli-project-name.png")} alt="Auto-generated project name in CLI" />

---

<img src={useBaseUrl("img/infracost-cloud/pr-comment-project-name.png")} alt="Project name in pull request comments" />

---

<img src={useBaseUrl("img/infracost-cloud/infracost-cloud-project-name.png")} alt="Project name in Infracost Cloud" />

