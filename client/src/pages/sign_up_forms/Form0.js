import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Form0({onSubmit}) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="FORM 0"
            value={formData.field1 || ""}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          value={formData.field2 || ""}
          onChange={handleChange}
        >
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Smith" />
        </Form.Group>
        <Button variant="secondary" type="submit" className="w-100">
          Next
        </Button>
      </Form>
    </>
  );
}
