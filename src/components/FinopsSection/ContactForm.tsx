import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  companyName: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    companyName: "",
  });

  const { siteConfig } = useDocusaurusContext();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowShowSuccess] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    // Custom email format validation
    if (name === "email" && !isValidEmail(value)) {
      event.target.setCustomValidity("Please enter a valid email address.");
    } else {
      event.target.setCustomValidity("");
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if any field is empty
    for (const key in formData) {
      if (formData[key as keyof FormData] === "") {
        alert("Please fill in all fields.");
        return; // Prevent form submission
      }
    }

    // Prepare the form data as URL parameters
    const params = new URLSearchParams();
    for (const key in formData) {
      params.append(key, formData[key as keyof FormData]);
    }

    try {
      // Make the API call with the URL parameters
      const response = await fetch(
        `${siteConfig.customFields?.infracostDashboardApiEndpoint}/finops/contact/`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setShowError(true);
        throw new Error("Failed to submit the form. Please try again later.");
      }

      // Clear the form after submission (optional)
      setFormData({ name: "", email: "", companyName: "" });
      setShowShowSuccess(true);
      // Clear the error message (if any)
      setShowError(false);
    } catch (error) {
      console.error("Error while submitting the form:", error.message);
      setShowError(true);
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
      {showError && (
        <div className="finops-form__error">
          <p>Failed to submit the form. Please try again later.</p>
        </div>
      )}
      {showSuccess ? (
        <div className="finops-form__success">
          <h3>Thank you</h3>
          <p>
            Your request has been received. We will get in touch with you as
            soon as possible.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%" }}
          id="finops-form"
        >
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
            <button type="submit" className="button primary">
              Request live demo
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
