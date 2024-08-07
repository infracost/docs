---
slug: spacelift
title: Spacelift
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost integrates with Spacelift to fetch environment variables and propagate them as Terraform tfvars. This helps Infracost be aware of Spacelift variables that influence costs, tags, or FinOps policies of your infrastructure.

### How to Configure Infracost with Spacelift

1. **Generate an API Key:**

   - Create an API key in your Spacelift account. More information on generating a token can be found [here](https://docs.spacelift.io/integrations/api#spacelift-api-key-token).
   - Assign **reader** access to the spaces from which you want to read environment variables.

2. **Define Environment Variables:**
   Define the following environment variables in one of the VCS integrations you've enabled in Infracost cloud:

   - **INFRACOST_SPACELIFT_API_KEY_ENDPOINT**: The URL to your Spacelift account, e.g., `https://mycorp.app.spacelift.io`.
   - **INFRACOST_SPACELIFT_API_KEY_ID**: The ID of your Spacelift API key.
   - **INFRACOST_SPACELIFT_API_KEY_SECRET**: The secret associated with your API key. This is only available when the secret is created and should be viewable in the file that is auto-downloaded from Spacelift.

   You can configure these environment variables in Infracost cloud by selecting a created VCS integration in your organization settings and navigating to the "Run configurations" tab.

   ![Run configurations](/img/infracost-cloud/spacelift/github_run_configurations.png)

   If you are using a manual CI/CD integration, you can define the environment variables in the CI/CD system you are using.

> **Note:** For Infracost to populate the environment variables, it needs to infer the Spacelift space name from your local directory. Infracost does this by attempting to match local Terraform var file names or local directories to the Spacelift space name. For example, Infracost would attempt to find environment variables for a "dev" space if a `dev.tfvars` file is located in a Terraform directory.
