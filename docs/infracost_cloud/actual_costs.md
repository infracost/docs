---
slug: actual_costs
title: Actual costs
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost Cloud enables you to see actual costs using your AWS account's Cost and Usage Reports (CUR) data in the Infracost [pull request comments](/docs/integrations/cicd/), [VS Code extension](/docs/integrations/vscode/) and [CLI output](/docs/features/cli_commands/).

This page outlines how you can give Infracost Cloud read access to your AWS CUR data (and resources listings), which Infracost requires to provide this functionality. We plan to build similar functionality for Azure and Google in the future.

:::info
This feature is in private beta, email [hello@infracost.io](mailto:hello@infracost.io) if you'd like access.
:::

## Connect Infracost Cloud to existing AWS CUR S3 bucket

:::tip
Follow this section if you have an existing Cost and Usage Report setup with these settings: **Daily** granularity, includes **Resource IDs**, in **GZIP** format.

Otherwise, see the next section to [setup a new AWS CUR for Infracost Cloud](#setup-new-aws-cur-for-infracost-cloud).
:::

### 1. Setup cross account role

In the AWS account that has your CUR S3 bucket, run the following CloudFormation stack using the AWS CLI. This CloudFormation stack creates a [cross account role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html) that has programmatic access to read CUR data from S3. You can read the specific access that the cross account role requires by reading the public [CloudFormation script](https://infracost-prod-cur-templates.s3.amazonaws.com/existing_bucket_cloudformation_template.json). If you prefer to use Terraform, you can customize the code from [this repo](https://github.com/infracost/cross-account-link/).

  ```bash
  aws cloudformation create-stack --stack-name ConnectToInfracost \
    --template-url https://infracost-prod-cur-templates.s3.amazonaws.com/existing_bucket_cloudformation_template.json \
    --parameters ParameterKey=InfracostExternalID,ParameterValue=$YOUR_INFRACOST_ORGANIZATION_ID \
    ParameterKey=InfracostAccount,ParameterValue=237144093413 \
    ParameterKey=BucketName,ParameterValue=$YOUR_S3_BUCKET_NAME \
    --capabilities CAPABILITY_IAM \
    --region us-east-1
  ```

Replace `$YOUR_S3_BUCKET_NAME` with the CUR S3 bucket you want to connect to Infracost Cloud and `$YOUR_INFRACOST_ORGANIZATION_ID` with the Infracost Org ID found under Org Settings page (shown below).

<img src={useBaseUrl("img/infracost-cloud/org-id.png")} alt="Organization ID" />

### 2. Get new role ARN

Once you've run the AWS CLI command, login to the AWS console and navigate to your [CloudFormation Stacks](https://us-east-1.console.aws.amazon.com/cloudformation) in the AWS account that has the CUR S3 bucket. If the CloudFormation stack has run successfully you should see the **ConnectToInfracost** stack in a *CREATE_COMPLETE* status.

Navigate to the **Outputs** tab and copy the value of the **RoleArn**. This is the ARN of the cross account role that the CloudFormation Stack created. You'll need this in later steps.

  <img src={useBaseUrl("img/infracost-cloud/cloudformation-stack.png")} alt="CloudFormation stack" />

### 3. Setup S3 bucket permissions

Head over to the AWS Console's S3 page, and navigate to the CUR bucket. You need to configure the bucket policy to allow the cross account role created by Infracost to access the CUR object. Click the **Permissions** tab on the S3 bucket navigation.

  <img src={useBaseUrl("img/infracost-cloud/s3-permissions.png")} alt="Permissions tab" />

Scroll down to the **Bucket policy** section and hit **Edit**.

  <img src={useBaseUrl("img/infracost-cloud/s3-bucket-policy.png")} alt="Bucket policy tab" />

Add the following statement to the bottom of your policy block:

   ```json
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "$CROSS_ACCOUNT_ARN_OUTPUT"
      },
      "Action": [
        "s3:GetObject",
        "s3:GetObjectAcl"
      ],
      "Resource": "arn:aws:s3:::$YOUR_BUCKET_NAME/*"
    }
   ```

Replace `$CROSS_ACCOUNT_ARN_OUTPUT` with the ARN copied from step 2 and `$YOUR_BUCKET_NAME` with the name of your bucket. Hit **Save changes**.

  <img src={useBaseUrl("img/infracost-cloud/s3-bucket-policy-editor.png")} alt="Bucket policy editor" />

### 4. Setup S3 event notifications

In the same page as above (AWS Console > S3 > CUR bucket), select the **Properties** tab. You need to add an S3 event notification so that Infracost Cloud is notified when a new CUR is created.

  <img src={useBaseUrl("img/infracost-cloud/s3-properties.png")} alt="Properties tab" />

Then scroll down to the **Event notifications** section and click **Create event notification**. You'll be taken to the event notification form.

  <img src={useBaseUrl("img/infracost-cloud/s3-create-event-notification.png")} alt="Create event notification" />

Under **General configuration** add the following inputs:
  - Event name: `Infracost`
  - Prefix: if you set a CUR report path prefix for S3, also set that here.
  - Suffix: `Manifest.json`

  <img src={useBaseUrl("img/infracost-cloud/s3-notification-general-config.png")} alt="Notification general configuration" />

Under **Event types** check the **All object create events** checkbox.

  <img src={useBaseUrl("img/infracost-cloud/s3-notification-event-types.png")} alt="Notification event types" />

Finally, in the **Destination** configuration add an **SNS Topic** configuration pointing to the `arn:aws:sns:us-east-1:237144093413:cur-uploaded` ARN, and hit **Save changes**.

  <img src={useBaseUrl("img/infracost-cloud/s3-topic-config.png")} alt="Notification topic config" />

You should now see an event notification configuration created similar to the following:

   <img src={useBaseUrl("img/infracost-cloud/s3-notification-created.png")} alt="Notification created" />

### 5. Confirm Cost and Usage Report settings

In AWS Console, go to the Billing Dashboard -> Cost and Usage Reports then click on the name of the existing report you would like to connect.  Confirm that:
1. **Report content** includes "Resource IDs"
2. **Time granularity** is "Daily"
3. **Compression type** is "GZIP"
4. **File format** is "text/csv"

Make special note of the **Report path prefix** on this page.  You will need to send it to Infracost in the next step.

### 6. Email us to complete the setup

Your CUR permissions are now successfully configured! Send the following email so we enable the feature for your Infracost Cloud organization:
```txt
To: hello@infracost.io
Subject: Enable AWS actual costs

Body:
Hi, my name is Rafa and I'm the DevOps Lead at ACME Corporation.
Please enable the AWS actual costs feature for our organization:

- Infracost Cloud org ID (from step 1): $YOUR_INFRACOST_ORGANIZATION_ID (12345678-90ab-cdef-1234-567890abcdef)
- Our AWS Cross Account ARN (from step 3): $CROSS_ACCOUNT_ARN_OUTPUT (arn:aws:iam::123456789012:role/ConnectToInfracost-CrossAccountRole-0123456789AB)
- Our AWS CUR S3 Bucket ARN (from step 3): $BUCKET_ARN_OUTPUT (arn:aws:s3:::my-s3-bucket)
- Our AWS CUR Report Path Prefix (from step 5): $REPORT_PATH_PREFIX (daily-v1/InfracostReport12345678-90ab-cdef-1234-567890abcdef)

Regards,
Rafa
```

We'll reply to your email as soon as the feature is live for your organization 🎉

## Setup new AWS CUR for Infracost Cloud

:::tip
Follow this section if you **do not already** have a Cost and Usage Report uploading to S3. This section will create an S3 bucket for you and setup an AWS CUR with Daily granularity, including Resource IDs, in GZIP format uploading to the new bucket. It will also setup the required permissions and event notifications on the S3 bucket.

Otherwise, follow the previous section [Connect Infracost Cloud to existing AWS CUR S3 bucket](#connect-infracost-cloud-to-existing-aws-cur-s3-bucket) to connect Infracost Cloud to your existing CUR bucket.
:::

### Terraform

See [this repo](https://github.com/infracost/cross-account-link/) for how you can setup your AWS CUR using Terraform.

### CloudFormation 

#### 1. Setup cross account role

In the AWS account that you want to setup your CUR, run the following CloudFormation stack using the AWS CLI.  This CloudFormation stack creates a [cross account role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html) that has programmatic access to read daily CUR from a newly created S3 bucket. You can read the specific access that the cross account role requires by reading the public [CloudFormation script](https://infracost-prod-cur-templates.s3.amazonaws.com/cloudformation_template.json).

  ```bash
  aws cloudformation create-stack --stack-name ConnectToInfracost \
    --template-url https://infracost-prod-cur-templates.s3.amazonaws.com/cloudformation_template.json \
    --parameters ParameterKey=InfracostExternalID,ParameterValue=$YOUR_INFRACOST_ORGANIZATION_ID \
    ParameterKey=InfracostAccount,ParameterValue=237144093413 \
    ParameterKey=InfracostNotificationTopicArn,ParameterValue=arn:aws:sns:us-east-1:237144093413:cur-uploaded \
    --capabilities CAPABILITY_IAM \
    --region us-east-1
  ```

  Replace **$YOUR_INFRACOST_ORGANIZATION_ID** with the Org ID found under Org Settings page.

  <img src={useBaseUrl("img/infracost-cloud/org-id.png")} alt="Organization ID" />

#### 2. Get new role and bucket ARNs

Once you've run the AWS CLI command, login to the AWS console and navigate to your [CloudFormation Stacks](https://us-east-1.console.aws.amazon.com/cloudformation) in the AWS account that has the CUR S3 bucket. If the CloudFormation stack has run successfully you should see the **ConnectToInfracost** stack in a *CREATE_COMPLETE* status.

Navigate to the **Outputs** tab and copy the value of the **RoleArn** and **BucketArn**. These are the ARNs of the cross account role and the S3 bucket that the CloudFormation Stack created.

   <img src={useBaseUrl("img/infracost-cloud/cloudformation-stack-new.png")} alt="CloudFormation stack new" />

#### 3. Confirm Cost and Usage Report settings

In AWS Console, go to the Billing Dashboard -> Cost and Usage Reports then click on the name of newly created report.

Review the report settings and make special note of the **Report path prefix** on this page.  You will need to send it to Infracost in the next step.

#### 4. Email us to complete the setup

Your CUR permissions are now successfully configured! Send the following email so we enable the feature for your Infracost Cloud organization:
```txt
To: hello@infracost.io
Subject: Enable AWS actual costs

Body:
Hi, my name is Rafa and I'm the DevOps Lead at ACME Corporation.
I've setup a new CUR report for Infracost Cloud, please enable
the AWS actual costs feature for our organization:

- Infracost Cloud org ID (from step 1): $YOUR_INFRACOST_ORGANIZATION_ID (12345678-90ab-cdef-1234-567890abcdef)
- Our AWS Cross Account ARN (from step 2): $CROSS_ACCOUNT_ARN_OUTPUT (arn:aws:iam::123456789012:role/ConnectToInfracost-CrossAccountRole-0123456789AB)
- Our AWS CUR S3 Bucket ARN (from step 2): $BUCKET_ARN_OUTPUT (arn:aws:s3:::my-s3-bucket)
- Our AWS CUR Report Path Prefix (from step 3): $REPORT_PATH_PREFIX (daily-v1/InfracostReport12345678-90ab-cdef-1234-567890abcdef)

Regards,
Rafa
```

We'll reply to your email as soon as the feature is live for your organization 🎉
