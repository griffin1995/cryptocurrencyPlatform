import React from "react";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import GetCoin from "../components/GetCoin";
import "./Wallet.scss";
import GetColours from "../components/GetColours";

function GetCoinCurrentPrice(coinsList, coinId) {
  for (var i = 0; i < coinsList.length; i++) {
    if (coinsList[i]?.id == coinId) {
      return coinsList[i].priceUsd;
    }
  }
}

function GetTotalValue(coinsList, assets) {
  var totalValue = 0;
  var counter = 0;
  assets.map((asset) => {
    totalValue += asset.amount * coinsList[counter]?.priceUsd;
  });
  return totalValue;
}

function GetCoinSymbol(coinsList, coinId){
  for (var i = 0; i < coinsList.length; i++) {
    if (coinsList[i]?.id == coinId) {
      return coinsList[i].symbol;
    }
  }
}

function HandleLeavePage () {
  window.location.reload();
}

export default function WalletPage({ wallet }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const coinsList =
    wallet.assets === null
      ? null
      : wallet.assets.map((asset) => {
          return GetCoin(asset.id);
        });

  const data = {
    labels:
      wallet.assets === null
        ? ["No Assets Owned"]
        : coinsList.map((coin) => {
            return coin?.name;
          }),
    datasets: [
      {
        label: "Assets Owned",
        data:
          wallet.assets === null
            ? [100]
            : wallet.assets.map((asset) => {
                return asset.amount;
              }),
        backgroundColor: GetColours,
        borderColor: GetColours,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Col sm={12} className="d-flex justify-content-center text-light">
        <h1>{wallet.name}</h1>
      </Col>
      <Col
        sm={3}
        className="d-flex flex-column align-items-center justify-content-center px-4"
      >
        <div className="w-100 bg-primary rounded">
          <ListGroup className="text-center py-2 mx-2">
            <ListGroup.Item action className="py-3" onClick={() => HandleLeavePage()}>
              <span className="h2">
                <i class="bi bi-door-open"></i> Go Back
              </span>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div className="w-100 bg-primary rounded mt-3">
          <h2 className="text-center mt-3 text-light">Manage Deposit Money</h2>
          <ListGroup className="text-center py-2 mx-2">
            <ListGroup.Item action className="py-3">
              <span className="h2">
                <i class="bi bi-plus-square" /> Deposit
              </span>
            </ListGroup.Item>
            <ListGroup.Item action className="py-3">
              <span className="h2">
                <i class="bi bi-dash-square" /> Withdraw
              </span>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div className="w-100 bg-primary rounded mt-3">
          <h2 className="text-center mt-3 text-light">Manage Assets</h2>
          <ListGroup className="text-center py-2 mx-2">
            <ListGroup.Item action className="py-3">
              <span className="h2">
                <i class="bi bi-plus-square-fill" /> Buy Assets
              </span>
            </ListGroup.Item>
            <ListGroup.Item action className="py-3">
              <span className="h2">
                <i class="bi bi-dash-square-fill" /> Sell Assets
              </span>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Col>
      <Col
        sm={6}
        className="text-light vh-100 d-flex justify-content-center bg-primary rounded limiter"
      >
        <Pie data={data} />
      </Col>
      <Col sm={3} className="text-light h-100 overflow-auto">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="max-h-100">
              <Card
                  className="m-2 text-center"
                  bg="primary"
                  text="dark"
                  border="primary"
                >
                  <Card.Header className="text-light">
                    <span className="h4">Deposited Money</span>
                  </Card.Header>
                  <Card.Body className="bg-light rounded">
                    <Card.Title>Amount</Card.Title>
                    <Card.Text>
                      {wallet.depositMoney}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card
                  className="m-2 text-center"
                  bg="primary"
                  text="dark"
                  border="primary"
                >
                  <Card.Header className="text-light">
                    <span className="h4">Assets Evaluation</span>
                  </Card.Header>
                  <Card.Body className="bg-light rounded">
                    <Card.Title>Total</Card.Title>
                    <Card.Text>
                      {GetTotalValue(coinsList, wallet.assets)}
                    </Card.Text>
                  </Card.Body>
                </Card>
                {wallet.assets === null
                  ? "NO ASSETS"
                  : wallet.assets.map((asset) => {
                      return (
                        <Card
                          className="m-2 text-center"
                          bg="primary"
                          text="dark"
                          border="primary"
                        >
                          <Card.Header className="text-light">
                            <span className="h4">{GetCoinSymbol(coinsList, asset.id)}</span>
                          </Card.Header>
                          <Card.Body className="bg-light rounded">
                            <Card.Title>Asset</Card.Title>
                            <Card.Text>{asset.name}</Card.Text>
                            <hr className="bg-dark" />
                            <Card.Title>Amount Owned</Card.Title>
                            <Card.Text>{asset.amount}</Card.Text>
                            <hr className="bg-dark" />
                            <Card.Title>Assets Evaluation (USD)</Card.Title>
                            <Card.Text>
                              {GetCoinCurrentPrice(coinsList, asset.id) *
                                asset.amount}
                            </Card.Text>
                            <hr className="bg-dark" />
                            <Card.Title>Current Price (USD)</Card.Title>
                            <Card.Text>
                              {GetCoinCurrentPrice(coinsList, asset.id)}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      );
                    })}
              </div>
            </Col>
          </Row>
        </Container>
      </Col>
    </>
  );
}
