---
slug: supported_resources
title: Supported resources
---

Infracost supports over 200 Terraform resources across AWS, Google and Azure. Over 500 free resources have also been identified; these are not shown in the CLI output since they are free. Free resources can be seen when running the CLI with the `--log-level debug` flag, look for "Skipping free resource" lines.

The quickest way to find out if your Terraform resources are supported is to run [`infracost breakdown`](/docs#usage) with the `--show-skipped` flag. This shows the unsupported resources, some of which might be free.

You could also run the following command to only see the unsupported resources: `infracost breakdown --format=json --log-level=warn | jq ".summary.unsupportedResourceCounts"`.

### Amazon Web Services (AWS)

GovCloud and China regions are also supported.

| Service name | Main Terraform resources      | Notes |
| ---          | ---                           | ---   |
| API Gateway | `aws_api_gateway_rest_api`, `aws_api_gateway_stage`, `aws_apigatewayv2_api` | |
| Backup | `aws_backup_vault` | AWS Storage Gateway Volume Backup prices could not be found in the AWS pricing data. |
| Certificate Manager (ACM) | `aws_acmpca_certificate_authority`, `aws_acm_certificate` | |
| CloudFormation | `aws_cloudformation_stack`, `aws_cloudformation_stack_set` | |
| CloudFront | `aws_cloudfront_distribution` | |
| CloudWatch | `aws_cloudwatch_dashboard`, `aws_cloudwatch_log_group`, `aws_cloudwatch_metric_alarm` | |
| CodeBuild | `aws_codebuild_project` | |
| Config | `aws_config_config_rule`, `aws_config_configuration_recorder`, `aws_config_organization_custom_rule`, `aws_config_organization_managed_rule` | |
| Data transfer | Use `aws_data_transfer.my_region` in the [usage file](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml) | Most expensive price tier is used. |
| Database Migration Service (DMS) | `aws_dms_replication_instance` | |
| Direct Connect | `aws_dx_gateway_association`, `aws_dx_connection` | |
| Directory Service | `aws_directory_service_directory` | |
| DocumentDB | `aws_docdb_cluster`, `aws_docdb_cluster_instance`, `aws_docdb_cluster_snapshot` | |
| DynamoDB | `aws_dynamodb_table` |  DAX is not yet supported. |
| Elastic Compute Cloud (EC2) | `aws_instance`, `aws_ebs_volume`, `aws_ebs_snapshot`, `aws_ebs_snapshot_copy`, `aws_autoscaling_group`, `aws_eip` | Costs associated with marketplace AMIs are not supported. For non-standard Linux AMIs such as Windows, `operating_system` should be specified in the [usage file](/docs/usage_based_resources#infracost-usage-file), `windows`, `rhel` and `suse` are supported. Reserved instance settings can also be set in the usage file. EC2 detailed monitoring assumes the standard 7 metrics and the most expensive price tier for CloudWatch. If a root volume is not specified then an 8Gi gp2 volume is assumed. Most expensive price tier is used for EBS IOPS. |
| Elastic Container Registry (ECR) | `ecr_repository` | |
| Elastic Container Service (ECS) | `aws_ecs_service` | When using with EC2, number of instances in `aws_autoscaling_group` can be set in the [usage file](/docs/usage_based_resources#infracost-usage-file) |
| Elastic File Storage (EFS) | `aws_efs_file_system` | |
| Elastic Load Balancing | `aws_alb`, `aws_lb`, `aws_elb` | |
| Elastic Kubernetes Service (EKS) | `aws_eks_cluster`, `aws_eks_fargate_profile`, `aws_eks_node_group` | Reserved instance settings can be set in the [usage file](/docs/usage_based_resources#infracost-usage-file). |
| ElastiCache | `aws_elasticache_cluster`, `aws_elasticache_replication_group` |  |
| Elasticsearch Service | `aws_elasticsearch_domain` |  |
| EventBridge | `aws_cloudwatch_event_bus` | |
| FSx for Windows File Server | `aws_fsx_windows_file_system` | Data deduplication is not supported by Terraform. |
| Key Management Service (KMS) | `aws_kms_external_key`, `aws_kms_key` |  |
| Kinesis | `aws_kinesis_analytics_application`, `aws_kinesisanalyticsv2_application`, `aws_kinesisanalyticsv2_application_snapshot`, `aws_kinesis_firehose_delivery_stream` | Terraform doesn’t currently support Analytics Studio, but when it does they will require 2 orchestration KPUs. |
| Lambda | `aws_lambda_function` |  Provisioned concurrency is not yet supported. |
| Lightsail | `aws_lightsail_instance` |  |
| Managed Streaming for Apache Kafka (MSK) | `aws_msk_cluster` |  |
| Managed Workflows for Apache Airflow | `aws_mwaa_environment` |  |
| MQ | `aws_mq_broker` | |
| Neptune | `aws_neptune_cluster`, `aws_neptune_cluster_instance`, `aws_neptune_cluster_snapshot` | |
| Redshift | `aws_redshift_cluster` | |
| Relational Database Service (RDS) | `aws_rds_cluster`, `aws_db_instance`, `aws_rds_cluster_instance` | |
| Route 53 | `aws_route53_record`, `aws_route53_zone`, `aws_route53_resolver_endpoint`, `aws_route53_health_check` |  |
| Secrets Manager | `aws_secretsmanager_secret` |  |
| Simple Notification Service (SNS) | `sns_topic` `sns_topic_subscription` | SMS and mobile push are not yet supported. |
| Simple Queue Service (SQS) | `aws_sqs_queue` | Most expensive price tier is used. |
| Simple Storage Service (S3) | `aws_s3_bucket`, `aws_s3_bucket_inventory`, `aws_s3_bucket_analytics_configuration` | Most expensive price tier is used. S3 replication time control data transfer, and batch operations are not supported by Terraform. |
| Simple Systems Manager (SSM) | `aws_ssm_parameter`, `aws_ssm_activation` | |
| Step Functions | `aws_sfn_state_machine` | |
| Redshift | `aws_redshift_cluster` | |
| Relational Database Service (RDS) | `aws_rds_cluster`, `aws_db_instance`, `aws_rds_cluster_instance` | |
| Route 53 | `aws_route53_record`, `aws_route53_zone`, `aws_route53_resolver_endpoint`, `aws_route53_health_check` |  |
| Transfer Family | `aws_transfer_server` | |
| Virtual Private Cloud/Network (VPC, VPN, PrivateLink, Transit Gateway) | `aws_ec2_client_vpn_endpoint`, `aws_ec2_client_vpn_network_association`, `aws_ec2_traffic_mirror_session`, `aws_ec2_transit_gateway_peering_attachment`, `aws_ec2_transit_vpc_attachment`, `aws_nat_gateway`, `aws_vpc_connection`, `aws_vpc_endpoint` | |
| Web Application Firewall (WAF) | `aws_waf_web_acl`, `aws_wafv2_web_acl` |  |


### Google Cloud Platform (GCP)

| Service name | Main Terraform resources      | Notes |
| ---          | ---                           | ---   |
| BigQuery | `google_bigquery_dataset`, `google_bigquery_table` | |
| Cloud DNS | `google_dns_managed_zone`, `google_dns_record_set` | Most expensive price tier is used. |
| Cloud Functions | `google_cloudfunctions_function` | |
| Cloud Load Balancing | `google_compute_forwarding_rule`, `google_compute_global_forwarding_rule`, `google_compute_target_grpc_proxy`, `google_compute_target_http_proxy`, `google_compute_target_https_proxy`, `google_compute_target_ssl_proxy`, `google_compute_target_tcp_proxy`, `google_compute_region_target_http_proxy`, `google_compute_region_target_https_proxy` | Price for additional forwarding rule is used. |
| Cloud Logging | `google_logging_billing_account_bucket_config`, `google_logging_billing_account_sink`, `google_logging_folder_bucket_config`, `google_logging_folder_sink`, `google_logging_organization_bucket_config`, `google_logging_organization_sink`, `google_logging_project_bucket_config`, `google_logging_project_sink` | |
| Cloud Monitoring | `google_monitoring_metric_descriptor` | |
| Cloud NAT | `google_compute_router_nat` | |
| Cloud Pub/Sub | `google_pubsub_topic`, `google_pubsub_subscription` | |
| Cloud SQL | `google_sql_database_instance` | Cloud SQL network, SQL Server license, 1-3 years commitments costs are not yet supported. |
| Cloud Storage | `google_storage_bucket` | Minimum storage duration is assumed.  |
| Cloud VPN | `google_compute_vpn_tunnel`, `google_compute_vpn_gateway`, `google_compute_ha_vpn_gateway`, `google_compute_external_vpn_gateway` | |
| Compute Engine | `google_compute_disk`, `google_compute_image`, `google_compute_machine_image`, `google_compute_instance`, `google_compute_instance_group_manager`, `google_compute_region_instance_group_manager`, `google_compute_address`, `google_compute_global_address`, `google_compute_snapshot` | Sustained use discounts are applied to monthly costs, but not to hourly costs. Costs associated with non-standard Linux images, such as Windows and RHEL are not supported. Custom machine types are not supported. Sole-tenant VMs are not supported. |
| Container Registry | `google_container_registry` | |
| Key Management Service (KMS) | `google_kms_crypto_key` | |
| Kubernetes Engine (GKE) | `google_container_cluster`, `google_container_node_pool` | The free zonal cluster is not supported. Notes from Compute Engine also apply to the instances used in the clusters' node pools. |
| Memorystore Redis | `google_redis_instance` | |

### Microsoft Azure

GovCloud regions are also supported.

| Service name | Main Terraform resources      | Notes |
| ---          | ---                           | ---   |
| Active Directory Domain Services | `azurerm_active_directory_domain_service` | |
| API Management | `azurerm_api_management` | |
| App Service | `azurerm_app_service_certificate_binding`, `azurerm_app_service_certificate_order`, `azurerm_app_service_custom_hostname_binding`, `azurerm_app_service_environment`, `azurerm_app_service_plan` | |
| Application Gateway | `azurerm_application_gateway` | |
| Automation | `azurerm_automation_account`, `azurerm_automation_dsc_configuration`, `azurerm_automation_dsc_nodeconfiguration`, `azurerm_automation_job_schedule` | |
| Bastion | `azurerm_bastion_host` | |
| Cache for Redis | `azurerm_redis_cache` | |
| Cognitive Search | `azurerm_search_service` | |
| Container Registry | `azurerm_container_registry` | |
| Content Delivery Network (CDN) | `azurerm_cdn_endpoint` | |
| Cosmos DB | `azurerm_cosmosdb_cassandra_keyspace`, `azurerm_cosmosdb_cassandra_table`, `azurerm_cosmosdb_gremlin_database`, `azurerm_cosmosdb_gremlin_graph`, `azurerm_cosmosdb_mongo_collection`, `azurerm_cosmosdb_mongo_database`, `azurerm_cosmosdb_sql_container`, `azurerm_cosmosdb_sql_database`, `azurerm_cosmosdb_table` | |
| Database    | `azurerm_mariadb_server`, `azurerm_mssql_database`, `azurerm_mysql_server`, `azurerm_postgresql_flexible_server`, `azurerm_postgresql_server` |
| Databricks workspace | `azurerm_databricks_workspace` | |
| DNS  | `azurerm_dns_zone`, `azurerm_private_dns_zone`, `azurerm_dns_a_record`, `azurerm_dns_aaaa_record`, `azurerm_dns_caa_record`, `azurerm_dns_cname_record`, `azurerm_dns_mx_record`, `azurerm_dns_ns_record`, `azurerm_dns_ptr_record`, `azurerm_dns_srv_record`, `azurerm_dns_txt_record`, `azurerm_private_dns_a_record`, `azurerm_private_dns_aaaa_record`, `azurerm_private_dns_cname_record`, `azurerm_private_dns_mx_record`, `azurerm_private_dns_ptr_record`, `azurerm_private_dns_srv_record`, `azurerm_private_dns_txt_record` |
| Event Hubs | `azurerm_eventhub_namespace` | Premium namespaces are not supported by Terraform. |
| Firewall | `azurerm_firewall` | |
| Functions | `azurerm_function_app` | |
| HDInsight | `azurerm_hdinsight_hadoop_cluster`, `azurerm_hdinsight_hbase_cluster`, `azurerm_hdinsight_interactive_query_cluster`, `azurerm_hdinsight_kafka_cluster`, `azurerm_hdinsight_spark_cluster` | |
| Key Vault | `azurerm_key_vault_certificate`, `azurerm_key_vault_key`, `azurerm_key_vault_managed_hardware_security_module` | |
| Load Balancer | `azurerm_lb`, `azurerm_lb_rule`, `azurerm_lb_outbound_rule` | |
| Logic Apps | `azurerm_integration_service_environment` | |
| Kubernetes Service (AKS) | `azurerm_kubernetes_cluster`, `azurerm_kubernetes_cluster_node_pool` | |
| Monitor | `azurerm_application_insights`, `azurerm_application_insights_web_test` | |
| Notification Hubs | `azurerm_notification_hub_namespace` | |
| Storage Account | `azurerm_storage_account` | Only BlockBlobStorage and FileStorage accounts are currently supported. |
| Synapse Analytics | `azurerm_synapse_spark_pool`, `azurerm_synapse_sql_pool`, `azurerm_synapse_workspace` | The total costs consist of several resources that should be viewed as a whole. |
| Virtual Machines | `azurerm_linux_virtual_machine`, `azurerm_managed_disk`, `azurerm_virtual_machine`, `azurerm_windows_virtual_machine` | Non-standard images such as RHEL are not supported. Low priority, Spot and Reserved instances are not supported. |
| Virtual Machine Scale Sets | `azurerm_linux_virtual_machine_scale_set`, `azurerm_virtual_machine_scale_set`, `azurerm_windows_virtual_machine_scale_set` | |
| Virtual Network / PrivateLink | `azurerm_private_endpoint`, `azurerm_public_ip`, `azurerm_public_ip_prefix`, `azurerm_nat_gateway` | |
| VPN Gateway | `azurerm_virtual_network_gateway` | |

### General notes

Please note that:
1. Free trials and free tiers, which are usually an insignificant part of the costs, cannot be taken into account. This because it is not possible to detect which resources they apply to, since free tiers are account-wide and there are often multiple Terraform projects in an account (Infracost can only see the Terraform projects it is run against).
2. On-demand prices are used by default. You can also model EC2 Reserved Instances via the [usage file](/docs/usage_based_resources#infracost-usage-file).

### The resource I want isn't supported

We regularly add support for new resources so we recommend watching our repo for releases: goto the [repo](https://github.com/infracost/infracost) page, click on the Watch button > select Custom > Releases and click on Apply.

You can help by:
1. [Creating an issue](https://github.com/infracost/infracost/issues/new/choose) and mentioning the resource names you need; we'll try to prioritize it depending on the community feedback.
2. [Contributing to Infracost](https://github.com/infracost/infracost#contributing). You can join our [community Slack channel](https://www.infracost.io/community-chat) if you need help contributing.

We plan to add support for other IaC tools such as [Pulumi](https://github.com/infracost/infracost/issues/187) and [CloudFormation](https://github.com/infracost/infracost/issues/190). Please 👍 them if you'd like us to work on them sooner.
