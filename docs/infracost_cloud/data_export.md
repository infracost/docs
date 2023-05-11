---
slug: data_export 
title: Data Export
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost Cloud lets you export cost estimates for all your pull requests, enhancing your visibility and understanding
of your cloud infrastructure expenses. This data, available in CSV format, covers merged or closed pull requests as well
as currently open pull requests.

This guide outlines how you can set up the data export feature to deliver the CSV files to AWS S3 or Azure Blob Storage.
Once configured, two CSV files we be updated daily with the latest information, replacing any earlier versions of the
file:

1. `infracost_closed_prs_YYYYMMDD.csv` containing information on pull requests that were closed or merged during the
   current month.
2. `infracost_open_prs.csv` containing information on pull requests that are currently open.

## Export Infracost Cloud data to an AWS S3 bucket

This guide will walk you through the process of setting up an AWS Identity and Access Management (IAM) policy that
allows Infracost to upload the CSV reports to your AWS S3 bucket.

### Prerequisites

1. An active AWS account
2. A pre-existing S3 bucket where the Infracost will upload the CSV reports
3. AWS Management Console access
4. Your Infracost **Org ID**. This can be found in [Infracost Cloud](https://dashboard.infracost.io) > **Org Settings
   ** > **Details** section.

### Step 1: Create an IAM Policy

1. Sign in to the AWS Management Console and open the [IAM Console](https://console.aws.amazon.com/iam/).
2. In the navigation pane, click on **Policies** and then click on **Create policy**.
3. Choose the **JSON** tab and replace the existing content with the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR-BUCKET_NAME",
        "arn:aws:s3:::YOUR-BUCKET_NAME/*"
      ]
    }
  ]
}
```

4. Replace `your-bucket-name` in the `Resource` field with the name of your S3 bucket where Infracost will upload the
   CSV report.
5. Click on **Review policy**.
6. On the Review policy page, name your policy **infracost-data-export-s3**, then click on **Create policy**.

### Step 2: Create an IAM Role for Infracost

1. In the IAM console, click on **Roles** in the navigation pane and then click on **Create role**.
2. Select **Another AWS account** as the trusted entity type.
3. Enter the Infracost AWS account ID `237144093413` in the **Account ID** field. This ensures that only Infracost can
   assume the role.
4. Check the **Require external ID** checkbox and enter your Infracost **Org Id**. This can be found
   in [Infracost Cloud](https://dashboard.infracost.io) > **Org Settings** > **Details** section.
5. Click on **Next: Permissions**.
6. In the search box, search for the **infracost-data-export-s3** policy you created in Step 1, select it, and then
   click on **Next: Tags**.
7. Optionally, you can add tags to the role. Click on **Next: Review** after adding tags or skip it.
8. On the Review page, name the role **infracost-data-export**, then click on **Create role**.
9. Search for the **infracost-data-export** role you created and click on its name.
10. On the role details page, copy the Role ARN (Amazon Resource Name) located at the top of the page. You will need to
    enter this ARN in Infracost Cloud.

### Step 3: Setup data export in Infracost Cloud

1. Log in to Infracost Cloud and navigate to **Reports** > **Data Export**.
2. Click on the **AWS S3 Bucket** section
3. Enter the **AWS S3 Bucket Name** and **Region**.
4. Fill in the **AWS Role ARN** field with the ARN for the Role you created in step 2.
5. Click the **Test Connection** button and make sure it reports success. This will create an empty **test.csv** in your
   AWS S3 bucket.
6. Use the **Save** button to complete the setup.

Your first report should be created in a few minutes and will continue to be updated approximately daily. You can return
to the **Data Export** page to check on the status of your reports.

## Setting up Data Export to Azure Blob Storage using a Service Principal

This guide will walk you through the process of setting up data export from Infracost Cloud to Azure Blob Storage using
a Service Principal. This allows InfraCost to store the CSV files containing cost estimate data for your pull requests
in your Azure Blob Storage.

### Prerequisites

1. An active Azure account
2. An existing Azure Storage Account and a Blob Container
3. Access to the Azure Portal
4. [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed locally, or access to Cloud Shell
   in the Azure Portal.

### Step 1: Create a Service Principal for InfraCost

1. Construct a scope that provides access limited to your Blob Container. This will be attached to the Service Principle
   and should look like:
   `/subscriptions/<Your-Subscription-ID>/resourceGroups/<Your-Resource-Group-Name>/providers/Microsoft.Storage/storageAccounts/<Your-Resource-Group-Name>/blobServices/default/containers/<Your-Container-Name>/blobServices/default/containers/<Your-Container-Name>`

An easy way to do this is to navigate to **Storage Accounts** page in Azure Portal and click on the name of your storage
account. Then in the storage account **Overview** section, click on the **JSON view** link and copy the **Resource ID**
to your clipboard. Complete the scope by appending `/blobServices/default/containers/<Your-Container-Name>` to the end
of this string.

2. Open your command prompt or terminal and sign in to your Azure account using the Azure CLI by running the command:

```
az login
```

Alternatively, [open a BASH Cloud Shell in the Azure Portal](https://learn.microsoft.com/en-us/azure/cloud-shell/quickstart?tabs=azurecli).
The Azure CLI is automatically installed and logged in when using this method.

3. Create a Service Principal for InfraCost with the following az command.

```
az ad sp create-for-rbac \
   --name "Infracost-Export" \
   --role "Storage Blob Data Contributor" \
   --scope "<Scope-String-From-Step-1>"
```

4. Take note of the `appId`, `password`, and `tenant` values in the output, as these will be needed to configure
   Infracost Cloud data export.

### Step 2: Configure InfraCost Cloud Data Export

1. Log in to Infracost Cloud and navigate to **Reports** > **Data Export**.
2. Click on the **Azure Blob Storage** section Set the AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_TENANT_ID environment
   variables of OpenCost deployment to the values of the service principal secret. Set the EXPORT_CSV_FILE environment
   variable of OpenCost deployment to the path of the file in the Azure Blob Storage.
3. Fill in the **Client ID**, **Client Secret**, and **Tenant ID** using the `appId`, `password`, and `tenant` values
   generated in step 1.
4. Enter the **Subscription ID**, **Storage Account Name**, and **Container Name** indicating where the CSV files should
   be created.
5. Click the **Test Connection** button and make sure it reports success. This will create an empty **test.csv** in your
   Blob Storage container.
6. Use the **Save** button to complete the setup.

Your first report should be created in a few minutes and will continue to be updated approximately daily. You can return
to the **Data Export** page to check on the status of your reports.
