---
slug: share_links
title: Share reports
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Cost estimates can be shared with other team members or management without having to manually upload files to object storage! See [this example](https://dashboard.infracost.io/share/deaczrvclzv9z8yf76dex0t4dpxx9buj).

The Infracost dashboard is part of our hosted services and you can enable it by running the following command. Once enabled, the Infracost CLI sends its [JSON output](/docs/features/cli_commands/#examples) to the dashboard so it can generate unique share links. The Infracost JSON output does not contain any cloud credentials or secrets.

```sh
# in CLI:
infracost configure set enable_dashboard true

# in CI/CD:
export INFRACOST_ENABLE_DASHBOARD=true
```

A link is generated each time you run `infracost breakdown`, `diff` or `output`, and it's included in the `table`, `diff` and `json` formats. The link can also be parsed and used in your workflow, for example by sending it to Slack. The `infracost output` command generates a new link for the combined cost estimate.

There is currently no way for you to expire links, you can [contact us](/docs/support) if you'd like us to disable a link.
