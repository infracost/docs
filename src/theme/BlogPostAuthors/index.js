/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import BlogPostAuthor from '@theme/BlogPostAuthor';

export default function BlogPostAuthors({ authors, assets }) {
  const authorsCount = authors.length;

  if (authorsCount === 0) {
    return <></>;
  }

  return (
    <>
      {authors.map((author, idx) => (
        <BlogPostAuthor
          key={idx}
          author={{
            ...author,
            // Handle author images using relative paths
            imageURL: assets.authorsImageUrls[idx] ?? author.imageURL,
          }}
        />
      ))}
    </>
  );
}
