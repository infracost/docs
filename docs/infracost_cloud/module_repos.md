---
slug: module_repos
title: Module Repos
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Module Repos

Terraform modules are reusable components that encapsulate a set of resources and their configuration. They allow you to create logical abstractions on top of resource sets, making your infrastructure code more organized, maintainable, and shareable. Modules can be sourced from various locations including local paths, Git repositories, the Terraform Registry, or other remote sources.

## Cost Tracking for Modules

### Module Repositories

Cost tracking is **not applied** to repositories that contain only Terraform module definitions (i.e., repositories without a root configuration or provider definitions). This is because modules by themselves don't represent deployable infrastructure, they are templates that need to be instantiated by a root configuration.

### Root Configurations Using Modules

Cost tracking **is applied** to repositories that use modules in their root configurations. When Infracost analyzes these repositories, it:

- Evaluates the module calls and their input variables
- Calculates costs for all resources defined within the referenced modules
- Provides cost estimates for the complete infrastructure stack, including module-defined resources

This approach ensures that cost estimates are generated where infrastructure is actually deployed, rather than where it's merely defined.

## Mixed-Mode Modules

Mixed-mode modules are Terraform modules that contain both:
- A module definition (reusable components)
- A root configuration with provider definitions

This pattern is particularly useful when you want to:
- Provide working examples or templates for developers
- Demonstrate typical usage patterns of your module
- Offer a ready-to-deploy configuration alongside the reusable module

### Cost Tracking for Mixed-Mode Modules

For mixed-mode modules, cost tracking **will be applied** because the presence of a root configuration with providers makes the repository deployable. This enables several benefits:

- **Cost Communication**: Share estimated or typical costs when using the module
- **Example Validation**: Ensure your example configurations are cost-effective
- **Template Guidance**: Help users understand the financial impact before adopting the module

The cost estimates generated for mixed-mode modules serve as valuable documentation, helping teams make informed decisions about module adoption and usage patterns.

### Best Practices

When creating mixed-mode modules:

1. **Separate Concerns**: Keep your module definition clean and separate from the example/template configuration
2. **Realistic Examples**: Ensure your root configuration represents realistic usage scenarios
3. **Variable Defaults**: Provide sensible defaults that reflect typical deployments
