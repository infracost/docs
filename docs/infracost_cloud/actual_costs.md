---
slug: actual_costs
title: Actual Costs
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost Cloud supports showing you actual costs using your AWS account's CUR data. Infracost requires read access to
your billing data to provide this functionality. This page outlines how you can connect Infracost Cloud to your AWS CUR
data.

### Connect Infracost Cloud to an AWS account with an existing CUR S3 bucket

> Follow this section if you already have daily Cost and Usage Reports being uploaded to a specific S3 bucket.
Otherwise, see the next section [Connect Infracost Cloud to an AWS account without CUR enabled](#connect-infracost-cloud-to-an-aws-account-without-cur-enabled) on how to provision a
completely new CUR setup.

1. Run the following Cloudformation stack using the AWS CLI:

  ```bash
  aws cloudformation create-stack --stack-name ConnectToInfracost \
    --template-url https://infracost-prod-cur-templates.s3.amazonaws.com/existing_bucket_cloudformation_template.json \
    --parameters ParameterKey=InfracostExternalID,ParameterValue=$YOUR_INFRACOST_ORGANIZATION_ID> \
    ParameterKey=InfracostAccount,ParameterValue=237144093413 \
    ParameterKey=BucketName,ParameterValue=$YOUR_S3_BUCKET_NAME \
    --capabilities CAPABILITY_IAM \
    --region us-east-1
  ```

   replace **$YOUR_S3_BUCKET_NAME** with the CUR S3 bucket you want to connect to Infracost Cloud
   and **$YOUR_INFRACOST_ORGANIZATION_ID** with the Org ID found under Organization settings page.

   <img src={useBaseUrl("img/infracost-cloud/org-id.png")} alt="Organization ID" />

   This Cloudformation stack creates
   a [cross account role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html)
   that has programmatic access to read CUR data from S3. You can read the specific access that the cross account role
   requires by reading the
   public [Cloudformation script](https://infracost-prod-cur-templates.s3.amazonaws.com/existing_bucket_cloudformation_template.json).

2. Once you've run AWS CLI command, login to the AWS console and navigate to
   your [Cloudformation Stacks](https://us-east-1.console.aws.amazon.com/cloudformation). If the Cloudformation stack
   has run successfully you should see the **ConnectToInfracost** stack in a *CREATE_COMPLETE* status:

   <img src={useBaseUrl("img/infracost-cloud/cloudformation-stack.png")} alt="Cloudformation stack" />

   Navigate to the **Outputs** tab and copy the value of the **RoleArn**. This is the ARN of the cross account role that
   the Cloudformation Stack created. You'll need this in later steps.
3. Head over to the S3 console and navigate to the bucket, which contains your CUR data. Select the **Properties** tab.
   We're going to add an S3 event notification so that Infracost Cloud is notified when a new CUR is created.

   <img src={useBaseUrl("img/infracost-cloud/s3-properties.png")} alt="Properties tab" />

   Then scroll down to the **Event notifications** section and click **Create event notification**. You'll be taken to
   the event notification form.

   <img src={useBaseUrl("img/infracost-cloud/s3-create-event-notification.png")} alt="Create event notification" />

   Under **General configuration** add the following inputs:

   <img src={useBaseUrl("img/infracost-cloud/s3-notification-general-config.png")} alt="Notification general
   configuration" />

   Under **Event types** check the **All object create events** checkbox.

   <img src={useBaseUrl("img/infracost-cloud/s3-notification-event-types.png")} alt="Notification event types" />

   Finally, in the **Destination** configuration add an **SNS Topic** configuration pointing to the **arn:aws:sns:
   us-east-1:237144093413:cur-uploaded** ARN, and hit **Save changes**.

   <img src={useBaseUrl("img/infracost-cloud/s3-topic-config.png")} alt="Notification topic config" />

   You should now see an event notification configuration created similar to the following:

   <img src={useBaseUrl("img/infracost-cloud/s3-notification-created.png")} alt="Notification created" />
4. Next we need to configure the bucket policy to allow the cross account role created by Infracost to access the CUR
   object. Click the **Permissions** tab on the S3 bucket navigation.

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

   replace **$CROSS_ACCOUNT_ARN_OUTPUT** with the ARN copied from step 2 and **$YOUR_BUCKET_NAME** with the name of your
   bucket:

   <img src={useBaseUrl("img/infracost-cloud/s3-bucket-policy-editor.png")} alt="Bucket policy editor" />

   Hit **Save changes**.
5. Your CUR permissions are now successfully configured. However, you'll need to provide Infracost the following values
   to complete your setup:
   1. The **Cross Account ARN** from step 2.
   2. Your CUR **S3 Bucket ARN**.
6. Once Infracost has received these ARN values and updated your account to fetch CUR data we'll let you know. We'll guide you through any next steps to update any Infracost pipelines. 

### Connect Infracost Cloud to an AWS account without CUR enabled

> Follow this section if you **do not already** have daily Cost and Usage Reports uploaded to a S3 bucket.
If you do, follow the previous section [Connect Infracost Cloud to an AWS account with an existing CUR S3 bucket](#connect-infracost-cloud-to-an-aws-account-with-an-existing-cur-s3-bucket) to connect Infracost Cloud to your existing CUR bucket. 

1. Run the following Cloudformation stack using the AWS CLI:

  ```bash
  aws cloudformation create-stack --stack-name ConnectToInfracost \
    --template-url https://infracost-prod-cur-templates.s3.amazonaws.com/existing_bucket_cloudformation_template.json \
    --parameters ParameterKey=InfracostExternalID,ParameterValue=$YOUR_INFRACOST_ORGANIZATION_ID> \
    ParameterKey=InfracostAccount,ParameterValue=237144093413 \
    ParameterKey=InfracostNotificationTopicArn,ParameterValue=arn:aws:sns:us-east-1:237144093413:cur-uploaded \
    --capabilities CAPABILITY_IAM \
    --region us-east-1
  ```

  replace **$YOUR_INFRACOST_ORGANIZATION_ID** with the Org ID found under Organization settings page.

  <img src={useBaseUrl("img/infracost-cloud/org-id.png")} alt="Organization ID" />

  This Cloudformation stack creates a [cross account role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html)
  that has programmatic access to read daily CUR from a newly created S3 bucket. You can read the specific access that the cross account role
  requires by reading the public [Cloudformation script](https://infracost-prod-cur-templates.s3.amazonaws.com/cloudformation_template.json).

2. Once you've run AWS CLI command, login to the AWS console and navigate to
   your [Cloudformation Stacks](https://us-east-1.console.aws.amazon.com/cloudformation). If the Cloudformation stack
   has run successfully you should see the **ConnectToInfracost** stack in a *CREATE_COMPLETE* status:

   <img src={useBaseUrl("img/infracost-cloud/cloudformation-stack-new.png")} alt="Cloudformation stack new" />

   Navigate to the **Outputs** tab and copy the value of the **RoleArn** and **BucketArn** these should be sent to Infracost.
3. Once Infracost has received these ARN values and updated your account to fetch CUR data we'll let you know. We'll guide you through any next steps to update any Infracost pipelines. 
