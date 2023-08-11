import React, { ReactElement } from 'react';
import { animated, useSpring } from '@react-spring/web';
import ScrollPrompt from './ScrollPrompt';

const Section = ({ content, delay }) => {
  const animation = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(-30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    delay,
  });

  return (
    <animated.div style={animation} className="finops-hero__section">
      {content}
    </animated.div>
  );
};

const Hero = () => {
  const sections: ReactElement[] = [
    <>
      <h2 className="finops-hero-item">Shift cloud cost left</h2>
      <h2 className="finops-hero-item finops-hero-item__plus">+</h2>
    </>,
    <>
      <h2 className="finops-hero-item">Directly in engineering workflow</h2>
      <h2 className="finops-hero-item finops-hero-item__plus">+</h2>
    </>,
    <>
      <h2 className="finops-hero-item">Before resources are launched</h2>
      <h2 className="finops-hero-item finops-hero-item__plus">=</h2>
    </>,
    <>
      <h2 className="finops-hero-item">
        <span className="finops-hero-item finops-hero-item__highlight">Proactive FinOps</span>
      </h2>
    </>,
  ];

  return (
    <>
      <div className="finops-hero">
        <>
          <div id="hero-wrapper">
            {sections.map((section, index) => (
              <Section key={index} content={section} delay={index * 300} />
            ))}
          </div>
        </>
      </div>
      <ScrollPrompt />
    </>
  );
};

export default Hero;
