import React from "react";
import PageLayout from "../components/PageLayout";
import FinopsAnimatedSection from "../components/FinopsAnimatedSection";

const Finops = () => {
  return (
    <PageLayout
      title="Finops"
      description="Cloud costs, loved by developers"
      pageClass="finops default-page-bg"
      hideCTA={true}
      noIndex={false}
    >
      <div className="container finops-wrapper">
        <div className="finops-cta__wrapper">
          <a className="button primary">Request live demo</a>
        </div>
        <FinopsAnimatedSection />
      </div>
    </PageLayout>
  );
};

export default Finops;
