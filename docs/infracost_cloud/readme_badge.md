---
slug: readme_badge
title: Readme badge
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Add a cost badge in your repository `README.md` files to enable engineers to see the repo's latest cost estimate quickly. This is specially useful for Terraform module repos where a central platform team creates re-usable modules for development teams, who are often unaware of the costs of those modules.

<img src={useBaseUrl("img/infracost-cloud/readme-badge.png")} width="60%" alt="Cost badge" />

## Usage

Cost badges require the cost estimate to be stored in Infracost Cloud so your repository `README.md` file can fetch the badge from it.

1. Follow the [GitHub Apps](/docs/integrations/github_app) integrations page to setup your repo in Infracost Cloud.

2. In Infracost Cloud, go to Repos > Settings.

3. Select the branch and project that the badge should represent. The branch should normally be your main or master branch, and you can select "All projects" if the badge should show a sum of all projects in the repository. For Terraform module repos, where there are no projects, use the "All projects" option.

  <img src={useBaseUrl("img/infracost-cloud/readme-badge-settings.png")} alt="Readme badge code snippet" />

  The badge token is unique and associated with your Infracost Cloud organization. It only has access to the latest cost estimate for your repositories and nothing else, thus it is safe to be added to your `README.md` files.

4. Copy the Markdown or HTML code snippet and add it to the top of your `README.md` file, commit and push your change to your repository.

  The cost badge will automatically show the latest cost estimate from your desired branch and projects.
