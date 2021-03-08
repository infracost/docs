---
slug: advanced_usage
title: Advanced usage
---

## TODO

Point to the Terraform directory using `--terraform-dir` and instruct Infracost to use the Terraform state file using `--terraform-use-state`. This implies that you have already run Terraform `init`, thus Infracost just runs Terraform `show`, which does not require cloud creds to be set. This method takes less time to run compared with method #1 and also works with remote state.

  ```shell
  terraform init

  infracost --terraform-dir /path/to/code --terraform-use-state
  ```


### 4. Terraform plan file

Point to the Terraform directory and use the Terraform plan. This implies that the user has already run Terraform `init`, thus Infracost just runs Terraform `show`, which does not require cloud creds to be set. This method works with remote state too.

  ```shell
  cd path/to/code
  terraform init
  terraform plan -out tfplan.binary .

  infracost --terraform-dir /path/to/code --terraform-plan-file tfplan.binary
  ```
