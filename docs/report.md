---
slug: report
title: Generate reports
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The infracost command's `--output table|json|html` option can be used to change the output format. The JSON option could be used to generate files that could then be consumed by the `infracost report` command to generate a combined report. The report command can generate table, JSON or HTML reports.

These reports can be uploaded to object storage such as AWS S3 and shared with others including team members or management. The HTML report also includes the file names and Terraform tags from the files that were used to generate it.

Run `infracost report --help` to see the available options.

```sh
infracost --tfdir /path/to/module1 --output json > module1.json
infracost --tfdir /path/to/module2 --output json > module2.json

infracost report --output html module*.json > report.html
```

Example HTML report:
<img src={useBaseUrl("img/screenshots/html_report.png")} alt="Infracost HTML report" />
