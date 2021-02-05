import React from 'react';
import LayoutProviders from '@theme/LayoutProviders';
import LayoutHead from '@theme/LayoutHead';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '../components/Navbar';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

function PageLayout({ title, description, pageClass, children}) {
  return (
    <LayoutProviders>
      <LayoutHead
        title={title}
        description={description} />

      <AnnouncementBar />

      <div className={pageClass}>
        <Navbar />
        {children}
      </div>

      <CTA />
      <Footer />
    </LayoutProviders>
  );
}

export default PageLayout;
