import React from 'react';
import { ColourCoding } from '../pages/products';

type PillProps = {
  children: String;
  colour: ColourCoding;
};

const Pill = (props: PillProps) => (
  <div className={`pill pill--${props.colour}`}>{props.children}</div>
);

export default Pill;
