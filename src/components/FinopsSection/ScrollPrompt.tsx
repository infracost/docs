import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const ScrollPrompt = () => {
  const styles = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    delay: 2000,
  });

  return (
    <animated.div className="finops-scroll-prompt" style={styles}>
      <img src="/docs/img/finops/scroll-more.svg" alt="Scroll down" />
    </animated.div>
  );
};
export default ScrollPrompt;
