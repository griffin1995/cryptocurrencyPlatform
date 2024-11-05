import { React, useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import GetCoins from "../components/GetCoins";
import GetCoinChart from "../components/GetCoinChart";
import "./Markets.scss";

//This is the Market page where user can see more in-depth information about different coins

export default function Markets() {
  const coins = GetCoins();
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    if (selectedCoin === null && coins != null) {
      setSelectedCoin(coins[0]);
    }
  }, [coins, selectedCoin]);

  return (
    <>
      <Row className="py-4 list-graph-section">
        <Col xs={2} className="d-flex flex-column">
          <ListGroup className="text-center" defaultActiveKey="#Bitcoin">
            {coins?.length === 0 ? (
              <p>No coins data</p>
            ) : (
              <>
                {coins?.map((coin) => (
                  <ListGroup.Item
                    action
                    href={"#" + coin?.name}
                    onClick={() => setSelectedCoin(coin)}
                  >
                    {coin != null
                      ? coin?.name + " (" + coin?.symbol + ")"
                      : "Fetching data"}
                  </ListGroup.Item>
                ))}
              </>
            )}
          </ListGroup>
        </Col>
        <Col xs={10} className="d-flex flex-column align-items-start limiter">
          <Container fluid className="bg-primary rounded">
            <Row className="pt-3">
              <Col sm={12} className="text-center text-light ">
                <h1>[{selectedCoin?.name}]</h1>
              </Col>
            </Row>
            <hr className="bg-dark" />
            <Row>
              <Col sm={12} className="text-center">
                <h3 className="text-success fw-bolder">Current rate (USD):</h3>
                <h4 className="text-light">{selectedCoin?.priceUsd}</h4>
              </Col>
            </Row>
            <hr className="bg-dark" />
            <Row>
              <Col sm={12}>
                <GetCoinChart coin={selectedCoin?.id} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        {coins?.length === 0 ? (
          <p className="error-message">No posts to display</p>
        ) : (
          <>
            {coins?.map((coin) => (
              <Col sm={3}>
                <Card
                  className="my-2 text-center"
                  bg="primary"
                  text="dark"
                  border="primary"
                >
                  <Card.Header className="text-light">
                    <span className="h4">{coin?.symbol}</span>
                  </Card.Header>
                  <Card.Body className="bg-light">
                    <Card.Title>Coin</Card.Title>
                    <Card.Text>{coin?.name}</Card.Text>
                    <hr className="bg-dark" />
                    <Card.Title>Change (24Hr)</Card.Title>
                    <Card.Text>{coin?.changePercent24Hr}%</Card.Text>
                    <hr className="bg-dark" />
                    <Card.Title>Current Price (USD)</Card.Title>
                    <Card.Text>${coin?.priceUsd}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
    </>
  );
}
