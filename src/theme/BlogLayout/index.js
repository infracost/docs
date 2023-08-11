/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Layout from '@theme/Layout';

function BlogLayout(props) {
  const { sidebar, toc, children, ...layoutProps } = props;
  return (
    <Layout {...layoutProps}>
      <div className={toc ? 'container blog-page' : 'blog-container'}>
        <main className={toc ? '' : 'blog-grid'} itemScope itemType="http://schema.org/Blog">
          {children}
        </main>
        {toc && <>{toc}</>}
      </div>
    </Layout>
  );
}

export default BlogLayout;
