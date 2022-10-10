/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import { MDXProvider } from '@mdx-js/react';
import Translate, { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { usePluralForm } from '@docusaurus/theme-common';
import MDXComponents from '@theme/MDXComponents';
import EditThisPage from '@theme/EditThisPage';
import styles from './styles.module.css';
import TagsListInline from '@theme/TagsListInline';
import BlogPostAuthors from '@theme/BlogPostAuthors'; // Very simple pluralization: probably good enough for now

function useReadingTimePlural() {
  const { selectMessage } = usePluralForm();
  return (readingTimeFloat) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        {
          readingTime,
        }
      )
    );
  };
}

function BlogPostItem(props) {
  const readingTimePlural = useReadingTimePlural();
  const { withBaseUrl } = useBaseUrlUtils();
  const {
    children,
    frontMatter,
    assets,
    metadata,
    isBlogPostPage = false,
  } = props;
  const {
    date,
    formattedDate,
    permalink,
    tags,
    readingTime,
    title,
    editUrl,
    authors,
  } = metadata;
  const image = assets.image ?? frontMatter.image;
  const truncated = metadata.hasTruncateMarker;
  const truncatedPost = !isBlogPostPage && truncated;
  const tagsExists = tags.length > 0;

  const renderPostHeader = () => {
    const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
    return (
      <header className="blog-card__header">
        <TitleHeading className={styles.blogPostTitle} itemProp="headline">
          {isBlogPostPage ? (
            title
          ) : (
            <Link itemProp="url" to={permalink}>
              {title}
            </Link>
          )}
        </TitleHeading>
        <div className="blog-card__entry-info">
          <div className={`blog-card__entry-sub`}>
            <time dateTime={date} itemProp="datePublished">
              {formattedDate}
            </time>

            {typeof readingTime !== 'undefined' && (
              <>
                {' · '}
                {readingTimePlural(readingTime)}
              </>
            )}
          </div>
        </div>
      </header>
    );
  };

  return (
    <article
      className={!isBlogPostPage ? 'blog-card' : undefined}
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="blog-card__main-wrapper">
        {image && (
          <meta
            itemProp="image"
            content={withBaseUrl(image, {
              absolute: true,
            })}
          />
        )}

        {isBlogPostPage ? (
          <></>
        ) : (
          <div className="blog-card__image-wrapper">
            <img className="blog-card__img" src={`/${image}`} alt="" />
          </div>
        )}

        <div className="blog-card__main">
          {renderPostHeader()}
          <div className="markdown" itemProp="articleBody">
            <MDXProvider components={MDXComponents}>{children}</MDXProvider>
          </div>
        </div>
      </div>

      {(tagsExists || truncated) && (
        <footer
          className={clsx('blog-card__footer', {
            [styles.blogPostDetailsFull]: isBlogPostPage,
          })}
        >
          {tagsExists && (
            <div
              className={clsx('col', {
                'col--9': truncatedPost,
              })}
            >
              <TagsListInline tags={tags} />
            </div>
          )}

          {isBlogPostPage && editUrl && (
            <div className="col margin-top--sm">
              <EditThisPage editUrl={editUrl} />
            </div>
          )}

          {truncatedPost && (
            <>
              <BlogPostAuthors authors={authors} assets={assets} />

              <Link
                to={metadata.permalink}
                aria-label={`Read more about ${title}`}
                className="blog-card__footer-cta"
              >
                <b>
                  <Translate
                    id="theme.blog.post.readMore"
                    description="The label used in blog post item excerpts to link to full blog posts"
                  >
                    Read More
                  </Translate>
                </b>
              </Link>
            </>
          )}
        </footer>
      )}
    </article>
  );
}

export default BlogPostItem;
