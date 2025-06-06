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
import useLocalCoins from "../hooks/useLocalCoins";
import "./Wallet.scss";
import GetColours from "../components/GetColours";

// Wallet API functions
const walletAPI = {
  async getUserWallet(userId, token) {
    const response = await fetch(
      `http://localhost:4000/api/wallet/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch wallet");
    }

    return response.json();
  },

  async buyAsset(userId, coinId, coinName, amount, pricePerUnit, token) {
    const response = await fetch(`http://localhost:4000/api/wallet/buy`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        coinId,
        coinName,
        amount,
        pricePerUnit,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to buy asset");
    }

    return response.json();
  },

  async sellAsset(userId, coinId, amount, pricePerUnit, token) {
    const response = await fetch(`http://localhost:4000/api/wallet/sell`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        coinId,
        amount,
        pricePerUnit,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to sell asset");
    }

    return response.json();
  },

  async depositMoney(userId, amount, token) {
    const response = await fetch(`http://localhost:4000/api/wallet/deposit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, amount }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to deposit money");
    }

    return response.json();
  },

  async withdrawMoney(userId, amount, token) {
    const response = await fetch(`http://localhost:4000/api/wallet/withdraw`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, amount }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to withdraw money");
    }

    return response.json();
  },
};

// Trading Modal Component - Uses only local coins
const TradingModal = ({ show, onHide, type, wallet, onSuccess }) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuthenticationContext();

  // Use local coins from database
  const {
    coins: localCoins,
    loading: localLoading,
    error: localError,
  } = useLocalCoins();

  const handleTrade = async () => {
    if (!selectedCoin || !amount || parseFloat(amount) <= 0) {
      setError("Please select a coin and enter a valid amount");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (type === "buy") {
        // For buying, use local coin data
        const coinData = Array.isArray(localCoins)
          ? localCoins.find((c) => c._id === selectedCoin)
          : null;
        if (!coinData) {
          throw new Error("Selected coin not found in database");
        }

        const pricePerUnit = parseFloat(coinData.priceUsd);
        if (!pricePerUnit || pricePerUnit === 0) {
          throw new Error("Price data not available for this coin");
        }

        await walletAPI.buyAsset(
          user._id,
          coinData._id,
          coinData.name,
          parseFloat(amount),
          pricePerUnit,
          user.token
        );
      } else {
        // For selling, find the asset in wallet
        const asset = wallet.assets?.find((a) => a.coinId === selectedCoin);
        if (!asset) {
          throw new Error("Asset not found in wallet");
        }

        // Get current price from local coin data
        const localCoin = Array.isArray(localCoins)
          ? localCoins.find((c) => c._id === selectedCoin)
          : null;
        const pricePerUnit = localCoin ? parseFloat(localCoin.priceUsd) : 0;

        if (!pricePerUnit || pricePerUnit === 0) {
          throw new Error("Price data not available for this asset");
        }

        await walletAPI.sellAsset(
          user._id,
          selectedCoin,
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

  // Get selected coin data for price display
  const getSelectedCoinData = () => {
    if (!selectedCoin || !Array.isArray(localCoins)) return null;

    if (type === "buy") {
      return localCoins.find((c) => c._id === selectedCoin);
    } else {
      const asset = wallet.assets?.find((a) => a.coinId === selectedCoin);
      if (asset) {
        const localCoin = localCoins.find((c) => c._id === selectedCoin);
        return (
          localCoin || {
            name: asset.coinName,
            symbol: asset.coinName,
            priceUsd: 0,
          }
        );
      }
    }
    return null;
  };

  const selectedCoinData = getSelectedCoinData();
  const totalCost =
    selectedCoinData && amount
      ? (
          parseFloat(amount) * parseFloat(selectedCoinData.priceUsd || 0)
        ).toFixed(2)
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
        {localError && (
          <Alert variant="warning">Error loading coins: {localError}</Alert>
        )}

        {localLoading && (
          <Alert variant="info">
            <Spinner size="sm" className="me-2" />
            Loading available cryptocurrencies...
          </Alert>
        )}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Cryptocurrency</Form.Label>
            <Form.Select
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              disabled={loading || localLoading}
            >
              <option value="">Choose a cryptocurrency...</option>
              {type === "buy" ? (
                Array.isArray(localCoins) && localCoins.length > 0 ? (
                  localCoins.map((coin) => (
                    <option key={coin._id} value={coin._id}>
                      {coin.name} ({coin.symbol}) - $
                      {parseFloat(coin.priceUsd || 0).toLocaleString()}
                    </option>
                  ))
                ) : (
                  <option disabled>
                    No coins available - Add coins through admin panel
                  </option>
                )
              ) : wallet.assets?.length > 0 ? (
                wallet.assets.map((asset) => (
                  <option key={asset.coinId} value={asset.coinId}>
                    {asset.coinName} - Available: {asset.amount}
                  </option>
                ))
              ) : (
                <option disabled>No assets to sell</option>
              )}
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
              {parseFloat(selectedCoinData.priceUsd || 0).toLocaleString()}
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
            loading ||
            !selectedCoin ||
            !amount ||
            parseFloat(amount) <= 0 ||
            localLoading
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
            `${type === "deposit" ? "Deposit" : "Withdraw"} $${amount || "0"}`
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Helper functions - Using only local coins database
function GetCoinCurrentPrice(localCoins, coinId) {
  if (!Array.isArray(localCoins)) return 0;

  const localCoin = localCoins.find((c) => c._id === coinId);
  return localCoin ? parseFloat(localCoin.priceUsd || 0) : 0;
}

function GetTotalValue(localCoins, assets) {
  if (!Array.isArray(assets) || assets.length === 0) {
    return 0;
  }

  var totalValue = 0;

  assets.forEach((asset) => {
    const price = GetCoinCurrentPrice(localCoins, asset.coinId);
    totalValue += (parseFloat(asset.amount) || 0) * price;
  });

  return totalValue.toFixed(2);
}

function GetCoinSymbol(localCoins, coinId) {
  if (!Array.isArray(localCoins)) return "N/A";

  const localCoin = localCoins.find((c) => c._id === coinId);
  return localCoin?.symbol || "N/A";
}

function GetCoinName(localCoins, coinId) {
  if (!Array.isArray(localCoins)) return "Unknown";

  const localCoin = localCoins.find((c) => c._id === coinId);
  return localCoin?.name || "Unknown";
}

// Main WalletPage component with local coins only
export default function WalletPage() {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const { user } = useAuthenticationContext();

  // Wallet state
  const [wallet, setWallet] = useState(null);
  const [walletLoading, setWalletLoading] = useState(true);
  const [walletError, setWalletError] = useState(null);

  // Modal states
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Local coins data
  const {
    coins: localCoins,
    loading: localCoinsLoading,
    error: localCoinsError,
  } = useLocalCoins();

  // Fetch user's wallet on component mount
  useEffect(() => {
    const fetchWallet = async () => {
      if (!user) {
        setWalletLoading(false);
        return;
      }

      try {
        setWalletLoading(true);
        setWalletError(null);

        console.log("💼 Fetching user wallet...");
        const walletData = await walletAPI.getUserWallet(user._id, user.token);
        console.log("💼 Wallet fetched successfully:", walletData);

        setWallet(walletData);
      } catch (error) {
        console.error("❌ Error fetching wallet:", error);
        setWalletError(error.message);
      } finally {
        setWalletLoading(false);
      }
    };

    fetchWallet();
  }, [user]);

  const handleModalSuccess = async () => {
    // Refresh wallet data after any transaction
    if (user) {
      try {
        const updatedWallet = await walletAPI.getUserWallet(
          user._id,
          user.token
        );
        setWallet(updatedWallet);
      } catch (error) {
        console.error("Error refreshing wallet:", error);
      }
    }
  };

  // Show loading state while fetching wallet
  if (walletLoading) {
    return (
      <Container className="vh-100 d-flex align-items-center justify-content-center">
        <Row>
          <Col className="text-center text-light">
            <Spinner
              animation="border"
              variant="light"
              size="lg"
              className="mb-3"
            />
            <h3>Loading your wallet...</h3>
          </Col>
        </Row>
      </Container>
    );
  }

  // Show error state if wallet fetch failed
  if (walletError) {
    return (
      <Container className="vh-100 d-flex align-items-center justify-content-center">
        <Row>
          <Col className="text-center text-light">
            <Alert variant="danger" className="mb-3">
              <h4>Error Loading Wallet</h4>
              <p>{walletError}</p>
            </Alert>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  // Show message if no wallet found
  if (!wallet) {
    return (
      <Container className="vh-100 d-flex align-items-center justify-content-center">
        <Row>
          <Col className="text-center text-light">
            <h3>No wallet found</h3>
            <p>Please contact support if this issue persists.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  // Chart data handling using local coins only
  const hasAssets = wallet.assets && wallet.assets.length > 0;

  console.log("📊 Chart data debug:", {
    hasAssets,
    assetsCount: wallet.assets?.length || 0,
    localCoins: localCoins?.length || 0,
    localCoinsLoading,
    localCoinsError,
  });

  const chartData = {
    labels: hasAssets
      ? wallet.assets.map((asset) => GetCoinName(localCoins, asset.coinId))
      : ["No Assets Owned"],
    datasets: [
      {
        label: "Portfolio Distribution",
        data: hasAssets
          ? wallet.assets.map((asset) => {
              const price = GetCoinCurrentPrice(localCoins, asset.coinId);
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
            }: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col sm={12} className="d-flex justify-content-center text-light">
          <h1>My Crypto Wallet</h1>
        </Col>

        {/* Control Panel */}
        <Col
          sm={3}
          className="d-flex flex-column align-items-center justify-content-center px-4"
        >
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
                  <i className="bi bi-plus-square-fill text-success" /> Buy
                  Assets
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
            {localCoinsLoading ? (
              <div className="text-center">
                <Spinner animation="border" variant="light" />
                <p className="mt-3">Loading market data...</p>
              </div>
            ) : localCoinsError ? (
              <div className="text-center">
                <Alert variant="warning">
                  <h4>Error Loading Market Data</h4>
                  <p>{localCoinsError}</p>
                </Alert>
              </div>
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
                        ${GetTotalValue(localCoins, wallet.assets)}
                      </Card.Text>
                      <hr />
                      <Card.Title>Total Portfolio</Card.Title>
                      <Card.Text className="h3 text-warning">
                        $
                        {(
                          parseFloat(wallet.depositMoney || 0) +
                          parseFloat(GetTotalValue(localCoins, wallet.assets))
                        ).toLocaleString()}
                      </Card.Text>
                    </Card.Body>
                  </Card>

                  {/* Coins Data Status */}
                  {localCoinsError && (
                    <Card
                      className="m-2 text-center"
                      bg="warning"
                      text="dark"
                      border="warning"
                    >
                      <Card.Body>
                        <Card.Text>
                          <i className="bi bi-exclamation-triangle"></i>
                          <br />
                          Error loading coin data:
                          <br />
                          {localCoinsError}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  )}

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
                      const currentPrice = GetCoinCurrentPrice(
                        localCoins,
                        asset.coinId
                      );
                      const assetValue =
                        (parseFloat(asset.amount) || 0) * currentPrice;
                      const coinName = GetCoinName(localCoins, asset.coinId);
                      const coinSymbol = GetCoinSymbol(
                        localCoins,
                        asset.coinId
                      );

                      return (
                        <Card
                          key={asset.coinId || index}
                          className="m-2 text-center"
                          bg="primary"
                          text="dark"
                          border="primary"
                        >
                          <Card.Header className="text-light">
                            <span className="h4">{coinSymbol}</span>
                          </Card.Header>
                          <Card.Body className="bg-light rounded">
                            <Card.Title>{coinName}</Card.Title>
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
      </Row>
    </Container>
  );
}

// Export walletAPI for use in other components if needed
export { walletAPI };
