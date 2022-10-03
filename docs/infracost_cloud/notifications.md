---
slug: notifications
title: Notifications
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Weekly reports

All Infracost Cloud users get a weekly email of the most impactful changes across all repos in their organizations. This email shows the most impactful changes across repos, projects, pull requests and users. 

<img src={useBaseUrl("img/infracost-cloud/weekly-report-email.png")} alt="Weekly report email" />

### Opt-out of reports

You can unsubscribe from weekly emails from your [User settings](https://dashboard.infracost.io/user/settings) page.

<img src={useBaseUrl("img/infracost-cloud/user-settings.png")} alt="User settings" />

## Alerts

Coming soon you'll be able to setup email and Slack alerts to notify you when a pull request goes above a threshold. For example, if a pull request increases the cost by more than $10K/month, you probably want to review that before it gets deployed. Subscribe to [this GitHub issue](https://github.com/infracost/infracost/issues/1727) for updates.
