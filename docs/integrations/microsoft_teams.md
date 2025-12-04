---
slug: microsoft_teams
title: Microsoft Teams Shared Channel
---

# Microsoft Teams Shared Channel Setup

For Infracost Enterprise customers who wish to have a shared MS Teams channel for support and collaboration.

To enable a shared Microsoft Teams channel with Infracost, your organization's Microsoft 365 administrator needs to configure cross-tenant access settings and Teams policies. This guide walks through the required steps.

If you run into any issues, please join our [community Slack channel](https://www.infracost.io/community-chat) or email us at support@infracost.io.

## Prerequisites

- Global Administrator or External Identity Administrator access to your Microsoft Entra ID
- Microsoft Teams Administrator access

## Step 1: Add Infracost as a partner organization

1. Navigate to the [Microsoft Entra admin center](https://entra.microsoft.com) and sign in with your Global Admin or External Identity Administrator account.

2. Go to **Identity** → **External identities** → **Cross-tenant access settings** → **Partner organizations**.

3. Click **Add organization**.

4. Enter the following Infracost tenant information:
   - **Name:** Infracost
   - **Tenant ID:** `0503cb29-f2d1-4d4b-9af2-8bb82eb61a78`
   - **Domain:** `infracost.onmicrosoft.com`

5. Click **Add** to save the partner organization.

## Step 2: Configure B2B direct connect

After adding Infracost as a partner organization, you need to enable B2B direct connect for both inbound and outbound access.

### Inbound access (Infracost users to your resources)

1. In the **Partner organizations** list, select **Infracost**.

2. Navigate to **Inbound access** → **B2B direct connect**.

3. Under **Users and groups:**
   - Select **All external users and groups**, or
   - Choose specific groups you want to allow access

4. Under **Applications:**
   - Select **Microsoft Teams**

5. Click **Save**.

### Outbound access (your users to Infracost resources)

1. Navigate to **Outbound access** → **B2B direct connect**.

2. Under **Users and groups:**
   - Select **All users**, or
   - Choose specific users/groups who should access the shared channel

3. Under **Applications:**
   - Select **Microsoft Teams**

4. Click **Save**.

## Step 3: Configure Microsoft Teams settings

1. Navigate to the [Teams admin center](https://admin.teams.microsoft.com).

2. Go to **Teams** → **Teams policies**.

3. Select the policy assigned to your users and ensure:
   - **Join external shared channels** is set to **On**

4. Go to **Users** → **Guest access**.

5. Ensure **Allow guest access in Teams** is set to **On**.

## Step 4: Notify Infracost

Once you've completed the above configuration steps, please email us at support@infracost.io with the following information:

1. **Your Tenant ID and Entra Domain**
2. **List of user IDs** (email addresses) to be invited to the shared channel

We will then create the shared channel and send invitations to the specified users from your organization.
