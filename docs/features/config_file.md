---
slug: config_file
title: Config file
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An Infracost config file can be created in each of your Terraform repos to specify how Infracost should be run. The [GitHub App](/docs/integrations/github_app) automatically uses `infracost.yml` if it's present at the root of your repo.

The main advantages of this over CLI flags are:
1. Not having to remember or specify flags for each run. Just run `infracost breakdown --config-file infracost.yml` instead.
2. Ability to run Infracost with multiple Terraform paths, projects, workspaces, and combine them into the same breakdown or diff output.

If you're looking to manually combine cost estimates from multiple runs (e.g. from a CI build matrix), see the [`infracost output`](/docs/features/cli_commands/#combined-output-formats) command's docs.

## Precedence

Infracost configuration values are chosen in this order:
1. CLI flags (run `infracost --help` to see them)
2. [Environment variables](/docs/features/environment_variables)
3. Config file
4. Infracost Cloud organization settings

## Usage

1. Create an `infracost.yml` file in the root of your repo. Each project can have the parameters mentioned in the table below; you might find the following [examples](#examples) helpful.
2. Run `infracost breakdown --config-file infracost.yml` or `infracost diff --config-file infracost.yml`. The `--config-file` option can be used alongside `--sync-usage-file` and `--show-skipped`.

<table>
<tr>
  <th>Parameter</th><th>Description</th>
</tr>
<tr>
  <td><code>path</code></td>
  <td>Required. String. Path to the Terraform directory or JSON/plan file. The path is relative to the working directory you run <code>infracost</code> from. A path can be repeated with different parameters, e.g. for multiple workspaces.</td>
</tr>
<tr>
  <td><code>name</code></td>
  <td>Optional. String. Defaults to code path, workspace or Terraform/Terragrunt module within a repo. Name of project to use in all outputs (CLI, CI/CD integrations and Infracost Cloud).</td>
</tr>
<tr>
  <td><code>include_all_paths</code></td>
  <td>Optional. Boolean. Defaults to false meaning that Infracost will autodetect only <b>root</b> Terraform modules. Setting this to true forces the autodetect function to estimate all directories (i.e. root and non-root modules) with valid project files, down to a max depth of 10 directories.</td>
</tr>
<tr>
  <td><code>exclude_paths</code></td>
  <td>Optional. Array of strings. Array of file or directory paths to exclude from evaluation, relative to <code>path</code> of project. Supports glob patterns too, for example:
  <pre>
{`exclude_paths:
  - projects/myproject
  - test-*
  - terragrunt.hcl
  - app/*/ignore_dir`}
  </pre></td>
</tr>
<tr>
  <td><code>dependency_paths</code></td>
  <td>Optional. <span style={{textDecoration: "underline"}}>Only applicable for GitHub App users</span>. Array of strings. Array of additional file or directory paths that should trigger project estimates. All paths are relative to the working directory of your <code>infracost.yml</code> file. Supports glob patterns, for example:
  <pre>
{`dependency_paths:
  - config/**.json
  - default.yml
  - modules/**`}
  </pre></td>
</tr>
<tr>
  <td><code>usage_file</code></td>
  <td>Optional. String. Path to Infracost usage file that specifies values for <a href="/docs/features/usage_based_resources">usage_based_resources</a>. The path is relative to the working directory you run <code>infracost</code> from.</td>
</tr>
<tr>
  <td><code>env</code></td>
  <td>Optional. Map of strings. Environment variables that are passed to the project during processing. Also supports referencing existing environment variables using the syntax <code>$&#123;MY_ENV_VAR&#125;</code>. Environment variables that start with <code>INFRACOST_</code> are global in scope (not per-project) and cannot be used inside this parameter. For example:
  <pre>
{`env:
  INSTANCE_TYPE: t3.large
  MY_ENV_KEY: $\{MY_SECRET_ENV_VAR\}`}
  </pre></td>
</tr>
<tr>
  <td><code>terraform_vars</code></td>
  <td>Optional. Map of strings. Input variables to use when parsing the Terraform HCL code, similar to Terraform's <code>-var</code> flag. For example:
  <pre>
{`terraform_vars:
  instance_count: 5
  artifact_version: foobar`}
  </pre></td>
</tr>
<tr>
  <td><code>terraform_var_files</code></td>
  <td>Optional. Array of string. Variable files to use when parsing Terraform HCL code, similar to Terraform's <code>-var-file</code> flag. These file paths are relative to the <code>path</code> of the project. For example:
  <pre>
{`terraform_var_files:
  - global.tfvars
  - dev.tfvars`}
  </pre></td>
</tr>
<tr>
  <td><code>terraform_workspace</code></td>
  <td>Optional. String. Used to set the Terraform workspace. Only set this for multi-workspace repos, otherwise it might result in the Terraform error "workspaces not supported".</td>
</tr>
<tr>
  <td><code>terraform_cloud_host</code></td>
  <td>Optional. String. For Terraform Enterprise, used to override the default <code>app.terraform.io</code> backend host that is used by Infracost to retrieve variables and registry modules. Can also be used by GitLab users to set the hostname to <code>gitlab.com</code> or your GitLab hostname.</td>
</tr>
<tr>
  <td><code>terraform_cloud_token</code></td>
  <td>Optional. String. For Terraform Cloud/Enterprise or GitLab users, set this to a <a href="https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html">TFC Team API Token or User API Token</a> or <a href="https://docs.gitlab.com/ee/user/packages/terraform_module_registry/#authenticate-to-the-terraform-module-registry">GitLab token</a> so Infracost can automatically retrieve variables and registry modules. If <a href="/docs/features/environment_variables#infracost_terraform_cloud_token">this</a> environment variable is set, that'll be used for all projects instead of this parameter.</td>
</tr>
</table>


## Template syntax

Config files also support [template syntax](/docs/features/config_file_template), which enables you to dynamically generate a config file in CI/CD without having to maintain a hardcoded Infracost config file:
```
infracost generate config --repo-path=. \
  --template-path=infracost.yml.tmpl \
  --out-file=infracost.yml

infracost breakdown --config-file=infracost.yml
```

This is a new feature and we ask that you [contact us](/docs/support) if you use it so we can improve the syntax.

## Examples

<Tabs
  defaultValue="mono-repo"
  values={[
    {label: 'Mono-repo', value: 'mono-repo'},
    {label: 'Include/exclude paths', value: 'include-exclude-paths'},
    {label: 'Multi-workspaces', value: 'multi-workspaces'},
    {label: 'Multi-plans', value: 'multi-plans'},
  ]}>
  <TabItem value="mono-repo">

  ```yml
  version: 0.1
  projects:
    - path: dev
      name: development
      usage_file: dev/infracost-usage.yml
      terraform_var_files:
        - dev.tfvars

    - path: prod
      name: production
      usage_file: prod/infracost-usage.yml
      terraform_vars:
        instance_count: 5
        artifact_version: foobar
      env:
        INSTANCE_TYPE: t3.large
        MY_ENV_KEY: ${MY_SECRET_ENV_VAR}
  ```
  </TabItem>
  <TabItem value="include-exclude-paths">

  ```yml
  version: 0.1
  projects:
    - path: infra
      include_all_paths: true # include root and non-root modules
      exclude_paths:
        - projects/myproject
        - infra/terragrunt.hcl
        - test-* # Supports glob patterns too
  ```
  </TabItem>
  <TabItem value="multi-workspaces">

  ```yml
  version: 0.1
  projects:
    - path: examples/terraform
      terraform_workspace: dev

    - path: examples/terraform
      terraform_workspace: stage
      terraform_var_files:
        - stage.tfvars

    - path: examples/terraform
      terraform_workspace: prod
      terraform_var_files:
        - prod.tfvars
        - us-east.tfvars
  ```
  </TabItem>
  <TabItem value="multi-plans">

  ```yml
  version: 0.1
  projects:
    - path: my/terraform/plans/project1.json
      name: project1
      usage_file: project1-usage.yml

    - path: my/terraform/plans/project2.json
      name: project2
      usage_file: project2-usage.yml
  ```
  </TabItem>
</Tabs>
