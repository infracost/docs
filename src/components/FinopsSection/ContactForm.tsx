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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if any field is empty
    for (const key in formData) {
      if (formData[key as keyof FormData] === "") {
        alert("Please fill in all fields.");
        return; // Prevent form submission
      }
    }

    // You can handle the form submission logic here, e.g., send the data to a server.
    console.log(formData);
    // Clear the form after submission (optional)
    setFormData({ name: "", email: "", companyName: "" });
  };

  const isValidEmail = (email: string): boolean => {
    // Basic email format validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container finops-form__wrapper">
      <h3 className="finops-form__title">Request a live demo now</h3>
      <form onSubmit={handleSubmit} style={{ width: "100%" }} id="finops-form">
        <div className="finops-form__section">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
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
    </div>
  );
};

export default ContactForm;
