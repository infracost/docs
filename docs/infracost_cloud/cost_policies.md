---
slug: cost_policies
title: Centralized cost policies
---

import useBaseUrl from '@docusaurus/useBaseUrl';

With cost policies you'll be able to define central policies and scan your repositories for cost saving opportunities. You can also see which repositories are not following your policies and create tasks to help engineering teams take action. The policies are checked and tracked each time a pull request is sent!

<img src={useBaseUrl("img/infracost-cloud/cost-policies.png")} alt="Cost policies" />

Some example AWS policies that we've created are: 
- Upgrade EC2 gp2 volumes to gp3.
- Use CloudFront for public S3 buckets.
- Use lifecycle configuration for S3 buckets.
- Add a launch template to EKS node groups.
- Upgrade EKS nodes gp2 volumes to gp3.
- Add a lifecycle policy for ECR repositories.
- Add autoscaling for DynamoDB RCUs.
- Add autoscaling for DynamoDB WCUs.
- Use S3 for VPC flow logs.

This feature is in beta, [contact us](mailto:hello@infracost.io) if you'd like us to work with you to write policy code for your use-cases (using Open Policy Agent's Rego language behind the scenes) and measure their cost savings.
