import React from 'react';
import PageLayout from '../components/PageLayout';
import FinopsSection from '../components/FinopsSection';

const Finops = () => (
  <PageLayout
    title="Proactive FinOps - Infracost"
    description="Cloud costs, loved by developers"
    pageClass="finops default-page-bg"
    hideCTA={true}
    noIndex={false}
  >
    <div className="finops-wrapper">
      <FinopsSection />
    </div>
  </PageLayout>
);

export default Finops;
