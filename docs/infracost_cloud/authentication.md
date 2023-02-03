---
slug: authentication
title: Authentication
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can sign up or log in via the the web and the CLI. Infracost Cloud supports logging in via GitHub, Google or an email/password.

## Web
1. Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in.
2. Switch to the desired organization. Every Infracost user has a default organization for personal use. You should create a new organization for your company using the organization dropdown at the top of the page.
3. Go to Org Settings page and copy your API key:
  <img src={useBaseUrl("img/infracost-cloud/org-api-key.png")} alt="Copy organization API key" />
3. To use it in CI/CD, set the `INFRACOST_API_KEY` environment variable.
4. To use it in the CLI, run `infracost configure set api_key MY_API_KEY`.
5. Run Infracost [commands](/docs/features/cli_commands) or [CI/CD integrations](/docs/integrations/cicd/) as usual.

If you signed up using an email/password, you can change your password by logging out and clicking on "Don't remember your password?".

Email addresses are unique in Infracost Cloud. Thus when you log in with GitHub, Google or an email/password, if the email associated with the login is the same as a previous login, you will be given the option to link the accounts together, so you can log in using either method.

## CLI
1. [Upgrade](/docs/#1-install-infracost) to the latest version.
2. Run `infracost auth login`.
  This opens an authentication web page and saves the API key locally. If you run into issues, follow the [web](#web) log in and set the CLI API key manually.
3. Run Infracost [commands](/docs/features/cli_commands) as usual. If you need to create a new organization or retrieve your API key, use our [web](#web) UI.

## Enterprise Single Sign On (SSO)
Infracost Cloud supports authenticating with Enterprise SSO providers. To set up SSO with Infracost Cloud follow one of the following guides:
* [Azure Active Directory](/docs/infracost_cloud/sso/azure_active_directory)
* [Okta](/docs/infracost_cloud/sso/okta)
* [Google Workspace](/docs/infracost_cloud/sso/google_workspace)
* [Other SAML providers](/docs/infracost_cloud/sso/other_saml)

Once your SSO connection is configured any user authenticating with the your company domain name in the [usual log in page](https://dashboard.infracost.io) will be redirected to your SSO provider for authenticating.

