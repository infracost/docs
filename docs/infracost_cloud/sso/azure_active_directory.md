---
slug: azure_active_directory
title: Azure Active Directory
---

This page contains instructions for enabling SSO for your organization on Infracost Cloud using Azure Active Directory.

## Steps

1. In the [Infracost Cloud dashboard](https://dashboard.infracost.io) go to `Org Settings` and copy your `Org ID`. You will need to provide this to Infracost in a future step.
2. Login to the [Azure portal](https://portal.azure.com)
3. Go to `Azure Active Directory > App registrations`
4. Click `New registration`
5. For the name enter `Infracost Cloud`
6. For the Redirect URL select `Web` for the platform and enter `https://login.infracost.io/login/callback`
7. Click on `Add a certificate or secret > New client secret`
8. Copy the Application (client) ID. You will need to provide this to Infracost in a future step.
8. Add a client secret with Description `Infracost Cloud SSO` that expires in 24 months.
9. Copy the Client Secret Value. You will need to provide this to Infracost in the next step.
10. Fill out the [SSO setup form here](https://forms.gle/W9Hjm8xBgqQEtnwd7), providing the Application (client) ID, Client secret value and the domain you want enabled for SSO.
