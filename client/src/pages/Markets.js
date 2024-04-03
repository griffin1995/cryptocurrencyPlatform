import { React, useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import useConvertCurrency from "../hooks/useConvertCurrency";
import GetCoins from "../components/GetCoins";
import GetCoinChart from "../components/GetCoinChart"

export default function Markets() {
  //Fetchin data for all coins
  const coins = GetCoins();

  //Currently selected coin
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    if (selectedCoin === null) {
      setSelectedCoin(coins[0]);
    }
  }, [coins, selectedCoin]);

  console.log("CURRENCY TO GBP");
  return (
    <>
      <Row className="text-white py-4">
        <Col xs={2}>
          <ListGroup className="text-center" defaultActiveKey="#Bitcoin">
            {coins.length === 0 ? (
              <p>No coins data</p>
            ) : (
              <>
                {coins.map((coin) => (
                  <ListGroup.Item
                    action
                    href={"#" + coin?.data.name}
                    onClick={() => setSelectedCoin(coin)}
                  >
                    {coin?.data != null ? coin?.data.name + " (" + coin?.data.symbol + ")" : "Fetching data"}
                  </ListGroup.Item>
                ))}
              </>
            )}
          </ListGroup>
        </Col>
        <Col xs={10}>
          <Container fluid className="bg-primary rounded">
            <Row>
              <Col sm={12}>
                <h1>{selectedCoin?.data.name}</h1>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <h3>
                  Current rate (GBP):{" "}
                  {useConvertCurrency(selectedCoin?.data.priceUsd)}
                </h3>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                  {GetCoinChart()}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        {coins.length === 0 ? (
          <p className="error-message">No posts to display</p>
        ) : (
          <>
            {coins.map((coin) => (
              <Col sm={3}>
                <Card className="my-2 text-center" bg="primary" text="dark" border="primary">
                  <Card.Header className="text-light">
                    <span className="h4">{coin?.data.symbol}</span>
                  </Card.Header>
                  <Card.Body className="bg-light">
                    <Card.Title>Coin</Card.Title>
                    <Card.Text>{coin?.data.name}</Card.Text>
                    <hr className="bg-dark"/>
                    <Card.Title>Change (24Hr)</Card.Title>
                    <Card.Text>{coin?.data.changePercent24Hr}%</Card.Text>
                    <hr className="bg-dark"/>
                    <Card.Title>Current Price (USD)</Card.Title>
                    <Card.Text>${coin?.data.priceUsd}</Card.Text>
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
