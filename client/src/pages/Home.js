import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import ShowcaseImage from "../media/Macbook_Air_Showcase.png";

export default function Home() {
  return (
    <Row className="text-light mt-4">
      <Col
        sm={{ span: 5, offset: 1 }}
        className="min-vh-100 d-column align-content-center"
      >
        <h5>
          Your Gateway to <span className="fw-medium text-success">Crypto</span>{" "}
          Simplified 🚀
        </h5>
        <span className="display-1">
          Hello, <span className="text-success">Traders</span>!
        </span>
        <h4>
          Say hello to Crypti<span className="fw-medium text-success">Q</span> -
          your user-friendly platform designed to make navigating the world of
          crypto a breeze. Tailored for beginners, Crypti
          <span className="fw-medium text-success">Q</span> offers a
          straightforward approach to buying, selling, and trading digital
          currencies. No complicated jargon or convoluted processes here - just
          simplicity at its finest.
        </h4>
        <br />
        <Button variant="secondary" className="text-dark">
          <span className="h4">Sign Up</span>
        </Button>
      </Col>
      <Col sm={5} className="min-vh-100 d-column align-content-center">
        <Image src={ShowcaseImage} fluid />
      </Col>
    </Row>
  );
}
