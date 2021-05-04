---
slug: supported_resources
title: Supported resources
---

The quickest way to find out if your Terraform resources are supported is to run [`infracost breakdown`](/docs#usage) with the `--show-skipped` flag. This shows the unsupported resources, some of which might be free.

You could also run the following command to only see the unsupported resources: `infracost breakdown --format=json --log-level=warn | jq ".summary.unsupportedResourceCounts"`.

Infracost supports the following Terraform resources. We do not take into account free tiers that apply to some resources as it can be difficult to detect which accounts they apply to; you can still see costs going up or down based on changes since we're consistent.

### Amazon Web Services (AWS)

On-demand prices are used by default unless specified otherwise in the [usage file](/docs/usage_based_resources#infracost-usage-file).

| Service name | Main Terraform resources      | Notes |
| ---          | ---                           | ---   |
| API Gateway | `aws_api_gateway_rest_api`, `aws_api_gateway_stage`, `aws_apigatewayv2_api` | |
| Certificate Manager (ACM) | `aws_acmpca_certificate_authority`, `aws_acm_certificate` | |
| CloudFront | `aws_cloudfront_distribution` | |
| CloudWatch | `aws_cloudwatch_dashboard`, `aws_cloudwatch_log_group`, `aws_cloudwatch_metric_alarm` | |
| CodeBuild | `aws_codebuild_project` | |
| Config | `aws_config_config_rule`, `aws_config_configuration_recorder`, `aws_config_organization_custom_rule`, `aws_config_organization_managed_rule` | |
| Data transfer | Use `aws_data_transfer.my_region` in the [usage file](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml) | Most expensive price tier is used. |
| Database Migration Service (DMS) | `aws_dms_replication_instance` | |
| Direct Connect | `aws_dx_gateway_association`, `aws_dx_connection` | |
| DocumentDB | `aws_docdb_cluster`, `aws_docdb_cluster_instance`, `aws_docdb_cluster_snapshot` | |
| DynamoDB | `aws_dynamodb_table` |  DAX is not yet supported. |
| EventBridge | `aws_cloudwatch_event_bus` | |
| Elastic Compute Cloud (EC2) | `aws_instance`, `aws_ebs_volume`, `aws_ebs_snapshot`, `aws_ebs_snapshot_copy`, `aws_autoscaling_group`, `aws_eip` | Costs associated with marketplace AMIs are not supported. For non-standard Linux AMIs such as Windows, `operating_system` should be specified in the [usage file](/docs/usage_based_resources#infracost-usage-file), `windows`, `rhel` and `suse` are supported. Reserved instance settings can also be set in the usage file. EC2 detailed monitoring assumes the standard 7 metrics and the most expensive price tier for CloudWatch. If a root volume is not specified then an 8Gi gp2 volume is assumed. Most expensive price tier is used for EBS IOPS. |
| Elastic Container Registry (ECR) | `ecr_repository` | |
| Elastic Container Service (ECS) | `aws_ecs_service` | When using with EC2, number of instances in `aws_autoscaling_group` can be set in the [usage file](/docs/usage_based_resources#infracost-usage-file) |
| Elastic File Storage (EFS) | `aws_efs_file_system` | |
| Elastic Load Balancing | `aws_alb`, `aws_lb`, `aws_elb` | |
| Elastic Kubernetes Service (EKS) | `aws_eks_cluster`, `aws_eks_fargate_profile`, `aws_eks_node_group` | Reserved instance settings can be set in the [usage file](/docs/usage_based_resources#infracost-usage-file). |
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
| Redshift | `aws_redshift_cluster` | |
| Relational Database Service (RDS) | `aws_rds_cluster`, `aws_db_instance`, `aws_rds_cluster_instance` | |
| Route 53 | `aws_route53_record`, `aws_route53_zone`, `aws_route53_resolver_endpoint`, `aws_route53_health_check` |  |
| Virtual Private Cloud/Network (VPC, VPN, PrivateLink, Transit Gateway) | `aws_ec2_client_vpn_endpoint`, `aws_ec2_client_vpn_network_association`, `aws_ec2_traffic_mirror_session`, `aws_ec2_transit_gateway_peering_attachment`, `aws_ec2_transit_vpc_attachment`, `aws_nat_gateway`, `aws_vpc_connection`, `aws_vpc_endpoint` | |

### Google Cloud Platform (GCP)

| Service name | Main Terraform resources      | Notes |
| ---          | ---                           | ---   |
| Cloud DNS | `google_dns_managed_zone` ,`google_dns_record_set` | Most expensive price tier is used. |
| Cloud Functions | `google_cloudfunctions_function` | |
| Cloud Logging | `google_logging_billing_account_bucket_config`, `google_logging_billing_account_sink`, `google_logging_folder_bucket_config`, `google_logging_folder_sink`, `google_logging_organization_bucket_config`, `google_logging_organization_sink`, `google_logging_project_bucket_config`, `google_logging_project_sink` | |
| Cloud Monitoring | `google_monitoring_metric_descriptor` | |
| Cloud NAT | `google_compute_router_nat` | |
| Cloud Pub/Sub | `google_pubsub_topic`, `google_pubsub_subscription` | |
| Cloud Storage | `google_storage_bucket` | Minimum storage duration is assumed.  |
| Cloud SQL | `google_sql_database_instance` | Cloud SQL network, SQL Server license, 1-3 years commitments costs are not yet supported. |
| Compute Engine | `google_compute_image`, `google_compute_machine_image`, `google_compute_instance`, `google_compute_disk`, `google_compute_address`, `google_compute_global_address`, `google_compute_snapshot` | Sustained use discounts are applied to monthly costs, but not to hourly costs. Costs associated with non-standard Linux images, such as Windows and RHEL are not supported. Custom machine types are not supported. Sole-tenant VMs are not supported. |
| Container Registry | `google_container_registry` | |
| Key Management Service (KMS) | `google_kms_crypto_key` | |
| Kubernetes Engine (GKE) | `google_container_cluster`, `google_container_node_pool` | The free zonal cluster is not supported. Notes from Compute Engine also apply to the instances used in the clusters' node pools. |
| Memorystore Redis | `google_redis_instance` | |

### Microsoft Azure

Coming soon! Please 👍 [this issue](https://github.com/infracost/infracost/issues/64) to receive updates.

<!--
| Service name | Main Terraform resources      | Notes |
| ---          | ---                           | ---   |
| App Service | `azurerm_app_service_certificate_order` | |
| Database    | `azurerm_mariadb_server`, `azurerm_mssql_database`, `azurerm_mysql_server`, `azurerm_postgresql_server` |
| Virtual Machines | `azurerm_linux_virtual_machine`, `azurerm_managed_disk`, `azurerm_windows_virtual_machine` | Non-standard images such as RHEL are not supported. Low priority, Spot and Reserved instances are not supported. |
| Virtual Machine Scale Sets | `azurerm_linux_virtual_machine_scale_set`, `azurerm_windows_virtual_machine_scale_set` | |
-->

### The resource I want isn't supported

We regularly add support for new resources so we recommend watching our repo for releases: goto the [repo](https://github.com/infracost/infracost) page, click on the Watch button > select Custom > Releases and click on Apply.

You can help by:
1. [Creating an issue](https://github.com/infracost/infracost/issues/new/choose) and mentioning the resource names you need; we'll try to prioritize it depending on the community feedback.
2. [Contributing to Infracost](https://github.com/infracost/infracost#contributing). You can join our [community Slack channel](https://www.infracost.io/community-chat) if you need help contributing.

We plan to add support for other IaC tools such as [Pulumi](https://github.com/infracost/infracost/issues/187) and [CloudFormation](https://github.com/infracost/infracost/issues/190). Please 👍 them if you'd like us to work on them sooner.
