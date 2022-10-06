import React, { ReactElement } from 'react';

import { ColourCoding } from '../../pages/products';
import SeparatorLine from '../SeparatorLine/SeparatorLine';
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
  imgBgColor?: string;
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
    imgBgColor,
  } = props;

  return (
    <div
      className={`product-card ${alternate ? 'product-card--alternate' : ''}`}
    >
      <div className="product-card__body">
        <Pill colour={pillColourCoding}>{pillText}</Pill>
        <h1 className="product-card__tagline">{title}</h1>
        <div className="product-card__sub-tagline">
          <span>👩&zwj;💻</span> Designed for
          <span className="product-card__sub-tagline--strong">
            {designerFor}
          </span>
        </div>
        <SeparatorLine />
        {children}
        <div className="product-card__cta-wrapper">
          <a
            href={ctaLink}
            className="button primary"
            target={targetBlank ? '_blank' : ''}
          >
            {ctaText}
          </a>
        </div>
      </div>
      <div className="product-card__image">
        <div
          className="product-card__image-wrapper"
          style={imgBgColor ? { backgroundColor: imgBgColor } : {}}
        >
          {image}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
