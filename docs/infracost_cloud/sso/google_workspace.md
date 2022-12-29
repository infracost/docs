---
slug: google_workspace
title: Google Workspace
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page contains instructions for enabling SSO for your organization on Infracost Cloud using Google Workspace.

## Steps

1. In the [Infracost Cloud dashboard](https://dashboard.infracost.io) go to `Org Settings` and copy your `Org ID`. You will need this when setting up the SAML app in Google Workspace.
2. Login to [Google Workspace admin](https://admin.google.com)
3. Go to `Apps > Web and mobile apps`
4. Click `Add app > Add custom SAML app`
5. For the App name enter `Infracost Cloud`
6. Copy the SSO URL and download the Certificate. You will need to supply these to Infracost in a future step. Click Continue.
7. In the ACS URL enter: `https://login.infracost.io/login/callback?connection=<YOUR INFRACOST ORG ID>`
8. In the Entity ID enter: `urn:auth0:infracost:<YOUR INFRACOST ORG ID>`
9. Tick `Signed response`
10. For Name ID format choose `UNSPECIFIED` and for Name ID choose `Basic Information > Primary email`. The form should look like the following:
  <img src={useBaseUrl("img/sso/google-workspace-service-provider.png")} alt="Google Workspace Service Provider form" />
11. Click Continue
12. Add the following Attributes and click Finish:
  <img src={useBaseUrl("img/sso/google-workspace-attributes.png")} alt="Google Workspace Service Provider form" />
13. Fill out the [SSO setup form here](https://forms.gle/W9Hjm8xBgqQEtnwd7), providing the SSO URL, Certificate and the domain you want enabled for SSO.
