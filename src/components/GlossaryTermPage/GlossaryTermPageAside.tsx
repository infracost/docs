import React from 'react';
import { GlossaryTermType } from '../GlossarySearch';
import OpenBookIcon from '../icons/OpenBookIcon';

const imgUrlPrefix = '/img/glossary/';

const GlossaryTermPageAside = ({ term }: { term: GlossaryTermType }) => (
  <aside className="glossary-term__aside">
    <div className="glossary-term__aside-img-container">
      <img
        className="glossary-term__aside-img"
        src={term.imgUrl ? `${imgUrlPrefix}/${term.imgUrl}` : `${imgUrlPrefix}/generic.png`}
        alt=""
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
