import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import emailjs from "emailjs-com";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // Phone number field
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailData = {
      from_name: formData.name,
      email: formData.email, // Corresponds to {{email}} in the template
      number: formData.phone, // Corresponds to {{number}} in the template
      message: formData.message,
    };

    emailjs
      .send(
        "service_hoyq6xf", // Your email.js Service ID
        "template_2zbt1dc", // Your email.js Template ID
        emailData,
        "xTVbm4gOtEOKY8Lx9", // Your email.js User ID
      )
      .then((response) => {
        console.log("Email sent:", response.status, response.text);
        setFormStatus("success");
      })
      .catch((error) => {
        console.error("Email error:", error);
        setFormStatus("error");
      });

    // Clear form fields after submission
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="contact-form-wrapper paddings">
      <Helmet>
        <title>Contact Us - Altair Attic Limited</title>
        <meta
          name="description"
          content="Get in touch with Altair Attic Limited for any inquiries about our tech solutions and services."
        />
        <meta
          name="keywords"
          content="Contact Altair Attic Limited, tech solutions, customer service"
        />
        <meta property="og:title" content="Contact Us - Altair Attic Limited" />
        <meta
          property="og:description"
          content="Get in touch with Altair Attic Limited for any inquiries about our tech solutions and services."
        />
        <meta property="og:url" content="https://www.altairattic.com/contact" />
        <meta
          property="og:image"
          content="https://www.altairattic.com/images/contact.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact Us - Altair Attic Limited"
        />
        <meta
          name="twitter:description"
          content="Get in touch with Altair Attic Limited for any inquiries about our tech solutions and services."
        />
        <meta
          name="twitter:image"
          content="https://www.altairattic.com/images/contact.jpg"
        />
      </Helmet>
      <div className="contact-header">
        <div className="contact-images">
          <img
            className="contact-image"
            src="/contact2.jpeg"
            alt="Contact Image"
          />
          <img
            className="contact-image"
            src="/contact.jpeg"
            alt="Contact Image"
          />
        </div>
        <div className="contact-details">
          <h2>Contact Us</h2>
          <p>
            <i className="fas fa-envelope"></i> hello@altair-attic.com{" "}
          </p>
          <p>
            <i className="fas fa-phone"></i> +2347077195098
          </p>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          name="name"
          placeholder="e.g. Jane Smith"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          className="input-field"
          name="email"
          placeholder="e.g. jane@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="input-field"
          name="phone"
          placeholder="e.g. +234 812 345 6789"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          className="textarea-field"
          name="message"
          placeholder="How can we help you today?"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        {formStatus === "success" && (
          <div className="success-message">Message sent successfully!</div>
        )}
        {formStatus === "error" && (
          <div className="error-message">
            Message sending failed. Please try again later.
          </div>
        )}
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
