---
slug: cost_policies
title: Centralized cost policies
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When decentralizing the provisioning of infrastructure, it's a good idea to codify best practices. This is knowledge that the central DevOps, Platform or FinOps teams have gained over many years.

With cost policies, you can define and codify these best practices, and scan your repositories for cost saving opportunities. As Pull Requests are created, Infracost will scan the code and check them against your policies, and show them in the central dashboard to be actioned. These can then be tracked, and when a Pull Request is updated or created fix policies failures, these will be tracked.

<img src={useBaseUrl("img/infracost-cloud/cost-policies.png")} alt="Cost policies" />

## Usage

The cost policy lifecycle is:

1. **Infracost checks pull requests for policies**: Infracost checks all new pull requests for your policies and highlights resources that do not follow them, including their code repository and resource address.

2. **You review issues and create tasks**: You review issues and create tasks for engineering teams to fix the policy recommendations.

3. **Infracost detects fixes and sums cost savings**: Infracost automatically marks the policy recommendation as resolved when it detects the fix in new pull requests, and counts the total cost saving.

Infracost comes with a set of default policies, but we work with customers to define custom policies for their use-case. Infracost uses the Open Policy Agent Rego language, so users are also able to bring their own code. Email us on [hello@infracost.io](mailto:hello@infracost.io) for a demo.

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
