import React, { useState } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
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
    <Row className="mt-4">
      <Col sm={6}>
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
      </Col>
      <Col sm={{ span: 4, offset: 1 }}>
        <Container fluid>
          <Row className="mt-5">
            <Col sm={12}>
              <h1 className="get-in-touch text-center">
                Get In <span class="highlight">Touch.</span>
              </h1>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Form className="d-column text-light justify-content-center align-items-center">
                <Form.Group
                  className="mb-4 d-flex"
                  controlId="formBasicFullName"
                >
                  <Form.Control
                    className="me-2"
                    size="lg"
                    type="text"
                    placeholder="Name"
                  />
                  <Form.Control
                    className="ms-2"
                    size="lg"
                    type="text"
                    placeholder="Surname"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Control size="lg" type="email" placeholder="Email" />
                  <Form.Text className="text-white">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasixTextArea">
                  <Form.Control
                    size="lg"
                    as="textarea"
                    placeholder="Ask a question..."
                    rows={3}
                  />
                </Form.Group>
                <div className="h-100 d-flex justify-content-center">
                  <Button className="px-5" size="lg" variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default FAQ;
