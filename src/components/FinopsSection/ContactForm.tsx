import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  companyName: string;
}

const isFormValid = (formData: FormData): boolean =>
  formData.name !== '' && formData.email !== '' && formData.companyName !== '';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    companyName: '',
  });

  const { siteConfig } = useDocusaurusContext();
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowShowSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    // Custom email format validation
    if (name === 'email' && !isValidEmail(value)) {
      event.target.setCustomValidity('Please enter a valid email address.');
    } else {
      event.target.setCustomValidity('');
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${siteConfig.customFields?.infracostDashboardApiEndpoint}/docs/request-finops-demo/`,
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'x-infracost-docs-token': `${siteConfig.customFields?.infracostDocsApiToken}`,
          },
        }
      );

      if (!response.ok) {
        const msg = await response.json();
        setError(`Failed to submit the form: ${msg.error}`);
        return;
      }

      // Clear the form after submission (optional)
      setFormData({ name: '', email: '', companyName: '' });
      setShowShowSuccess(true);
      // Clear the error message (if any)
      setError(null);
    } catch (error) {
      setError('Failed to submit the form. Please try again later.');
    }
  };

  const isValidEmail = (email: string): boolean => {
    // Basic email format validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container finops-form__wrapper">
      <h3 className="finops-form__title">Request a live demo now</h3>
      {error && (
        <div className="finops-form__error">
          <p>{error}</p>
        </div>
      )}
      {showSuccess ? (
        <div className="finops-form__success">
          <h3>Thank you</h3>
          <p>Your request has been received. We will get in touch with you as soon as possible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ width: '100%' }} id="finops-form">
          <div className="finops-form__section">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="finops-form__section">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="finops-form__section">
            <label htmlFor="companyName">Company name</label>
            <input
              type="text"
              id="companyName"
              placeholder="Enter your company name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="finops-form__footer">
            <button type="submit" className="button primary" disabled={!isFormValid(formData)}>
              Request live demo
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
