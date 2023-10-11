import React from 'react';
import { GlossaryTermType } from '../GlossarySearch';
import OpenBookIcon from '../icons/OpenBookIcon';

const glossaryPrefix = '/docs/img/glossary';
const vendorPrefix = '/docs/img/services';

const GlossaryTermPageAside = ({ term }: { term: GlossaryTermType }) => (
  <aside className="glossary-term__aside">
    <div className="glossary-term__aside-img-container">
      <img
        className="glossary-term__aside-img"
        src={term.imgUrl ? `${vendorPrefix}/${term.imgUrl}` : `${glossaryPrefix}/infra.svg`}
        alt="logo"
      />
      <div className="glossary-term__aside-def">
        <OpenBookIcon />
        <span>Definition</span>
      </div>
    </div>
    <div className="glossary-term__aside-content">
      <h3 className="glossary-term__header">{term.termTitle}</h3>
      <span className="glossary-term__definition">{term.definition}</span>
    </div>
  </aside>
);

export default GlossaryTermPageAside;
