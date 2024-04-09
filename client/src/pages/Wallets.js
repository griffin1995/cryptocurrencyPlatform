import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import Wallet from "../components/Wallet";

export default function Wallets() {
  return (
    <Row className="mt-2 min-vh-100">
      <Col sm={12} className="min-vh-100 d-flex align-items-center justify-content-center">
        {<Wallet/>}
      </Col>
    </Row>
  );
}
