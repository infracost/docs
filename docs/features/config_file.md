---
slug: config_file
title: Config file
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Config files specify how Infracost should be run on a repo with multiple Terraform projects (e.g. infrastructure mono repos or Terragrunt repos). The costs for those projects are combined into **one pull request comment** and shown together in Infracost Cloud. If your repo has Terraform var files, you need a config file so Infracost knows how to apply them.

If you have any questions, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

## Usage

1. Decide where you are going to store your config file. Config files can either be defined in:
    - The [Infracost Cloud](https://dashboard.infracost.io) > Repos > my-repo > Settings page. You can also define a [default config file](#default-organization-config-file) for your organization. These options only works for [Infracost GitHub App](/docs/integrations/github_app/) users.
    - The `infracost.yml` file in the root of your repo. This is useful if you do not use Infracost Cloud, or prefer to keep config files in your repos.

2. Create a config file for each repo to define its projects. Each project can have the parameters mentioned in the table below; you might find the following [examples](#examples) helpful.

3. If you use the GitHub App, your config file is automatically processed. Otherwise, run `infracost breakdown --config-file infracost.yml` or `infracost diff --config-file infracost.yml`. The `--config-file` option can be used alongside `--sync-usage-file` and `--show-skipped` too.

<table>
<tr>
  <th>Parameter</th><th>Description</th>
</tr>
<tr>
  <td><code>path</code></td>
  <td>Required. String. Path to the Terraform directory. The path is relative to the working directory you run <code>infracost</code> from. A path can be repeated with different parameters, e.g. for multiple Terraform var files.</td>
</tr>
<tr>
  <td><code>name</code></td>
  <td>Optional. String. Defaults to code path, workspace or Terraform/Terragrunt module within a repo. Name of project to use in all outputs (CLI, CI/CD integrations and Infracost Cloud).</td>
</tr>
<tr>
  <td><code>terraform_var_files</code></td>
  <td>Optional. Array of string. Variable files to use when parsing Terraform HCL code, similar to Terraform's <code>-var-file</code> flag. Files with the <code>.auto.tfvars</code> extension do not need to be added to the list as they are processed automatically by Infracost. The file paths are relative to the <code>path</code> of the project. For example:
  <pre>
{`terraform_var_files:
  - global.tfvars
  - dev.tfvars`}
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
  <td><code>dependency_paths</code></td>
  <td>Optional. <span style={{textDecoration: "underline"}}>Only applicable for GitHub App users</span>. Array of strings. Array of additional file or directory paths that should trigger project estimates. All paths are relative to the working directory of your <code>infracost.yml</code> file. Supports glob patterns, for example:
  <pre>
{`dependency_paths:
  - "config/**.json"
  - default.yml
  - "modules/**"`}
  </pre></td>
</tr>
<tr>
  <td><code>usage_file</code></td>
  <td>Optional. String. Path to Infracost usage file that specifies values for <a href="/docs/features/usage_based_resources">usage based resources</a>. The path is relative to the working directory you run <code>infracost</code> from.</td>
</tr>
<tr>
  <td><code>exclude_paths</code></td>
  <td>Optional. Array of strings. Array of file or directory paths to exclude from evaluation, relative to <code>path</code> of project. Supports glob patterns too, for example:
  <pre>
{`exclude_paths:
  - projects/myproject
  - "test-*"
  - terragrunt.hcl
  - "app/*/ignore_dir"`}
  </pre></td>
</tr>
<tr>
  <td><code>include_all_paths</code></td>
  <td>Optional. Boolean. Defaults to false meaning that Infracost will autodetect only <b>root</b> Terraform modules. Setting this to true forces the autodetect function to estimate all directories (i.e. root and non-root modules) with valid project files, down to a max depth of 10 directories.</td>
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
  <td><code>terraform_workspace</code></td>
  <td>Optional. String. Used to set the Terraform workspace. Only set this for multi-workspace repos, otherwise it might result in the Terraform error "workspaces not supported".</td>
</tr>
</table>

### Examples

<Tabs
  defaultValue="mono-repo"
  values={[
    {label: 'Mono-repo', value: 'mono-repo'},
    {label: 'Include/exclude paths', value: 'include-exclude-paths'},
    {label: 'Multi-workspaces', value: 'multi-workspaces'},
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
        - "test-*" # Supports glob patterns too
      env:
        INSTANCE_TYPE: t3.large
        MY_ENV_KEY: ${MY_SECRET_ENV_VAR}        
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
</Tabs>

## Default organization config file

Enterprises often have hundreds of infrastructure code repositories, most of which follow a similar directory structure. [Infracost GitHub App](/docs/integrations/github_app/) users can define a default config file in [Infracost Cloud](https://dashboard.infracost.io) to be used by all of their repositories from the Org Settings page. This config file can be overridden on a per-repo basis from the Repos > my-repo > Settings page, or by adding an `infracost.yml` to the repo root. This enables you to add many repositories to Infracost quickly.

<img src={useBaseUrl("img/infracost-cloud/default-repo-config-file.png")} alt="Default config file used by all repos in the GitHub App integration" />

## Dynamic config files

Manually defining projects in config files means that when a project is added or removed from the repo, the config file has to be updated. This is cumbersome for repos with many projects and impossible to do efficiently with large enterprise repos that have hundreds or thousands of projects.

To solve this problem, config files also support a template syntax so you can generate the config file dynamically in CI/CD. This enables you to keep Infracost in sync with your repository's changing projects, thus removing the need to maintain a hardcoded config file.

As shown below, the template file is used by the `infracost generate` command to generate a config file. The Infracost GitHub App also automatically detects this syntax in the `infracost.yml` or `infracost.yml.tmpl` repo root files and generates the config file. If you're already familiar with Kubernetes Helm templates, you'll find working with the syntax straightforward and intuitive.

### Example

For this example, our infrastructure repo for a simple application has the following directory structure:

```shell
├── environment
│  ├── dev.tfvars
│  ├── staging.tfvars
│  ├── legacy.tfvars
│  └── prod.tfvars
├── modules
│  └── ...
└── main.tf
```

The `main.tf` file is the root Terraform module for the repo. It has a number of variables that define how the application runs in different environments, for example:

```hcl title="main.tf"
variable "instance_type" {
  type = "string"
  description = "the instance type to use for the worker node group"
}
```

Input variables are provided to Terraform by variable files stored under the `environment` folder. Each file corresponds to a different environment for the application. Environments are often added and removed by different teams. For example the `sandbox-platform` environment is due to be added next week.

The `dev`, `staging` and `prod` environments are all active, however the `legacy` environment is no longer active and has been removed last month.

An `infracost.yml.tmpl` config file template to support this application would look like so:

```gotemplate
version: 0.1
projects:
{{- range $project := matchPaths "environment/:env.tfvars" }}
  {{- if ne $project.env "legacy"}}
    - path: .
      name: {{ $project.env }}
      terraform_var_files:
        - environment/{{ $project.env }}.tfvars
  {{- end}}
{{- end }}
```

You can use the `infracost generate config` command, and run `breakdown` and `diff` using the generated `infracost.yml` config file:
```sh
$ infracost generate config --repo-path=. \
    --template-path=infracost.yml.tmpl \
    --out-file=infracost.yml


$ cat infracost.yml

version: 0.1
projects:
  - path: .
    name: dev
    terraform_var_files:
      - environment/dev.tfvars
  - path: .
    name: staging
    terraform_var_files:
      - environment/staging.tfvars
  - path: .
    name: prod
    terraform_var_files:
      - environment/prod.tfvars


$ infracost breakdown --config-file=infracost.yml \
    --format=json \
    --out-file=infracost-base.json
```

With this template, we'll now get cost estimates for all the current environments in the application, without having write lots of duplicate YAML. Furthermore, this template tracks additional environments moving forward, so when the `sandbox-platform` environment is released next week, we don't have to change anything 🚀

## Language tour

Config file templates, like [Helm templates](https://helm.sh/), are built on top of Golang's [text/template](https://pkg.go.dev/text/template) engine, offering an expressive way to write templates. Config file templates offer all the syntax and functionality of the `text/template` library as well as some additional functions.

Below we'll give a quick introduction into the templating syntax, with brief explanation of the main expressions and logic. This should be enough to get started with config file templates. If you wish to read further about the base templating language we recommend reviewing golang's text/template [package documentation](https://pkg.go.dev/text/template). Additionally, Helm's guide to [control flow](https://helm.sh/docs/chart_template_guide/control_structures/) provides a good overview of the base language.

### Syntax

Templates use a pair of curly braces `{{ }}` to delimit actions, such as `variables`, `if/else` statements, and `range` iterations. Within the curly braces, Infracost can recognize and execute template actions.

For example, `{{ $project.name }}` would print the value of the `$project.name`, while 

```gotemplate
{{- if .Enabled }}
  Enabled
{{- else }}
  Disabled
{{- end }}
```

would execute conditional logic based on the value of the `Enabled` field in the current context. 

### `if/else`

Conditional logic can be added to templates using the `{{ if }}`, `{{ else if }}`, and `{{ else }}` keywords. For example

```gotemplate
{{- if .Enabled }}
  Enabled
{{- else }}
  Disabled
{{- end }}
```

would print `"Enabled"` if the `Enabled` field in the current context is true, and `"Disabled"` otherwise. This can be useful to conditionally include projects for Infracost to evaluate, for example:

```gotemplate
{{- if ne $project.name "test" }}
  - path: .
    ...
{{- end }}
```

adds a configuration entry for the current project if it does not equal "test".

### `range`

Templates can iterate over arrays and maps using the `{{ range }}` keyword. For example:

```
{{- range .Items }}
  {{- .Name }}
{{- end }}
```

would print the value of the `Name` field for each item in the `Items` array in the current context. Within config file templates `range` expressions are normally combined with [`matchPaths`](#matchpaths) calls to iterate over a subset of directories or files, for example: 

```gotemplate
{{- range $project := matchPaths "environment/:env/terraform.tfvars" }}
  - path: .
    name: {{ $project.env }}
{{- end }}
```

sets successive elements returned from [`matchPaths`](#matchpaths) to `$project`, which can be accessed inside the `range` loop, e.g. `$project.env`

## Functions

Config file templates support a wide range of built in functions to make it easy for you to write config files that work for your project structure. Below you'll find a list of supported functions with detailed examples.

## Filepath functions

Config file templates include [`matchPaths`](#matchpaths), [`pathExists`](#pathexists), [`base`](#base), [`ext`](#ext) and [`stem`](#stem) functions to help you traverse your project structure.

### `matchPaths`

returns a list of matches that in the project directory tree that match the pattern.

#### Arguments

| name    | description                                                                                                                   | example                                                                                      |
|---------|-------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| pattern | a path pattern to one or more files or directories in your project. Keys that you wish to extract must be prefixed with `':'` | `"environment/:env/terraform.tfvars"`, `"infra/:env/:app"`, `"environment/:app/:env.tfvars"`, `":optional-parent?/:optional-child?/main.tf"` |

#### Returns

A collection of matches in the current project. Results are returned with a map of extracted keys from the pattern. In addition, each result has two additional properties:

* `_path` - the full path of that the pattern matched on
* `_dir`  - the base directory that the pattern matched on

#### Example

<Tabs
defaultValue="tree"
values={[
{label: 'Directory tree', value: 'tree'},
{label: 'Pattern', value: 'pattern'},
{label: 'Result', value: 'result'},
{label: 'Template usage', value: 'usage'},
]}>
  <TabItem value="tree">

  ```shell
  ├── environment
  │     ├── dev
  │     │   └── terraform.tfvars
  │     └── prod
  │         └── terraform.tfvars
  ├── infracost.yml.tmpl
  └── main.tf
  ```

  </TabItem>
  <TabItem value="pattern">

  ```shell
  "environment/:env/terraform.tfvars"
  ```

  </TabItem>
  <TabItem value="result">

  ```
    - { _path: environment/dev/terraform.tfvars, _dir: environment/dev, env: dev }
    - { _path: environment/prod/terraform.tfvars, _dir: environment/prod, env: prod }
  ```

  </TabItem>
  <TabItem value="usage">

  Using the `range` expression to iterate over the results like so:

  ```gotemplate
  version: 0.1

  projects:
  {{- range $project := matchPaths "environment/:env/terraform.tfvars" }}
    - path: .
      name: {{ $project.env }}
      terraform_var_files:
        - {{ $project._path }}
  {{- end }}
  ```

  Would produce an output:

  ```yaml
  version: 0.1

  projects:
    - path: .
      name: dev
      terraform_var_files:
        - environment/dev/terraform.tfvars
    ...
  ```
  </TabItem>
</Tabs>

### `pathExists`

Checks whether path is a subpath within base.

#### Arguments

| name | description                                                                                                       | example                           |
|------|-------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| base | The directory to search for the given file or directory. Use `"."` to start from the project root.                | ".", "some/dir"                    |
| path | The path of the file or directory to search for. This must be relative to the base path provided at argument one. | "dir/to/find", "file/to/find.txt" |

#### Returns

True if the path exists within base.

#### Example

<Tabs
defaultValue="tree"
values={[
{label: 'Directory tree', value: 'tree'},
{label: 'Template', value: 'template'},
{label: 'Output', value: 'output'},
]}>
<TabItem value="tree">

  ```shell
  ├── environment
  │     ├── dev
  │     |   ├── include.txt
  │     │   └── terraform.tfvars
  │     └── prod
  │         └── terraform.tfvars
  ├── infracost.yml.tmpl
  └── main.tf
  ```

  </TabItem>
  <TabItem value="template">

    version: 0.1

    projects:
    {{- range $project := matchPaths "environment/:env/terraform.tfvars" }}
      {{- if pathExists $project._dir "include.txt" }}
      - path: .
        name: {{ $project.env }}
      {{- end }}
    {{- end }}

  </TabItem>
  <TabItem value="output">

    version: 0.1
    projects:
      - path: .
        name: dev

  </TabItem>
</Tabs>

### `base`

Returns the last element of path.

```gotemplate
base "full/path/here.txt"
```

returns `here.txt`

```gotemplate
base "full/path"
```

returns `path`

### `ext`

Returns the file name extension used by path.

```gotemplate
ext "full/path/here.txt"
```

returns `.txt`

### `stem`

Returns the last element of path with the extension removed.

```gotemplate
stem "full/path/here.txt"
```

returns `here`

## Control flow functions

Config file templates support control flow functions including [`eq`](#eq), [`ne`](#eq) and [`not`](#not). Templates can also use the control flow functions `lt`, `le`, `gt`, `ge`, `and` and `or` from the base text/template library. The documentation for these additional functions can be [found here](https://pkg.go.dev/text/template#hdr-Functions).

### `eq`

Returns the boolean truth of arg1 == arg2.

```gotemplate
eq $project.arg1 $project.arg2
```

### `ne`

Returns the boolean truth of arg1 != arg2.

```gotemplate
ne $project.arg1 $project.arg2
```

### `not`

Returns the boolean negation of its single argument.

```gotemplate
not (pathExists "path")
```

## String Functions

Config file templates support for the following string manipulation functions [`startsWith`](#startswith), [`endsWith`](#endswith) and [`contains`](#contains). Templates can also use the string functions `print`, `printf` and `println` from the base text/template library. The documentation for these additional functions can be [found here](https://pkg.go.dev/text/template#hdr-Functions).


returns `here`

### `startsWith`

Tests whether the string begins with prefix.

```gotemplate
startsWith "mystring" "my"
```

returns true

```gotemplate
startsWith "mystring" "foo"
```

returns false

### `endsWith`

Tests whether the string ends with suffix.

```gotemplate
endsWith "mystring" "string"
```

returns true

```gotemplate
endsWith "mystring" "foo"
```

returns false

### `contains`

Reports whether substr is within the subject.

```gotemplate
contains "mystringbar" "string"
```

returns true

```gotemplate
endsWith "mystringbar" "foo"
```

returns false
