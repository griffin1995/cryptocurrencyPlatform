import React, { useState } from "react";
import {Link} from "react-router-dom";
import "./SignUpLogIn.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Form0 from "./sign_up_forms/Form0"
import Form1 from "./sign_up_forms/Form1"
import Form2 from "./sign_up_forms/Form2"

export default function SignUp() {
  const [currentForm, setCurrentForm] = useState(0);
 
  const handleFormSubmit = (isValid) => {
    if (isValid) {
      setCurrentForm((prevForm) => prevForm + 1);
    }
  };

  const renderForm = () => {
    switch (currentForm) {
      case 1:
        return <Form1 onSubmit={handleFormSubmit} />;
      case 2:
        return <Form2 onSubmit={handleFormSubmit} />;
      default:
        return <Form0 onSubmit={handleFormSubmit} />;
    }
  };
  return (
    <Row className="justify-content-center align-items-center form-container text-light">
      <Col
        md="2"
        className="bg-dark form d-flex align-items-center justify-content-center"
      >
        <Container fluid>
          <Row className="text-center">
            <Col xs={6}>
              <Link to="/LogIn" className="link-unstyled">
                <h3>Log In</h3>
                <hr />
              </Link>
            </Col>
            <Col xs={6}>
              <h3>Sign Up</h3>
              <hr className="active"/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
            {renderForm()}
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
}
