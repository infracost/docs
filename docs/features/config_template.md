---
slug: config_template
title: Config template
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost config templates allow users to create complex Infracost [configuration files](/docs/features/config_file) using a powerful templating language. These templates are built on top of Golang's [text template](https://pkg.go.dev/text/template) engine, which provides a flexible and extensible way to generate configuration files.

Importantly, Infracost config templates allow you to keep Infracost in sync with your team's changing infrastructure, without having to constantly maintaining or adding new YAML configuration.

If you're already familiar with [Helm templates](https://helm.sh/docs/chart_template_guide/getting_started/), you'll find that working with Infracost templates is straightforward and intuitive.

## Example

An infrastructure project for a simple application has the following directory structure:

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

`main.tf` is the root Terraform module for the project. It has a number of variables that define how the application runs in different environments, for example:

```hcl title="main.tf"
variable "instance_type" {
  type = "string"
  description = "the instance type to use for the worker node group"
}
```

Input variables are provided to Terraform by variable files stored under the `environment` folder. Each file corresponds to a different environment for the application. Environments are often added and removed by different teams. For example the `sandbox-platform` environment is due to be added next week.

The `dev`, `staging` and `prod` environments are all active, however the `legacy` environment is no longer active and has been removed last month.

An Infracost config template to support this application would look like so:

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

and generate the following `YAML`:

```yaml
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
```

With this config template, we'll now get cost estimates for all the current environments in the application, without having write lots of duplicate YAML. Furthermore, this template tracks additional environments moving forward, so when the `sandbox-platform` environment is released next week, we don't have to change anything 🚀!

## Language tour

Infracost config templates, like [Helm templates](https://helm.sh/), are built on top of Golang's [text/template](https://pkg.go.dev/text/template) engine, offering an expressive way to write templates. Infracost config templates offer all the syntax and functionality of the `text/template` library as well as some additional functions.

Below we'll give a quick introduction into the templating syntax, with brief explanation of the main expressions and logic. This should be enough to get started with Infracost config templates. If wish to read further about the base templating language we recommend reviewing golang's text/template [package documentation](https://pkg.go.dev/text/template). Additionally, Helm's guide to [control flow](https://helm.sh/docs/chart_template_guide/control_structures/) provides a good overview of the base language.

### Syntax

Templates use a pair of curly braces `{{ }}` to delimit actions, such as `variables`, `if/else` statements, and `range` iterations. Within the curly braces, Infracost can recognize and execute template actions.

For example, `{{ $project.name }}` would print the value of the `$project.name`, while 

```gotemplate
{{ if .Enabled }}
  Enabled
{{ else }}
  Disabled
{{ end }}
```

would execute conditional logic based on the value of the `Enabled` field in the current context. 

### `if/else`

Conditional logic can be added to templates using the `{{ if }}`, `{{ else if }}`, and `{{ else }}` keywords. For example

```gotemplate
{{ if .Enabled }}
  Enabled
{{ else }}
  Disabled
{{ end }}
```

would print `"Enabled"` if the `Enabled` field in the current context is true, and `"Disabled"` otherwise. This can be useful to conditionally include projects for Infracost to evaluate, for example:

```gotemplate
{{ if ne $project.name "test" }}
  - path: .
    ...
{{ end }}
```

adds a configuration entry for the current project if it does not equal "test".

### `range`

Templates can iterate over arrays and maps using the `{{ range }}` keyword. For example:

```
{{ range .Items }}
  {{ .Name }}
{{ end }}
```

would print the value of the `Name` field for each item in the `Items` array in the current context. Within Infracost config templates `range` expressions are normally combined with [`matchPaths`](#matchpaths) calls to iterate over a subset of directories or files, for example: 

```gotemplate
{{- range $project := matchPaths "environment/:env/terraform.tfvars" }}
  - path: .
    name: {{ $project.env }}
{{- end }}
```

sets successive elements returned from [`matchPaths`](#matchpaths) to `$project`, which can be accessed inside the `range` loop, e.g. `$project.env`


## Functions

Infracost config templates support a wide range of built in functions to make it easy for you to write config files that work for your project structure. Below you'll find a list of supported functions with detailed examples.

## Filepath functions

Infracost config templates include [`matchPaths`](#matchpaths), [`pathExists`](#pathexists), [`base`](#base), [`ext`](#ext) and [`stem`](#stem) functions to help you traverse your project structure.

### `matchPaths`

returns a list of matches that in the project directory tree that match the pattern.

#### Arguments

| name    | description                                                                                                                   | example                                                                                      |
|---------|-------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| pattern | a path pattern to one or more files or directories in your project. Keys that you wish to extract must be prefixed with `':'` | `"environment/:env/terraform.tfvars"`, `"infra/:env/:app"`, `"environment/:app/:env.tfvars"` |

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
| base | The directory to search for the given file or directory. Use `"."` to start from the project root.                | "." "some/dir"                    |
| path | The path of the file or directory to search for. This must be relative to the base path provided at argument one. | "dir/to/find"  "file/to/find.txt" |

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
      {{- if pathExists $project._dir "include.txt")
      - path: .
        name: {{ $project.env }}
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

Infracost config templates support control flow functions including [`eq`](#eq), [`ne`](#eq) and [`not`](#not). Templates can also use the control flow functions `lt`, `le`, `gt`, `ge`, `and` and `or` from the base text/template library. The documentation for these additional functions can be [found here](https://pkg.go.dev/text/template#hdr-Functions).

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

Infracost config templates support for the following string manipulation functions [`startsWith`](#startswith), [`endsWith`](#endswith) and [`contains`](#contains). Templates can also use the string functions `print`, `printf` and `println` from the base text/template library. The documentation for these additional functions can be [found here](https://pkg.go.dev/text/template#hdr-Functions).


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
