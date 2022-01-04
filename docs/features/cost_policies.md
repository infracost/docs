---
slug: cost_policies
title: Cost policies
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost has a [JSON format](/docs/features/cli_commands/#usage) that can be used by policy tools to create cost policies. The following examples show how this could be done with GitHub Actions; a similar thing can be achieved with other CI/CD tools: 
  - [OPA](examples/opa): check Infracost cost estimates against policies using [Open Policy Agent (OPA)](https://www.openpolicyagent.org/)
  - [Conftest](https://github.com/infracost/actions/blob/master/examples/conftest): check Infracost cost estimates against policies using [Conftest](https://www.conftest.dev/)
  - [Sentinel](examples/sentinel): check Infracost cost estimates against policies using HashiCorp's [Sentinel](https://www.hashicorp.com/sentinel)

If you do not use the above tools, you can still use [thresholds](https://github.com/infracost/actions/blob/master/examples/thresholds) using bash and [jq](https://stedolan.github.io/jq/) so notifications or pull request comments are only sent when cost thresholds are exceeded. 
