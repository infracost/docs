import React from 'react';
import { GlossaryTermType } from './index';
import './GlossaryCard.css';
import ArrowIcon from '../icons/ArrowIcon';

const GlossaryTerm = ({ term }: { term: GlossaryTermType }) => (
  <div className="glossary-term__card">
    <div>
      <div className="glossary-term__card-header">
        <h2 className="glossary-term__card-title">{term.termTitle}</h2>
      </div>

      <div className="glossary-term__card-description">{term.definition}</div>
    </div>

    {term.slug && (
      <a
        href={`/glossary/${term.slug}`}
        className="glossary-term__card-link"
        rel="noopener noreferrer"
      >
        More about {term.termTitle}
        <ArrowIcon />
      </a>
    )}
  </div>
);
export default GlossaryTerm;
