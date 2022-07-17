---
slug: azure-cloud-cost-estimates-pull-requests
title: "Announcement: Azure cloud cost estimates in pull requests"
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: We're excited to announce that you can now use Infracost to get cloud cost estimates for Microsoft Azure in pull requests.
hide_table_of_contents: true
image: img/blog/azure-cloud-cost-estimates-pull-requests/infracost_azure.png
date: "2021-06-07T00:00:00Z"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl("img/blog/azure-cloud-cost-estimates-pull-requests/infracost_azure.png")} width="100%" alt="Infracost Azure"/>

<br/><br/>

Thanks to our awesome community, I'm very excited to announce that you can now use Infracost to get cloud cost estimates for Microsoft Azure in pull requests. [Try it now](https://www.infracost.io/docs/), it's free and open source!

<!--truncate-->

<br/>

**Cloud costs for engineering teams**

Cloud costs have become so complex that the industry (ourselves included) started addressing issues around breached budgets after the bill arrived. This is not the way it should be. It is like going shopping and having no idea how much things cost till after your card has been charged.

We are on a mission to empower engineering teams to use cloud infrastructure economically and efficiently. We do this by fitting in the developer workflow via CI/CD integration, reading the Infrastructure-as-code project, picking up the parameters that have a price point, looking up the prices for the configurations and leaving a comment in the Pull Request like "This change will increase your cloud costs by 25%" with a detailed breakdown. This way, the whole team is aware of the cost implications of the change.

<br/>

**Today's announcement**

Today we are announcing that in addition to AWS and Google Cloud Platform, we have added support for Microsoft Azure. Not only has Azure support been requested by over 60 of our community members ([https://github.com/infracost/infracost/issues/64](https://github.com/infracost/infracost/issues/64)), but we have seen a lot of growth from Microsoft in terms of the number of resources offered and enterprise adoption.

We have added support for over [65 Azure resources](https://www.infracost.io/docs/supported_resources/azure) (and another 70 resources which are free), with many more planned. Visit [our GitHub issues page](https://github.com/infracost/infracost/issues) and put a thumbs up on the resources you'd like covered and we will prioritize them.

But there is one more thing! We have also added support for Microsoft Azure DevOps Pipelines. This is in addition to our current supported CI/CD integrations such as GitHub Actions, GitLab CI, CircleCI, Bitbucket Pipelines, Atlantis and Jenkins.

<img src={useBaseUrl("img/blog/azure-cloud-cost-estimates-pull-requests/infracost_azure_devops.png")} width="60%" alt="Infracost Azure"/>

<br/><br/>

**Get started! ** We have made it super simple to get up and running:
```
1. brew install infracost # (docker, windows etc options available)
2. infracost auth login
3. az login # To set cloud creds, see note-1
4. infracost breakdown --path . # Run in your terraform directory. We also have an example Azure terraform file you can use to try it out.
```
For full details, see our [Getting Started guide](https://www.infracost.io/docs/). From there, you can setup [Azure DevOps Pipelines](https://www.infracost.io/docs/integrations/cicd#azure-devops) for the CI/CD integration.

*note-1*: Infracost does not need or access your cloud creds, however, Terraform needs this to create the plan file.
