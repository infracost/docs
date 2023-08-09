import React from "react";
import PageLayout from "../../components/PageLayout";
import GlossaryTermPageIntro from "../../components/GlossaryTerm/GlossaryTermPageIntro";
import GlossaryTermPage from "../../components/GlossaryTerm/GlossaryTermPage";
import terms from "../../components/GlossarySearch/glossaryTerms.json";
import GlossaryTermPageAside from "../../components/GlossaryTerm/GlossaryTermPageAside";
import GlossaryTermPageContent from "../../components/GlossaryTerm/GlossaryTermPageContent";

const Finops = () => {
  const finops = terms.filter((term) => term.key === "FinOps")[0];

  return (
    <PageLayout
      title="FinOps - Infracost Glossary"
      description="Cloud costs, loved by developers"
      pageClass="finops default-page-bg"
      hideCTA={true}
      noIndex={false}
    >
      <GlossaryTermPageIntro title=" FinOps: Bridging Finance and Operations in the Cloud Era" />

      <GlossaryTermPage>
        <GlossaryTermPageContent term={finops} />
        <GlossaryTermPageAside term={finops} />
      </GlossaryTermPage>
    </PageLayout>
  );
};

export default Finops;
