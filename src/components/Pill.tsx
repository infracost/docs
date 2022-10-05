import React from 'react';
import { ColourCoding } from '../pages/products';

type PillProps = {
  text: string;
  colour: ColourCoding;
};

const Pill = (props: PillProps) => (
  <div className={`pill pill--${props.colour}`}>{props.text}</div>
);

export default Pill;
