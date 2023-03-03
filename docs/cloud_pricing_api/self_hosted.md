---
slug: self_hosted
title: Self-hosting
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Most Infracost CLI users connect to our hosted Cloud Pricing API, since [no cloud credentials or secrets are sent](/docs/faq/#what-data-is-sent-to-the-cloud-pricing-api) to it (we are also [SOC2 Type II](/security/) certified). Large enterprises that have very restrictive security policies might require self-hosting. The following diagram shows an overview of the architecture.

![Deployment overview](/img/docs/cloud_pricing_api/deployment_overview.png "Deployment overview")

The pricing DB dump is downloaded from Infracost's API as that simplifies the task of keeping prices up-to-date. We have created one job that you can run once a week to download the latest prices. This provides you with:
1. **Fast updates**: our aim is to enable you to deploy this service in less than 15mins. Some cloud vendors paginates API calls to 100 resources at a time, and making too many requests result in errors; fetching prices directly from them takes more than an hour.
2. **Complete updates**: We run [integration tests](https://github.com/infracost/infracost/actions) to ensure that the CLI is using the correct prices. In the past, there have been cases when cloud providers have tweaked their pricing API data that caused direct downloads to fail. With this method, we check the pricing data passes our integration tests before publishing them, and everyone automatically gets the entire up-to-date data. The aim is reduce the risk of failed or partial updates.

## Deployment

Two deployment methods are supported:
1. If you have a Kubernetes cluster, we recommend using **[our Helm Chart](https://github.com/infracost/helm-charts/tree/master/charts/cloud-pricing-api)**.
2. If you prefer to deploy in your machine or a VM, we recommend using [**our Docker compose file**](https://github.com/infracost/cloud-pricing-api#docker-compose).

The Cloud Pricing API includes an unauthenticated `/health` path that is used by the Helm chart and Docker compose deployments.

The PostgreSQL DB is run on a single container/pod by default, which should be fine if your high-availability requirements allow for a few second downtime on container/pod restarts. No critical data is stored in the DB and the DB can be quickly recreated in the unlikely event of data corruption issues. Managed databases, such as a small AWS RDS or Azure Database for PostgreSQL, can also be used (PostgreSQL version >= 13). Since the pricing data can be quickly populated by running the update job, you can probably start without a backup strategy.

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

### Using a self-signed certificate

You can configure the Infracost CLI to work with a self-hosted Cloud Pricing API that uses a self-signed certificate by either configuring it not to verify the certificate or by passing the path to your CA certificate.

**Note:** self-signed certificates must use the SAN extension since this is now a requirement in [recent Golang versions](https://go.dev/doc/go1.15#commonname).

**Option 1: Skip certificate verification**
```sh
infracost configure set tls_insecure_skip_verify true
```

Or for CI/CD:
```sh
export INFRACOST_TLS_INSECURE_SKIP_VERIFY=true
```

**Option 2: Pass the path to the CA certificate**
```sh
infracost configure set tls_ca_cert_file /path/to/ca.crt
```

Or for CI/CD:
```sh
export INFRACOST_TLS_CA_CERT_FILE=/path/to/ca.crt
```

## Stats page

Your self-hosted Cloud Pricing API endpoint (e.g. http://localhost:4000 if running locally with Docker compose), will show if prices are up-to-date and some statistics.

![Stats page](/img/docs/cloud_pricing_api/stats_page.png "Stats page")

## Resource requirements

Our Helm chart comes with [cdefault ecommendations](https://github.com/infracost/helm-charts/blob/master/charts/cloud-pricing-api/values.yaml) about resource requests/limits for the API and price update job pods:
- API:
  - Minimum: 50 millicores, 64MB of RAM
  - Limit per pod: 1 core, 512MB of RAM
- Price update job:
  - Minimum: 50 millicores, 128MB of RAM
  - Limit per pod: 200 millicore, 640MB of RAM

For the PostgreSQL DB, a small instance with 2 vCPU and 2GB of RAM should be enough.

## Troubleshooting

Please try the following troubleshooting steps. If they do not help, search [previous user issues](https://community-chat.infracost.io/) or join our [community Slack channel](https://www.infracost.io/community-chat).

### Cloud Pricing API fails to download pricing DB dump

The Cloud Pricing API downloads the pricing DB dump from `https://pricing.api.infracost.io`, which currently redirects to `https://pricing-api-db-data-settled-blowfish.s3.us-east-2.amazonaws.com`. Ensure that appropriate firewall rules are set or `http_proxy` and `https_proxy` environment variables are set so both of the previously mentioned addresses are accessible from the Cloud Pricing API pods.

If the `init-job` or the `cronjob` pods still fail to download prices, you can try changing their Kubernetes yaml to manually download the pricing DB dump using `curl` and pass any required corporate network proxy settings.
```
command: 
  - /bin/bash
  - -c 
  - | 
     npm run db:setup && 
     curl -s -H "X-Api-Key: ${INFRACOST_API_KEY}" https://pricing.api.infracost.io/data-download/latest | grep -o '"downloadUrl": *"[^"]*"' | grep -o '"[^"]*"$' | xargs -n1 curl --progress-bar --output ./data/products/products.csv.gz &&
     npm run data:load
```

### CLI fails to connect to your Cloud Pricing API

The following curl commands can help identify communication issues between the Infracost CLI and your self-hosted Cloud Pricing API. Running the CLI with [debug log level](/docs/features/environment_variables/#infracost_log_level), and checking the Cloud Pricing API logs can also help.

```shell
$ export INFRACOST_PRICING_API_ENDPOINT=https://endpoint

$ curl -i $INFRACOST_PRICING_API_ENDPOINT/health

Should show HTTP 200 {"status":"success"}

$ curl -i $INFRACOST_PRICING_API_ENDPOINT/graphql -H "X-Api-Key: WRONG_API_KEY"

Should show HTTP 403 {"error":"Invalid API key"}
Confirms that the Cloud Pricing API, not a proxy or Cloudflare, is throwing the 403.

$ curl -i $INFRACOST_PRICING_API_ENDPOINT/graphql -H "X-Api-Key: CORRECT_API_KEY"

Should show HTTP 400 "GET query missing"
Confirms that the Cloud Pricing API is receiving authenticated requests.
```

If you see `Invalid API response: 403 error` when running the Infracost CLI it might be because you have a `http_proxy` or `https_proxy` set in your environment. You can try disabling the proxy by running `export no_proxy="<HOSTNAME OF CLOUD PRICING API>:<PORT>"` and re-running the CLI to see if this is the issue.
