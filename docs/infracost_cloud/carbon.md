---
slug: carbon
title: InfraCarbon
---

# Carbon Calculation Methodology

InfraCarbon displays the CO₂e impact of your infrastructure changes directly in pull requests. This page explains how we calculate that data.

## Our approach

We've partnered with [GreenPixie](https://greenpixie.com/), a cloud sustainability data provider based in London, UK, to power InfraCarbon's carbon calculations.

GreenPixie's data is verified against ISO-14064 (aligned with the Greenhouse Gas Protocol) and under constant review by their research team of data scientists and academic partners. Alongside accuracy they prioritize actionability, ensuring the data integrates seamlessly into existing workflows and decision-making.

## What the calculations consider

To comply with GHG standards and account for the reality of cloud-related emissions, the calculations consider:

- **Cloud location**: local grid carbon intensity varies significantly by region
- **Workload timing**: when compute runs affects the grid mix powering it
- **Hardware**: different instance families and generations have different efficiency profiles
- **Data center PUE**: Power Usage Effectiveness measures cooling and operational overhead
- **Scope 3 emissions**: value chain emissions including hardware manufacturing
- **Cloud resource type**: compute, storage, and networking have different footprints
- **Instance size**: larger instances consume more power

This methodology provides consistent measurement across AWS, Azure, and Google Cloud.

## Learn more

For a deeper understanding of cloud sustainability concepts including location-based calculations, Scopes 1, 2 & 3, water consumption, and the fundamental formulas for calculating cloud impact, GreenPixie offers a certification course: [Cloud Sustainability Fundamentals — GreenOps Academy](https://academy.greenpixie.com/course/cloud-sustainability-fundamentals)

## Questions?

If you have questions about how carbon data is calculated for your specific infrastructure, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄