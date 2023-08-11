import React from 'react';
import { GlossaryTermType } from '../GlossarySearch';
import Cta from './Cta';

const GlossaryTermPageContent = ({ term }: { term: GlossaryTermType }) => (
  <div className="glossary-term__content">
    {term.sections?.map((section, index) => (
      <Section
        title={section.title}
        content={section.paragraphs}
        key={`${term.key}-section-${index}}`}
      />
    ))}
    <Cta />
  </div>
);

const Section = ({ title, content }) => (
  <section>
    <h3>{title}</h3>
    <article>
      {content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </article>
  </section>
);

export default GlossaryTermPageContent;
