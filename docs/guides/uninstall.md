---
slug: uninstall
title: Uninstall Infracost
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To uninstall Infracost:

<Tabs
  defaultValue="macos-homebrew"
  values={[
    {label: 'macOS brew', value: 'macos-homebrew'},
    {label: 'macOS/Linux manual', value: 'macos-linux-manual'},
    {label: 'Windows chocolatey', value: 'windows-chocolatey'},
]}>
  <TabItem value="macos-homebrew">

  ```shell
  brew uninstall infracost
  ```

  </TabItem>
  <TabItem value="macos-linux-manual">

  ```shell
  rm -rf /usr/local/bin/infracost
  ```

  </TabItem>
  <TabItem value="windows-chocolatey">

  ```shell
  choco uninstall infracost
  ```

  </TabItem>
</Tabs>
