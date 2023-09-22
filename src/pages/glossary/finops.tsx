import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import GlossaryPage from '../../components/GlossaryPage';

const jsonStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What Is Cloud FinOps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "FinOps is a collaborative approach to managing and optimizing an organization's cloud spending. It involves key stakeholders from finance, information technology, and business teams.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Cloud FinOps Different from FinOps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While the terms are often used interchangeably, Cloud FinOps focuses explicitly on the financial operations associated with cloud computing. In contrast, FinOps was traditionally used by financial operations teams to cover activities including purchasing, income, cash management, etc.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who Should Be Involved in FinOps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cross-functional teams, including members from finance, engineering, and sales, are critical to a successful Cloud FinOps strategy. The engineering team is one of the most influential teams within the three areas as they control the primary usage of resources.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why Is FinOps Necessary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As organizations increasingly move to the cloud, there is a growing need for specialized financial management practices to monitor and control costs effectively.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Are Some FinOps Best Practices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some best practices include implementing cloud cost estimation, informing engineers of costs before they happen, automated cloud cost reporting, regular audits of cloud usage, and establishing a dedicated Cloud FinOps team to oversee spending and perform optimization tasks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How Does Cloud FinOps Promote Cost Optimization?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'By creating visibility into cloud spending and fostering a culture of shared responsibility, Cloud FinOps enables the organization to make data-driven decisions to optimize costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Small Businesses Benefit from Cloud FinOps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Businesses of all sizes can benefit from implementing a Cloud FinOps practice to encourage collaboration and manage their cloud costs and money more effectively.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Tools Are Typically Used in Cloud FinOps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Various cost management and optimization tools can be utilized in Cloud FinOps, ranging from native tools provided by Amazon Web Services, Microsoft Azure, and Google Cloud providers to specialized third-party solutions, like Infracost.',
      },
    },
    {
      '@type': 'Question',
      name: 'How Do I Begin My Cloud FinOps Journey?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Starting your FinOps practice generally involves assessing your cloud financial management practices and forming a dedicated FinOps team. Then, implement tools and processes to help engineering, finance, and management get the most value from your cloud financial operations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How Is FinOps Different from Traditional IT Finance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "FinOps offers more agility and real-time insights into cloud spending, making it more adaptable to the variable spend model most value associated with cloud computing. Traditional IT Finance is a more significant term encompassing a larger portion of a company's financials.",
      },
    },
    {
      '@type': 'Question',
      name: "Doesn't it all come down to Cloud Resources being used?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The core pricing model cloud providers use is usage-based, meaning the more resources are used, the more you pay. So, although it comes down to what resources are being used (or purchased), it makes a big difference in how these resources are paid.',
      },
    },
  ],
};

const Index = () => (
  <HelmetProvider>
    <Helmet>
      <script className="structured-data-list" type="application/ld+json">
        {JSON.stringify(jsonStructuredData)}
      </script>
    </Helmet>
    <GlossaryPage slug="finops" />;
  </HelmetProvider>
);

export default Index;
