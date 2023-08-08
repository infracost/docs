import React from "react";
import PageLayout from "../components/PageLayout";
import GlossarySearch from "../components/GlossarySearch/GlossarySearch";

const Finops = () => {
  return (
    <PageLayout
      title="FinOps Glossary - Infracost"
      description="Cloud costs, loved by developers"
      pageClass="finops default-page-bg"
      hideCTA={true}
      noIndex={false}
    >
      <GlossarySearch />
    </PageLayout>
  );
  g;
};

export default Finops;
