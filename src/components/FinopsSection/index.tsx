import React, { useRef } from "react";

import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import Hero from "./Hero";
import FinopsItem from "./FinopsItem/FinopsItem";
import LiWithCheck from "../LiWithCheck";

const url = (name: string, wrap = false) =>
  `${wrap ? "url(" : ""}/img/finops/${name}${wrap ? ")" : ""}`;

const Index = () => {
  const parallax = useRef<IParallax>(null!);

  const items = [
    <Hero />,
    <FinopsItem
      title="Enforce tagging policies directly in code"
      image={<img src={url("code.svg")} alt="" />}
    >
      <ul>
        <LiWithCheck>
          Be notified when an incoming change will break the budget
        </LiWithCheck>
        <LiWithCheck>Take action before money has been spent</LiWithCheck>
        <LiWithCheck>
          Kick off approval workflows for budget increases
        </LiWithCheck>
      </ul>
    </FinopsItem>,
    <FinopsItem
      title="See the future"
      image={<img src={url("crystal-ball.svg")} alt="" />}
      alternate={true}
    >
      <ul>
        <LiWithCheck>See cloud cost increases before it happens</LiWithCheck>
        <LiWithCheck>
          See the cost impact of each Jira issue before shipping
        </LiWithCheck>
        <LiWithCheck>
          Integrate estimates and forecasts into your own FinOps dashboards
        </LiWithCheck>
      </ul>
    </FinopsItem>,
    <FinopsItem
      title="Alert on budget breaking changes before breaking the budget"
      image={<img src={url("chart.svg")} alt="" />}
    >
      <ul>
        <LiWithCheck>
          Be notified when an incoming change will break the budget
        </LiWithCheck>
        <LiWithCheck>Take action before money has been spent</LiWithCheck>
        <LiWithCheck>
          Kick off approval workflows for budget increases
        </LiWithCheck>
      </ul>
    </FinopsItem>,

    <FinopsItem
      title="Ensure best practice cost policies are followed"
      image={<img src={url("best-practices.svg")} alt="" />}
      alternate={true}
    >
      <ul>
        <LiWithCheck>
          Live status of all policies, and resources which pass and fail
        </LiWithCheck>
        <LiWithCheck>
          Keep up to date with the latest best practices, built into workflows
        </LiWithCheck>
        <LiWithCheck>Build your own best practices to be monitored</LiWithCheck>
      </ul>
    </FinopsItem>,
  ];

  const params = [
    { offset: 0, speed: 0.2 },
    { offset: 0.75, speed: 0.1 },
    { offset: 1.2, speed: 0.2 },
    { offset: 1.8, speed: 0.3 },
    { offset: 2.1, speed: 0.2 },
  ];

  return (
    <>
      <div id="finops-parallax">
        <Parallax ref={parallax} pages={3}>
          {/* main background */}
          <ParallaxLayer
            offset={0}
            speed={0}
            factor={3}
            style={{
              backgroundImage: url("stars.svg", true),
              backgroundSize: "cover",
            }}
          />

          {items.map((item, index) => (
            <ParallaxLayer
              offset={params[index].offset}
              speed={params[index].speed}
              key={index}
              style={{
                padding: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: `${index} + 1`,
              }}
            >
              {item}
            </ParallaxLayer>
          ))}
        </Parallax>
      </div>
      <div id="finops-mobile">
        {items.map((item, index) => (
          <div key={index} className="finops-mobile-item">
            {item}
          </div>
        ))}
      </div>
    </>
  );
};

export default Index;
