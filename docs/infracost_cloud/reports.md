---
slug: reports
title: Reports
---

import useBaseUrl from '@docusaurus/useBaseUrl';

All Infracost Cloud users get a weekly email of the most impactful changes across all repos in their organizations. This email shows the most impactful changes across repos, projects, pull requests and users. 

### Usage

Log in to [Infracost Cloud](https://dashboard.infracost.io) and go to the Reports page. When creating a report, you can filter on specific pull requests (e.g. only report on certain repositories or merged pull requests) and select the report frequency (daily, weekly, monthly). You can also select which users should get the reports as shown below.

<img src={useBaseUrl("img/infracost-cloud/report-create.png")} alt="Creating a report" />

The pull request status filters (open, merged, closed) fetch pull requests with the selected statuses at the time the report is sent. For example, a daily report with a filter on open pull requests will only include pull requests that are currently open at the time the report is sent every day and have a cost estimate for the report date. So if a pull request was opened and merged quickly it will not be included in that daily report; you can include merged pull requests in the report filter for those. If the pull request doesn't receive any new cost estimates after that, the daily report for the next day will not include it.

### Example report email

The following screenshot shows an example email report.

<img src={useBaseUrl("img/infracost-cloud/report-email.png")} alt="Weekly report email" width="75%" />

