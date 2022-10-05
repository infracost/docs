import React, { ReactElement } from 'react';

import { ColourCoding } from '../../pages/products';
import Pill from './../Pill/Pill';

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
    alternate,
  } = props;

  return (
    <div
      className={`product-card ${alternate ? 'product-card--alternate' : ''}`}
    >
      <div className="product-card__body">
        <Pill colour={pillColourCoding}>{pillText}</Pill>
        <h1 className="product-card__tagline">{title}</h1>
        <div className="product-card__sub-tagline">
          <span className="product-card__sub-tagline--faded">Designed for</span>{' '}
          {designerFor}
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
        <div className="product-card__image-wrapper">{image}</div>
      </div>
    </div>
  );
};

export default ProductCard;
