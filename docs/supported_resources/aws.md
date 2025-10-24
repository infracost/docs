---
slug: aws
title: AWS
---

Please note:
1. Amazon Web Services (AWS) GovCloud and China regions are also supported.
2. Free trials and free tiers, which are usually **not** a significant part of cloud costs, are ignored. This because Infracost can only see the Terraform projects it is run against but free tiers are account-wide and there are often multiple Terraform projects in an account.
3. On-demand prices are used by default. You can also model EC2 Reserved Instances via the [usage file](/docs/features/usage_based_resources/).

Please create a GitHub issue if the resource you want [isn't supported](/docs/supported_resources/overview#the-resource-i-want-isnt-supported) or your cost estimate [looks wrong](/docs/supported_resources/overview#my-cost-estimate-looks-wrong).

## Paid resources

There are Terraform resources that Infracost supports, and AWS charges for.

| Service name                                                           | Main Terraform resources                                                                                                                                                                                                                               | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API Gateway                                                            | `aws_api_gateway_rest_api`, `aws_api_gateway_stage`, `aws_apigatewayv2_api`                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Application Auto Scaling                                               | `aws_appautoscaling_target`                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Backup                                                                 | `aws_backup_vault`                                                                                                                                                                                                                                     | AWS Storage Gateway Volume Backup prices could not be found in the AWS pricing data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Certificate Manager (ACM)                                              | `aws_acmpca_certificate_authority`, `aws_acm_certificate`                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| CloudFormation                                                         | `aws_cloudformation_stack`, `aws_cloudformation_stack_set`                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| CloudFront                                                             | `aws_cloudfront_distribution`, `aws_cloudfront_function`                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| CloudTrail                                                             | `aws_cloudtrail`                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| CloudWatch                                                             | `aws_cloudwatch_dashboard`, `aws_cloudwatch_log_group`, `aws_cloudwatch_metric_alarm`                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| CodeBuild                                                              | `aws_codebuild_project`                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Config                                                                 | `aws_config_config_rule`, `aws_config_configuration_recorder`, `aws_config_organization_custom_rule`, `aws_config_organization_managed_rule`                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Data transfer                                                          | Use `aws_data_transfer.my_region` in the [usage file](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml)                                                                                                                  | Most expensive price tier is used.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Database Migration Service (DMS)                                       | `aws_dms_replication_instance`                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Direct Connect                                                         | `aws_dx_gateway_association`, `aws_dx_connection`                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Directory Service                                                      | `aws_directory_service_directory`                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| DocumentDB                                                             | `aws_docdb_cluster`, `aws_docdb_cluster_instance`, `aws_docdb_cluster_snapshot`                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| DynamoDB                                                               | `aws_dynamodb_table`, `aws_appautoscaling_target`                                                                                                                                                                                                      | DAX is not yet supported.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Elastic Compute Cloud (EC2)                                            | `aws_instance`, `aws_ebs_volume`, `aws_ebs_snapshot`, `aws_ebs_snapshot_copy`, `aws_autoscaling_group`, `aws_eip`, `aws_ec2_host`, `aws_spot_instance_request`                                                                                         | Costs associated with marketplace AMIs are not supported. For non-standard Linux AMIs such as Windows, `operating_system` should be specified in the [usage file](/docs/features/usage_based_resources/), `windows`, `rhel` and `suse` are supported. Reserved instance settings can also be set in the usage file. EC2 detailed monitoring assumes the standard 7 metrics and the most expensive price tier for CloudWatch. If a root volume is not specified then an 8Gi gp2 volume is assumed. Most expensive price tier is used for EBS IOPS. For Spot instances, the most recent spot price from the Cloud Pricing API is shown (updated at least once a day). |
| Elastic Container Registry (ECR)                                       | `aws_ecr_repository`                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Elastic Container Service (ECS)                                        | `aws_ecs_service`                                                                                                                                                                                                                                      | When using with EC2, number of instances in `aws_autoscaling_group` can be set in the [usage file](/docs/features/usage_based_resources/)                                                                                                                                                                                                                                                                                                                                                                                                         |
| Elastic File Storage (EFS)                                             | `aws_efs_file_system`                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Elastic Load Balancing                                                 | `aws_alb`, `aws_lb`, `aws_elb`                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Elastic Kubernetes Service (EKS)                                       | `aws_eks_cluster`, `aws_eks_fargate_profile`, `aws_eks_node_group`                                                                                                                                                                                     | Reserved instance settings can be set in the [usage file](/docs/features/usage_based_resources).                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ElastiCache                                                            | `aws_elasticache_cluster`, `aws_elasticache_replication_group`, `aws_appautoscaling_target`                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Elasticsearch Service                                                  | `aws_elasticsearch_domain`                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Elastic Beanstalk Environment                                          | `aws_elastic_beanstalk_environment`                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| EventBridge                                                            | `aws_cloudwatch_event_bus`                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| FSx for OpenZFS                                            | `aws_fsx_openzfs_file_system`                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| FSx for Windows File Server                                            | `aws_fsx_windows_file_system`                                                                                                                                                                                                                          | Data deduplication is not supported by Terraform.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Global Accelerator                                                     | `aws_globalaccelerator_accelerator`, `aws_globalaccelerator_endpoint_group`                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Glue                                                                   | `aws_glue_catalog_database`,`aws_glue_crawler`, `aws_glue_job`                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Key Management Service (KMS)                                           | `aws_kms_external_key`, `aws_kms_key`                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Kinesis                                                                | `aws_kinesis_analytics_application`, `aws_kinesisanalyticsv2_application`, `aws_kinesisanalyticsv2_application_snapshot`, `aws_kinesis_firehose_delivery_stream`                                                                                       | Terraform doesn’t currently support Analytics Studio, but when it does they will require 2 orchestration KPUs.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Kinesis Stream                                                                | `aws_kinesis_stream`                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Lambda                                                                 | `aws_lambda_function`                                                                                                                                                                                                                                  | Provisioned concurrency is not yet supported.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Lightsail                                                              | `aws_lightsail_instance`                                                                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Managed Streaming for Apache Kafka (MSK)                               | `aws_msk_cluster`                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Managed Workflows for Apache Airflow                                   | `aws_mwaa_environment`                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| MQ                                                                     | `aws_mq_broker`                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Neptune                                                                | `aws_neptune_cluster`, `aws_neptune_cluster_instance`, `aws_neptune_cluster_snapshot`                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Network Firewall                                                       | `aws_networkfirewall_firewall`                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Redshift                                                               | `aws_redshift_cluster`                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Relational Database Service (RDS)                                      | `aws_rds_cluster`, `aws_db_instance`, `aws_rds_cluster_instance`                                                                                                                                                                                       | Reserved instance settings can also be set in the [usage file](/docs/features/usage_based_resources) for both `aws_rds_cluster_instance` and `aws_db_instance` resource types.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Route 53                                                               | `aws_route53_record`, `aws_route53_zone`, `aws_route53_resolver_endpoint`, `aws_route53_health_check`                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Secrets Manager                                                        | `aws_secretsmanager_secret`                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Simple Notification Service (SNS)                                      | `sns_topic` `sns_topic_subscription`                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Simple Queue Service (SQS)                                             | `aws_sqs_queue`                                                                                                                                                                                                                                        | Most expensive price tier is used.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Simple Storage Service (S3)                                            | `aws_s3_bucket`, `aws_s3_bucket_inventory`, `aws_s3_bucket_analytics_configuration`, `aws_s3_bucket_lifecycle_configuration`                                                                                                                           | Most expensive price tier is used. S3 replication time control data transfer, and batch operations are not supported by Terraform.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Simple Systems Manager (SSM)                                           | `aws_ssm_parameter`, `aws_ssm_activation`                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Step Functions                                                         | `aws_sfn_state_machine`                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Transfer Family                                                        | `aws_transfer_server`                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Virtual Private Cloud/Network (VPC, VPN, PrivateLink, Transit Gateway) | `aws_ec2_client_vpn_endpoint`, `aws_ec2_client_vpn_network_association`, `aws_ec2_traffic_mirror_session`, `aws_ec2_transit_gateway_peering_attachment`, `aws_ec2_transit_vpc_attachment`, `aws_nat_gateway`, `aws_vpc_connection`, `aws_vpc_endpoint`, `aws_vpn_connection` |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Web Application Firewall (WAF)                                         | `aws_waf_web_acl`, `aws_wafv2_web_acl`                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

## Free resources

There are Terraform resources that Infracost supports, and we classify as free.

| Terraform resources                                          |
|--------------------------------------------------------------|
| `aws_accessanalyzer_analyzer`                                |
| `aws_accessanalyzer_archive_rule`                            |
| `aws_acm_certificate_validation`                             |
| `aws_acmpca_permission`                                      |
| `aws_acmpca_policy`                                          |
| `aws_account_alternate_contact`                              |
| `aws_alb_listener_certificate`                               |
| `aws_alb_listener_rule`                                      |
| `aws_alb_listener`                                           |
| `aws_alb_target_group_attachment`                            |
| `aws_alb_target_group`                                       |
| `aws_ami_launch_permission`                                  |
| `aws_amplify_backend_environment`                            |
| `aws_amplify_branch`                                         |
| `aws_amplify_domain_association`                             |
| `aws_amplify_webhook`                                        |
| `aws_api_gateway_account`                                    |
| `aws_api_gateway_api_key`                                    |
| `aws_api_gateway_authorizer`                                 |
| `aws_api_gateway_base_path_mapping`                          |
| `aws_api_gateway_client_certificate`                         |
| `aws_api_gateway_deployment`                                 |
| `aws_api_gateway_documentation_part`                         |
| `aws_api_gateway_documentation_version`                      |
| `aws_api_gateway_domain_name`                                |
| `aws_api_gateway_gateway_response`                           |
| `aws_api_gateway_integration`                                |
| `aws_api_gateway_integration_response`                       |
| `aws_api_gateway_method_response`                            |
| `aws_api_gateway_method_settings`                            |
| `aws_api_gateway_method`                                     |
| `aws_api_gateway_model`                                      |
| `aws_api_gateway_request_validator`                          |
| `aws_api_gateway_resource`                                   |
| `aws_api_gateway_response`                                   |
| `aws_api_gateway_rest_api_policy`                            |
| `aws_api_gateway_usage_plan_key`                             |
| `aws_api_gateway_usage_plan`                                 |
| `aws_api_gateway_vpc_link`                                   |
| `aws_apigatewayv2_api_mapping`                               |
| `aws_apigatewayv2_authorizer`                                |
| `aws_apigatewayv2_deployment`                                |
| `aws_apigatewayv2_domain_name`                               |
| `aws_apigatewayv2_integration_response`                      |
| `aws_apigatewayv2_integration`                               |
| `aws_apigatewayv2_model`                                     |
| `aws_apigatewayv2_route_response`                            |
| `aws_apigatewayv2_route`                                     |
| `aws_apigatewayv2_stage`                                     |
| `aws_apigatewayv2_vpc_link`                                  |
| `aws_appautoscaling_policy`                                  |
| `aws_appautoscaling_scheduled_action`                        |
| `aws_appconfig_extension`                                    |
| `aws_appconfig_extension_association`                        |
| `aws_appconfig_hosted_configuration_version`                 |
| `aws_appflow_connector_profile`                              |
| `aws_appintegrations_event_integration`                      |
| `aws_appmesh_gateway_route`                                  |
| `aws_appmesh_mesh`                                           |
| `aws_appmesh_route`                                          |
| `aws_appmesh_virtual_gateway`                                |
| `aws_appmesh_virtual_node`                                   |
| `aws_appmesh_virtual_router`                                 |
| `aws_appmesh_virtual_service`                                |
| `aws_app_cookie_stickiness_policy`                           |
| `aws_autoscaling_attachment`                                 |
| `aws_autoscaling_group_tag`                                  |
| `aws_autoscaling_lifecycle_hook`                             |
| `aws_autoscaling_notification`                               |
| `aws_autoscaling_policy`                                     |
| `aws_placement_group`                                        |
| `aws_backup_global_settings`                                 |
| `aws_backup_plan`                                            |
| `aws_backup_region_settings`                                 |
| `aws_backup_selection`                                       |
| `aws_backup_vault_notifications`                             |
| `aws_backup_vault_policy`                                    |
| `aws_cloudformation_stack_set_instance`                      |
| `aws_cloudformation_type`                                    |
| `aws_cloudfront_origin_access_identity`                      |
| `aws_cloudfront_public_key`                                  |
| `aws_cloudwatch_event_permission`                            |
| `aws_cloudwatch_event_rule`                                  |
| `aws_cloudwatch_event_target`                                |
| `aws_cloudwatch_log_destination_policy`                      |
| `aws_cloudwatch_log_destination`                             |
| `aws_cloudwatch_log_metric_filter`                           |
| `aws_cloudwatch_log_resource_policy`                         |
| `aws_cloudwatch_log_stream`                                  |
| `aws_cloudwatch_log_subscription_filter`                     |
| `aws_codebuild_report_group`                                 |
| `aws_codebuild_source_credential`                            |
| `aws_codebuild_webhook`                                      |
| `aws_config_aggregate_authorization`                         |
| `aws_config_configuration_aggregator`                        |
| `aws_config_configuration_recorder_status`                   |
| `aws_config_delivery_channel`                                |
| `aws_config_remediation_configuration`                       |
| `aws_customer_gateway`                                       |
| `aws_db_instance_role_association`                           |
| `aws_db_option_group`                                        |
| `aws_db_parameter_group`                                     |
| `aws_db_subnet_group`                                        |
| `aws_default_network_acl`                                    |
| `aws_default_route_table`                                    |
| `aws_default_security_group`                                 |
| `aws_default_subnet`                                         |
| `aws_default_vpc_dhcp_options`                               |
| `aws_default_vpc`                                            |
| `aws_dms_replication_subnet_group`                           |
| `aws_dms_replication_task`                                   |
| `aws_docdb_cluster_parameter_group`                          |
| `aws_docdb_subnet_group`                                     |
| `aws_dx_bgp_peer`                                            |
| `aws_dx_gateway_association_proposal`                        |
| `aws_dx_gateway`                                             |
| `aws_dx_hosted_private_virtual_interface_accepter`           |
| `aws_dx_hosted_private_virtual_interface`                    |
| `aws_dx_hosted_public_virtual_interface_accepter`            |
| `aws_dx_hosted_public_virtual_interface`                     |
| `aws_dx_hosted_transit_virtual_interface_accepter`           |
| `aws_dx_hosted_transit_virtual_interface`                    |
| `aws_dx_lag`                                                 |
| `aws_dx_private_virtual_interface`                           |
| `aws_dx_public_virtual_interface`                            |
| `aws_dx_transit_virtual_interface`                           |
| `aws_dynamodb_table_item`                                    |
| `aws_ebs_default_kms_key`                                    |
| `aws_ebs_encryption_by_default`                              |
| `aws_ec2_client_vpn_authorization_rule`                      |
| `aws_ec2_client_vpn_route`                                   |
| `aws_ec2_tag`                                                |
| `aws_ec2_traffic_mirror_filter_rule`                         |
| `aws_ec2_traffic_mirror_filter`                              |
| `aws_ec2_traffic_mirror_target`                              |
| `aws_ec2_transit_gateway_peering_attachment_accepter`        |
| `aws_ec2_transit_gateway_route_table_association`            |
| `aws_ec2_transit_gateway_route_table_propagation`            |
| `aws_ec2_transit_gateway_route_table`                        |
| `aws_ec2_transit_gateway_route`                              |
| `aws_ec2_transit_gateway_vpc_attachment_accepter`            |
| `aws_ec2_transit_gateway`                                    |
| `aws_ecr_lifecycle_policy`                                   |
| `aws_ecr_repository_policy`                                  |
| `aws_ecs_account_setting_default`                            |
| `aws_ecs_capacity_provider`                                  |
| `aws_ecs_cluster`                                            |
| `aws_ecs_task_definition`                                    |
| `aws_egress_only_internet_gateway`                           |
| `aws_efs_access_point`                                       |
| `aws_efs_file_system_policy`                                 |
| `aws_efs_mount_target`                                       |
| `aws_eip_association`                                        |
| `aws_eks_addon`                                              |
| `aws_eks_identity_provider_config`                           |
| `aws_elasticache_parameter_group`                            |
| `aws_elasticache_security_group`                             |
| `aws_elasticache_subnet_group`                               |
| `aws_elasticache_user`                                       |
| `aws_elasticache_user_group`                                 |
| `aws_elasticache_user_group_association`                     |
| `aws_elasticsearch_domain_policy`                            |
| `aws_elastic_beanstalk_application`                          |
| `aws_elb_attachment`                                         |
| `aws_flow_log`                                               |
| `aws_glue_catalog_table`                                     |
| `aws_glue_classifier`                                        |
| `aws_glue_connection`                                        |
| `aws_glue_data_catalog_encryption_settings`                  |
| `aws_glue_partition`                                         |
| `aws_glue_partition_index`                                   |
| `aws_glue_registry`                                          |
| `aws_glue_resource_policy`                                   |
| `aws_glue_schema`                                            |
| `aws_glue_security_configuration`                            |
| `aws_glue_trigger`                                           |
| `aws_glue_user_defined_function`                             |
| `aws_glue_workflow`                                          |
| `aws_iam_access_key`                                         |
| `aws_iam_account_alias`                                      |
| `aws_iam_account_alias`                                      |
| `aws_iam_account_password_policy`                            |
| `aws_iam_group_membership`                                   |
| `aws_iam_group_policy_attachment`                            |
| `aws_iam_group_policy`                                       |
| `aws_iam_group`                                              |
| `aws_iam_group`                                              |
| `aws_iam_instance_profile`                                   |
| `aws_iam_instance_profile`                                   |
| `aws_iam_openid_connect_provider`                            |
| `aws_iam_policy_attachment`                                  |
| `aws_iam_policy`                                             |
| `aws_iam_policy`                                             |
| `aws_iam_role_policy_attachment`                             |
| `aws_iam_role_policy`                                        |
| `aws_iam_role`                                               |
| `aws_iam_role`                                               |
| `aws_iam_saml_provider`                                      |
| `aws_iam_server_certificate`                                 |
| `aws_iam_server_certificate`                                 |
| `aws_iam_service_linked_role`                                |
| `aws_iam_user_group_membership`                              |
| `aws_iam_user_login_profile`                                 |
| `aws_iam_user_policy_attachment`                             |
| `aws_iam_user_policy`                                        |
| `aws_iam_user_ssh_key`                                       |
| `aws_iam_user`                                               |
| `aws_iam_user`                                               |
| `aws_internet_gateway`                                       |
| `aws_iot_policy`                                             |
| `aws_key_pair`                                               |
| `aws_kms_alias`                                              |
| `aws_kms_ciphertext`                                         |
| `aws_kms_grant`                                              |
| `aws_lambda_alias`                                           |
| `aws_lambda_code_signing_config`                             |
| `aws_lambda_event_source_mapping`                            |
| `aws_lambda_function_event_invoke_config`                    |
| `aws_lambda_layer_version`                                   |
| `aws_lambda_layer_version_permission`                        |
| `aws_lambda_permission`                                      |
| `aws_launch_configuration`                                   |
| `aws_launch_template`                                        |
| `aws_lb_cookie_stickiness_policy`                            |
| `aws_lb_listener_certificate`                                |
| `aws_lb_listener_rule`                                       |
| `aws_lb_listener`                                            |
| `aws_lb_ssl_negotiation_policy`                              |
| `aws_lb_target_group_attachment`                             |
| `aws_lb_target_group`                                        |
| `aws_lightsail_domain`                                       |
| `aws_lightsail_key_pair`                                     |
| `aws_lightsail_static_ip_attachment`                         |
| `aws_lightsail_static_ip`                                    |
| `aws_load_balancer_backend_server_policy`                    |
| `aws_load_balancer_listener_policy`                          |
| `aws_load_balancer_policy`                                   |
| `aws_main_route_table_association`                           |
| `aws_mq_configuration`                                       |
| `aws_msk_configuration`                                      |
| `aws_neptune_cluster_parameter_group`                        |
| `aws_neptune_event_subscription`                             |
| `aws_neptune_parameter_group`                                |
| `aws_neptune_subnet_group`                                   |
| `aws_network_acl_rule`                                       |
| `aws_network_acl`                                            |
| `aws_network_interface_attachment`                           |
| `aws_network_interface_sg_attachment`                        |
| `aws_network_interface`                                      |
| `aws_networkfirewall_rule_group`                             |
| `aws_networkfirewall_firewall_policy`                        |
| `aws_networkfirewall_logging_configuration`                  |
| `aws_ram_principal_association`                              |
| `aws_ram_resource_association`                               |
| `aws_ram_resource_share_accepter`                            |
| `aws_ram_resource_share`                                     |
| `aws_rds_cluster_endpoint`                                   |
| `aws_rds_cluster_parameter_group`                            |
| `aws_resourcegroups_group`                                   |
| `aws_route53_resolver_dnssec_config`                         |
| `aws_route53_resolver_query_log_config_association`          |
| `aws_route53_resolver_query_log_config`                      |
| `aws_route53_resolver_rule_association`                      |
| `aws_route53_resolver_rule`                                  |
| `aws_route53_zone_association`                               |
| `aws_route_table_association`                                |
| `aws_route_table`                                            |
| `aws_route`                                                  |
| `aws_s3_access_point`                                        |
| `aws_s3_account_public_access_block`                         |
| `aws_s3_bucket_acl`                                          |
| `aws_s3_bucket_cors_configuration`                           |
| `aws_s3_bucket_intelligent_tiering_configuration`            |
| `aws_s3_bucket_logging`                                      |
| `aws_s3_bucket_metric`                                       |
| `aws_s3_bucket_notification`                                 |
| `aws_s3_bucket_object` (costs are shown at the bucket level) |
| `aws_s3_bucket_object_lock_configuration`                    |
| `aws_s3_bucket_ownership_controls`                           |
| `aws_s3_bucket_policy`                                       |
| `aws_s3_bucket_public_access_block`                          |
| `aws_s3_bucket_replication_configuration`                    |
| `aws_s3_bucket_server_side_encryption_configuration`         |
| `aws_s3_bucket_versioning`                                   |
| `aws_s3_bucket_website_configuration`                        |
| `aws_secretsmanager_secret_policy`                           |
| `aws_secretsmanager_secret_rotation`                         |
| `aws_secretsmanager_secret_version`                          |
| `aws_security_group_rule`                                    |
| `aws_security_group`                                         |
| `aws_service_discovery_service`                              |
| `aws_ses_domain_dkim`                                        |
| `aws_ses_domain_identity`                                    |
| `aws_sns_platform_application`                               |
| `aws_sns_sms_preferences`                                    |
| `aws_sns_topic_policy`                                       |
| `aws_sqs_queue_policy`                                       |
| `aws_ssm_association`                                        |
| `aws_ssm_maintenance_window_target`                          |
| `aws_ssm_maintenance_window_task`                            |
| `aws_ssm_maintenance_window`                                 |
| `aws_ssm_patch_baseline`                                     |
| `aws_ssm_patch_group`                                        |
| `aws_ssm_resource_data_sync`                                 |
| `aws_subnet`                                                 |
| `aws_transfer_access`                                        |
| `aws_transfer_ssh_key`                                       |
| `aws_transfer_user`                                          |
| `aws_volume_attachment`                                      |
| `aws_vpc_dhcp_options_association`                           |
| `aws_vpc_dhcp_options`                                       |
| `aws_vpc_endpoint_connection_notification`                   |
| `aws_vpc_endpoint_route_table_association`                   |
| `aws_vpc_endpoint_service_allowed_principal`                 |
| `aws_vpc_endpoint_service`                                   |
| `aws_vpc_endpoint_subnet_association`                        |
| `aws_vpc_ipv4_cidr_block_association`                        |
| `aws_vpc_peering_connection_accepter`                        |
| `aws_vpc_peering_connection_options`                         |
| `aws_vpc_peering_connection`                                 |
| `aws_vpc_security_group_egress_rule`                         |
| `aws_vpc_security_group_ingress_rule`                        |
| `aws_vpc`                                                    |
| `aws_vpn_connection_route`                                   |
| `aws_vpn_gateway_attachment`                                 |
| `aws_vpn_gateway_route_propagation`                          |
| `aws_vpn_gateway`                                            |
| `aws_waf_byte_match_set`                                     |
| `aws_waf_geo_match_set`                                      |
| `aws_waf_ipset`                                              |
| `aws_waf_rate_based_rule`                                    |
| `aws_waf_regex_match_set`                                    |
| `aws_waf_regex_pattern_set`                                  |
| `aws_waf_rule_group`                                         |
| `aws_waf_rule`                                               |
| `aws_waf_size_constraint_set`                                |
| `aws_waf_sql_injection_match_set`                            |
| `aws_waf_xss_match_set`                                      |
| `aws_wafv2_ip_set`                                           |
| `aws_wafv2_regex_pattern_set`                                |
| `aws_wafv2_rule_group`                                       |
| `aws_wafv2_web_acl_association`                              |
| `aws_wafv2_web_acl_logging_configuration`                    |
