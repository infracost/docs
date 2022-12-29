---
slug: okta
title: Okta
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page contains instructions for enabling SSO for your organization on Infracost Cloud using Okta.

## Steps

1. In the [Infracost Cloud dashboard](https://dashboard.infracost.io) go to `Org Settings` and copy your `Org ID`. You will need to provide this to Infracost in a future step.
2. Login to the Okta Admin dashboard
3. Go to `Applications > Applications`
4. Click `Create App Integration`
5. Select `SAML 2.0` and click Next.
6. For the App name enter `Infracost Cloud` and click Next.
7. For Single sign on URL enter `https://login.infracost.io/login/callback?connection=<YOUR INFRACOST ORG ID>`
8. For the Audience URL (SP Entity ID) enter `urn:auth0:infracost:<YOUR INFRACOST ORG ID>`
  <img src={useBaseUrl("img/sso/okta-saml-settings.png")} alt="Okta Attribute Statements form" />
9. Add the following for the Attribute Statements section and click Next.
  <img src={useBaseUrl("img/sso/okta-attribute-statements.png")} alt="Okta Attribute Statements form" />
10. Choose 'I'm an Okta customer adding an internal app' and click Finish
11. In the Sign on tab, scroll down to the SAML Signing Certificates section. On the right-hand side click the button to View SAML setup instructions.
12. Copy the Identity Provider Single Sign-On URL and download the certificate.
13. Fill out the [SSO setup form here](https://forms.gle/W9Hjm8xBgqQEtnwd7), providing the Identity Provider Single Sign-On URL, certificate and the domain you want enabled for SSO.
14. In the Okta Admin dashboard assign any users to the Infracost Cloud app.
