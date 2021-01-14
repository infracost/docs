---
slug: integrations
title: CI/CD integrations
---

The Infracost CI/CD integration can be used to automatically add a pull request comment showing the cost estimate difference (similar to `git diff`) between the master branch and the working branch. You can also select to ignore changes with minor cost increase/decreases by setting a percentage threshold for the comment to be added - details are in each integration document.

Infracost can be used in any CI/CD system using [our binary](https://github.com/infracost/infracost/releases) or [Docker image](https://hub.docker.com/r/infracost/infracost). You might also find our [CI diff script](https://github.com/infracost/infracost/tree/master/scripts/ci) useful; it's used in the following integrations.

If you run into any issues with CI/CD integrations, please join our [community Slack channel](https://www.infracost.io/community-chat); we'd be happy to guide you through it.

## GitHub Action

See the [Infracost GitHub Action](https://github.com/marketplace/actions/run-infracost) for instructions, and a demo [here](https://github.com/infracost/gh-actions-demo)

<img src="https://raw.githubusercontent.com/infracost/infracost-gh-action/master/screenshot.png" width="550px" alt="Example infracost diff usage" />

## GitLab CI

See the [Infracost GitLab CI template](https://gitlab.com/infracost/infracost-gitlab-ci) for instructions, and a demo [here](https://gitlab.com/infracost/gitlab-ci-demo).

<img src="https://gitlab.com/infracost/infracost-gitlab-ci/-/raw/master/screenshot.png" width="550px" alt="Example infracost diff usage" />

## CircleCI

See the [Infracost CircleCI Orb](https://github.com/infracost/infracost-orb) for instructions; it supports GitHub and Bitbucket. A demo of the GitHub integration is [here](https://github.com/infracost/circleci-github-demo), and Bitbucket is [here](https://bitbucket.org/infracost/circleci-bitbucket-demo)

## Bitbucket Pipelines

See the [Infracost Bitbucket Pipeline](https://bitbucket.org/infracost/infracost-bitbucket-pipeline) for instructions, and a demo [here](https://bitbucket.org/infracost/circleci-bitbucket-demo).

<img src="https://bytebucket.org/infracost/infracost-bitbucket-pipeline/raw/8fcac59619308deb44ebc11170bfec349e855ee6/screenshot.png" width="550px" alt="Example infracost diff usage" />

## Infracost API

Terraform plan JSON files can be sent to the Infracost API, which runs the CLI and returns the results. Whilst this API deletes files from the server after they are processed, it is a good security practice to remove secrets from the file before sending it to the API. For example, AWS provides [a grep command](https://gist.github.com/alikhajeh1/f2c3f607c44dabc70c73e04d47bb1307) that can be used to do this. This API can be useful for integrations where it might be easier to use `curl` or an HTTP library instead of installing the Infracost CLI.

To use this API, send an HTTP post request to `https://pricing.api.infracost.io/tfjson` with the `tfjson` parameter (required) using the multipart/form-data request body format, as shown in the following example curl request. Other [Infracost options](/docs/#useful-options) can also be set using the same format, e.g `curl -F 'show-skipped=true' -F 'output=html' -F 'usage-file=@infracost-usage.yml'`.

The API returns a `text/plain` response by default since `output=table` by default. If output is set to `json`, an `application/json` response is returned; and if output is set to `html`, a `text/html` response is returned.

```sh
  cd path/to/code
  terraform init
  terraform plan -out plan.save .
  terraform show -json plan.save > plan.json

  curl -X POST -H "x-api-key: my-api-key" -F "tfjson=@plan.json" \
    https://pricing.api.infracost.io/tfjson
```
