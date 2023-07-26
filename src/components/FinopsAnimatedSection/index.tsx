import React, { useRef } from "react";

import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import Trail from "./Trail";

const url = (name: string, wrap = false) =>
  `${wrap ? "url(" : ""}/img/finops/${name}.svg${wrap ? ")" : ""}`;

const Index = () => {
  const parallax = useRef<IParallax>(null!);

  return (
    <Parallax ref={parallax} pages={2}>
      {/* main background */}
      <ParallaxLayer
        offset={0}
        speed={0}
        factor={3}
        style={{
          backgroundImage: url("stars", true),
          backgroundSize: "cover",
        }}
      />

      {/* details */}
      <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
        {/* bg */}
      </ParallaxLayer>

      <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
        {/* bg */}
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
        {/* bg */}
      </ParallaxLayer>

      <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
        {/* bg */}
      </ParallaxLayer>

      <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
        {/* bg */}
      </ParallaxLayer>

      {/* PAGE ONE */}

      <ParallaxLayer
        offset={0}
        speed={0.1}
        onClick={() => parallax.current.scrollTo(1)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Trail>
          <h2 className="finops-trail-item">Shift Cloud cost left</h2>
          <h2 className="finops-trail-item finops-trail-item__plus">+</h2>
          <h2 className="finops-trail-item">
            Directly in engineering workflow
          </h2>
          <h2 className="finops-trail-item finops-trail-item__plus">+</h2>
          <h2 className="finops-trail-item">Before resources are launched</h2>
          <img
            src="/img/finops/arrow-down.svg"
            alt="Arrow down"
            className="finops-trail-item finops-trail-item__arrow"
          />
          <h2 className="finops-trail-item finops-trail-item--highlight">
            Proactive finops
          </h2>
        </Trail>
      </ParallaxLayer>

      {/* PAGE TWO */}

      <ParallaxLayer
        offset={1}
        speed={0.1}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => parallax.current.scrollTo(0)}
      >
        <img src={url("bash")} style={{ width: "40%" }} />
      </ParallaxLayer>

      {/* PAGE THREE */}
    </Parallax>
  );
};

export default Index;
