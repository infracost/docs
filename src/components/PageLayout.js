import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LayoutProviders from '@theme/LayoutProviders';
import LayoutHead from '@theme/LayoutHead';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '../components/Navbar';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

function PageLayout({ title, description, pageClass, children, hideCTA, noIndex }) {
  return (
    <HelmetProvider>
      <LayoutProviders>
        <LayoutHead
          title={title}
          description={description} />

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

        {!hideCTA && (<CTA />)}
        <Footer />
      </LayoutProviders>
    </HelmetProvider>
  );
}

export default PageLayout;
