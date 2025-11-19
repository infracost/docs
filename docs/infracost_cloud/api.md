---
slug: api
title: API
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Infracost Cloud API enables you to programmatically manage [tagging policies](/docs/infracost_cloud/tagging_policies) and [guardrails](/docs/infracost_cloud/guardrails). Large enterprises often use ServiceNow as the source of truth for their application names or service IDs. FinOps teams need resources to be tagged with the correct application/service values so showback reports can be created. Enterprises usually have thousands of applications, so it's easy to have typos, incorrect capital letters, dashes and hyphens mixed up in these values when engineers are writing infra-as-code. That creates a mess that FinOps teams have to deal with, and fixing typos isn't fun for any engineer.

The best way to fix this problem is to address the root cause: validate the **tag values** when the code is being written. That is why we built this API, so enterprises can regularly push thousands of tag values to Infracost and it will automatically validate them in pull requests.

This has two key benefits:
1. Engineers get the fastest-possible feedback loop, at the right time in the right place (engineering workflow). You can customize the message engineers see, for example, "The application ID isn't valid, please ensure your application is registered at https://services.acme-inc.com/list".
2. FinOps teams to see the percentage of resources that are tagged with correct values, and guess what, it automatically improves over time! No more chasing engineers and creating Jira tasks for this mundane stuff.

The API also allows you to manage guardrails, which enable you to define cost thresholds for your infrastructure. When costs exceed these thresholds, Infracost can notify stakeholders, add comments to pull requests, or even block PRs from being merged. This helps teams control cloud costs by making engineers aware of potential cost issues before changes are deployed.

## Usage

1. Log in to [Infracost Cloud](https://dashboard.infracost.io) and go to Org Settings > API tokens > Create service account. Creating a service account will generate an associated token, which can be used to authenticate API requests (note that the CLI token cannot be used with the API).
2. View the [API docs](https://api.infracost.io/v1/docs/) to see how you can create, read, update or delete tagging policies and guardrails. You will also need your Org slug to use the API, this is available from the Org Settings > General page.

### Update a tagging policy

- Create a JSON file, `tags.json`, as follows:
  ```json
  {
    "data": {
      "attributes": {
        "tags": [
          {
            "key": "app_id",
            "mandatory": true,
            "valueType": "LIST",
            "allowedValues": [
              "app1",
              "app2",
              "app3",
              "app4",
              "app5"
            ]
          }
        ]
      }
    }
  }
  ```
- In Infracost Cloud, go to Governance > Tagging policies > my-policy, and note the ID at the end of the URL, for example, "e17b9d51-151d-4855-a17e-6349e485584c".
- Use `curl` or any programming language to call the API:
  ```sh
  curl -X PATCH \
    -H "Authorization: Bearer $MY_TOKEN" \
    -H "Content-Type: application/json" \
    --data @tags.json \
    https://api.infracost.io/v1/orgs/MY_ORG/tagging-policies/e17b9d51-151d-4855-a17e-6349e485584c
  ```

### Create a cost guardrail

- Create a JSON file, `guardrail.json`, as follows:
  ```json
  {
    "data": {
      "type": "guardrails",
      "attributes": {
        "name": "Production Cost Limit",
        "scope": "PULL_REQUEST",
        "increaseThreshold": 100,
        "message": "This PR would increase monthly costs by more than $100. Please review and get approval.",
        "webhookUrl": "https://example.com/webhook",
        "prComment": true,
        "blockPr": false,
        "filters": {
          "repos": {
            "include": ["production-infra"],
            "exclude": []
          }
        }
      }
    }
  }
  ```
- Use `curl` or any programming language to call the API:
  ```sh
  curl -X POST \
    -H "Authorization: Bearer $MY_TOKEN" \
    -H "Content-Type: application/json" \
    --data @guardrail.json \
    https://api.infracost.io/v1/orgs/MY_ORG/guardrails
  ```

### Update custom properties

- Create a CSV file, `custom_properties.csv`, with your custom properties.
- Use `curl` or any programming language to call the API, we recommend running this once a day as it's unlikely that custom property values change that often. Notice the content type must be `text/csv`. If you're using curl, `--data-binary` must be used otherwise `curl` will strip the new lines out of the CSV and no data will be uploaded.
  ```sh
  curl -X POST \
          -H "Authorization: Bearer $MY_TOKEN" \
          -H "Content-Type: text/csv" \
          --data-binary @custom_properties.csv \
          https://api.infracost.io/v1/orgs/MY_ORG/custom-properties
  ```
