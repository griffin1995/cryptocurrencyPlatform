import { React, useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import Wallet from "../components/Wallet";
import WalletPage from "./WalletPage";
import "./Wallet.scss";

export default function Wallets() {
  var [selectedWallet, setSelectedWallet] = useState(null);

  const asset1 = {
    name: "Bitcoin",
    id: "bitcoin",
    amount: "202",
  };

  const asset2 = {
    name: "Ethereum",
    id: "ethereum",
    amount: "1234",
  };

  const asset3 = {
    name: "Dogecoin",
    id: "dogecoin",
    amount: "123",
  };
  const asset4 = {
    name: "Chainlink",
    id: "chainlink",
    amount: "5678",
  };

  const asset5 = {
    name: "Polkadot",
    id: "polkadot",
    amount: "890",
  };

  const asset6 = {
    name: "Uniswap",
    id: "uniswap",
    amount: "4567",
  };

  const asset7 = {
    name: "Solana",
    id: "solana",
    amount: "12345",
  };

  const asset8 = {
    name: "Aave",
    id: "aave",
    amount: "678",
  };

  const asset9 = {
    name: "Cosmos",
    id: "cosmos",
    amount: "9012",
  };

  const asset10 = {
    name: "Compound",
    id: "compound",
    amount: "3456",
  };

  const asset11 = {
    name: "Theta",
    id: "theta",
    amount: "7890",
  };

  const asset12 = {
    name: "Filecoin",
    id: "filecoin",
    amount: "2345",
  };

  const asset13 = {
    name: "VeChain",
    id: "vechain",
    amount: "6789",
  };

  const asset14 = {
    name: "Neo",
    id: "neo",
    amount: "1234",
  };

  const asset15 = {
    name: "Tezos",
    id: "tezos",
    amount: "567",
  };

  const asset16 = {
    name: "Zilliqa",
    id: "zilliqa",
    amount: "8901",
  };

  const asset17 = {
    name: "Aeternity",
    id: "aeternity",
    amount: "2345",
  };

  const asset18 = {
    name: "Maker",
    id: "maker",
    amount: "6789",
  };

  const asset19 = {
    name: "DigiByte",
    id: "digibyte",
    amount: "1234",
  };

  const asset20 = {
    name: "ICON",
    id: "icon",
    amount: "567",
  };

  const asset21 = {
    name: "Synthetix",
    id: "synthetix",
    amount: "890",
  };

  const asset22 = {
    name: "Yearn.finance",
    id: "yearn-finance",
    amount: "1234",
  };

  const asset23 = {
    name: "SushiSwap",
    id: "sushiswap",
    amount: "567",
  };

  const asset24 = {
    name: "Curve DAO Token",
    id: "curve-dao-token",
    amount: "8901",
  };

  const asset25 = {
    name: "Nexo",
    id: "nexo",
    amount: "2345",
  };

  const asset26 = {
    name: "Hedera Hashgraph",
    id: "hedera-hashgraph",
    amount: "6789",
  };

  const asset27 = {
    name: "Enjin Coin",
    id: "enjin-coin",
    amount: "1234",
  };

  const asset28 = {
    name: "Decentraland",
    id: "decentraland",
    amount: "567",
  };

  const asset29 = {
    name: "0x",
    id: "0x",
    amount: "8901",
  };

  const asset30 = {
    name: "Ren",
    id: "ren",
    amount: "2345",
  };

  const assets1 = [
    asset1,
    asset2,
    asset3,
    asset4,
    asset5,
    asset6,
    asset7,
    asset8,
    asset9,
    asset10,
    asset11,
    asset12,
    asset13,
    asset14,
    asset15,
    asset16,
    asset17,
    asset18,
    asset19,
    asset20,
    asset21,
    asset22,
    asset23,
    asset24,
    asset25,
    asset26,
    asset27,
    asset28,
    asset29,
    asset30,
  ];

  const assets2 = [
    asset1,
    asset2,
    asset3,
    asset4,
    asset5,
    asset9,
    asset10,
    asset11,
    asset12,
    asset13,
    asset14,
    asset19,
    asset20,
    asset24,
    asset25,
    asset29,
    asset30,
  ];

  const wallet1 = {
    name: "My First Wallet",
    assets: assets1,
    depositMoney: 2000,
  };

  const wallet2 = {
    name: "My Second Wallet",
    assets: assets2,
    depositMoney: 1000,
  };

  const wallets = [wallet1, wallet2];
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
              wallets.map((wallet) => {
                return (
                  <Col sm={3} onClick={() => setSelectedWallet(wallet)}>
                    <Wallet className="wallet" walletName={wallet.name} />
                  </Col>
                );
              })
            ) : (
              <WalletPage wallet={selectedWallet} />
            )}
          </Row>
        </Container>
      </Col>
    </Row>
  );
}
