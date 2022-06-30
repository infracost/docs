---
slug: share_links
title: Share links
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Cost estimates can be shared with other team members or management without having to manually upload files to object storage! See [this example](https://dashboard.infracost.io/share/deaczrvclzv9z8yf76dex0t4dpxx9buj).

Infracost share links are part of our hosted services and you can enable them by running the following command. Once enabled, the Infracost CLI sends its [JSON output](/docs/features/cli_commands/#examples) to Infracost Cloud so it can generate unique share links. Each link contains a unique token that is generated from your API key (similar idea to AWS S3's pre-authenticated links). The Infracost JSON output does not contain any cloud credentials or secrets.

```sh
# in CI/CD:
export INFRACOST_ENABLE_DASHBOARD=true
```

A link is generated each time you run `infracost breakdown`, `diff` or `output`, and it's included in the `table`, `diff` and `json` formats. The link can also be parsed and used in your workflow, for example by sending it to Slack. The `infracost output` command generates a new link for the combined cost estimate.

There is currently no way for you to expire links, you can subscribe to [this issue](https://github.com/infracost/infracost/issues/1441) for updates.

[<img src={useBaseUrl("img/screenshots/infracost-share-link.png")} alt="A demo of the new Infracost sharable link" />](https://dashboard.infracost.io/share/deaczrvclzv9z8yf76dex0t4dpxx9buj)
