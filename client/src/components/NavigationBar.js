import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image"
import Logo from "../media/CryptiQ_White.png"
/**
 * Navbar component for the application.
 * Provides a top-level navigation element, allowing users to navigate through the app without full page reloads.
 */
export default function NavigationBar() {
  return (
    <Row>
      <Navbar expand="lg" className="bg-primary">
        <Container>
          <Navbar.Brand as={Link} to="/" className="text-white">
            <Image fluid src={Logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1">
              <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
              <Nav.Link as={Link} to="/Markets" className="text-white">Markets</Nav.Link>
              <Nav.Link as={Link} to="/Blog" className="text-white">Blog</Nav.Link>
              <Nav.Link as={Link} to="/SignUp" className="text-white">Sign Up/Log In</Nav.Link>
              <Nav.Link as={Link} to="/Support" className="text-white">Support</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Row>
  );
}
