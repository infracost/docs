import React from 'react';
import ReactMarkdown from 'react-markdown';
import { GlossaryTermType } from '../GlossarySearch';
import Cta from './Cta';

const GlossaryTermPageContent = ({ term }: { term: GlossaryTermType }) => (
  <div className="glossary-term__content">
    {term.sections?.map((section, index) => (
      <Section
        title={section.title}
        content={section.paragraphs}
        key={`${term.slug}-section-${index}}`}
      />
    ))}
    <Cta />
  </div>
);

const Section = ({ title, content }) => (
  <section>
    <h1>{title}</h1>
    <article>
      {content.map((paragraph, index) => (
        <ReactMarkdown key={index}>{paragraph}</ReactMarkdown>
      ))}
    </article>
  </section>
);

export default GlossaryTermPageContent;
