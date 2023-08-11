import React, { useState } from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';

const RequestDemoModal = ({ setModalVisible }) => {
  const backdropStyle = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    delay: 100,
  });

  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    delay: 100,
  });

  return (
    <animated.div className="finops-request-demo" style={backdropStyle}>
      <animated.div style={style} className="finops-request-demo__modal">
        <h3 className="finops-request-demo__modal-title">Request demo</h3>
        <p>
          Please contact{' '}
          <a href="mailto:hello@infracost.io" target="_blank">
            hello@infracost.io
          </a>{' '}
          to request a demo.
        </p>
        <div className="finops-request-demo__modal-close">
          <button className="button primary flat" onClick={() => setModalVisible(false)}>
            Close
          </button>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default RequestDemoModal;
