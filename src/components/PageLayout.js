import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LayoutProvider from '@theme/Layout/Provider';
import { PageMetadata } from '@docusaurus/theme-common';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from './Navbar';
import CTA from './CTA';
import Footer from './Footer';

function PageLayout({ title, description, pageClass, children, hideCTA, noIndex }) {
  return (
    <HelmetProvider>
      <LayoutProvider>
        <PageMetadata title={title} description={description} />

        {noIndex && (
          <Helmet>
            <meta name="robots" content="noindex" />
          </Helmet>
        )}

        <AnnouncementBar />

        <div className={pageClass}>
          <Navbar />
          {children}
        </div>

        {!hideCTA && <CTA />}
        <Footer />
      </LayoutProvider>
    </HelmetProvider>
  );
}

export default PageLayout;
