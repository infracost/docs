---
slug: supported_resources
title: Supported resources
---

The quickest way to find out if your Terraform resources are supported is to [run Infracost](/docs#usage-methods) with the `--show-skipped` option. This shows the unsupported resources, some of which might be free.

Infracost currently supports the following Terraform resources.

### Amazon Web Services (AWS)

On-demand prices are used. In some cases, AWS Spot prices are also supported, but AWS Reserved Instance prices are not supported since it is difficult to tell from Terraform resources whether they could be utilized.

| Service name | Main Terraform resources      | Notes |
| ---          | ---                           | ---   |
| API Gateway | `aws_api_gateway_rest_api`, `aws_api_gateway_stage`, `aws_apigatewayv2_api` | |
| Database Migration Service (DMS) | `aws_dms_replication_instance` | |
| DocumentDB | `aws_docdb_cluster_instance` | |
| DynamoDB | `aws_dynamodb_table` |  DAX is not yet supported. |
| Elastic Compute Cloud (EC2) | `aws_instance`, `aws_ebs_volume`, `aws_ebs_snapshot`, `aws_ebs_snapshot_copy`, `aws_autoscaling_group`, `aws_eip` | Costs associated with non-standard Linux AMIs, such as Windows and RHEL are not supported.<br/>EC2 detailed monitoring assumes the standard 7 metrics and the lowest tier of prices for CloudWatch.<br/>If a root volume is not specified then an 8Gi gp2 volume is assumed. |
| Elastic Container Service (ECS) | `aws_ecs_service` |  Only supports Fargate on-demand. |
| Elastic Load Balancing | `aws_alb`, `aws_lb`, `aws_elb` | |
| Elastic Kubernetes Service (EKS) | `aws_eks_cluster`, `aws_eks_fargate_profile`, `aws_eks_node_group` | |
| ElastiCache | `aws_elasticache_cluster`, `aws_elasticache_replication_group` |  |
| Elasticsearch Service | `aws_elasticsearch_domain` |  |
| Lambda | `aws_lambda_function` |  Provisioned concurrency is not yet supported. |
| Lightsail | `aws_lightsail_instance` |  |
| Managed Streaming for Apache Kafka (MSK) | `aws_msk_cluster` |  |
| Simple Storage Service (S3) | `aws_s3_bucket`, `aws_s3_bucket_inventory`, `aws_s3_bucket_analytics_configuration` | S3 replication time control data transfer, and batch operations are not supported by Terraform. |
| Simple Queue Service (SQS) | `aws_sqs_queue` | |
| Relational Database Service (RDS) | `aws_db_instance`, `aws_rds_cluster_instance` | |
| Route 53 | `aws_route53_record`, `aws_route53_zone` |  |
| Virtual Private Cloud (VPC) | `aws_nat_gateway` | |

### Google Cloud Platform (GCP)

| Service name | Main Terraform resources      | Notes |
| ---          | ---                           | ---   |
| Compute Engine | `google_compute_instance`, `google_compute_disk` | Sustained use discounts are applied to monthly costs, but not to hourly costs. Costs associated with non-standard Linux images, such as Windows and RHEL are not supported. Custom machine types are not supported. Sole-tenant VMs are not supported. |

### The resource I want isn't supported

We're regularly adding support for new resources - be sure to [watch the repo](https://github.com/infracost/infracost/) for new releases. You can help by:
1. [Creating an issue](https://github.com/infracost/infracost/issues/new) and mentioning the resource you need and a little about your use-case; we'll try to prioritize it depending on the community feedback.
2. [Contributing to Infracost](https://github.com/infracost/infracost#contributing). You can join our [Discord community](https://discord.gg/rXCTaH3) if you need help contributing. We're looking for people to help us add new AWS and Google resources and are willing to pay for that. Please direct-message alikhajeh1 on our Discord chat to find out more!

We plan to add support for more cloud vendors ([Azure](https://github.com/infracost/infracost/issues/64)) and other IaC tools ([Pulumi](https://github.com/infracost/infracost/issues/187), [CloudFormation](https://github.com/infracost/infracost/issues/190)) too. Please watch and 👍 them if you'd like us to work on them sooner.
