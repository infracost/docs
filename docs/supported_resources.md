---
slug: supported_resources
title: Supported resources
---

The quickest way to find out if your Terraform resources are supported is to [run Infracost](/docs#usage-methods) with the `--show-skipped` option. This shows the unsupported resources, some of which might be free. You could also run the following command to only see the unsupported resources: `infracost --format=json --log-level=warn | jq ".resourceSummary.unsupportedCounts"`

Infracost supports the following Terraform resources. We do not take into account free tiers that apply to some resources as it can be difficult to detect which accounts they apply to; you can still see costs going up or down based on changes since we're consistent.

### Amazon Web Services (AWS)

On-demand prices are used. In some cases, AWS Spot prices are also supported, but AWS Reserved Instance prices are not supported since it is difficult to tell from Terraform resources whether they could be utilized.

| Service name | Main Terraform resources      | Notes |
| ---          | ---                           | ---   |
| API Gateway | `aws_api_gateway_rest_api`, `aws_api_gateway_stage`, `aws_apigatewayv2_api` | |
| Certificate Manager (ACM) | `aws_acmpca_certificate_authority`, `aws_acm_certificate` | |
| CloudFront | `aws_cloudfront_distribution` | |
| CloudWatch | `aws_cloudwatch_dashboard`, `aws_cloudwatch_log_group`, `aws_cloudwatch_metric_alarm` | |
| CodeBuild | `aws_codebuild_project` | |
| Config | `aws_config_config_rule`, `aws_config_configuration_recorder`, `aws_config_organization_custom_rule`, `aws_config_organization_managed_rule` | |
| Data transfer | Use `aws_data_transfer.my_region` in [infracost-usage.yml](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml) | Most expensive price tier is used. |
| Database Migration Service (DMS) | `aws_dms_replication_instance` | |
| DocumentDB | `aws_docdb_cluster_instance` | |
| DynamoDB | `aws_dynamodb_table` |  DAX is not yet supported. |
| EventBridge | `aws_cloudwatch_event_bus` | |
| Elastic Compute Cloud (EC2) | `aws_instance`, `aws_ebs_volume`, `aws_ebs_snapshot`, `aws_ebs_snapshot_copy`, `aws_autoscaling_group`, `aws_eip` | Costs associated with marketplace AMIs are not supported. For non-standard Linux AMIs such as Windows, `operating_system` should be specified in [the infracost-usage.yml file](/docs/usage_based_resources#infracost-usage-file), `windows`, `rhel` and `suse` are supported. EC2 detailed monitoring assumes the standard 7 metrics and the most expensive price tier for CloudWatch. If a root volume is not specified then an 8Gi gp2 volume is assumed. Most expensive price tier is used for EBS IOPS. |
| Elastic Container Registry (ECR) | `ecr_repository` | |
| Elastic Container Service (ECS) | `aws_ecs_service` | When using with EC2, number of instances in `aws_autoscaling_group` can be set in [infracost-usage.yml](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml) |
| Elastic Load Balancing | `aws_alb`, `aws_lb`, `aws_elb` | |
| Elastic Kubernetes Service (EKS) | `aws_eks_cluster`, `aws_eks_fargate_profile`, `aws_eks_node_group` | |
| ElastiCache | `aws_elasticache_cluster`, `aws_elasticache_replication_group` |  |
| Elasticsearch Service | `aws_elasticsearch_domain` |  |
| FSx for Windows File Server | `aws_fsx_windows_file_system` | Data deduplication is not supported by Terraform. |
| Key Management Service (KMS) | `aws_kms_external_key`, `aws_kms_key` |  |
| Lambda | `aws_lambda_function` |  Provisioned concurrency is not yet supported. |
| Lightsail | `aws_lightsail_instance` |  |
| Managed Streaming for Apache Kafka (MSK) | `aws_msk_cluster` |  |
| Secrets Manager | `aws_secretsmanager_secret` |  |
| Simple Storage Service (S3) | `aws_s3_bucket`, `aws_s3_bucket_inventory`, `aws_s3_bucket_analytics_configuration` | Most expensive price tier is used. S3 replication time control data transfer, and batch operations are not supported by Terraform. |
| Simple Notification Service (SNS) | `sns_topic` `sns_topic_subscription` | SMS and mobile push are not yet supported. |
| Simple Queue Service (SQS) | `aws_sqs_queue` | Most expensive price tier is used. |
| Simple Systems Manager (SSM) | `aws_ssm_parameter`, `aws_ssm_activation` | |
| Relational Database Service (RDS) | `aws_db_instance`, `aws_rds_cluster_instance` | |
| Route 53 | `aws_route53_record`, `aws_route53_zone`, `aws_route53_resolver_endpoint` |  |
| Virtual Private Cloud/Network (VPC, VPN, PrivateLink, Transit Gateway) | `aws_dx_gateway_association`, `aws_ec2_client_vpn_endpoint`, `aws_ec2_client_vpn_network_association`, `aws_ec2_traffic_mirror_session`, `aws_ec2_transit_gateway_peering_attachment`, `aws_ec2_transit_vpc_attachment`, `aws_nat_gateway`, `aws_vpc_connection`, `aws_vpc_endpoint` | |

### Google Cloud Platform (GCP)

| Service name | Main Terraform resources      | Notes |
| ---          | ---                           | ---   |
| Cloud DNS | `google_dns_managed_zone` ,`google_dns_record_set` | Most expensive price tier is used. |
| Compute Engine | `google_compute_instance`, `google_compute_disk`, `google_compute_address`, `google_compute_global_address` | Sustained use discounts are applied to monthly costs, but not to hourly costs. Costs associated with non-standard Linux images, such as Windows and RHEL are not supported. Custom machine types are not supported. Sole-tenant VMs are not supported. |
| Cloud Functions | `google_cloudfunctions_function` | |
| Key Management Service (KMS) | `google_kms_crypto_key` | |
| Cloud NAT | `google_compute_router_nat` | |
| Cloud Pub/Sub | `google_pubsub_topic`, `google_pubsub_subscription` | |
| Cloud Storage | `google_storage_bucket` | Minimum storage duration is assumed.  |
| Kubernetes Engine (GKE) | `google_container_cluster`, `google_container_node_pool` | The free zonal cluster is not supported. Notes from Compute Engine also apply to the instances used in the clusters' node pools. |

### The resource I want isn't supported

We're regularly adding support for new resources - be sure to [watch the repo](https://github.com/infracost/infracost/) for new releases. You can help by:
1. [Creating an issue](https://github.com/infracost/infracost/issues/new/choose) and mentioning the resource you need and a little about your use-case; we'll try to prioritize it depending on the community feedback.
2. [Contributing to Infracost](https://github.com/infracost/infracost#contributing). You can join our [community Slack channel](https://www.infracost.io/community-chat) if you need help contributing. We're looking for people to help us add new AWS and Google resources and are willing to pay for that. Please direct-message Ali Khajeh-Hosseini on our community Slack channel to find out more!

We plan to add support for more cloud vendors ([Azure](https://github.com/infracost/infracost/issues/64)) and other IaC tools ([Pulumi](https://github.com/infracost/infracost/issues/187), [CloudFormation](https://github.com/infracost/infracost/issues/190)) too. Please watch and 👍 them if you'd like us to work on them sooner.
