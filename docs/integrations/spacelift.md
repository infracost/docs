---
slug: spacelift
title: Spacelift
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Integrating Infracost with Spacelift

Infracost integrates with Spacelift in two main ways:

1. **Fetching Private Registry Repositories:** Infracost can use Spacelift as a remote registry to download and evaluate remote modules referenced in your configuration.
2. **Propagating Remote Environment Configuration:** Infracost can fetch Spacelift environment variables and propagate them as Terraform `tfvars`. This helps Infracost be aware of Spacelift variables that influence costs, tags, or FinOps policies of your infrastructure.

## Configure Infracost to use Spacelift as a remote registry

> **Note:** For Infracost to populate the environment variables, it needs to infer the Spacelift space name from your local directory. Infracost does this by attempting to match local Terraform var file names or local directories to the Spacelift space name. For example, Infracost would attempt to find environment variables for a "dev" space if a `dev.tfvars` file is located in a Terraform directory.

### With Infracost Cloud

1. **Generate an API Key:**
   - Login to your Spacelift organization that has the modules.
   - Go to the Organization Settings > API keys page.
   - Create a new API Key called "infracost" and select Space=root or the spaces that contain the modules you want Infracost to fetch variables from.
   - Set the Role to Reader.

2. **Define Environment Variables:**
   - Define the following environment variables in one of the VCS integrations you've enabled in Infracost Cloud:
      - `INFRACOST_SPACELIFT_API_KEY_ENDPOINT`: The URL to your Spacelift account, e.g., `https://mycorp.app.spacelift.io`.
      - `INFRACOST_SPACELIFT_API_KEY_ID`: The ID of your Spacelift API key.
      - `INFRACOST_SPACELIFT_API_KEY_SECRET`: The secret associated with your API key. This is only available when the secret is created and should be viewable in the file that is auto-downloaded from Spacelift.

   You can configure these environment variables in Infracost Cloud by selecting a created VCS integration in your organization settings and navigating to the "Run configurations" tab.

   ![Run configurations](/img/infracost-cloud/spacelift/github_run_configurations.png)

### Using a manual CI/CD integration

1. **Generate an API Key:**
   - Login to your Spacelift organization that has the modules.
   - Go to the Organization Settings > API keys page.
   - Create a new API Key called "infracost" and select Space=root or the spaces that contain the modules you want Infracost to fetch variables from.
   - Set the Role to Reader.

2. **Define Environment Variables:**
   - Define the following environment variables in the CI/CD pipeline where Infracost is executed:
      - `INFRACOST_SPACELIFT_API_KEY_ENDPOINT`: The URL to your Spacelift account, e.g., `https://mycorp.app.spacelift.io`.
      - `INFRACOST_SPACELIFT_API_KEY_ID`: The ID of your Spacelift API key.
      - `INFRACOST_SPACELIFT_API_KEY_SECRET`: The secret associated with your API key. This is only available when the secret is created and should be viewable in the file that is auto-downloaded from Spacelift.

## Configure Infracost to use Spacelift to define variable inputs for your projects

### With Infracost Cloud

1. **Generate an API Key:**
   - Login to your Spacelift organization that has the modules.
   - Go to the Organization Settings > API keys page.
   - Create a new API Key called "infracost" and select Space=root or the spaces that contain your modules.
   - Set the Role to Reader.

2. **Upload Credentials to Infracost Cloud:**
   - Open the .config file that is auto-downloaded when you create an API Key.
   - Use the token value from the credentials "spacelift.io" section as your token in Infracost Cloud. The host should be set to spacelift.io or whatever the hostname for your modules is in your Terraform files (e.g., `source = "myhost.com/mymodule"`).

   ![Run configurations](/img/infracost-cloud/spacelift/github_run_remote_module.png)

3. **Define Your Login Policy:**
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

4. **Test the Configuration:**
   - Unfortunately, the Spacelift registry API doesn't differentiate token permission issues, so when the following curl returns an empty versions array, it means your token isn't working:
     ```bash
     $ curl -H 'Authorization: Bearer mytoken' https://app.spacelift.io/registry/modules/v1/MY_ORG/MY_MODULE/spacelift/versions

     {"modules":[{"source":"MY_ORG/MY_MODULE/spacelift","versions":[]}]} # token isn't working
     ```

### With a manual CI/CD integration

1. **Generate an API Key:**
   - Login to your Spacelift organization that has the modules.
   - Go to the Organization Settings > API keys page.
   - Create a new API Key called "infracost" and select Space=root or the spaces that contain your modules.
   - Set the Role to Reader.

2. **Upload Your CI/CD Pipeline Variables:**
   - Open the .config file that is auto-downloaded when you create an API Key and set the following environment variables in your pipeline:
      - `INFRACOST_TERRAFORM_CLOUD_TOKEN` should be set to the token value from the credentials "spacelift.io" section.
      - `INFRACOST_TERRAFORM_CLOUD_HOST` should be set to `spacelift.io`.

3. **Define Your Login Policy:**
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

4. **Test the Configuration:**
   - Unfortunately, the Spacelift registry API doesn't differentiate token permission issues, so when the following curl returns an empty versions array, it means your token isn't working:
     ```bash
     $ curl -H 'Authorization: Bearer mytoken' https://app.spacelift.io/registry/modules/v1/MY_ORG/MY_MODULE/spacelift/versions

     {"modules":[{"source":"MY_ORG/MY_MODULE/spacelift","versions":[]}]} # token isn't working
     ```
