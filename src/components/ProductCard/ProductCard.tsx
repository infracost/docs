import React, { ReactElement } from 'react';

import { ColourCoding } from '../../pages/products';
import Pill from './../Pill';

import './ProductCard.css';

type ProductProps = {
  title: string;
  designerFor: string;
  image: ReactElement;
  children?: ReactElement;
  pillText: string;
  pillColourCoding: ColourCoding;
  ctaText: string;
  ctaLink: string;
  targetBlank?: boolean;
  alternate?: boolean;
};

const ProductCard = (props: ProductProps) => {
  const {
    title,
    designerFor,
    image,
    children,
    pillText,
    pillColourCoding,
    ctaText,
    ctaLink,
    targetBlank,
  } = props;

  return (
    <div className="product-card">
      <div className="product-card__body">
        <Pill colour={pillColourCoding}>{pillText}</Pill>
        <h3>{title}</h3>
        <div>
          <span>Designed for</span> {designerFor}
        </div>
        {children}
        <a
          href={ctaLink}
          className="button primary"
          target={targetBlank ? '_blank' : ''}
        >
          {ctaText}
        </a>
      </div>
      <div className="product-card__image">
        <div className="screenshot">
          <div className="image-wrapper">{image}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
