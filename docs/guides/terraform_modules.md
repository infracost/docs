---
slug: terraform_modules
title: Terraform modules
---

Infracost will include any modules that are included by `terraform plan` depending on the Terraform parameters you pass via `--terraform-plan-flags`. The `infracost breakdown` output will show the total cost based on the sum of the costs of the modules.

As an example, say you have a module that manages an EC2 instance and takes the instance type as an input. If you include the module like this:

```hcl
module "dev" {
  count = var.enable_dev ? 1: 0
  source   = "./ec2_module"
  instance_type = "m5.2xlarge"
}

module "prod" {
  count = var.enable_prod ? 1 : 0
  source   = "./ec2_module"
  instance_type = "m5.4xlarge"
}
```

And then pass `--terraform-plan-flags='-var=enable_prod=true'` to `infracost breakdown`, the output will show:

```
  Name                                         Quantity  Unit                 Monthly Cost

  module.prod[0].aws_instance.web_app
  ├─ Linux/UNIX usage (on-demand, m5.4xlarge)       730  hours                     $648.24
  └─ root_block_device
     └─ General Purpose SSD storage (gp2)            50  GB-months                   $5.80

  PROJECT TOTAL                                                                    $654.04
```

If you pass `--terraform-plan-flags='-var=enable_prod=true -var=enable_dev=true'` to `infracost breakdown` it will show the costs for both:

```
  Name                                         Quantity  Unit                 Monthly Cost

  module.dev[0].aws_instance.web_app
  ├─ Linux/UNIX usage (on-demand, m5.2xlarge)       730  hours                     $324.12
  └─ root_block_device
     └─ General Purpose SSD storage (gp2)            50  GB-months                   $5.80

  module.prod[0].aws_instance.web_app
  ├─ Linux/UNIX usage (on-demand, m5.4xlarge)       730  hours                     $648.24
  └─ root_block_device
     └─ General Purpose SSD storage (gp2)            50  GB-months                   $5.80

  PROJECT TOTAL                                                                    $983.96
```

To show a cost breakdown for each module individually, one workaround at the moment is to dynamically generate a [config file](/docs/features/config_file) using [this bash script](/docs/troubleshooting/#multi-projects) for an example of how to do this.
