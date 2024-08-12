---
slug: spacelift
title: Spacelift
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Integrating Infracost with Spacelift

Infracost integrates with Spacelift in following two ways. If you use these Spacelift features, we recommend you setup both integration options.

1. **Fetching remote environment variables:** Infracost can fetch Spacelift environment variables and propagate them as Terraform `tfvars`. This helps Infracost be aware of Spacelift variables that influence costs, tags, or FinOps policies of your infrastructure.
2. **Fetching private registry modules:** Infracost can fetch remote registry modules from Spacelift and evaluate them wherever they are referenced in your repos.

If you run into any issues, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

## Using Infracost source control integrations

Follow these instructions if you use the Infracost [GitHub or GitLab app](/docs/integrations/cicd/#source-control-integrations-recommended).

1. **Generate Spacelift API Key:**
   - Login to your Spacelift organization that has the modules.
   - Go to the Organization Settings > API keys page.
   - Create a new API Key called "infracost" and select Space=root or the spaces that contain the modules you want Infracost to fetch variables from.
   - Set the Role to Reader.
   - Click on Create and note the auto-downloaded .config file as the secrets inside that file will be needed in steps 2 and 3 below.
   ![Spacelift .config file](/img/infracost-cloud/spacelift/config_file.png)

2. **Update Infracost Cloud to fetch remote environment variables:**
   - Open the .config file that is auto-downloaded when you created the Spacelift API Key.
   - Login to [Infracost Cloud](https://dashboard.infracost.io).
   - Go to Org Settings > Integrations and select your GitHub or GitLab integration.
   - Click Next so you see the "Run configurations" page, shown below.
      ![Run configurations](/img/infracost-cloud/spacelift/github_run_configurations.png)
   - Define the following environment variables:
      - `INFRACOST_SPACELIFT_API_KEY_ENDPOINT`: The URL to your Spacelift account, e.g., `https://mycorp.app.spacelift.io`.
      - `INFRACOST_SPACELIFT_API_KEY_ID`: The ID of your Spacelift API key. You can copy this from the Spacelift Organization Settings > API Keys page.
      - `INFRACOST_SPACELIFT_API_KEY_SECRET`: The API secret associated with your Spacelift API key. This is only available when the secret is created and should be viewable in the .config file that is auto-downloaded from Spacelift.
      > **Note:** For Infracost to populate remote environment variables defined in Spacelift, it needs to infer the Spacelift space name from your local directory. Infracost does this by attempting to match local Terraform var file names or local directories to the Spacelift space name. For example, Infracost would attempt to find environment variables for a "dev" space if a `dev.tfvars` file is located in a Terraform directory.
   - Stay on the "Run configurations" page and follow the next step.

3. **Update Infracost Cloud to fetch private registry modules:**
   - Open the .config file that is auto-downloaded when you created the Spacelift API Key.
   - In Infracost Cloud's "Run configurations" page's "Do you use private registry modules" question, click on Yes.
   - Use the `token` value from the credentials "spacelift.io" section of the .config file as your registry token in Infracost Cloud.
   - The registry host should be set to `spacelift.io` or whatever the hostname for your modules is in your Terraform files (e.g., `source = "myhost.com/mymodule"`).
   - Click on Complete setup.

   ![Run configurations](/img/infracost-cloud/spacelift/github_run_remote_module.png)

3. **Update your Spacelift login policy:**
   - From the Spacelift Organization Settings > Login policy page, update your policy to allow the API key ID to log in. The API key ID can be found on the Spacelift API keys page:
     ```rego
     package spacelift
     allow {
        # Try this without the space_read line first, if that doesn't work then add that line, or change "root" to the space that contains your modules
        space_read["root"] {
           input.session.login == "api::API_KEY_ID_FROM_SPACELIFT_UI"
        }
     }
     ```

4. **Test the configuration:**
   - In Infracost Cloud, go to Visibility > Repos, and select one of your repos that uses private registry modules or remote environment variables. Click on the "Re-run policies/estimate" button and note if the "warnings and errors" at the bottom of the page have been resolved.
   - If there are still registry errors note that unfortunately, the Spacelift registry API doesn't differentiate token permission issues, so when the following curl returns an empty versions array, it means your registry token doesn't have permission to fetch registry modules. In this case, reach out to Spacelift support for assistance.
     ```bash
     $ curl -H 'Authorization: Bearer mytoken' https://app.spacelift.io/registry/modules/v1/MY_ORG/MY_MODULE/spacelift/versions

     {"modules":[{"source":"MY_ORG/MY_MODULE/spacelift","versions":[]}]} # token isn't working
     ```

## Using Infracost CI/CD integrations

Follow these instructions if you use the Infracost [CI/CD integrations](/docs/integrations/cicd/#cicd-integrations).

1. **Generate Spacelift API Key:**
   - Login to your Spacelift organization that has the modules.
   - Go to the Organization Settings > API keys page.
   - Create a new API Key called "infracost" and select Space=root or the spaces that contain the modules you want Infracost to fetch variables from.
   - Set the Role to Reader.
   - Click on Create and note the auto-downloaded .config file as the secrets inside that file will be needed in steps 2 and 3 below.
   ![Spacelift .config file](/img/infracost-cloud/spacelift/config_file.png)

2. **Setup Infracost CLI to fetch remote environment variables:**
   - Open the .config file that is auto-downloaded when you created the Spacelift API Key.
   - Define the following environment variables in the CI/CD pipeline where Infracost is executed:
      - `INFRACOST_SPACELIFT_API_KEY_ENDPOINT`: The URL to your Spacelift account, e.g., `https://mycorp.app.spacelift.io`.
      - `INFRACOST_SPACELIFT_API_KEY_ID`: The ID of your Spacelift API key. You can copy this from the Spacelift Organization Settings > API Keys page.
      - `INFRACOST_SPACELIFT_API_KEY_SECRET`: The API secret associated with your Spacelift API key. This is only available when the secret is created and should be viewable in the .config file that is auto-downloaded from Spacelift.

3. **Setup Infracost CLI to fetch private registry modules:**
   - Open the .config file that is auto-downloaded when you create an API Key and set the following environment variables in your CI/CD pipeline where Infracost is executed:
      - `INFRACOST_TERRAFORM_CLOUD_TOKEN` should be set to the `token` value from the credentials "spacelift.io" section of the .config file.
      - `INFRACOST_TERRAFORM_CLOUD_HOST` should be set to `spacelift.io` or whatever the hostname for your modules is in your Terraform files (e.g., `source = "myhost.com/mymodule"`).

4. **Update your Spacelift login policy:**
   - From the Spacelift Organization Settings > Login policy page, update your policy to allow the API key ID to log in. The API key ID can be found on the API keys page:
     ```rego
     package spacelift
     allow {
        # Try this without the space_read line first, if that doesn't work then add that line, or change "root" to the space that contains your modules
        space_read["root"] {
           input.session.login == "api::API_KEY_ID_FROM_SPACELIFT_UI"
        }
     }
     ```

5. **Test the Configuration:**
   - Trigger a new CI/CD pipeline in one of your repos that uses private registry modules or remote environment variables.
   - Go to Infracost Cloud > Visibility > Pull requests and click on the "See estimates from all commits/uploads if you are debugging" link at the top of the page. Note if the "warnings and errors" at the bottom of the page have been resolved.
   - If there are still registry errors note that unfortunately, the Spacelift registry API doesn't differentiate token permission issues, so when the following curl returns an empty versions array, it means your registry token doesn't have permission to fetch registry modules. In this case, reach out to Spacelift support for assistance.
     ```bash
     $ curl -H 'Authorization: Bearer mytoken' https://app.spacelift.io/registry/modules/v1/MY_ORG/MY_MODULE/spacelift/versions

     {"modules":[{"source":"MY_ORG/MY_MODULE/spacelift","versions":[]}]} # token isn't working
     ```
