import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Logo from "../media/CryptiQ_White.png";
import "../css/NavigationBar.css";
/**
 * Navbar component for the application.
 * Provides a top-level navigation element, allowing users to navigate through the app without full page reloads.
 */
import "../css/NavigationBar.css";

export default function NavigationBar() {
  return (
    <Row>
      <Navbar expand="lg" className="navbar-dark bg-primary">
        <Container>
          <div className="navbar-left">
            <Navbar.Brand as={Link} to="/" className="navbar-logo">
              <Image fluid src={Logo} />
            </Navbar.Brand>
            <div className="navbar-links">
              <Nav.Link as={Link} to="../pages/SignUp.js" className="navbar-link">
                Sign Up
              </Nav.Link>
              <Nav.Link as={Link} to="../pages/LogIn.js" className="navbar-link">
                Log In
              </Nav.Link>
            </div>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 navbar-right">
              <Nav.Link as={Link} to="/" className="navbar-link">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="..pages/Markets.js" className="navbar-link">
                Markets
              </Nav.Link>
              <Nav.Link as={Link} to="/support" className="navbar-link">
                Contact Us
              </Nav.Link>
              <Nav.Link as={Link} to="../pages/Blog.js" className="navbar-link">
                Blog
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Row>
  );
}