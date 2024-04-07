import React, { useState } from "react";
import {Link} from "react-router-dom";
import "./SignUpLogIn.scss";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useSignUp } from "../hooks/useSignUp";

export default function SignUp() {
  // State hooks for managing email and password input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  // Retrieves signUp function and state from custom hook for handling the sign-up process
  const { signUp, isLoading, error } = useSignUp();

  /**
   * Handles the form submission event.
   * Prevents the default form submission behavior and logs the email and password.
   * Initiates the sign-up process with user-provided details.
   * @param {Event} e - The event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the browser from performing the default form submit action
    await signUp(firstName, lastName, email, phoneNumber, password); // Calls signUp from useSignUp hook
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
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
}
