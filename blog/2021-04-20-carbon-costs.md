---
slug: carbon-costs
title: Impact of cloud waste on the environment
author: Alistair Scott
author_url: https://twitter.com/aliscott
author_image_url: /img/avatars/alistair.jpg
description: Reducing cloud waste isn't just about saving money
hide_table_of_contents: false
date: "2021-04-20"
---

It's estimated that data centers consume around 1% of the global electric supply [^1] and this could increase to between 3-13% by 2030 [^2]. The wider ICT (information and communications technology) ecosystem accounts for 2% of the world's carbon emissions, putting it on par with the entire aviation industry [^3].

<!--truncate-->

The cloud has revolutionized how we use data centers. With the democratisation of infrastructure provisioning, companies have been able to launch, iterate and scale many times faster than before.

There's no doubt that migrating from traditional on-premise data centers to the cloud is more environmentally friendly. Due to their scale and multi-tenancy, cloud providers can be a lot more efficient. By switching to the cloud, companies can provision 75% fewer servers for the same workload [^2]. Between 2010 and 2018 the total global compute power of data centers increased five-fold. However, due to the energy efficiency improvements offered by the cloud, the amount of energy they consumed only grew by 6% [^3].

The large cloud providers themselves all have sustainability initiatives. Google recently used their DeepMind AI to reduce the energy required for cooling their data centers by 40% [^4]. In December 2020 Amazon announced they had become the world's largest corporate purchaser of renewable energy [^5].

Despite these encouraging efforts we are seeing a growing problem of "cloud waste". In 2020 Infrastructure as a Service (IaaS) spend was $50bn and it's estimated that $17bn of this spend is "cloud waste" [^6]. The main causes of this are idle resources and over-provisioned resources.

With the rise of infrastructure as code deploying to the cloud has become even more accessible. It's no longer only central teams who are provisioning infrastructure. It's now the responsibility of every engineering team, and it's integrated directly into their workflows. Without visibility at this level it's only a matter of time before a company suffers from cloud sprawl.

We think it's important that, as engineers, we take responsibility to reduce this waste. We are looking at [how we can integrate carbon emission estimates into Infracost](https://github.com/infracost/infracost/issues/86). If you have expertise in this area, e.g. know what data sources we can use (as discussed in the GitHub issue), please [reach out to us](https://www.infracost.io/community-chat). We're interested in hearing what we can do to help.

1. [https://www.iea.org/reports/data-centres-and-data-transmission-networks](https://www.iea.org/reports/data-centres-and-data-transmission-networks)
2. [https://www.mdpi.com/2078-1547/6/1/117](https://www.mdpi.com/2078-1547/6/1/117)
3. [https://www.nature.com/articles/d41586-018-06610-y](https://www.nature.com/articles/d41586-018-06610-y)
4. [https://blog.google/outreach-initiatives/environment/deepmind-ai-reduces-energy-used-for/](https://blog.google/outreach-initiatives/environment/deepmind-ai-reduces-energy-used-for/)
5. [https://press.aboutamazon.com/news-releases/news-release-details/amazon-becomes-worlds-largest-corporate-purchaser-renewable](https://press.aboutamazon.com/news-releases/news-release-details/amazon-becomes-worlds-largest-corporate-purchaser-renewable)
6. [https://www.gartner.com/en/newsroom/press-releases/2019-11-13-gartner-forecasts-worldwide-public-cloud-revenue-to-grow-17-percent-in-2020](https://www.gartner.com/en/newsroom/press-releases/2019-11-13-gartner-forecasts-worldwide-public-cloud-revenue-to-grow-17-percent-in-2020)
