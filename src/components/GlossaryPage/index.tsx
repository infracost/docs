import React from 'react';
import PageLayout from '../PageLayout';
import GlossaryTermPageIntro from '../GlossaryTermPage/GlossaryTermPageIntro';
import GlossaryTermPage from '../GlossaryTermPage';
import terms from '../GlossarySearch/glossaryTerms.json';
import GlossaryTermPageAside from '../GlossaryTermPage/GlossaryTermPageAside';
import GlossaryTermPageContent from '../GlossaryTermPage/GlossaryTermPageContent';

const Term = ({ slug }: { slug: string }) => {
  const term = terms.filter((term) => term.slug === slug)[0];

  if (!term) {
    return null;
  }

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
