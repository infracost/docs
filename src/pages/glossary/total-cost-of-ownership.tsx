import React from 'react';
import PageLayout from '../../components/PageLayout';
import GlossaryTermPageIntro from '../../components/GlossaryTermPage/GlossaryTermPageIntro';
import GlossaryTermPage from '../../components/GlossaryTermPage';
import terms from '../../components/GlossarySearch/glossaryTerms.json';
import GlossaryTermPageAside from '../../components/GlossaryTermPage/GlossaryTermPageAside';
import GlossaryTermPageContent from '../../components/GlossaryTermPage/GlossaryTermPageContent';

const Term = () => {
  const term = terms.filter((term) => term.slug === 'total-cost-of-ownership')[0];

  return (
    <PageLayout
      title={`${term.termTitle} - Infracost Glossary`}
      description={term.pageTitle}
      pageClass="glossary-term__page"
      hideCTA={true}
      noIndex={false}
    >
      <GlossaryTermPageIntro title={term.pageTitle} toPath="/glossary" toText="FinOps Glossary" />
      <GlossaryTermPage>
        <GlossaryTermPageContent term={term} />
        <GlossaryTermPageAside term={term} />
      </GlossaryTermPage>
    </PageLayout>
  );
};

export default Term;
