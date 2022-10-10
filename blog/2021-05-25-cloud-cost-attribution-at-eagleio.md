---
slug: cloud-cost-attribution-at-eagleio
title: How Eagle.io achieves cloud cost attribution for their multi-tenant SaaS
author: Ali Khajeh-Hosseini
author_url: https://twitter.com/alikhajeh1
author_image_url: /img/avatars/ali.jpg
description: David Julia, head of engineering at Eagle.io talks about cost attribution
hide_table_of_contents: false
image: img/blog/cloud-cost-attribution-at-eagleio/ali-david.png
date: "2021-05-25"
---

I sat down with [David Julia](https://twitter.com/DavidJulia), who is the Head of Engineering at [Eagle.io](https://eagle.io) to talk about cost attribution, why it matters, who should care and how Eagle.io achieves this. We worked through their use-case, their tech stack, the tools they use, what worked and what did not work, and ultimately how they have achieved cloud cost attribution.

<!--truncate-->

<iframe width="90%" height="350" src="https://www.youtube.com/embed/F8G9bhwNfNY" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>

The following is lightly edited transcript (from YouTube) of the introduction section of our chat:


**Ali**: Hey everyone, I have David Julia here who is the head of engineering at Eagle.io. David thank you very much for taking time to speak with me today. Would you like to introduce yourself?

**David**: Yeah absolutely, so David Julia head of engineering at Eagle.io. We do environmental IoT so we're an environmental IoT data platform essentially, you connect up all sorts of devices to us were used in water monitoring, natural resource monitoring, various other things. We are used to monitor the cracks in Mount Rushmore for example, how Mount Rushmore is splitting and how that's going and whether they need to remediate anything so you know a broad variety of use cases, all these data loggers centers, connected to the platform and analytics and processing logic on that. A fun gig for me. I just started that a couple of months ago before that I was
in software engineering consulting for a long time, about nine years at Pivotal Labs and then VMware.
A fun little project that we're working on now and I had the chance to jump into some cost attribution stuff as part of it, hence the conversation today.

**Ali**: Which cloud providers are you using and what is the setup?

**David**: We're a multi-tenant SaaS platform so the whole value proposition of Eagle.io
is unlike AWS IoT Core or Azure IoT, we think of those as primitive building blocks which if you want to build your own solution cool go nuts with them but we're much higher up the stack than that. Essentially for engineering firms or big municipal water companies, state water companies, mining companies that they don't really want to mess around with all this code and IoT Core and all of this different stuff that's out there, which is really cool admittedly, but not core to their business so they just hook up to us and very quickly they're able to get data in analyze it alert on it. If you're monitoring a dam for example you want to know if a dam wall is failing you don't really care about configuring microservices or anything like that. So we're a multi-tenant SaaS application lots and lots of different users but a lot of shared resources as well. So that's kind of the layout. We're mostly AWS.

**Ali**: Can you tell us then in this context, what do you mean by cost attribution and why do cloud costs matter as part of that?

**David**: So why cost attribution, well it's pretty fundamental especially when you're building a data
intensive application like ours, but also in other circumstances you really just want to know 1)
can I guarantee that I'm going to make good gross margin, and 2) if I add more customers am I going to be
adding more profit or not is it going to be impacting my gross margin positively or negatively and if that's a very big question mark that's something to be nervous about and that's actually the situation we found ourselves in. We were negotiating with a particular enterprise customer who wanted to essentially more than 10x their usage of the platform and so they said well you got to give us a discount, for this to be financially feasible for us to do this and we want to do this deal you guys but we need to make it in the realm of dollars and that we can actually do. We said well we should be able to do this but our current pricing model doesn't scale for them or maybe it's just the numbers but if we give them too deep of a discount are we going to lose money on the thing like we don't know like what are our costs what's their usage what rights like what what's even driving our costs. So that's when we really sat down and said okay we need to figure this out.

**Watch the whole interview on [Infracost's YouTube channel](https://www.youtube.com/channel/UCyqe8Ln5l7WcdLpRF-8UV8w). Subtitles have also been enabled.**

If you are interested in working in environmental IoT, reach out to [David on Twitter](https://twitter.com/DavidJulia)!
