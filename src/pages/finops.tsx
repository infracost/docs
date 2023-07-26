import React from "react";
import PageLayout from "../components/PageLayout";

const Finops = () => {
  return (
    <PageLayout
      title="Finops"
      description="Cloud costs, loved by developers"
      pageClass="finops default-page-bg"
      hideCTA={true}
      noIndex={false}
    >
      <div className="container finops-wrapper">this is finops page</div>
    </PageLayout>
  );
};

export default Finops;
