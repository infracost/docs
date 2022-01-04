---
slug: cost_policies
title: Cost policies
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost has a [JSON format](/docs/features/cli_commands/#usage) that can be used by policy tools to create cost policies. The following examples show how this could be done with GitHub Actions; a similar thing can be achieved with other CI/CD tools: 
  - [Open Policy Agent (OPA)](https://github.com/infracost/actions/blob/master/examples/opa)
  - [Conftest](https://github.com/infracost/actions/blob/master/examples/conftest)
  - [HashiCorp Sentinel](https://github.com/infracost/actions/blob/master/examples/sentinel)

If you do not use the above tools, you can still use [thresholds](https://github.com/infracost/actions/blob/master/examples/thresholds) using bash and [jq](https://stedolan.github.io/jq/) so notifications or pull request comments are only sent when cost thresholds are exceeded. 
