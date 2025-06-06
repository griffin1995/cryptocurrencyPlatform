import { React, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import GetCoins from "../components/GetCoins";
import GetCoinChart from "../components/GetCoinChart";
import "./Markets.scss";

//This is the Market page where user can see more in-depth information about different coins

export default function Markets() {
  const coins = GetCoins();
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (coins === null) {
      setLoading(true);
    } else if (coins && coins.length > 0) {
      setLoading(false);
      if (selectedCoin === null) {
        setSelectedCoin(coins[0]);
      }
    } else if (coins && coins.length === 0) {
      setLoading(false);
      setError("No cryptocurrency data available");
    }
  }, [coins, selectedCoin]);

  if (loading) {
    return (
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Col xs="auto">
          <Spinner animation="border" variant="primary" />
          <p className="text-light mt-2">Loading cryptocurrency data...</p>
        </Col>
      </Row>
    );
  }

  if (error) {
    return (
      <Row className="justify-content-center">
        <Col md={6}>
          <Alert variant="danger" className="text-center">
            <Alert.Heading>Error Loading Data</Alert.Heading>
            <p>{error}</p>
          </Alert>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row className="py-4 list-graph-section">
        <Col xs={2} className="d-flex flex-column">
          <ListGroup className="text-center" defaultActiveKey="#Bitcoin">
            {coins?.map((coin) => (
              <ListGroup.Item
                key={coin.id} 
                action
                href={`#${coin.name}`}
                onClick={() => setSelectedCoin(coin)}
                active={selectedCoin?.id === coin.id}
              >
                {coin.name} ({coin.symbol})
              </ListGroup.Item>
            ))}
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
                <h4 className="text-light">
                  ${parseFloat(selectedCoin?.priceUsd).toLocaleString()}
                </h4>
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
        {coins?.map((coin) => (
          <Col sm={3} key={coin.id}>
            {" "}
            {/* FIXED: Added missing key prop */}
            <Card
              className="my-2 text-center"
              bg="primary"
              text="dark"
              border="primary"
            >
              <Card.Header className="text-light">
                <span className="h4">{coin.symbol}</span>
              </Card.Header>
              <Card.Body className="bg-light">
                <Card.Title>Coin</Card.Title>
                <Card.Text>{coin.name}</Card.Text>
                <hr className="bg-dark" />
                <Card.Title>Change (24Hr)</Card.Title>
                <Card.Text
                  className={
                    parseFloat(coin.changePercent24Hr) >= 0
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {parseFloat(coin.changePercent24Hr).toFixed(2)}%
                </Card.Text>
                <hr className="bg-dark" />
                <Card.Title>Current Price (USD)</Card.Title>
                <Card.Text>
                  ${parseFloat(coin.priceUsd).toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
