import { React, useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import Wallet from "../components/Wallet";
import WalletPage from "./WalletPage";
import "./Wallet.scss";

// Custom hook for wallet management with real API integration
const useWallets = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthenticationContext();

  const fetchWallets = async () => {
    if (!user) {
      setWallets([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/wallet/user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 404) {
        // No wallet exists, create one
        const createResponse = await fetch("/api/wallet", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        });

        if (!createResponse.ok) {
          throw new Error("Failed to create wallet");
        }

        const newWallet = await createResponse.json();
        const transformedWallet = {
          name: `${user.email}'s Wallet`,
          assets: newWallet.assets || [],
          depositMoney: newWallet.depositMoney || 0,
          _id: newWallet._id,
          userId: newWallet.userId,
        };
        setWallets([transformedWallet]);
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch wallet: ${response.status}`);
      }

      const walletData = await response.json();

      // Transform API data to match component expectations
      const transformedWallet = {
        name: `${user.email}'s Wallet`,
        assets: walletData.assets || [],
        depositMoney: walletData.depositMoney || 0,
        _id: walletData._id,
        userId: walletData.userId,
      };

      setWallets([transformedWallet]);
    } catch (err) {
      console.error("Error fetching wallets:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, [user]);

  return { wallets, loading, error, refetch: fetchWallets };
};

// Wallet API operations
export const walletAPI = {
  // Function to buy assets
  buyAsset: async (userId, coinId, coinName, amount, pricePerUnit, token) => {
    try {
      const response = await fetch("/api/wallet/buy", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          coinId,
          coinName,
          amount: parseFloat(amount),
          pricePerUnit: parseFloat(pricePerUnit),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to buy asset");
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Buy operation failed: ${error.message}`);
    }
  },

  // Function to sell assets
  sellAsset: async (userId, coinId, amount, pricePerUnit, token) => {
    try {
      const response = await fetch("/api/wallet/sell", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          coinId,
          amount: parseFloat(amount),
          pricePerUnit: parseFloat(pricePerUnit),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to sell asset");
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Sell operation failed: ${error.message}`);
    }
  },

  // Function to deposit money
  depositMoney: async (userId, amount, token) => {
    try {
      const response = await fetch("/api/wallet/deposit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          amount: parseFloat(amount),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to deposit money");
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Deposit failed: ${error.message}`);
    }
  },

  // Function to withdraw money
  withdrawMoney: async (userId, amount, token) => {
    try {
      const response = await fetch("/api/wallet/withdraw", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          amount: parseFloat(amount),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to withdraw money");
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Withdrawal failed: ${error.message}`);
    }
  },
};

export default function Wallets() {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const { wallets, loading, error, refetch } = useWallets();

  if (loading) {
    return (
      <Row className="mt-2 min-vh-100 justify-content-center align-items-center">
        <Col xs="auto" className="text-center">
          <Spinner animation="border" variant="primary" size="lg" />
          <p className="text-light mt-3">Loading your wallets...</p>
        </Col>
      </Row>
    );
  }

  if (error) {
    return (
      <Row className="mt-2 min-vh-100 justify-content-center align-items-center">
        <Col md={6}>
          <Alert variant="danger" className="text-center">
            <Alert.Heading>Error Loading Wallets</Alert.Heading>
            <p>{error}</p>
            <Button variant="outline-danger" onClick={refetch}>
              Try Again
            </Button>
          </Alert>
        </Col>
      </Row>
    );
  }

  if (wallets.length === 0) {
    return (
      <Row className="mt-2 min-vh-100 justify-content-center align-items-center">
        <Col md={6} className="text-center">
          <div className="text-light">
            <h3>No Wallets Found</h3>
            <p>
              You don't have any wallets yet. One will be created automatically!
            </p>
            <Button variant="primary" size="lg" onClick={refetch}>
              Create Wallet
            </Button>
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <Row className="mt-2 min-vh-100">
      <Col
        sm={12}
        className={
          selectedWallet === null
            ? "min-vh-100 d-flex align-items-center justify-content-center"
            : ""
        }
      >
        <Container fluid>
          <Row
            className={
              selectedWallet === null
                ? "justify-content-center"
                : "vh-100 max-vh-100"
            }
          >
            {selectedWallet === null ? (
              wallets.map((wallet) => (
                <Col
                  sm={3}
                  key={wallet._id || wallet.name}
                  onClick={() => setSelectedWallet(wallet)}
                >
                  <Wallet className="wallet" walletName={wallet.name} />
                </Col>
              ))
            ) : (
              <WalletPage
                wallet={selectedWallet}
                onWalletUpdate={refetch}
                onGoBack={() => setSelectedWallet(null)}
              />
            )}
          </Row>
        </Container>
      </Col>
    </Row>
  );
}
