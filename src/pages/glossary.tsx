import React from "react";
import PageLayout from "../components/PageLayout";
import GlossarySearch from "../components/GlossarySearch";

const Finops = () => {
  return (
    <PageLayout
      title="FinOps Glossary - Infracost"
      description="Glossary of FinOps terms and definitions."
      pageClass="finops default-page-bg"
      hideCTA={true}
      noIndex={false}
    >
      <GlossarySearch />
    </PageLayout>
  );
};

export default Finops;
