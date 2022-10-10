---
slug: docs-review-with-leaders-from-stripe-and-uber
title: Infracost docs review with leaders from Stripe and Uber
author: Ali Khajeh-Hosseini
author_url: https://twitter.com/alikhajeh1
author_image_url: /img/avatars/ali.jpg
description: David Nunez (Documentation Manager at Stripe) and Stephanie Blotner (Technical Writer, Manager at Uber) review the Infracost docs and how early-stage startups should think about technical docs as a key part of their product.
hide_table_of_contents: true
image: /img/blog/docs-review/screenshot.png
date: "2021-04-27"
---

Last week David Nunez (Documentation Manager at Stripe) and Stephanie Blotner (Technical Writer, Manager at Uber) sat down with me to review our [docs](/docs). We also discussed feature-based vs task-based docs and how early-stage startups should think about technical documentation as a key part of their product.

<!--truncate-->

David and Stephanie have around 20 years of experience between them, with a special a focus on writing for a developer audience. I learned a lot from this session; I'm sharing the recording and transcripts here as I think it contains great advice that applies to other startups too.

—

<iframe width="90%" height="350" src="https://www.youtube.com/embed/-J7O4nVu_Ug" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>

The following is lightly edited transcript of our meeting:

**Ali**: So today's I've got David from Stripe and Stephanie from Uber, maybe we can do some quick intros, then we're going to have a look at the Infracost docs and I've got some questions I'm going to ask them. We'll focus on how early stage startups should look at their docs as a function. David and Stephanie thank you for taking time to meet with me!

**Stephanie**: Hi! I'm Stephanie Blotner, Technical Writer and Manager at Uber. I mainly write for a developer audience and just really love helping people learn through documentation.

**David**: I manage the docs team at Stripe and similarly just have always obsessed over documentation. I mean it's 8am, we're talking about docs, and I'm excited about it! My favorite thing is talking to startup about docs as a) they'll avoid a lot of problems later on if they think about docs early and b) also it's fresh clay to mold. It's a lot easier than helping a big company undo years and years of decisions.

**Ali:** I'm going to share my screen [on the docs homepage], and maybe I'll just let you comment on it.

**David:** I like docs to be approachable, even before you read or start to understand what the thing is, users that are coming to the docs still have the same subconscious tendencies as they did on the website. How pretty is it, what's the layout, is the simple, so I think the things that I like: the colors are nice on the eye, it has the branding, it's not like here's some auto-generated docs that looks like another terminal. There's some good negative space. Layout wise you can do a better job of directing people to the main pieces, almost like your main site, where you show what the product does in action, there's some space, so the docs should play a similar complementary role. More of a docs home page than a getting started page. Show the top 3 things that you do really well, above the fold, and also a 1-line description. Not trying to do too much upfront like install it, try it, pay us... just getting them to scroll down and browse it is better.

**Stephanie:** Definitely agree that having a home-page is important, so focusing on one or two key paths that you want to funnel users through, for example highlighting the different CI/CD integrations. When it comes to the actual getting started page, I really like how concise and clean most of your documentation actually is, and that comes from you using headings, tables and lists, and not just a wall of text. In the installation section I really like having headings that are each like a task that the user should do. Moving onto the Usage section, I think you can follow the same model, where it's more perceptive and telling people what to do. When I read this for the first time, it wasn't clear that this was the part telling me how to use Infracost with my project. I wish it was a little bit more bossy, and tell me do this, do this, so as a user it makes me feel more grounded and clearer of what's expected of me.

**Ali**: So what would success look like when you've reached the bottom of the page. If you're observing a few people looking at your docs, how do you know it's working? Would you want them to explore? Focus on one specific task so they get some value immediately?

**David**: To take a step back, look at the GitLab docs, I watched your video with Sid so I thought hah maybe GitLab has good docs, and they do! So if you scroll down, this covers the use-case and layout perfectly, you might not have 6 use-cases, you might have 1 or 3, but here they're showing some graphics, a 1-line use-case description, so users can start to map-out if this product is for them, so they're drawing you, and they're not doing anything with this page. So to answer your question of what does success look like, that is a question for your company to answer. What do you want users to do? Is it really important for them to install it, or do you want them to do their first PR and see the product in action? Coz really you want the getting started page to focus on brand new users, expert users will use other parts of the docs.

**Ali**: So during demos, people smile when they see the pull request comment. And so far I've done the CTA very poorly.

**David**: yeah it's buried. Have you heard of any eye-tracking studies with docs? Like we're nerding out now but me and Stephanie talk about this a lot. There's a lot of studies that show people read docs using an F pattern, so they'll read the heading across then scan down and they'll see something that catches their eyes then they'll read again, then they'll keep scanning and scanning. So if you can imagine if this is what you want the hook to be (CTA to use CI/CD) then it's very buried. Users might not even scroll, so you want that to be very early, and maybe re-use the same graphic from your home page so users notice it and are excited to go install it. What is the demo link on the CI/CD integrations? The word Demo is eye candy for developers. That would be what I'd highlight too.

**Stephanie:** I think the point about CI/CD being buried a bit, raises an interesting point: when someone comes to a document, and it's long or requires them to scroll a bit, it's really helpful to put upfront and set expectations, like by the end of reading this page you will be able to do have you own pull request that looks like this then have that cool screenshot or a link to the demo.

**David**: So you asked earlier, what does success look like? Constant user research is the only way to measure that. Have your high-level goals, like MAUs (Monthly Active Users) that you pitch to investors, then do user interviews regularly. At Stripe we do that weekly, all types of users, and it doesn't really need to be formal. Like offer a $10 gift card to new users. Every time that you make a change, or have a regularly weekly or monthly time you set aside for that. The time they'll save you in development time pays exponentially back. That's how you can shape over time and see if this page is working. So I would get a fresh users, ask them to open this page and see what they think, ask them to be honest, and let them talk through those first impression. Then give them a task, so you can see what they do. It's easy to develop docs in a vacuum, so these are my tools, my environment and my terminal but users might have different setups.

**Stephanie**: The docs are actually part of the product. That's a key point.

**David**: It's often easier to do that vs product research, as it's just a document. And you can do it with sample docs, without even having a built product or working code. So docs are a great way to test upcoming things, they can simulate what they would do, so you can take that feedback and incorporate it into the product. We do that all the time and it helps us a lot.

**Stephanie**: It's also a great way to test out eye patterns, so if you share a link with someone and are watching their screen, you can immediately tell how they scroll, do they go all the way to the bottom, are they trying to click on stuff, are they lingering.

**Ali**: So far we have product docs, we don't have guides or use-cases. How do you think about that? Should we have both and split the focus?

**Stephanie**: It's really challenging when you're launching docs for the first-time, to know how to chose and what to write first. It's very cognitively intuitive to put-up feature docs, and I'm super-biased here but I think task-based docs are the way to go, to really guide users towards what they're trying to accomplish. Users are coming to your docs because they're trying to learn something, or they're trying to accomplish a task or goal, or they're really frustrated, something is broken and it's not working. The more you can guide them, the more you can reduce the cognitive overload from them. The better-off you are. But it's definitely more work on the creator side as you really have to understand who are you users and what are they trying to do.

**David**: I'm going to use stronger language and say that's the only way to do it properly, but it's also by far the hardest way to do it. A simpler way to do it is to just get your language and terminology mapped to how users are talking about it, so it's really easy to go with awesome names you came-up with your features, but users are really searching Google on how to save money with AWS. They're not like searching "use Infracost 2.0 cloud-saver". Write down 3 use-cases that you want Infracost to show-up on Google, and put that on your pages front and center. Then you can map-out the rest of the docs. Information-architecture wise, you should always think about their problems and the tasks they'd need to do to solve it, and work backwards from that.

**Ali**: So for this next part, I thought it would be cool if we could zone out a bit and ignore Infracost docs, to talk about more generic questions. To begin, when do you think seed-stage startups should start to think about docs, and maybe more importantly what is important for them to consider?

**Stephanie**: I think you should consider docs as part of the product. The same care and considerations and thoughts you put into the product should go into docs. Docs are an incredible tool to improve adoption, reduce onboarding and support time, brand reputation, overall wonderful-ness. Don't worry too much about being comprehensive, and trying to document all the things as you haven't figured out everything. Maybe use-cases, what this thing is, maybe a little about troubleshooting. People prefer less content actually, and gather feedback really early on docs.

**David**: Agree, it's part of the product, you don't want to say do this first or do it last. If you think of docs as a way to increase adoption, or reduce the time it takes for someone to start using your product vs a sales person reaching out to them and them trialing it over a period of time, you're making a lot more money efficiently. It's better when a user feels smart, and they can figure out your product and use it without any human intervention. The costs (user acquisition) and the user experience improves, so what else do you need?

**Ali**: In open source, the contributors can be from a variety experiences and from all over the world, should the core contributors own the docs?

**Stephanie**: Have the core team setup the docs, have principals of how you'd want docs to be, and review contributions. One way I've seen it done really well is similar to how Infracost leaves a comment on PRs, you can get people to read a check list, and have docs as one of the core things as they're making a pull request.

**Ali**: When you're submitting a PR, it's accepted that it obviously needs test. Do you feel like it's the same with docs? Does it create a barrier? Coz in the early stages of an open source project, you kinda want everyone to come check it out and contribute, so the discussions we've had with Alistair are sometimes like, let's just get them to contribute code and we'll write all the docs. So we can reduce the barriers, but I don't think that scales.

**David**: that definitely won't scale.

**Stephanie**: You want the core team to setup the docs framework and have standards for docs, so if you have tasks or use-cases, people can see how to document it. And that way you're reducing the barrier, so people can just follow it to plug things in.

**David**: I think that's the right way to think about it. So you don't want a high barrier, but do want to document yourself out of those tasks. Find a light-weight style guide, like the [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/) is great, so use something like that and add a few things that are specific to Infracost. You don't want a ton of stuff, and also PR guidelines: what does a good PR review look like, show by example, so have examples where you are giving people feedback on the docs and put that in the run book for a good PR review. So the balance is you want lots of contributions, but also you want quality contributions. So showing the community how excited you are about good docs via contributions or having a leader board or some way to call-out good docs contributions. People don't usually contribute to open source docs as they think no one really cares. I've also found in engineering teams to put in an incentive in the engineering career ladder helps, like a simple thing to say as part of being a senior engineer you can document your code and review other docs as part of the peer-review process. Setting the example from the founding team, is important. I've been at companies where the executive don't even put grammar into their emails and that sends a signal that I'm too busy to capitalize my words, use periods and commas, and so why would anyone else obsess with quality of their writing as the leadership don't. If you signal without being overbearing, people will see that and follow along.

**Ali**: That's awesome! In your recent separate blog posts I was reading about the importance of having a writing culture, and I was going to ask a question about when startup founders should start thinking about that as part of the bigger company culture; but you've already answered that question. It's like: you set the tone as leaders of the company and you can do a lot early-on to encourage and make it part of the process vs something that's not really thought of from day 1. I don't have any other questions! Thank you very much - I don't know if you have any other tips or any other final thing I should go look at or think about?

**David**: I'd say resource-wise, [Nielsen Norman Group](https://www.nngroup.com/) is great. If you want to learn about F-patterns or information architecture, all the nitty gritty, their search is pretty good, you'll find stuff dating back 20 or 25 years, up till recently when they have videos. So I would say when you want to dive deep into something, that resource is great. My last tip would just be: that if you set the goal of having high quality content and you know it's important, just know that you're not going to get there on day 1, just little steps so you move in that direction, creating that habit and move towards that goal. You'll then someones have huge breakthroughs and make big leaps as long as you constantly keep working on it.

**Stephanie**: Exactly, perfect is the enemy of good, so don't put too much pressure specially if it's people's first time contributing to your code base and documentation - you don't want to be too hard on them.

**Ali**: That's awesome! Thank you both very much, David and Stephanie for your time. I'm going to put a lot of the stuff you said into practice and hopefully in 6 months time when you look at the Infracost docs, it'll be a lot better.
