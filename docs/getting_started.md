---
slug: getting_started
title: Getting started
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost shows hourly and monthly cost estimates for a Terraform project. This helps developers, DevOps et al. quickly see the cost breakdown and compare different deployment options upfront.

<img alt="Example infracost output" width="600px" src={useBaseUrl('img/screenshot.png')} />

## Installation

To download and install the latest release:

```sh
curl --silent --location "https://github.com/infracost/infracost/releases/latest/download/infracost-$(uname -s)-amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/infracost-$(uname -s | tr '[:upper:]' '[:lower:]')-amd64 /usr/local/bin/infracost
```

## Basic usage

Generate a cost breakdown from a Terraform directory:
```sh
infracost --tfdir /my/code/path
```

The [Infracost GitHub action](https://github.com/marketplace/actions/run-infracost) can be used to automatically add a PR comment showing the cost estimate `diff` between a pull request and the master branch whenever Terraform files change.

<img src="https://raw.githubusercontent.com/infracost/infracost-gh-action/master/screenshot.png" width="550px" alt="Example infracost diff usage" />

### Usage options

To change the path to your `terraform` binary you can set the `TERRAFORM_BINARY` env variable:
```sh
TERRAFORM_BINARY=~/bin/terraform_0.13 infracost --tfdir examples/terraform_0.13
```

Standard Terraform env variables such as `TF_CLI_ARGS` can also be added if required:
```sh
TF_VAR_key=value infracost --tfdir examples/terraform
# or
TF_CLI_ARGS_plan="-var-file=my.tfvars" infracost --tfdir examples/terraform
```

Generate a cost breakdown from a Terraform plan file:
```sh
cd examples/terraform
terraform plan -out plan.save .
infracost --tfplan plan.save --tfdir .
```

Generate a cost breakdown from a Terraform plan JSON file:
```sh
cd examples/terraform
terraform plan -out plan.save .
terraform show -json plan.save > plan.json
infracost --tfjson plan.json
```

### How does it work?

Prices are retrieved using [https://github.com/infracost/cloud-pricing-api](https://github.com/infracost/cloud-pricing-api). There is a demo version of that service deployed at [https://pricing.infracost.io/graphql](https://pricing.infracost.io/graphql), which `infracost` uses by default. This is running on minimal infrastructure so is not guaranteed to always be available. On this service, spot prices are refreshed once per hour.

You can run `infracost` in your terraform directories without worrying about security or privacy issues as no terraform secrets/tags/IDs etc are sent to the pricing service (only generic price-related attributes are used). Also, do not be alarmed by seeing the `terraform init` in output, no changes are made to your terraform or cloud resources. As a security precaution, read-only AWS IAM creds can be used.

You can also deploy the price list API yourself and specify it by setting the `infracost_API_URL` env variable or passing the `--api-url` option.
