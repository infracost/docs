---
slug: cost_policies
title: Cost policies
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost has a [JSON format](/docs/features/cli_commands/#usage) that can be used by policy tools to create cost policies. The following examples show how this could be done with GitHub Actions; a similar thing can be achieved with other CI/CD tools: 
  - [Thresholds](https://github.com/infracost/actions/blob/master/examples/thresholds): only post a comment when cost thresholds are exceeded, a similar thing can be done with bash and [jq](https://stedolan.github.io/jq/)
  - [Conftest](https://github.com/infracost/actions/blob/master/examples/conftest): check Infracost cost estimates against policies using [Conftest](https://www.conftest.dev/)
  - [OPA](examples/opa): check Infracost cost estimates against policies using [Open Policy Agent (OPA)](https://www.openpolicyagent.org/)
  - [Sentinel](examples/sentinel): check Infracost cost estimates against policies using HashiCorp's [Sentinel](https://www.hashicorp.com/sentinel)
