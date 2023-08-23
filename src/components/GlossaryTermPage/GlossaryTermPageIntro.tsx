import React from 'react';
import BackButton from '../BackButton';

const GlossaryTermPageIntro = ({
  title,
  toPath,
  toText,
}: {
  title: string;
  toPath: string;
  toText: string;
}) => (
  <>
    <div className="intro">
      <div className="glossary-search__intro-container">
        <h1 className="tagline">{title}</h1>
      </div>
    </div>
    <div className="white-bg">
      <div className="container intro__back-button">
        <BackButton toPath={toPath} toText={toText} />
      </div>
    </div>
  </>
);

export default GlossaryTermPageIntro;
