import React from 'react';
import PageLayout from '../components/PageLayout';
import Check from '../components/icons/Check';

function UseCases() {
  return (
    <PageLayout
      title="Use Cases"
      description="Infracost is trusted by organizations worldwide to increase cost visibility for engineering teams, and to implement proactive cloud cost policies. Explore  the use cases to learn more."
      pageClass="use-cases default-page-bg"
    >
      <div className="use-cases-background"></div>

      <div className="use-cases-wrapper">
        <div className="intro">
          <div className="container">
            <h1 className="tagline">How enterprises use Infracost</h1>
          </div>
        </div>
        <div className="use-cases-list">
          <div className="container">
            <div className="use-case">
              <h3>
                <img src="/docs/img/icons/visibility-icon.svg" alt="" />
                <span>Understand cost changes before any resources are launched</span>
              </h3>
              <div className="box">
                <div className="use-case-content">
                  <div>
                    <p>
                      As organizations scale, it becomes hard to have a single DevOps or Platform
                      team managing all the infrastructure requirements of all product teams.
                      Instead, they opt for using Infrastructure as Code (IaC) to create a set of
                      easy to use modules that are managed by the central platform team, and used by
                      the rest of the organization as and when infrastructure is needed.
                    </p>
                    <p>
                      The problem they face is that there is a lack of cost visibility and
                      understanding of what the infrastructure will cost. This results in costs
                      going out of control and budget being broken.
                    </p>
                  </div>
                  <div className="screenshot">
                    <div className="image-wrapper">
                      <img
                        src="/docs/img/screenshots/cost-visibility.png"
                        alt="Comment in pull request posted by Infracost"
                      />
                    </div>
                  </div>
                </div>
                <div className="benefits">
                  <h4>Infracost benefits:</h4>
                  <ul>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <span className="benefit-label">
                          Engineering culture of cost awareness:
                        </span>
                        <span>
                          Engineers start to see and learn the cost implications of the
                          infrastructure changes they are making, cost awareness increases. They can
                          make economical choices while keeping software delivery speeds up.
                        </span>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <span className="benefit-label">
                          Cost visibility for team leads, managers &amp; FinOps:
                        </span>
                        <span>
                          As engineers make change requests to infrastructure, the Infracost Cloud
                          central dashboard shows all Pull Requests that are going through CI/CD,
                          and the cost impact of each. Each change shows the cost impact, who is
                          making the change, and why (linked to Jira).
                        </span>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <span className="benefit-label">Reduced infrastructure re-work:</span>
                        <span>
                          Infracost sits in the workflow (CI/CD) and provides the information needed
                          to make the right decisions at the right time. Budgets are not broken and
                          less re-work is required to fix infrastructure to align with budgets in
                          future engineering sprints.
                        </span>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <span className="benefit-label">Aligned budgets and costs:</span>
                        <span>
                          If the changes to infrastructure or the launch of a new product break
                          budgets, communication can happen in advance, not after the bill arrives.
                        </span>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <span className="benefit-label">Tracking cost reduction efforts:</span>
                        <span>
                          Infracost tracks changes that increase and decrease cloud costs. As
                          companies undertake cost reduction efforts, they can track and measure all
                          the cost optimization efforts coming from engineering.
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="use-case">
              <h3>
                <img src="/docs/img/icons/approval-icon.svg" alt="" />
                <span>Proactive cloud cost guardrails and policies</span>
              </h3>
              <div className="box">
                <div className="use-case-content">
                  <div>
                    <p>
                      The central DevOps and platform teams have built up a lot of knowledge and
                      best practices as they have created and scaled infrastructure. Self-service
                      has enabled quick launch of infrastructure for all product and engineering
                      teams; central guardrails and policies help them stay within these guidelines.
                    </p>
                  </div>
                  <div className="screenshot">
                    <div className="image-wrapper">
                      <img
                        src="/docs/img/screenshots/cost-guardrails-and-policies.png"
                        alt="Discussion about cost impact of pull request"
                      />
                    </div>
                  </div>
                </div>
                <div className="benefits">
                  <h4>Infracost benefits:</h4>
                  <ul>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <span className="benefit-label">Budget guardrails:</span>
                        <span>
                          All changes can happen as and when needed, however, when a budget breaking
                          change comes up, the budget owners are alerted of the change. Guardrails
                          can also be configured to pause the change till the budget owner has
                          approved the budget.
                        </span>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <span className="benefit-label">Cost policies:</span>
                        <span>
                          As changes are made to infrastructure, they will be checked against a set
                          of central policies. There are two types of policies: global best
                          practices (e.g. AWS GP2 volumes should be changed to GP3), or custom
                          company policies (e.g. only use US-east-2 region as our Reservations are
                          bought here). Engineering can keep shipping fast, and stay within best
                          practices when they brush up against them.
                        </span>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <span className="benefit-label">Clear communication:</span>
                        <span>
                          There is automated and clear communication between engineering and team
                          leads, architects, and FinOps of why they are making a change to the
                          infrastructure, and the cost implications of the changes.
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="use-case">
              <h3>
                <img src="/docs/img/icons/choices-icon.svg" alt="" />
                <span>Product management cost awareness of change requests</span>
              </h3>
              <div className="box">
                <div className="use-case-content">
                  <div>
                    <p>
                      In many cases, the changes that are being made to infrastructure are due to
                      additional requirements, features, or changes to existing features of your
                      product. These originate from product managers and product owners, who are
                      ultimately responsible for the profit and loss of the products they run.
                    </p>
                    <p>
                      Product should also be aware of the cost implications of additional features
                      as they are best placed to make cost-benefit analysis, and request higher
                      budgets.
                    </p>
                  </div>
                  <div className="screenshot">
                    <div className="image-wrapper">
                      <img
                        src="/docs/img/screenshots/cost-visibility-for-product-changes.png"
                        alt="Infracost cost shareable estimate report"
                      />
                    </div>
                  </div>
                </div>
                <div className="benefits">
                  <h4>Infracost benefits:</h4>
                  <ul>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <span className="benefit-label">Issue tracking integration (Jira):</span>
                        <span>
                          As engineering make changes required as part of Jira issues, the cost
                          implications are pushed directly into Jira. Product owners are aware of
                          the cost implications of the issues, sprints and epics.
                        </span>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <span className="benefit-label">Budget controls:</span>
                        <span>
                          Budget guardrails help product stay in control of budgets. If a feature
                          will have a major impact to revenue, but will also come with a high cost,
                          an approval workflow can be triggered before the changes are merged.
                        </span>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <span className="benefit-label">Management Reporting:</span>
                        <span>
                          As engineering work on longer sprints and big change epics, the cost
                          implications can be measured, charted and put into monthly reports.
                        </span>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <span className="benefit-label">
                          Business Intelligence (BI) integration:
                        </span>
                        <span>
                          Infracost integrates into your Business Intelligence tools such as PowerBI
                          and Tableau, so enterprise customers can build personalized and custom
                          dashboards and reports.
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default UseCases;
