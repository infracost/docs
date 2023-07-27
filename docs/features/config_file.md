---
slug: config_file
title: Config file
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Config files specify how Infracost should be run on a repo with multiple Terraform projects, such as infrastructure mono repos or Terragrunt repos. Terraform var files/values should also be specified in config files so Infracost knows how to apply them.

Your repo's project list is dynamically generated in CI/CD just before Infracost runs. The costs for the projects are combined into **one pull request comment** and shown together in Infracost Cloud.

If you have any questions or need help writing a config file, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

## Overview

This section provides an overview of how config files work using an example infrastructure repo. This simple application has the following directory structure.

```shell
├── environment
│  ├── dev.tfvars
│  ├── staging.tfvars
│  ├── legacy.tfvars
│  └── prod.tfvars
├── modules
│  └── ... # terraform modules
└── main.tf # the root Terraform module for repo
```

As you can see above, each Terraform var file stored under the `environment` folder corresponds to a different project. The `dev`, `staging` and `prod` environments are all active, however, the `legacy` environment is no longer active, so we do not want Infracost to run on it.

A config file for this application is shown below. Line 3 shows how we can loop over the environments and generate a project for each one. The `$project._path` variable on line 8 is a special variable that returns the full path of the pattern matched on.

```gotemplate title="infracost.yml.tmpl" showLineNumbers
version: 0.1
projects:
{{- range $project := matchPaths "environment/:env.tfvars" }}
  {{- if ne $project.env "legacy"}}
    - path: .
      name: {{ $project.env }}
      terraform_var_files:
        - {{ $project._path }}
  {{- end}}
{{- end }}
```

Now we will use the `infracost generate config` command to generate an `infracost.yml` file and use that to run `infracost breakdown` as shown below:
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

We'll explain where you can store the `infracost.yml.tmpl` template file next. There is no need to store the generated config file. With the template, we'll get cost estimates for all the current environments in the application. Furthermore, this template adds a project for any new environments that are added, so we don't have to change anything 🚀

## Usage

To add a config file for your repos:

1. Use the `infracost generate config` command (shown above) when you are writing a config file to test that it generates your project list correctly.

  The [examples](#examples) section shows common examples you should use as a starting point. The [project parameters](#project-parameters) and the [template syntax](#template-syntax) sections show the full list of options supported by config files.

2. Once you are happy with the generated project list, go to [Infracost Cloud](https://dashboard.infracost.io) > Repos > my-repo > Settings page. Paste your config file there and click on Save.

  You can also store the `infracost.yml.tmpl` file in the root of your repo. This is useful if you do not use Infracost Cloud, or prefer to keep config files in your repos. The config file in Infracost Cloud takes precedence over the repo root file.

3. If you use the Infracost [GitHub App](/docs/integrations/github_app/) or the [GitLab App](/docs/integrations/gitlab_app/), your config file from Infracost Cloud or the repo root is automatically used. Go to the Repos page and click on the default branch costs, click on the "Re-run estimate" button and wait for it to update the page. You should now see your project list from the generated config file.

  If you do not use the GitHub App or GitLab App, in your CI/CD pipeline run the `infracost generate config` command followed by the `infracost breakdown` and `diff` commands with the `--config-file` flag pointing to the generated config file (as shown in the above overview section).

4. If you have many repos with a similar directory structure, you can define a default config file to be used by all of your repos from the Org Settings > Default repo config file page. This config file can be overridden on a per-repo basis from the Repos > my-repo > Settings page, or by adding an `infracost.yml.tmpl` to the repo root. This enables you to add many repositories to Infracost quickly.

  <img src={useBaseUrl("img/infracost-cloud/default-repo-config-file.png")} alt="Default config file used by all repos in the GitHub App or GitLab App integration" />

## Examples

<details><summary>Looping over projects with environments contained in a sub folder</summary>

```yaml
version: 0.1
projects:
{{- range $project := matchPaths "environment/:app/:env" }}
    - path: {{ $project._dir }}
      name: {{ $project.app }}-{{ $project.env }}
{{- end }}
```
</details>

<details><summary>Excluding certain projects</summary>

```yaml
version: 0.1
projects:
{{- range $project := matchPaths "environment/:env.tfvars" }}
  {{- if ne $project.env "legacy"}}
    - path: {{ $project._dir }}
      name: {{ $project.env }}
      terraform_var_files:
        - {{ $project._path }}
  {{- end}}
{{- end }}
```
</details>

<details><summary>Only matching certain project</summary>

```yaml
version: 0.1
projects:
{{- range $project := matchPaths "environment/:env(prod|dev).tfvars" }}
    - path: {{ $project._dir }}
      name: {{ $project.env }}
      terraform_var_files:
        - {{ $project._path }}
{{- end }}
```
</details>

<details><summary>Looping over multiple projects with a var file contained at the root level as well as project</summary>

```yaml
version: 0.1
projects:
{{- range $project := matchPaths ":name/:region/main.tf" }}
    - path: {{ $project.name }}/{{ $project.region }}
      name: {{ $project.name }}-{{ $project.region }}
      terraform_var_files:
        - local.tfvars
        {{- if pathExists "." "global.tfvars"}}
        - {{ relPath $project._dir "global.tfvars" }}
        {{- end}}
{{- end }}
```
</details>

<details><summary>Project with configuration defined in a non-Terraform file</summary>

```yaml
version: 0.1
projects:
{{- $envs := list "prod" "dev"}}
{{- range $project := matchPaths ":app/main.tf" }}
    {{- range $env := $envs}}
    - path: {{ $project._path }}
      name: {{ $project.app }}-{{ $env }}
    {{- end }}
{{- end }}
```
</details>

<details><summary>Looping over projects with complex `matchPaths` matchers</summary>

```yaml
// Example folder structure:
.
├── dev
├── prod
├── test
└── foo

// Ensure a folder matches a list of names, ignore everything else
{{- range $match := matchPaths ":env(dev|prod|test)" }}

// Returns:
[{env: dev}, {env: prod}, {env: test}]

---

Example folder structure:
.
├── foo/
│   └── main.tf
└── bar/
  ├── dev/
  │   └── main.tf
  └── prod/
      └── main.tf

// Match a nested folder if it exists
{{- range $match := matchPaths ":app/:env?/main.tf" }}

// Returns:
[{app: foo}, {app: bar, env: dev}, {app: bar, env: prod}]

---

Example folder structure:
.
├── foo/
│   ├── prod.tfvars
│   └── prod-euwest.tfvars
└── bar/
    └── dev.tfvars

// Match a region in the tfvar name if it exists, and capture it
{{- range $match := matchPaths ":app/:env{-:region}?.tfvars" }}

// Returns:
// [{app: foo, env: prod}, {app: foo, env: prod, region: euwest}, {app: bar, env: dev}]
```
</details>

## Project parameters

The following table shows the parameters each `project` can have in the config file:

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
  <td>Optional. String. Defaults to code path, workspace or Terraform/Terragrunt module within a repo. Name of project to use in all outputs (pull request comment, Infracost Cloud and CLI).</td>
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
  <td>Optional. <span style={{textDecoration: "underline"}}>Only applicable for GitHub App and GitLab App users</span>. Array of strings. Array of additional file or directory paths that should trigger project estimates. All paths are relative to the working directory of your <code>infracost.yml</code> file. Supports glob patterns, for example:
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

## Template syntax

Config file templates, like [Helm templates](https://helm.sh/), are built on top of Golang's [text/template](https://pkg.go.dev/text/template) engine, offering an expressive way to write templates. Below we'll describe the template syntax and brief explanation of the main expressions and logic.

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

#### `if/else`

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

#### `range`

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

### Global variables

Templates have access to the following global variables:

* `.Branch` - The name of the current branch that the template is executed on.

The following global variables are **only** available in CI:

* `.BaseBranch` - The name of the base branch that the pull request is being merged into (which is usually main or master).

  ```gotemplate
  {{ if eq .BaseBranch "production" }}
    - path: terraform/infra/prod
      name: infra-prod
  {{ end }}
  ```

### Functions

Config file templates support a wide range of built-in functions to make it easy for you to write config files that work for your project structure. Below you'll find a list of supported functions with detailed examples.

#### Filepath functions

Config file templates include [`matchPaths`](#matchpaths), [`pathExists`](#pathexists), [`isDir`](#isdir), [`relPath`](#relPath), [`base`](#base), [`ext`](#ext) and [`stem`](#stem) functions to help you traverse your project structure.

#### `matchPaths`

Returns a list of matches that in the project directory tree that match the pattern.

##### Arguments:

  | name    | description                                                                                                                   | example                                                                                                                                      |
  | ------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
  | pattern | a path pattern to one or more files or directories in your project. Keys that you wish to extract must be prefixed with `':'` | `"environment/:env/terraform.tfvars"`, `"infra/:env/:app"`, `"environment/:app/:env.tfvars"`, `":optional-parent?/:optional-child?/main.tf"` |

##### Returns:

A collection of matches in the current project. Results are returned with a map of extracted keys from the pattern. In addition, each result has two additional properties:

  * `_path` - the full path of that the pattern matched on
  * `_dir`  - the base directory that the pattern matched on

##### Example:

  <Tabs
defaultValue="template"
values={[
{label: 'Template usage', value: 'template'},
{label: 'Directory tree', value: 'tree'},
{label: 'Output', value: 'output'},
]}>
  <TabItem value="template">

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
  </TabItem>
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
  <TabItem value="output">

  ```yaml
  version: 0.1

  projects:
    - path: .
      name: dev
      terraform_var_files:
        - environment/dev/terraform.tfvars
    - path: .
      name: prod
      terraform_var_files:
        - environment/prod/terraform.tfvars
  ```
  </TabItem>
</Tabs>

---

#### `pathExists`

Returns true if the path exists within base.

##### Arguments

  | name | description                                                                                                       | example                           |
  | ---- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------- |
  | base | The directory to search for the given file or directory. Use `"."` to start from the project root.                | ".", "some/dir"                   |
  | path | The path of the file or directory to search for. This must be relative to the base path provided at argument one. | "dir/to/find", "file/to/find.txt" |

##### Example

  <Tabs
defaultValue="template"
values={[
{label: 'Template', value: 'template'},
{label: 'Directory tree', value: 'tree'},
{label: 'Output', value: 'output'},
]}>
  <TabItem value="template">

  ```gotemplate
  version: 0.1

  projects:
  {{- range $project := matchPaths "environment/:env/terraform.tfvars" }}
    {{- if pathExists $project._dir "include.txt" }}
    - path: .
      name: {{ $project.env }}
    {{- end }}
  {{- end }}
  ```
  </TabItem>
  <TabItem value="tree">

  ```shell
  ├── environment
  │     ├── dev
  │     │   ├── include.txt
  │     │   └── terraform.tfvars
  │     └── prod
  │         └── terraform.tfvars
  ├── infracost.yml.tmpl
  └── main.tf
  ```
  </TabItem>
  <TabItem value="output">

  ```yml
  version: 0.1
  projects:
    - path: .
      name: dev
  ```
  </TabItem>
</Tabs>

---

#### `isDir`

Returns true if the path is a directory.

##### Arguments

  | name | description       | example         |
  | ---- | ----------------- | --------------- |
  | path | The path to check | ".", "some/dir" |

##### Example
  <Tabs
defaultValue="template"
values={[
{label: 'Template', value: 'template'},
{label: 'Directory tree', value: 'tree'},
{label: 'Output', value: 'output'},
]}>
  <TabItem value="template">

  ```gotemplate
  version: 0.1

  projects:
  {{- range $project := matchPaths "environment/:env" }}
    {{- if isDir $project._path }}
    - path: $project._path
      name: {{ $project.env }}
    {{- end }}
  {{- end }}
  ```
  </TabItem>
  <TabItem value="tree">

  ```shell
  ├── environment
  │     ├── dev
  │     │   └── main.tf
  │     └── prod
  │     │   └── main.tf
  │     └── config.yml
  └── infracost.yml.tmpl
  ```
  </TabItem>
  <TabItem value="output">

  ```yml
  version: 0.1
  projects:
    - path: environment/dev
      name: dev
    - path: environment/prod
      name: prod
  ```
  </TabItem>
</Tabs>

---

#### `relPath`

Returns the relative path of the target path from the given base path.

This is useful for providing the correct relative path for shared variable files that exist outside of the project path.

##### Arguments

  | name   | description                                                        | example         |
  | ------ | ------------------------------------------------------------------ | --------------- |
  | base   | The base path that the resulting relative path is computed against | ".", "some/dir" |
  | target | The target path, relative to the repo root directory               | "global.tfvars" |

##### Example
  <Tabs
defaultValue="template"
values={[
{label: 'Template', value: 'template'},
{label: 'Directory tree', value: 'tree'},
{label: 'Output', value: 'output'},
]}>
  <TabItem value="template">

  ```gotemplate
  version: 0.1

  projects:
  {{- range $project := matchPaths "environment/:env" }}
    - path: $project._path
      name: {{ $project.env }}
      terraform_var_files:
        {{ relPath $project.path "global.tfvars" }}
  {{- end }}
  ```
  </TabItem>
  <TabItem value="tree">

  ```shell
  ├── environment
  │     ├── dev
  │     │   └── main.tf
  │     └── prod
  │         └── main.tf
  └── global.tfvars
  ```
  </TabItem>
  <TabItem value="output">

  ```yml
  version: 0.1
  projects:
    - path: environment/dev
      name: dev
      terraform_var_files:
        - ../../global.tfvars
    - path: environment/prod
      name: prod
        - ../../global.tfvars
  ```
  </TabItem>
</Tabs>

---

#### `base`

Returns the last element of path, for example:
- `base "full/path/here.txt"` returns `here.txt`
- `base "full/path"` returns `path`

---

#### `ext`

Returns the file name extension used by path, for example:
- `ext "full/path/here.txt"` returns `.txt`

---

#### `stem`

Returns the last element of path with the extension removed, for example:
- `stem "full/path/here.txt"` returns `here`

---

### Control flow functions

Config file templates support control flow functions including [`eq`](#eq), [`ne`](#eq) and [`not`](#not). Templates can also use the control flow functions `lt`, `le`, `gt`, `ge`, `and` and `or` from the base text/template library. The documentation for these additional functions can be [found here](https://pkg.go.dev/text/template#hdr-Functions).


#### `eq`

Returns the boolean truth of arg1 == arg2, for example:
- `eq $project.arg1 $project.arg2`

---

#### `ne`

Returns the boolean truth of arg1 != arg2, for example:
- `ne $project.arg1 $project.arg2`

---

#### `not`

Returns the boolean negation of its single argument, for example:
- `not (pathExists "path")`

---

### String Functions

Config file templates support for the following string manipulation functions [`startsWith`](#startswith), [`endsWith`](#endswith) and [`contains`](#contains). Templates can also use the string functions `print`, `printf` and `println` from the base text/template library. The documentation for these additional functions can be [found here](https://pkg.go.dev/text/template#hdr-Functions).


#### `startsWith`

Tests whether the string begins with prefix, for example:
- `startsWith "mystring" "my"` returns true
- `startsWith "mystring" "foo"` returns false

---

#### `endsWith`

Tests whether the string ends with suffix, for example:
- `endsWith "mystring" "string"` returns true
- `endsWith "mystring" "foo"` returns false

---

#### `contains`

Reports whether the substring is within the subject, for example:
- `contains "mystringbar" "string"` returns true
- `endsWith "mystringbar" "foo"` returns false

---
