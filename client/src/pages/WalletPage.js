import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Modal,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import GetCoin from "../components/GetCoin";
import GetCoins from "../components/GetCoins";
import { walletAPI } from "./Wallets";
import "./Wallet.scss";
import GetColours from "../components/GetColours";

// Trading Modal Component
const TradingModal = ({ show, onHide, type, wallet, onSuccess }) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuthenticationContext();
  const coins = GetCoins();

  const handleTrade = async () => {
    if (!selectedCoin || !amount || parseFloat(amount) <= 0) {
      setError("Please select a coin and enter a valid amount");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const coin = coins?.find((c) => c.id === selectedCoin);
      if (!coin) {
        throw new Error("Selected coin not found");
      }

      const pricePerUnit = parseFloat(coin.priceUsd);

      if (type === "buy") {
        await walletAPI.buyAsset(
          user._id,
          coin.id,
          coin.name,
          parseFloat(amount),
          pricePerUnit,
          user.token
        );
      } else {
        await walletAPI.sellAsset(
          user._id,
          coin.id,
          parseFloat(amount),
          pricePerUnit,
          user.token
        );
      }

      onSuccess();
      onHide();
      setSelectedCoin("");
      setAmount("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedCoinData = coins?.find((c) => c.id === selectedCoin);
  const totalCost =
    selectedCoinData && amount
      ? (parseFloat(amount) * parseFloat(selectedCoinData.priceUsd)).toFixed(2)
      : 0;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {type === "buy" ? "Buy" : "Sell"} Cryptocurrency
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Cryptocurrency</Form.Label>
            <Form.Select
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              disabled={loading}
            >
              <option value="">Choose a cryptocurrency...</option>
              {type === "buy"
                ? coins?.slice(0, 20).map((coin) => (
                    <option key={coin.id} value={coin.id}>
                      {coin.name} ({coin.symbol}) - $
                      {parseFloat(coin.priceUsd).toLocaleString()}
                    </option>
                  ))
                : wallet.assets?.map((asset) => (
                    <option key={asset.coinId} value={asset.coinId}>
                      {asset.coinName} - Available: {asset.amount}
                    </option>
                  ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Amount {type === "buy" ? "to Buy" : "to Sell"}
            </Form.Label>
            <Form.Control
              type="number"
              step="0.00000001"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              disabled={loading}
            />
          </Form.Group>

          {selectedCoinData && amount && (
            <Alert variant="info">
              <strong>Transaction Summary:</strong>
              <br />
              {type === "buy" ? "Cost" : "Revenue"}: ${totalCost}
              <br />
              Price per unit: $
              {parseFloat(selectedCoinData.priceUsd).toLocaleString()}
              {type === "buy" && (
                <>
                  <br />
                  Available funds: ${wallet.depositMoney?.toLocaleString()}
                  {parseFloat(totalCost) > wallet.depositMoney && (
                    <div className="text-danger mt-1">Insufficient funds!</div>
                  )}
                </>
              )}
            </Alert>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant={type === "buy" ? "success" : "warning"}
          onClick={handleTrade}
          disabled={
            loading || !selectedCoin || !amount || parseFloat(amount) <= 0
          }
        >
          {loading ? (
            <>
              <Spinner size="sm" className="me-2" />
              Processing...
            </>
          ) : (
            `${type === "buy" ? "Buy" : "Sell"} ${
              selectedCoinData?.symbol || ""
            }`
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Money Management Modal
const MoneyModal = ({ show, onHide, type, wallet, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuthenticationContext();

  const handleTransaction = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (type === "deposit") {
        await walletAPI.depositMoney(user._id, parseFloat(amount), user.token);
      } else {
        await walletAPI.withdrawMoney(user._id, parseFloat(amount), user.token);
      }

      onSuccess();
      onHide();
      setAmount("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {type === "deposit" ? "Deposit" : "Withdraw"} Money
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Amount (USD)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              disabled={loading}
            />
          </Form.Group>

          {type === "withdraw" && (
            <Alert variant="info">
              Available balance: ${wallet.depositMoney?.toLocaleString()}
              {parseFloat(amount) > wallet.depositMoney && (
                <div className="text-danger mt-1">Insufficient funds!</div>
              )}
            </Alert>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant={type === "deposit" ? "success" : "warning"}
          onClick={handleTransaction}
          disabled={
            loading ||
            !amount ||
            parseFloat(amount) <= 0 ||
            (type === "withdraw" && parseFloat(amount) > wallet.depositMoney)
          }
        >
          {loading ? (
            <>
              <Spinner size="sm" className="me-2" />
              Processing...
            </>
          ) : (
            `${type === "deposit" ? "Deposit" : "Withdraw"} ${amount || "0"}`
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function GetCoinCurrentPrice(coinsList, coinId) {
  for (var i = 0; i < coinsList.length; i++) {
    if (coinsList[i]?.id === coinId) {
      return parseFloat(coinsList[i].priceUsd) || 0;
    }
  }
  return 0;
}

function GetTotalValue(coinsList, assets) {
  if (!coinsList || !assets || assets.length === 0) {
    return 0;
  }

  var totalValue = 0;

  assets.forEach((asset) => {
    const coin = coinsList.find((c) => c?.id === asset.coinId);
    const coinPrice = coin ? parseFloat(coin.priceUsd) || 0 : 0;
    totalValue += (parseFloat(asset.amount) || 0) * coinPrice;
  });

  return totalValue.toFixed(2);
}

function GetCoinSymbol(coinsList, coinId) {
  const coin = coinsList.find((c) => c?.id === coinId);
  return coin?.symbol || "N/A";
}

export default function WalletPage({ wallet, onWalletUpdate, onGoBack }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  // Modal states
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Data states
  const [coinsList, setCoinsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const allCoins = GetCoins();

  useEffect(() => {
    if (allCoins) {
      setCoinsList(allCoins);
      setLoading(false);
    }
  }, [allCoins]);

  const handleModalSuccess = () => {
    onWalletUpdate(); // Refresh wallet data
  };

  if (!wallet) {
    return (
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs="auto" className="text-center text-light">
          <h3>No wallet selected</h3>
          <Button onClick={onGoBack} variant="primary">
            Go Back to Wallets
          </Button>
        </Col>
      </Row>
    );
  }

  // Enhanced chart data handling
  const hasAssets = wallet.assets && wallet.assets.length > 0;

  const chartData = {
    labels: hasAssets
      ? wallet.assets.map((asset) => {
          const coin = coinsList.find((c) => c?.id === asset.coinId);
          return coin?.name || asset.coinName || "Unknown";
        })
      : ["No Assets Owned"],
    datasets: [
      {
        label: "Portfolio Distribution",
        data: hasAssets
          ? wallet.assets.map((asset) => {
              const coin = coinsList.find((c) => c?.id === asset.coinId);
              const price = coin ? parseFloat(coin.priceUsd) || 0 : 0;
              return (parseFloat(asset.amount) || 0) * price;
            })
          : [100],
        backgroundColor: GetColours(),
        borderColor: GetColours(),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#ebebeb",
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${
              context.label
            }: ${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <>
      <Col sm={12} className="d-flex justify-content-center text-light">
        <h1>{wallet.name || "Wallet"}</h1>
      </Col>

      {/* Control Panel */}
      <Col
        sm={3}
        className="d-flex flex-column align-items-center justify-content-center px-4"
      >
        <div className="w-100 bg-primary rounded">
          <ListGroup className="text-center py-2 mx-2">
            <ListGroup.Item action className="py-3" onClick={onGoBack}>
              <span className="h2">
                <i className="bi bi-door-open"></i> Go Back
              </span>
            </ListGroup.Item>
          </ListGroup>
        </div>

        <div className="w-100 bg-primary rounded mt-3">
          <h2 className="text-center mt-3 text-light">Manage Money</h2>
          <ListGroup className="text-center py-2 mx-2">
            <ListGroup.Item
              action
              className="py-3"
              onClick={() => setShowDepositModal(true)}
            >
              <span className="h2">
                <i className="bi bi-plus-square text-success" /> Deposit
              </span>
            </ListGroup.Item>
            <ListGroup.Item
              action
              className="py-3"
              onClick={() => setShowWithdrawModal(true)}
            >
              <span className="h2">
                <i className="bi bi-dash-square text-warning" /> Withdraw
              </span>
            </ListGroup.Item>
          </ListGroup>
        </div>

        <div className="w-100 bg-primary rounded mt-3">
          <h2 className="text-center mt-3 text-light">Trading</h2>
          <ListGroup className="text-center py-2 mx-2">
            <ListGroup.Item
              action
              className="py-3"
              onClick={() => setShowBuyModal(true)}
            >
              <span className="h2">
                <i className="bi bi-plus-square-fill text-success" /> Buy Assets
              </span>
            </ListGroup.Item>
            <ListGroup.Item
              action
              className="py-3"
              onClick={() => setShowSellModal(true)}
            >
              <span className="h2">
                <i className="bi bi-dash-square-fill text-warning" /> Sell
                Assets
              </span>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Col>

      {/* Chart Section */}
      <Col
        sm={6}
        className="text-light vh-100 d-flex justify-content-center bg-primary rounded limiter"
      >
        <div
          style={{
            width: "100%",
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <Spinner animation="border" variant="light" />
          ) : (
            <Pie data={chartData} options={chartOptions} />
          )}
        </div>
      </Col>

      {/* Portfolio Details */}
      <Col sm={3} className="text-light h-100 overflow-auto">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="max-h-100">
                {/* Cash Balance */}
                <Card
                  className="m-2 text-center"
                  bg="success"
                  text="light"
                  border="success"
                >
                  <Card.Header>
                    <span className="h4">💰 Cash Balance</span>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Available Funds</Card.Title>
                    <Card.Text className="h4">
                      ${parseFloat(wallet.depositMoney || 0).toLocaleString()}
                    </Card.Text>
                  </Card.Body>
                </Card>

                {/* Portfolio Value */}
                <Card
                  className="m-2 text-center"
                  bg="info"
                  text="light"
                  border="info"
                >
                  <Card.Header>
                    <span className="h4">📊 Portfolio Value</span>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Total Assets</Card.Title>
                    <Card.Text className="h4">
                      ${GetTotalValue(coinsList, wallet.assets)}
                    </Card.Text>
                    <hr />
                    <Card.Title>Total Portfolio</Card.Title>
                    <Card.Text className="h3 text-warning">
                      $
                      {(
                        parseFloat(wallet.depositMoney || 0) +
                        parseFloat(GetTotalValue(coinsList, wallet.assets))
                      ).toLocaleString()}
                    </Card.Text>
                  </Card.Body>
                </Card>

                {/* Asset Holdings */}
                {!hasAssets ? (
                  <Card
                    className="m-2 text-center"
                    bg="secondary"
                    text="light"
                    border="secondary"
                  >
                    <Card.Body>
                      <Card.Text>
                        <i className="bi bi-wallet2"></i>
                        <br />
                        No cryptocurrency assets yet.
                        <br />
                        Start trading to build your portfolio!
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ) : (
                  wallet.assets.map((asset, index) => {
                    const coin = coinsList.find((c) => c?.id === asset.coinId);
                    const currentPrice = GetCoinCurrentPrice(
                      coinsList,
                      asset.coinId
                    );
                    const assetValue =
                      (parseFloat(asset.amount) || 0) * currentPrice;

                    return (
                      <Card
                        key={asset.coinId || index}
                        className="m-2 text-center"
                        bg="primary"
                        text="dark"
                        border="primary"
                      >
                        <Card.Header className="text-light">
                          <span className="h4">
                            {GetCoinSymbol(coinsList, asset.coinId)}
                          </span>
                        </Card.Header>
                        <Card.Body className="bg-light rounded">
                          <Card.Title>
                            {asset.coinName || coin?.name || "Unknown"}
                          </Card.Title>
                          <hr className="bg-dark" />
                          <Card.Title>Holdings</Card.Title>
                          <Card.Text>
                            {parseFloat(asset.amount || 0).toLocaleString()}{" "}
                            coins
                          </Card.Text>
                          <hr className="bg-dark" />
                          <Card.Title>Current Value</Card.Title>
                          <Card.Text className="h5 text-success">
                            ${assetValue.toLocaleString()}
                          </Card.Text>
                          <hr className="bg-dark" />
                          <Card.Title>Price per Coin</Card.Title>
                          <Card.Text>
                            ${currentPrice.toLocaleString()}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    );
                  })
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </Col>

      {/* Modals */}
      <TradingModal
        show={showBuyModal}
        onHide={() => setShowBuyModal(false)}
        type="buy"
        wallet={wallet}
        onSuccess={handleModalSuccess}
      />

      <TradingModal
        show={showSellModal}
        onHide={() => setShowSellModal(false)}
        type="sell"
        wallet={wallet}
        onSuccess={handleModalSuccess}
      />

      <MoneyModal
        show={showDepositModal}
        onHide={() => setShowDepositModal(false)}
        type="deposit"
        wallet={wallet}
        onSuccess={handleModalSuccess}
      />

      <MoneyModal
        show={showWithdrawModal}
        onHide={() => setShowWithdrawModal(false)}
        type="withdraw"
        wallet={wallet}
        onSuccess={handleModalSuccess}
      />
    </>
  );
}
