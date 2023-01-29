---
slug: cost_policies
title: Centralized cost policies
---

import useBaseUrl from '@docusaurus/useBaseUrl';

With cost policies, you define central policies and scan your repositories for cost saving opportunities. You can also see which repositories are not following your policies and create tasks to help engineering teams take action. The policies are checked and tracked each time a pull request is sent.

<img src={useBaseUrl("img/infracost-cloud/cost-policies.png")} alt="Cost policies" />

## Usage

This feature is in beta, [contact us](mailto:hello@infracost.io) if you'd like us to work with you to write policy code for your use-cases (using Open Policy Agent's Rego language behind the scenes) and measure their cost savings.

The cost policy lifecycle is:

1. **Infracost checks pull requests for policies**: Infracost checks all new pull requests for your policies and highlights resources that do not follow them, including their code repository and resource address.

2. **You review issues and create tasks**: You review issues and create tasks for engineering teams to fix the policy recommendations.

3. **Infracost detects fixes and sums cost savings**: Infracost automatically marks the policy recommendation as resolved when it detects the fix in new pull requests, and counts the total cost saving.

## Example policies

Some example AWS policies that we've created are: 
- Upgrade EC2 GP2 volumes to GP3.
  <img src={useBaseUrl("img/infracost-cloud/cost-policy-gp2-to-gp3.png")} alt="Upgrade EC2 GP2 volumes to GP3." />
- Use CloudFront for public S3 buckets.
- Use lifecycle configuration for S3 buckets.
- Add a launch template to EKS node groups.
- Upgrade EKS nodes gp2 volumes to gp3.
- Add a lifecycle policy for ECR repositories.
- Add autoscaling for DynamoDB RCUs.
- Add autoscaling for DynamoDB WCUs.
- Use S3 for VPC flow logs.

