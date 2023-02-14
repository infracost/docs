---
slug: jira_integration
title: Jira integration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Connect Infracost Cloud to Jira to enrich your team's cost estimates with powerful contextual information. Our Jira integration provides an automated two-way connection that helps you better understand why your teams' cloud costs have changed.

Once enabled, our Jira integration updates Jira issues with Infracost cost estimates along with a direct link to our dashboard. Use this to dive into specific cloud costs impacted by engineering changes.

![jira issue](/img/jira/issue.png)

You'll also be able to filter Jira issues by cost impacts using Jira's search feature. This allows you to track the most impactful tickets your team is working on as it relates to the cloud bill.

![jira filter](/img/jira/filter.png)

We'll also add Jira metadata to any Infracost Cloud runs, meaning you can search, filter and analyze Infracost runs based on your team's Jira issues.

![dashboard](/img/jira/dashboard.png)

## Get started

### 1. Create Jira API token

First, you'll need to create a Jira API token so that Infracost Cloud can sync information across your Jira issues:

1. [Sign in to Atlassian](https://id.atlassian.com/manage-profile/security/api-tokens) using an account with write access to Jira projects.
2. The link opens the API tokens page. Alternatively, to go to this page from your Atlassian profile, select **Account Settings > Security > Create** and manage API tokens.
3. Select **Create API token**.
4. In the dialog, enter a label for your token and select **Create**.
5. To copy the API token, select **Copy**, then paste the token somewhere safe - you'll need this later.

### 2. Create Jira custom fields

You'll now need to create some custom fields in Jira so that Infracost can update your Jira issues to show the required information.

1. Log in to your Atlassian account
2. Select **Settings > Issues**.
3. Under **FIELDS** in the left sidebar, select **Custom fields**.
4. Click **Create a custom field**.
5. Select the type of field you want to create and click Next. See the **Supported custom fields** table below for the suggested field types for each field.
6. Add a name to your custom field - make it as descriptive as possible.
7. When you have entered the field details, select **Create**.
8. Add the new custom field to one or multiple screens. We recommend adding it to at least your project issue default screen.
9. Repeat the following steps for the [supported custom fields](#supported-custom-fields) below. _Note, only the **Infracost Link** field is required_.

If you are a Jira project-level administrator, and not an account-level administrator, you can still add the custom fields to the projects you administer. In such cases, only issues in those projects will get the cost fields, thus this is a good starting point on rolling out the Infracost Jira integration. Ideally longer term, all projects would get the custom fields so every project benefits from this integration.

#### Supported custom fields

| name                  | description                                                    | required | Jira field type |
|-----------------------|----------------------------------------------------------------|----------|-----------------|
| Infracost Link        | The field where the link to Infracost Cloud will be posted to. | true     | URL field       |
| Previous Monthly Cost | The field where the previous monthly cost will be posted to.   | false    | Number field    |
| New Monthly Cost      | The field where the new monthly cost will be posted to.        | false    | Number field    |
| Cost Diff             | The field where the cost diff will be posted to.               | false    | Number field    |
| Cost Diff Percentage  | The field where the cost diff percentage will be posted to.    | false    | Number field    |


### 3. Setup integration in Infracost Cloud

Now head over to the [Infracost Cloud dashboard](https://dashboard.infracost.io):

1. Navigate to Integrations > Jira
2. Enter the following information in the **Jira Authentication** section
   1. The URL of your organization's Atlassian account, this is normally: `https://{YOUR_ORG}.atlassian.net`
   2. The email of the user that you created an **API Token** for in Jira
   3. The API Token copied from the [Create Jira **API token** step](#1-create-jira-api-token)
3. Click the Test Connection button. If your credentials are correct, you'll see a green tick displayed
   ![auth ](/img/jira/auth.png)
4. Add your custom fields mapping in the **Infracost Configurations** section.
5. Hit save. If you've entered everything correctly, you'll see a green tick displayed by the Jira integration on the integrations page.

   If you get an error "cannot find any Jira custom field named x, please create this field in Jira", run the following `curl` command from your terminal to see if the custom field is accessible via the Jira API:

   <Tabs
   defaultValue="curl-command"
   values={[
      {label: 'Curl command to troubleshoot', value: 'curl-command'},
      {label: 'Expected response', value: 'successful-curl'},
      {label: 'Failed response', value: 'failed-curl'},
   ]}>
   <TabItem value="curl-command">

      ```shell
      # You can change Infracost_Link to be one of your custom Jira field names
      curl --request GET \
        --url 'https://your-domain.atlassian.net/rest/api/2/field/search?query=Infracost_Link' \
        --user 'YOUR@EMAIL.COM:YOUR_API_TOKEN' \
        --header 'Accept: application/json'
      ```
   </TabItem>
   <TabItem value="successful-curl">

      You should see a response like the following when the custom fields are accessible via the Jira API:
      ```json
      {"maxResults":50,"startAt":0,"total":1,"isLast":true,"values":
      [{"id":"customfield_10039","name":"Infracost Link",
      "schema":{"type":"string","custom":"com.atlassian.jira.plugin.system.customfieldtypes:url",
      "customId":10039},"description":""}]}
      ```
   </TabItem>
   <TabItem value="failed-curl">

      If you see a response like the following, it means that Infracost is not able to find the custom field in the Jira API.
      Please [contact us](mailto:hello@infracost.io) so we can work with you to troubleshoot the issue.
      ```json
      {"maxResults":50,"startAt":0,"total":0,"isLast":true,"values":[]}
      ```
   </TabItem>
   </Tabs>
6. Create a new test Jira issue, note the issue ID.
7. Browse to one of the code repos that you have already added to Infracost. Send a new pull request where either the pull request title, git commit message or the git branch name starts with the test Jira issue ID, e.g. _"TEST-2 my pull request title"_.
8. You should see the cost estimate in Infracost Cloud's Dashboard or Repos page, as well as the test Jira issue.


## Requirements

Once you've set up the Jira integrations, all future pull requests will be synced with Jira from Infracost Cloud. Infracost detects Jira issues from VCS systems exactly the same way the official Jira GitHub connection does. It checks if a Jira issue key prefixes either:

1. A pull request title, e.g. _"TEST-2 my pull request title"_
2. A git commit message, e.g. _"TEST-2 my commit message."_
3. A git branch name, e.g. _"TEST-2-my-branch-name"_

