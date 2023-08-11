import React, { ReactElement } from "react";

import "./GlossaryTermPage.css";

const GlossaryTermPage = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  return (
    <main className="white-bg">
      <div className="glossary-term__page container">{children}</div>
    </main>
  );
};

export default GlossaryTermPage;
