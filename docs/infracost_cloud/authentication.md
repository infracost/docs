---
slug: authentication
title: Authentication
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost Cloud is our new hosted service that enables you to get an Infracost API key by logging in via your GitHub or Google accounts. You can also sign up using an email and password.

This service can be used to:

- **Create organizations**, which are used to manage API keys and associated settings. Every Infracost user has a default organization for personal use. We recommend creating a new organization for your company API key as in the future you'll be able to add other users to organizations.
- **Regenerate API keys**, which was requested by many users.

## Sign up or log in

You can sign up or log in via the the web or CLI. Email addresses are unique in Infracost Cloud. Thus when you log in with GitHub, Google or an email/password, if the email associated with the login is the same as a previous login, you will log in to the same account.

### Web
1. Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in.
2. Go to Settings page and copy your API key:
    - To use it in the CLI, run `infracost configure set api_key MY_API_KEY`.
    - To use it in CI/CD, set the `INFRACOST_API_KEY` environment variable.
3. Run Infracost [commands](/docs/features/cli_commands) as usual.

If you signed up using an email/password, you can change your password by logging out and clicking on "Don't remember your password?".

### CLI
1. [Upgrade](/docs/#1-install-infracost) to Infracost v0.10.3 or later, and run `infracost auth login`.

  This opens an authentication web page and saves the API key locally. If you run into issues, follow the [web](#web) log in and set the CLI API key manually.

2. Run Infracost [commands](/docs/features/cli_commands) as usual.

   If you need to create a new organization or retrieve your API key, use our [web](#web) UI.

## Notes for existing users

1. Existing Infracost API keys will continue to work.
2. Currently there is no automated migration of your old API keys since they were only used by the CLI to retrieve prices from our Cloud Pricing API, e.g. get prices for instance types. We recommend using Infracost Cloud if you'd like to create organizations or regenerate API keys. You can simply discard your old API keys.
3. We recommend Terraform Cloud Run Task users to sign up to Infracost Cloud and create a new Run Task integration so they can associate that with an organization.
