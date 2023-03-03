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
            <Question>How do you count seats?</Question>
            <Answer>
              Once you integrate Infracost into your CI/CD workflow, when a Pull Request (PR) is opened, the author of the PR comes through to Infracost Cloud. At the end of the month we count how many unique PR authors you have, and add any seats needed for Infracost Cloud users. That’s the number of seats you will require.
            </Answer>
          </QuestionLi>

          <QuestionLi>
            <Question>We need a lot of seats, do you provide discounts?</Question>
            <Answer>
              If you require a bundle of seats, please Contact us on hello@infracost.io, and we can discuss custom requirements.
            </Answer>
          </QuestionLi>

          <QuestionLi>
            <Question>
              I don’t know how many seats I need, can you help?
            </Question>
            <Answer>
              Yes, we can provide you with a script that you can run on your repositories to give you the count of seats that you might need, based on the last 30 days. Contact us on hello@infracost.io.
            </Answer>
          </QuestionLi>

          <QuestionLi>
            <Question>Do I need a credit card to signup for the trial?</Question>
            <Answer>
              No. You only need to input credit card information after your trial, once you are ready to purchase a plan.
            </Answer>
          </QuestionLi>

          <QuestionLi>
            <Question>What purchase options do you offer?</Question>
            <Answer>
              We offer the option to purchase Infracost on a monthly or annual subscription basis. If you require many seats and would like to discuss pricing, please contact us on hello@infracost.io
            </Answer>
          </QuestionLi>

        </ul>

        <ul className="questions__column">
          <QuestionLi>
            <Question>What happens if I exceed the number of seats?</Question>
            <Answer>
              We have a lenient policy. If you go over the number of seats in a month, that’s ok, everything will still work as expected. If you constantly go over your seat numbers, or require more seats, we can always add more to your purchase.
            </Answer>
          </QuestionLi>

          <QuestionLi>
            <Question>Can I purchase Infracost via the AWS Marketplace?</Question>
            <Answer>
              Yes. Contact us on hello@infracost.io, and we will make Infracost available in your AWS accounts to be purchased from the AWS Marketplace.
            </Answer>
          </QuestionLi>

          <QuestionLi>
            <Question>Do you hold my credit card information?</Question>
            <Answer>
              No, we use <a href="https://stripe.com/">Stripe.com</a> for our payments, and they hold all payment information.
            </Answer>
          </QuestionLi>

          <QuestionLi>
            <Question>How does the Infracost free trial work?</Question>
            <Answer>
              You can use Infracost Cloud fully featured for 14 days. After that, you will be prompted to purchase the required number of seats. If you need more time on the trial, please contact us on hello@infracost.io
            </Answer>
          </QuestionLi>

          <QuestionLi>
            <Question>Is my data safe?</Question>
            <Answer>
              Infracost's software is trusted by thousands of companies around
              the world, including many of the Fortune 500. We are open source,
              and you can see exactly what information is sent between your services and Infracost Cloud.
              We are also SOC2 Type II certified. We are happy to complete your company's security
              questionnaire as part of an enterprise onboarding / POC plan.
            </Answer>
          </QuestionLi>

          <QuestionLi>
            <Question>Do you offer support for any of the products?</Question>
            <Answer>
              Yes. We offer community support for Infracost VS Code and Infracost CI/CD (join our <a href="https://www.infracost.io/community-chat">community Slack</a>). We also offer paid support for all products with SLAs, please reach out to us on hello@infracost.io for pricing details.
            </Answer>
          </QuestionLi>
        </ul>
      </div>
    </div>
  );
};

export default Questions;
