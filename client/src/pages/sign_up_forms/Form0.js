import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SignUp({onSubmit}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your form validation logic here
    const isValid = formData.firstName && formData.lastName; // Example validation
    onSubmit(isValid); // Pass the validation result to the callback
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="FORM 0" value={formData.firstName}
          onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Smith" value={formData.firstName}
          onChange={handleChange}/>
      </Form.Group>
      <Button variant="secondary" type="submit" className="w-100">
        Next
      </Button>
    </Form>
    </>
  );
}
