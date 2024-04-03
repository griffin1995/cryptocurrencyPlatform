import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SignUpLogIn.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//Login form window where users can log in
export default function LogIn() {
  const [user, setUser] = useState(null); // State to store user data fetched from the API.
  const [userFirstName, setUserFirstName] = useState("NO USER FOUND");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    const fetchUser = async (email, loggingIn) => {
      if (loggingIn) {
        try {
          const response = await fetch(`/api/adminRoutes/email/${email}`);
          if (response.ok) {
            const json = await response.json();
            setUser(json);
            setUserFirstName(json.firstName);
            console.log(json.firstName);
            console.log(json);
          } else {
            console.log("USER NOT FOUND");
            setLoggingIn(false);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setLoggingIn(false);
        }
      }
    };
    fetchUser(email, loggingIn);
  }, [email, loggingIn]);

  const loggingInHandler = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoggingIn(true);
  };


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Row className="justify-content-center align-items-center form-container text-light">
      <div>{userFirstName}</div>
      <div>{loggingIn ? "True" : "False"}</div>
      <Col
        md={2}
        className="bg-primary form d-flex align-items-center justify-content-center rounded"
        style={{ marginTop: '-500px' }} // Adjusts the negative margin to move the box up
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
              <Form onSubmit={loggingInHandler}>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={handleEmailChange}
                    value={email}
                    placeholder="Enter email"
                  />
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

