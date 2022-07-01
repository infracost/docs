---
slug: authentication
title: Authentication
---

You can sign up or log in via the the web and the CLI. Infracost Cloud supports logging in via GitHub, Google or an email/password.

## Web
1. Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in.
2. Go to Settings page and copy your API key:
    - To use it in the CLI, run `infracost configure set api_key MY_API_KEY`.
    - To use it in CI/CD, set the `INFRACOST_API_KEY` environment variable.
3. Run Infracost [commands](/docs/features/cli_commands) as usual.

If you signed up using an email/password, you can change your password by logging out and clicking on "Don't remember your password?".

## CLI
1. [Upgrade](/docs/#1-install-infracost) to Infracost v0.10.6 or later, and run `infracost auth login`.

  This opens an authentication web page and saves the API key locally. If you run into issues, follow the [web](#web) log in and set the CLI API key manually.

2. Run Infracost [commands](/docs/features/cli_commands) as usual. If you need to create a new organization or retrieve your API key, use our [web](#web) UI.

## Notes for existing users

1. Old Infracost API keys, ones that **do not** start with `ico-`, will continue to work in the CLI and Cloud Pricing API, but not with Infracost Cloud.
2. Currently there is no automated migration of your old API keys since they were only used by the CLI to retrieve prices from our Cloud Pricing API, e.g. get prices for instance types. We recommend you switch to using your API key from Infracost Cloud if you'd like to create organizations or regenerate API keys. You can simply discard your old API keys.
3. We recommend [Terraform Cloud Run Task](/docs/integrations/terraform_cloud_enterprise/#option-2-terraform-run-tasks) users to sign up to Infracost Cloud and create a new Run Task integration so they can associate that with an organization.
