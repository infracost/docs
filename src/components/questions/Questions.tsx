import React from 'react';
import SeparatorLine from '../SeparatorLine/SeparatorLine';

import './Questions.css';

const Questions = () => {
  const QuestionLi = ({ children }) => (
    <li className="question__li">{children}</li>
  );

  const Question = ({ children }) => (
    <span className="question__question">
      <SeparatorLine />
      {children}
    </span>
  );

  const Answer = ({ children }) => (
    <span className="question__answer">{children}</span>
  );

  return (
    <div className="questions">
      <h1 className="questions__tagline">Questions?</h1>
      <div className="questions__columns">
        <ul className="questions__column">
          <QuestionLi>
            <Question>Does Infracost support our custom price books?</Question>
            <Answer>
              Yes. You can enter custom discount levels into Infracost Cloud,
              and those will be used to estimate costs across all three
              products.
            </Answer>
          </QuestionLi>

          <QuestionLi>
            <Question>Do I need to purchase a plan now?</Question>
            <Answer>
              No. You can start with Infracost Open Source, start seeing cloud
              cost estimates for infrastructure changes in CI/CD within a few
              minutes, and then upgrade to using Infracost Cloud when ready. You
              also get a free trial when you start using Infracost Cloud.
            </Answer>
          </QuestionLi>

          <QuestionLi>
            <Question>
              Do I need a credit card to signup for the trial?
            </Question>
            <Answer>
              No. You only need to input credit card information after your
              trial, once you are ready to purchase a plan.
            </Answer>
          </QuestionLi>

          <QuestionLi>
            <Question>What happens at the end of my trial?</Question>
            <Answer>
              You can purchase a plan that is right for you and use Infracost
              Cloud, or keep using Infracost Open Source with no disruption for
              free.
            </Answer>
          </QuestionLi>
        </ul>

        <ul className="questions__column">
          <QuestionLi>
            <Question>Do you offer support for any of the products?</Question>
            <Answer>
              Yes. We offer community support for Infracost VS Code and
              Infracost Open Source (join our community Slack here). We also
              offer paid support for all products with SLAs, please reach out to
              us on hello@infracost.io for pricing details.
            </Answer>
          </QuestionLi>

          <QuestionLi>
            <Question>Do you provide onboarding / POC support?</Question>
            <Answer>
              Yes. We can help you get up and running, and run your POC. Reach
              out to us to discuss your customer requirements:
              hello@infracost.io
            </Answer>
          </QuestionLi>

          <QuestionLi>
            <Question>Do you offer self-hosting options?</Question>
            <Answer>
              You can self-host Infracost Open Source, but Infracost Cloud is
              currently only available through a SaaS subscription.
            </Answer>
          </QuestionLi>

          <QuestionLi>
            <Question>Is Infracost secure?</Question>
            <Answer>
              Infracost’s software is trusted by thousands of companies around
              the world, including many of the Fortune 500. We are open source,
              and you can see exactly what information is sent between our
              services. We are currently going through our SOC2 Type II
              certification. We are happy to complete your company’s security
              questionnaire as part of an enterprise onboarding / POC plan.
            </Answer>
          </QuestionLi>
        </ul>
      </div>
    </div>
  );
};

export default Questions;
