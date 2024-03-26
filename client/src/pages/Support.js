import React, { useState } from "react";
import "./Support.scss";

const faqs = [
  {
    question: "Does this product have what I need?",
    answer: "Totally. Totally does.",
  },
  {
    question: "Can I use it all the time?",
    answer: "Of course you can, we won't stop you.",
  },
  {
    question: "Are there any restrictions?",
    answer: "Only your imagination my friend. Go forth!",
  },
  {
    question: "What is the return policy?",
    answer: "You can return the product within 30 days of purchase.",
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes, we offer 24/7 customer support.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });

  const handleClick = (index, event) => {
    event.preventDefault();
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="grid-container">
      <div className="faq-section">
        {faqs.map((faq, index) => (
          <details key={index} open={index === openIndex}>
            <summary onClick={(event) => handleClick(index, event)}>
              {faq.question}
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
      <div className="contact-form">
        <h1 class="get-in-touch">Get In <span class="highlight">Touch.</span></h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>{" "}
    </div>
  );
};

export default FAQ;
