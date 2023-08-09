import React, { ReactElement } from "react";

const GlossaryTermPage = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  return <main className="container glossary-term__page">{children}</main>;
};

export default GlossaryTermPage;
