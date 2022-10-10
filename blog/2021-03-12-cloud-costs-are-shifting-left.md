---
slug: cloud-costs-are-shifting-left
title: Cloud costs are shifting left
author: Alistair Scott
author_url: https://twitter.com/aliscott
author_image_url: /img/avatars/alistair.jpg
description: Why did we build Infracost?
hide_table_of_contents: true
date: "2021-03-12"
---

"Shift left" has become a popular buzzword for both Software Engineering and DevOps. It means introducing processes earlier in the software development cycle.

<!--truncate-->

The "shift left" principle started with testing. In a traditional waterfall model testing is performed just before release. Shift left testing started it earlier by introducing practices such as Test-Driven Development (TDD) and Behaviour-Driven Development (BDD).


We are now seeing the "shift left" principle applied to other disciplines. Continuous delivery platforms allow engineering teams to deploy frequently and integrate a suite of tools into their cycle. The term DevSecOps has been coined. The idea behind it is to introduce security as early as possible in the software development cycle. This has given rise to a whole ecosystem of tools to help implement this practice. Companies like Snyk and Anchore integrate automated security scanning into DevOps workflows so teams can proactively find and fix vulnerabilities.

### Can you shift too far left?

There's an argument that "shifting left" gives too much work and responsibility to engineering teams. This can be the case if the right tooling is not available.

"Shift left" isn't about performing one-off tasks earlier in the cycle, and this is where the name causes some confusion. It's about introducing processes and automation earlier and performing them continuously throughout development.

When a company introduces a "shift left" mentality it is important that it doesn't impact developer velocity. Tools that help here should fit into developers' workflows and show them the right level of information at the right time.

### Will cloud cost shift left?

Currently cloud costs aren't discussed until they become a problem. A common story is when cloud costs become a problem, companies will set a top-down directive and form a team to reduce their spend by X%. They manage to fix the immediate pain but after six to twelve months the problem returns.

Cloud costs aren't a one-off problem that can be solved. That's why it's inevitable that cloud costs will "shift left". Building a cost-aware engineering team is crucial to keep cloud bills under control.

That's why we built Infracost. We help engineering teams implement this culture of cost-awareness without impacting their velocity. You can integrate Infracost directly into your existing workflow to see cost information throughout your DevOps process. Check out [our integrations](https://www.infracost.io/docs/integrations/cicd) for instructions.
