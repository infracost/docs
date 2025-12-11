---
slug: infracarbon
title: InfraCarbon
---

# InfraCarbon

Prevent unnecessary carbon emissions every time you deploy infrastructure. InfraCarbon displays the carbon impact of your infrastructure changes directly in pull requests. This page explains how we calculate that data:

![Carbon impact in pull requests](/img/infracost-cloud/infra-carbon-comment-example.png)

## Our approach

We've partnered with [GreenPixie](https://greenpixie.com/), a cloud sustainability data provider, to power InfraCarbon's carbon calculations.

GreenPixie's data is verified against ISO-14064 (aligned with the Greenhouse Gas Protocol) and under constant review by their research team of data scientists and academic partners. To comply with [GHG standards](https://ghgprotocol.org/) and account for the reality of cloud-related emissions, GreenPixie's calculations consider:

- **Cloud location**: local grid carbon intensity varies significantly by region
- **Hardware**: different instance families and generations have different efficiency profiles
- **Data center PUE**: Power Usage Effectiveness measures cooling and operational overhead
- **Scope 3 emissions**: value chain emissions including hardware manufacturing
- **Cloud resource type**: compute, storage, and networking have different footprints
- **Instance size**: larger instances consume more power

This methodology provides consistent measurement across AWS, Azure, and Google Cloud.

## Getting startred

InfraCarbon is on by default for all new customers. For existing customers, log into the Infracost dashboard and go to Settings > Org Settings > InfraCarbon.

