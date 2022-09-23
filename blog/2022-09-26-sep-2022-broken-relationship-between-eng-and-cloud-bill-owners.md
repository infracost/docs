---
slug: broken-relationship-between-eng-and-cloud-bill-owners
title: "The broken relationship between engineering and cloud bill owners"
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: It turns out the closer your are to the code, the further you are from costs.
hide_table_of_contents: false
image: img/blog/broken-relationship/feedback-loop.png
date: "2022-09-26T00:00:00Z"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When it comes to cloud costs, the relationship between the engineers who are responsible for purchasing infrastructure and the team leads, managers and FinOps who are responsible for the cloud bills is broken.

**It turns out the closer your are to the code, the further you are from costs.**

<img src={useBaseUrl("img/blog/broken-relationship/feedback-loop.png")} alt="Broken feedback loop" />

Let’s look at an example product to production workflow and what happens when a company releases a new feature, which requires infrastructure.

<!--truncate-->

## Product to Production workflow

#### 1. Product spec

The product manager writes a product spec for the new feature, and works with a designer to create wireframes. These product specs contain enough information for a developer to look at and make a SWAG (scientific wild-ass guess) as to how much development effort is required.

#### 2. Technical design

The product spec moves into technical design, in which for the first time the engineers spend time figuring out how this feature should be built. This is when we start to see some early requirements for infrastructure come up.

#### 3. Engineering

If everything goes to plan, engineering start to actually write the feature alongside the infrastructure requirements (usually via Infrastructure-as-Code), and any other dependencies for this feature to work. After a few sprints, the feature is ready to be shipped.

#### 4. Release

The product goes into a release, and it is shipped into production for everyone to enjoy. At this point, the engineers have moved on and are working on the the next sprint tasks and the cloud bills are increasing.

#### 5. The bill shock

A month goes by and a cloud bill comes through, or a billing alert is triggered. This is sent to the bill owners and managers - the budget has been blown (this is, if anyone actually notices what is happening and alerts have been setup and people are looking closely).

#### 6. Who did what?

The slice and dice starts! The bills are sliced and diced via accounts or tags, trying to figure out who did what and when. Why did the bill increase? Was it a release, was it an accident, was it a marketing push etc.

#### 7. Sprint interruption

We finally figure out that it was a release by a specific team. We go back to the team to see what happened. Remember, they are now 2-3 sprints past that release, and so are frustrated when they are asked to interrupt their current sprint to figure out what happened and how to ‘fix’ it.

#### 8. Fix and new release

After the frustration, interruption, and delaying the current sprint tasks, we have a change to the infrastructure developed, and we can go through another release and hopefully that will fix it. That’s bad for 2 reasons:
1. The money has already been spent - and it’s not coming back.
2. We had to burn more time to fix it.

### This is broken

It takes weeks, if not months for the feedback loop to close from action (engineering starting work) to effect (realizing cloud cost budgets have been blown), and then to action again (release a fix). It turns out the closer your are to the code, the further you are from costs. This is broken.

## Fixing it

### First: give engineers cost estimates as they code

As the engineers are typing out code, we should give them cost estimates so they can compare configs, instance types, and also catch any cost typos without ever having to leave their editor to go play around with a cloud cost calculator. For this, you can use the [Infracost VSCode extension](https://github.com/infracost/vscode-infracost).

<img src={useBaseUrl("img/blog/broken-relationship/vscode.gif")} alt="Give the engineers cost estimates as they code" />

### Second: give team a cost review check in CI/CD

Engineers will now create a pull request to merge their changes into the main branch. At this stage, the team review the code for code quality and security issues, and now a cost ‘diff’ to see what the impact of this change will be in the cloud bill. For this, you can use [Infracost CI/CD](/docs/integrations/cicd/).

<img src={useBaseUrl("img/blog/broken-relationship/github-actions-screenshot.png")} alt="Give the team a cost review check in CI/CD" />

### Third: proactively inform team leads, managers and FinOps about upcoming changes

The teams have reviewed costs in the engineering workflow, but we also need to bring awareness to the cloud bill owners. Give the team leads, managers and FinOps an overview of all upcoming changes and their cloud cost impact in a single place. They can either take action now, before money has been spent, or set expectations of an upcoming increase to the bills. For this, you can use [Infracost Cloud](/docs/infracost_cloud/get_started/).

<img src={useBaseUrl("img/blog/broken-relationship/infracost-cloud-dashboard-chart.png")} alt="Proactively inform the team leads, managers and FinOps of the upcoming change" />

### Fourth: traditional cloud cost management

Now that everyone has seen that cost impact of the upcoming change, we go to production. We can now track that everything is going according to plan, if the usage is lower or higher than we expected. For this, you can use the cloud provider native tools ([AWS Cloud Intelligent Dashboard](https://catalog.us-east-1.prod.workshops.aws/workshops/fd889151-38aa-4fe2-a29d-d5fa557197bb/en-US), [Azure Cost Management](https://azure.microsoft.com/en-us/products/cost-management/), or [Google Cost Management](https://cloud.google.com/cost-management)), or one of the 3rd party tools like [Cloudability](https://www.apptio.com/products/cloudability/), [Cloud Health Tech](https://cloudhealth.vmware.com/) or [Flexera One](https://www.flexera.com/flexera-one).

<img src={useBaseUrl("img/blog/broken-relationship/traditional-cost-management.png")} alt="Traditional cloud cost management" />

## Future: close the feedback loop inside the workflow

We want recommendations that have been created from multiple data sources to be put in front of the right people so they can choose if these recommendations are right for them, and action it directly in their workflows. There is no great product that I have seen for this yet; a collection of emails, Slack messages and Excel files is what I have seen companies use. We will build a better solution for this in the future.

## Conclusion

When it comes to cloud costs, the flow of information and the number of roles involved and how they interact is broken. The way we fix this is not to stop or break workflows, but append helpful information directly in workflows and empower engineering teams to use cloud infrastructure economically and efficiently.
