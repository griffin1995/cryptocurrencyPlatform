import React from "react";
import {Link} from "react-router-dom";
import "./SignUpLogIn.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//Login form window where users can log in
export default function LogIn() {
  return (
    <Row className="justify-content-center align-items-center form-container text-light">
      <Col
        md="2"
        className="bg-dark form d-flex align-items-center justify-content-center"
      >
        <Container fluid>
          <Row className="text-center">
            <Col xs={6}>
              <h3>Log In</h3>
              <hr className="active"/>
            </Col>
            <Col xs={6}>
            <Link to="/SignUp" className="link-unstyled">
                <h3>Sign Up</h3>
                <hr />
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-secondary">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="secondary" type="submit" className="w-100">
                  Log In
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
}
