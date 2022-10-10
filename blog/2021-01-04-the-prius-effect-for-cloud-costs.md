---
slug: the-prius-effect-for-cloud-costs
title: The Prius Effect for cloud costs
author: Hassan Khajeh-Hosseini
author_url: https://twitter.com/hassankhosseini
author_image_url: /img/avatars/hassan.jpg
description: IaC and Serverless give direct cloud access to developers and DevOps engineers. If we show cost implications, will we get better at cloud cost efficiency?
image: img/blog/the-prius-effect-for-cloud-costs/infracost-pull-request.png
hide_table_of_contents: true
date: "2021-01-04"
---

Over the last 10 years we have seen more enterprises give direct cloud access to their developers and DevOps teams. There are many ways this has been achieved, from giving admin logins to the cloud console, to having devs create request tickets to the central IT team, to creating a self-service catalogue in which business units can select what they need from a list of pre-approved resources or environments.

<!--truncate-->

What ever model enterprises have chosen, one common thing happens. The cloud bill becomes less predictable. Someone didn't know what they were launching, they didn't turn it off, they didn't consider that when you create one resource, it will auto-create a bunch of other resources. As we shift left with Infrastructure as Code, and further with Serverless, in which code decisions have a direct impact on the cloud bill, we need a better answer than just policing what developers have access to and doing post-bill analysis.

Myself and my co-founders have been working in the cloud cost space for 10 years, and we now want to address this issue. Our theory is that if we give developers and DevOps engineers a clear picture of costs of their infrastructure before they launch, then they will be more mindful about what they launch. Think of it like [The Prius Effect](https://powerhousedynamics.com/resources/white-papers/prius-effect1/) in which it was observed and documented that a large subset of Prius drivers would respond to the data on the dashboard by driving in a manner that decreased fuel consumption, but for cloud costs.

We launched [infracost.io](/), an [open source tool](https://github.com/infracost/infracost) which looks at a terraform project and creates a cost estimate for the resources directly in the CLI:

![The output of Infracost running directly in the CLI](/img/blog/the-prius-effect-for-cloud-costs/infracost-example-cli.png)

You might say “developers don't care about cloud costs since they don't pay for it”. I would say two things:

1. [The traction](https://github.com/infracost/infracost/stargazers) we have seen with Infracost indicates to us that this assumption might be false and that developers do care. They are just unaware of cost implications due to the [complexities of cloud pricing models](https://www.abar.tech/articles/dear-finance-this-is-why-cloud-costs-are-complex/).
2. If a developer doesn't care about cloud costs, what if we put Infracost in the CI pipeline so the cost implications can also be peer reviewed in the pull request? Will a single person in a team pull the cost efficiency up?

This is what Infracost looks like if you put it into the CI pipeline, a comment summarizes the percentage change in the cloud cost due to the changes in the terraform project, as well as a detailed breakdown:

![Infracost explaining cloud costs in pull requests](/img/blog/the-prius-effect-for-cloud-costs/infracost-pull-request.png)

### Our Theory
We are working on validating this theory: can we get better cloud cost efficiency if we give developers clear visibility into potential cloud costs directly in their workflow with no added effort. I'd like to invite you to join this journey, and let's see if this theory is right or not.

1. [Install Infracost](https://www.infracost.io/docs/#quick-start) - it's free and open source.
2. Write a blog, or a tweet about the impacts you see in the short, medium and long term. Do developers talk more about costs? Do they change their code? Are there comments in peer review process about costs? Do others suggest different resources to be used? What else are you seeing?
3. Share the blogs with me, tag me in tweets etc, and I will collate all the results and write another blog with a summary and link to your results.

Cheers!
