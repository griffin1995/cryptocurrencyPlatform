import React from "react";
import { Row, Col, ListGroup } from "react-bootstrap";

export default function Markets() {
  return (
    <Row className="text-white py-4">
      <Col xs={2}>
        <ListGroup className="text-center" defaultActiveKey="#coin1">
          <ListGroup.Item action href="#coin1">
            Coin 1
          </ListGroup.Item>
          <ListGroup.Item action href="#coin2">
            Coin 2
          </ListGroup.Item>
          <ListGroup.Item action href="#coin3">
            Coin 3
          </ListGroup.Item>
          <ListGroup.Item action href="#coin4">
            Coin 4
          </ListGroup.Item>
          <ListGroup.Item action href="#coin5">
            Coin 5
          </ListGroup.Item>
          <ListGroup.Item action href="#coin6">
            Coin 6
          </ListGroup.Item>
          <ListGroup.Item action href="#coin7">
            Coin 7
          </ListGroup.Item>
          <ListGroup.Item action href="#coin8">
            Coin 8
          </ListGroup.Item>
          <ListGroup.Item action href="#coin9">
            Coin 9
          </ListGroup.Item>
          <ListGroup.Item action href="#coin10">
            Coin 10
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col xs={10}>
        
      </Col>
    </Row>
  );
}
