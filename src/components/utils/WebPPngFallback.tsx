import React, { ReactElement } from 'react';

type WebPWrapperProps = {
  filePath: string;
  children: ReactElement;
};

const WebPPngFallback = (props: WebPWrapperProps) => (
  <picture>
    <source srcSet={`${props.filePath}.webp`} type="image/webp" />
    <source srcSet={`${props.filePath}.png`} type="image/png" />
    {props.children}
  </picture>
);

export default WebPPngFallback;
