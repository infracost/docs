---
slug: share_links
title: Share reports
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Cost estimates can be shared with other team members or management without having to manually upload files to object storage! The Infracost dashboard is part of our hosted services and you can enable it by running:
```sh
# in CLI:
infracost configure set enable_dashboard true

# in CI/CD:
export INFRACOST_ENABLE_DASHBOARD=true
```

Once enabled, the Infracost CLI sends its [JSON output](/docs/features/cli_commands/#examples) to the dashboard so it can generate a unique link that can be used to share the cost estimate with others; see example [here](https://dashboard.infracost.io/results/285db4b2-1467-41c0-a162-382ae7f87e89?token=932c8505d6cd3dd7c3cba4d45188eeec9988976ae0d366ccc5ae813ed1b4fc395dfba94d14d54babef943c23042787f66076f04a29a37dced8d0ae963e5cefd5). The Infracost JSON output does not contain any cloud credentials or secrets.

A link is generated each time you run `infracost breakdown`, `diff` or `output`, and it's included in the `table`, `diff` and `json` formats. The link can also be parsed and used in your workflow, for example by sending it to Slack. The `infracost output` command generates a new link for the combined cost estimate.

There is currently no way for you to expire links, you can [contact us](/docs/support) if you'd like us to disable a link.
