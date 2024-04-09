import { React, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import "./SignUpLogIn.scss";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

//Login form window where users can log in
export default function LogIn() {
  // State hooks for managing email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  /**
   * Handles the form submission event.
   * Prevents the default form submission behavior and logs the email and password.
   * @param {Event} e - The event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Row className="justify-content-center align-items-center form-container text-light">
      <Col
        md="2"
        className="bg-primary form d-flex align-items-center justify-content-center rounded"
      >
        <Container fluid>
          <Row className="text-center">
            <Col xs={6}>
              <h3>Log In</h3>
              <hr className="active" />
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
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-secondary">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>
                <Button disabled={isLoading} variant="secondary" type="submit" className="w-100">
                  Log In
                </Button>
                {error && <span className="error">{error}</span>}
              </Form>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
}