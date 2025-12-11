---
slug: /support
title: Support
---

# Help desk

**If you need help using Infracost, please email us at [support@infracost.io](mailto:support@infracost.io).**

Check [our status page](https://status.infracost.io/) for updates on any service disruptions affecting our hosted services.

If you're an engineer seeing Infracost pull request comments for the first time, see the [Engineer guide](/docs/infracost_cloud/engineer_guide/) for an overview of Infracost and what to do next.

# Community support chat

For community support, please join our [community Slack channel](https://www.infracost.io/community-chat). If you notice a CLI bug, please first [upgrade](/docs/#1-install-infracost) to the latest version of `infracost` to see if the bug has already been fixed. If not, [create an issue](https://github.com/infracost/infracost/issues/new/choose). Please use the `--debug-report` and include the `infracost-debug-report.json` file in your issue.

# Dedicated support chat

Infracost Enterprise customers who wish to have a shared channel for support and collaboration can use these guides.

## Slack External Connection

To setup a Slack Connect channel, please email your Slack user emails to [support@infracost.io](mailto:support@infracost.io). We will then create the channel and send invitations to the specified emails from your organization.

## Google External Chat

To setup a Google chat, please email your Google user emails to [support@infracost.io](mailto:support@infracost.io). We will then create the chat and send invitations to the specified emails from your organization.

## Microsoft Teams Shared Channel

To enable a shared Microsoft Teams channel with Infracost, your organization's Microsoft 365 administrator needs to configure cross-tenant access settings and Teams policies. This guide walks through the required steps.

If you run into any issues, please email [support@infracost.io](mailto:support@infracost.io).

### Prerequisites

- Global Administrator or External Identity Administrator access to your Microsoft Entra ID
- Microsoft Teams Administrator access

### Step 1: Add Infracost as a partner organization

1. Navigate to the [Microsoft Entra admin center](https://entra.microsoft.com) and sign in with your Global Admin or External Identity Administrator account.

2. Go to **Identity** → **External identities** → **Cross-tenant access settings** → **Partner organizations**.

3. Click **Add organization**.

4. Enter the following Infracost tenant information:
   - **Name:** Infracost
   - **Tenant ID:** `0503cb29-f2d1-4d4b-9af2-8bb82eb61a78`
   - **Domain:** `infracost.onmicrosoft.com`

5. Click **Add** to save the partner organization.

### Step 2: Configure B2B direct connect

After adding Infracost as a partner organization, you need to enable B2B direct connect for both inbound and outbound access.

#### 2a. Inbound access (Infracost users to your resources)

1. In the **Partner organizations** list, select **Infracost**.

2. Navigate to **Inbound access** → **B2B direct connect**.

3. Under **Users and groups:**
   - Select **All external users and groups**, or
   - Choose specific groups you want to allow access

4. Under **Applications:**
   - Select **Microsoft Teams**

5. Click **Save**.

#### 2b. Outbound access (your users to Infracost resources)

1. Navigate to **Outbound access** → **B2B direct connect**.

2. Under **Users and groups:**
   - Select **All users**, or
   - Choose specific users/groups who should access the shared channel

3. Under **Applications:**
   - Select **Microsoft Teams**

4. Click **Save**.

### Step 3: Configure Microsoft Teams settings

1. Navigate to the [Teams admin center](https://admin.teams.microsoft.com).

2. Go to **Teams** → **Teams policies**.

3. Select the policy assigned to your users and ensure:
   - **Join external shared channels** is set to **On**

4. Go to **Users** → **Guest access**.

5. Ensure **Allow guest access in Teams** is set to **On**.

### Step 4: Notify Infracost

Once you've completed the above configuration steps, please email us at [support@infracost.io](mailto:support@infracost.io) with the following information:

1. **Your Tenant ID and Entra Domain**
2. **List of user IDs** (email addresses) to be invited to the shared channel

We will then create the shared channel and send invitations to the specified users from your organization.
