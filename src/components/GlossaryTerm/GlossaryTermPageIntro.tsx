import React from "react";

const GlossaryTermPageIntro = ({ title }: { title: string }) => {
  return (
    <div className="intro">
      <div className="container glossary-search__intro-container">
        <h1 className="tagline">{title}</h1>
      </div>
    </div>
  );
};

export default GlossaryTermPageIntro;
