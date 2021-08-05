---
slug: self_hosted
title: Self-hosting
---

import useBaseUrl from '@docusaurus/useBaseUrl';

It should take around 15 mins to deploy the Cloud Pricing API. Two deployment methods are supported:
1. If you have a Kubernetes cluster, we recommend using [our Helm Chart](https://github.com/infracost/helm-charts/tree/master/charts/cloud-pricing-api).
2. If you prefer to deploy in your machine or a VM, we recommend using [our Docker compose file](https://github.com/infracost/cloud-pricing-api#docker-compose).

Either way, the PostgreSQL DB is run on a single container/pod, which should be fine if your high-availability requirements allow for a few second downtime on container/pod restarts. No critical data is stored in the DB and the DB can be quickly recreated in the unlikely event of data corruption issues. Managed databases, such as a small AWS RDS or Azure Database for PostgreSQL, can also be used (PostgreSQL version >= 13).

![Deployment overview](/img/docs/cloud_pricing_api/deployment_overview.png "Deployment overview")

The pricing DB dump is downloaded from Infracost's API as that simplifies the task of keeping prices up-to-date. We have created one job that you can run once a week to download the latest prices. This provides you with:
1. **Fast updates**: our aim is to enable you to deploy this service in less than 15mins. Some cloud vendors paginates API calls to 100 resources at a time, and making too many requests result in errors; fetching prices directly from them takes more than an hour.
2. **Complete updates**: We run [integration tests](https://github.com/infracost/infracost/actions) to ensure that the CLI is using the correct prices. In the past, there have been cases when cloud providers have tweaked their pricing API data that caused direct downloads to fail. With this method, we check the pricing data passes our integration tests before publishing them, and everyone automatically gets the entire up-to-date data. The aim is reduce the risk of failed or partial updates.

Since the pricing data can be quickly populated by running the update job, you can probably start without a backup strategy. The Cloud Pricing API includes an unauthenticated `/health` path that is used by the Helm chart and Docker compose deployments.

## Usage with Infracost CLI

The Infracost CLI uses a single API key to authenticate with the Cloud Pricing API. You control the API key and can rotate it in the Cloud Pricing API by updating the `SELF_HOSTED_INFRACOST_API_KEY` environment variable and restarting the application.

When using the CLI locally, run the following two required commands to point your CLI to your self-hosted Cloud Pricing API:
```sh
infracost configure set pricing_api_endpoint https://endpoint
infracost configure set api_key SELF_HOSTED_INFRACOST_API_KEY
```

In CI/CD systems, set the following two required environment variables:
```sh
export INFRACOST_PRICING_API_ENDPOINT=https://endpoint
export INFRACOST_API_KEY=$SELF_HOSTED_INFRACOST_API_KEY
```

## Resource requirements

Our Helm chart comes with [commented-out recommendations](https://github.com/infracost/helm-charts/blob/master/charts/cloud-pricing-api/values.yaml) about resource requests/limits for the API and price update job pods:
- API: 1 vCPU and 600MB of RAM
- Price update job: 0.5 vCPU and 600MB of RAM

For the PostgreSQL DB, a small instance with 2 vCPU and 2GB of RAM should be enough.

## Migration from old version

If you had previously deployed the Cloud Pricing API that used MongoDB, we recommend you:
1. Follow the above instructions to deploy the new version using our Helm chart or Docker compose.
2. Upgrade your Infracost CLI to the latest version.
3. [Point your CLI](#usage-with-infracost-cli) to your new self-hosted Cloud Pricing API and test that it works as expected with your self-hosted API key.
4. [Update your CI/CD systems](#usage-with-infracost-cli) to use the latest CLI version AND point to the new self-hosted Cloud Pricing API using the required two environment variables.
5. Destroy your old instance of the Cloud Pricing API.

Please join our [community Slack channel](https://www.infracost.io/community-chat) or [email us](hello@infracost.io) if you run into any issues. We'd be happy to jump on a Zoom call and fix it ASAP.
