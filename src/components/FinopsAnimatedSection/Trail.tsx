import React, { ReactElement } from "react";
import { useTrail, a } from "@react-spring/web";

const Trail: React.FC<{ children: ReactElement[] }> = ({ children }) => {
  // trail
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: 1,
    height: 50,
    from: { opacity: 0, height: 0 },
  });

  return (
    <div className="finops-trail">
      {trail.map(({ height }, index) => (
        <a.div key={index}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

export default Trail;
