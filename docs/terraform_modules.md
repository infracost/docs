---
slug: /terraform_modules
title: Terraform modules
---

## Terraform modules

Infracost will include any modules that are included by `terraform plan` depending on the Terraform parameters you pass in. The output will show the total cost based on the sum of the costs of the modules.

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

And then pass `--tfflags='-var=enable_prod=true'` to Infracost, the output will show:

```
  NAME                                         MONTHLY QTY  UNIT       PRICE   HOURLY COST  MONTHLY COST

  module.prod[0].aws_instance.web_app
  ├─ Linux/UNIX usage (on-demand, m5.4xlarge)          730  hours      0.8880       0.8880      648.2400
  └─ root_block_device
     └─ General Purpose SSD storage (gp2)               50  GB-months  0.1160       0.0079        5.8000
  Total                                                                             0.8959      654.0400

  OVERALL TOTAL (USD)                                                               0.8959      654.0400
```

If you pass `--tfflags='-var=enable_prod=true -var=enable_dev=true'` to Infracost it will show the costs for both:

```
  NAME                                         MONTHLY QTY  UNIT       PRICE   HOURLY COST  MONTHLY COST

  module.dev[0].aws_instance.web_app
  ├─ Linux/UNIX usage (on-demand, m5.2xlarge)          730  hours      0.4440       0.4440      324.1200
  └─ root_block_device
     └─ General Purpose SSD storage (gp2)               50  GB-months  0.1160       0.0079        5.8000
  Total                                                                             0.4519      329.9200

  module.prod[0].aws_instance.web_app
  ├─ Linux/UNIX usage (on-demand, m5.4xlarge)          730  hours      0.8880       0.8880      648.2400
  └─ root_block_device
     └─ General Purpose SSD storage (gp2)               50  GB-months  0.1160       0.0079        5.8000
  Total                                                                             0.8959      654.0400

  OVERALL TOTAL (USD)                                                               1.3479      983.9600
```

To show a cost breakdown for each module individually, one workaround at the moment is to run Infracost multiple times with different inputs. The [`report_all.sh`](docs/report#bulk-run) bash script might be helpful.
