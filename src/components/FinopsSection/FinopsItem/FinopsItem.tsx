import React, { ReactElement } from "react";

import SeparatorLine from "../../SeparatorLine/SeparatorLine";

import "./FinopsItem.css";

type FinopsProps = {
  title: string;
  image: ReactElement;
  children?: ReactElement;
  alternate?: boolean;
};

const FinopsItem = (props: FinopsProps) => {
  const { title, image, children, alternate } = props;

  return (
    <div className={`finops-card ${alternate ? "finops-card--alternate" : ""}`}>
      <div className="finops-card__body">
        <h1 className="finops-card__tagline">{title}</h1>
        <SeparatorLine />
        {children}
      </div>
      <div className="finops-card__image">
        <div className="finops-card__image-wrapper">{image}</div>
      </div>
    </div>
  );
};

export default FinopsItem;
