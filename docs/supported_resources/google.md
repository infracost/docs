---
slug: google
title: Google
---

Please note:
1. Free trials and free tiers, which are usually **not** a significant part of cloud costs, are ignored. This because Infracost can only see the Terraform projects it is run against but free tiers are account-wide and there are often multiple Terraform projects in an account.
2. Google Cloud Platform (GCP) on-demand prices are used by default.

Please create a GitHub issue if the resource you want [isn't supported](/docs/supported_resources/overview#the-resource-i-want-isnt-supported) or your cost estimate [looks wrong](/docs/supported_resources/overview#my-cost-estimate-looks-wrong).

## Paid resources

There are Terraform resources that Infracost supports, and Google charges for.

| Service name                 | Main Terraform resources                                                                                                                                                                                                                                                                                                                                                   | Notes |
|------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| ---   |
| Artifact Registry Repository | `google_artifact_registry_repository`                                                                                                                                                                                                                                                                                                                                      | |
| BigQuery                     | `google_bigquery_dataset`, `google_bigquery_table`                                                                                                                                                                                                                                                                                                                         | |
| Cloud DNS                    | `google_dns_managed_zone`, `google_dns_record_set`                                                                                                                                                                                                                                                                                                                         | Most expensive price tier is used. |
| Cloud Functions              | `google_cloudfunctions_function`                                                                                                                                                                                                                                                                                                                                           | |
| Cloud Load Balancing         | `google_compute_forwarding_rule`, `google_compute_global_forwarding_rule`, `google_compute_target_grpc_proxy`, `google_compute_target_http_proxy`, `google_compute_target_https_proxy`, `google_compute_target_ssl_proxy`, `google_compute_target_tcp_proxy`, `google_compute_region_target_http_proxy`, `google_compute_region_target_https_proxy`                        | Price for additional forwarding rule is used. |
| Cloud Logging                | `google_logging_billing_account_bucket_config`, `google_logging_billing_account_sink`, `google_logging_folder_bucket_config`, `google_logging_folder_sink`, `google_logging_organization_bucket_config`, `google_logging_organization_sink`, `google_logging_project_bucket_config`, `google_logging_project_sink`                                                         | |
| Cloud Monitoring             | `google_monitoring_metric_descriptor`                                                                                                                                                                                                                                                                                                                                      | |
| Cloud NAT                    | `google_compute_router_nat`                                                                                                                                                                                                                                                                                                                                                | |
| Cloud Pub/Sub                | `google_pubsub_topic`, `google_pubsub_subscription`                                                                                                                                                                                                                                                                                                                        | |
| Cloud SQL                    | `google_sql_database_instance`                                                                                                                                                                                                                                                                                                                                             | Cloud SQL network, SQL Server license, 1-3 years commitments costs are not yet supported. |
| Cloud Storage                | `google_storage_bucket`                                                                                                                                                                                                                                                                                                                                                    | Minimum storage duration is assumed.  |
| Cloud VPN                    | `google_compute_vpn_tunnel`, `google_compute_vpn_gateway`, `google_compute_ha_vpn_gateway`, `google_compute_external_vpn_gateway`                                                                                                                                                                                                                                          | |
| Compute Engine               | `google_compute_per_instance_config`, `google_compute_region_per_instance_config`, `google_compute_disk`, `google_compute_image`, `google_compute_machine_image`, `google_compute_instance`, `google_compute_instance_group_manager`, `google_compute_region_instance_group_manager`, `google_compute_address`, `google_compute_global_address`, `google_compute_snapshot` | Sustained use discounts are applied to monthly costs, but not to hourly costs. Costs associated with non-standard Linux images, such as Windows and RHEL are not supported. E2 custom machine types are not supported. Sole-tenant VMs are not supported. |
| Container Registry           | `google_container_registry`                                                                                                                                                                                                                                                                                                                                                | |
| Key Management Service (KMS) | `google_kms_crypto_key`                                                                                                                                                                                                                                                                                                                                                    | |
| Kubernetes Engine (GKE)      | `google_container_cluster`, `google_container_node_pool`                                                                                                                                                                                                                                                                                                                   | The free zonal cluster is not supported. Notes from Compute Engine also apply to the instances used in the clusters' node pools. |
| Memorystore Redis            | `google_redis_instance`                                                                                                                                                                                                                                                                                                                                                    | |
| Secret Manager               | `google_secret_manager_secret`, `google_secret_manager_secret_version`                                                                                                                                                                                                                                                                                                     | |
| VPC Service Networking       | `google_service_networking_connection`                                                                                                                                                                                                                                                                                                                                     | |

## Free resources

There are Terraform resources that Infracost supports, and we classify as free.

| Terraform resources |
| ---                 |
| `google_bigquery_dataset_access` |
| `google_bigquery_dataset_iam_binding` |
| `google_bigquery_dataset_iam_member` |
| `google_bigquery_dataset_iam_policy` |
| `google_bigquery_job` |
| `google_bigquery_routine` |
| `google_bigquery_table_iam_binding` |
| `google_bigquery_table_iam_member` |
| `google_bigquery_table_iam_policy` |
| `google_cloudfunctions_function_iam_binding` |
| `google_cloudfunctions_function_iam_member` |
| `google_cloudfunctions_function_iam_policy` |
| `google_compute_attached_disk` |
| `google_compute_backend_bucket_signed_url_key` |
| `google_compute_backend_bucket` |
| `google_compute_backend_service_signed_url_key` |
| `google_compute_backend_service` |
| `google_compute_disk_iam_binding` |
| `google_compute_disk_iam_member` |
| `google_compute_disk_iam_policy` |
| `google_compute_disk_resource_policy_attachment` |
| `google_compute_firewall` |
| `google_compute_global_network_endpoint_group` |
| `google_compute_global_network_endpoint` |
| `google_compute_health_check` |
| `google_compute_http_health_check` |
| `google_compute_https_health_check` |
| `google_compute_image_iam_binding` |
| `google_compute_image_iam_member` |
| `google_compute_image_iam_policy` |
| `google_compute_instance_group_named_port` |
| `google_compute_instance_group` |
| `google_compute_instance_iam_binding` |
| `google_compute_instance_iam_member` |
| `google_compute_instance_iam_policy` |
| `google_compute_instance_template` |
| `google_compute_machine_image_iam_binding` |
| `google_compute_machine_image_iam_member` |
| `google_compute_machine_image_iam_policy` |
| `google_compute_managed_ssl_certificate` |
| `google_compute_network_endpoint_group` |
| `google_compute_network_endpoint` |
| `google_compute_network_peering_routes_config` |
| `google_compute_network_peering` |
| `google_compute_network` |
| `google_compute_organization_security_policy_association` |
| `google_compute_organization_security_policy_rule` |
| `google_compute_organization_security_policy` |
| `google_compute_project_default_network_tier` |
| `google_compute_project_metadata_item` |
| `google_compute_project_metadata` |
| `google_compute_region_backend_service` |
| `google_compute_region_disk_iam_binding` |
| `google_compute_region_disk_iam_member` |
| `google_compute_region_disk_iam_policy` |
| `google_compute_region_health_check` |
| `google_compute_region_network_endpoint_group` |
| `google_compute_region_per_instance_config` |
| `google_compute_region_url_map` |
| `google_compute_route` |
| `google_compute_router_bgp_peer` |
| `google_compute_router_interface` |
| `google_compute_router` |
| `google_compute_shared_vpc_host_project` |
| `google_compute_shared_vpc_service_project` |
| `google_compute_ssl_certificate` |
| `google_compute_ssl_policy` |
| `google_compute_subnetwork_iam_binding` |
| `google_compute_subnetwork_iam_member` |
| `google_compute_subnetwork_iam_policy` |
| `google_compute_subnetwork` |
| `google_compute_url_map` |
| `google_dns_policy` |
| `google_kms_crypto_key_iam_binding` |
| `google_kms_crypto_key_iam_member` |
| `google_kms_crypto_key_iam_policy` |
| `google_kms_key_ring_iam_binding` |
| `google_kms_key_ring_iam_member` |
| `google_kms_key_ring_iam_policy` |
| `google_kms_key_ring_import_job` |
| `google_kms_key_ring` |
| `google_kms_secret_ciphertext` |
| `google_logging_billing_account_exclusion` |
| `google_logging_folder_exclusion` |
| `google_logging_metric` |
| `google_logging_organization_exclusion` |
| `google_logging_project_exclusion` |
| `google_monitoring_alert_policy` |
| `google_monitoring_custom_service` |
| `google_monitoring_dashboard` |
| `google_monitoring_group` |
| `google_monitoring_notification_channel` |
| `google_monitoring_slo` |
| `google_monitoring_uptime_check_config` |
| `google_os_login_ssh_public_key` |
| `google_project_default_service_accounts` |
| `google_project_iam_audit_config` |
| `google_project_iam_binding` |
| `google_project_iam_custom_role` |
| `google_project_iam_member` |
| `google_project_iam_policy` |
| `google_project_organization_policy` |
| `google_project_service_identity` |
| `google_project_service` |
| `google_project` |
| `google_pubsub_subscription_iam_binding` |
| `google_pubsub_subscription_iam_member` |
| `google_pubsub_subscription_iam_policy` |
| `google_pubsub_topic_iam_binding` |
| `google_pubsub_topic_iam_member` |
| `google_pubsub_topic_iam_policy` |
| `google_secret_manager_secret_iam_binding` |
| `google_secret_manager_secret_iam_member` |
| `google_secret_manager_secret_iam_policy` |
| `google_service_account_iam_binding` |
| `google_service_account_iam_member` |
| `google_service_account_iam_policy` |
| `google_service_account_key` |
| `google_service_account` |
| `google_sql_database` |
| `google_sql_ssl_cert` |
| `google_sql_user` |
| `google_storage_bucket_access_control` |
| `google_storage_bucket_acl` |
| `google_storage_bucket_iam_binding` |
| `google_storage_bucket_iam_member` |
| `google_storage_bucket_iam_policy` |
| `google_storage_bucket_object` (costs are shown at the bucket level) |
| `google_storage_default_object_access_control` |
| `google_storage_default_object_acl` |
| `google_storage_hmac_key` |
| `google_storage_notification` |
| `google_storage_object_access_control` |
| `google_storage_object_acl` |
| `google_usage_export_bucket` |
