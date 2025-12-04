---
slug: carbon
title: InfraCarbon
---

# InfraCarbon

InfraCarbon displays the CO₂e impact of your infrastructure changes directly in pull requests. This page explains how we calculate that data.

![Carbon impact in pull requests](/img/infracost-cloud/infracarbon.png)

## Our approach

We've partnered with [GreenPixie](https://greenpixie.com/), a cloud sustainability data provider based in the UK, to power InfraCarbon's carbon calculations.

GreenPixie's data is verified against ISO-14064 (aligned with the Greenhouse Gas Protocol) and under constant review by their research team of data scientists and academic partners.

## What the calculations consider

To comply with GHG standards and account for the reality of cloud-related emissions, the calculations consider:

- **Cloud location**: local grid carbon intensity varies significantly by region
- **Hardware**: different instance families and generations have different efficiency profiles
- **Data center PUE**: Power Usage Effectiveness measures cooling and operational overhead
- **Scope 3 emissions**: value chain emissions including hardware manufacturing
- **Cloud resource type**: compute, storage, and networking have different footprints
- **Instance size**: larger instances consume more power

This methodology provides consistent measurement across AWS, Azure, and Google Cloud.

## Learn more

For a deeper understanding of cloud sustainability concepts including location-based calculations, Scopes 1, 2 & 3, water consumption, and the fundamental formulas for calculating cloud impact, GreenPixie offers a [certification course](https://academy.greenpixie.com/course/cloud-sustainability-fundamentals).

## Questions?

If you have questions about how carbon data is calculated for your specific infrastructure, please [contact us](/support/).
