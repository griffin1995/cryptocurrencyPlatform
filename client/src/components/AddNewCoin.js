// Import the useState hook from React to manage the state within our component.
// This will allow us to keep track of coin inputs and feedback messages.
import { useState } from "react";
// Import our custom hook, useAdminContext, to interact with our global admin state.
// This lets us dispatch actions (like adding a new coin) that can affect the whole app.
import { useAdminContext } from "../hooks/useAdminContext";
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import {Form, Button} from "react-bootstrap";

/**
 * CreateCoin is a component that renders a form for coin creation.
 * It captures coin details through form inputs, validates and submits this data to a server,
 * and handles the response to either show a success message or an error message.
 */
const CreateCoin = () => {
  // Access the 'dispatch' function from our admin context using the custom hook.
  // This function allows us to send actions to our global state to update it,
  // such as adding a new coin to our list of coins.
  const { dispatch } = useAdminContext();
  const { user } = useAuthenticationContext();

  // useState hooks for managing form inputs and submission feedback.
  const [id, setId] = useState("");
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [supply, setSupply] = useState("");
  const [maxSupply, setMaxSupply] = useState("");
  const [marketCapUsd, setMarketCapUsd] = useState("");
  const [volumeUsd24Hr, setVolumeUsd24Hr] = useState("");
  const [priceUsd, setPriceUsd] = useState("");
  const [changePercent24Hr, setChangePercent24Hr] = useState("");
  const [vwap24Hr, setVwap24Hr] = useState("");
  const [explorer, setExplorer] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the form from submitting in the traditional way (no page reload).
    if (!user) {
      setError(
        "You must be logged in with admin privileges to create a new coin."
      );
      return;
    }

    const newCoin = {
      id,
      symbol,
      name,
      supply,
      maxSupply,
      marketCapUsd,
      volumeUsd24Hr,
      priceUsd,
      changePercent24Hr,
      vwap24Hr,
      explorer,
    };

    try {
const response = await fetch("http://localhost:4000/api/coins", {        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newCoin),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }

      setSuccess(`Success! The coin ${name} has been created.`);
      setError(null);
      resetFormFields();

      // Dispatches an action to our global state to add the new coin to our list of coins.
      dispatch({ type: "CREATE_COIN", payload: json });
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  const resetFormFields = () => {
    setId("");
    setSymbol("");
    setName("");
    setSupply("");
    setMaxSupply("");
    setMarketCapUsd("");
    setVolumeUsd24Hr("");
    setPriceUsd("");
    setChangePercent24Hr("");
    setVwap24Hr("");
    setExplorer("");
    setEmptyFields([]);
  };

  return (
    <Form className="createCoin bg-dark p-4 rounded" onSubmit={handleSubmit}>
      <Form.Group controlId="id" className="mb-2">
        <Form.Label>ID:</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setId(e.target.value)}
          value={id}
          className={emptyFields.includes("id") ? "error" : ""}
        />
      </Form.Group>

      <Form.Group controlId="symbol" className="mb-2">
        <Form.Label>Symbol:</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setSymbol(e.target.value)}
          value={symbol}
          className={emptyFields.includes("symbol") ? "error" : ""}
        />
      </Form.Group>

      <Form.Group controlId="name" className="mb-2">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={emptyFields.includes("name") ? "error" : ""}
        />
      </Form.Group>

      <Form.Group controlId="supply" className="mb-2">
        <Form.Label>Supply:</Form.Label>
        <Form.Control
          type="number"
          onChange={(e) => setSupply(e.target.value)}
          value={supply}
        />
      </Form.Group>

      <Form.Group controlId="maxSupply" className="mb-2">
        <Form.Label>Max Supply:</Form.Label>
        <Form.Control
          type="number"
          onChange={(e) => setMaxSupply(e.target.value)}
          value={maxSupply}
        />
      </Form.Group>

      <Form.Group controlId="marketCapUsd" className="mb-2">
        <Form.Label>Market Cap USD:</Form.Label>
        <Form.Control
          type="number"
          onChange={(e) => setMarketCapUsd(e.target.value)}
          value={marketCapUsd}
        />
      </Form.Group>

      <Form.Group controlId="volumeUsd24Hr" className="mb-2">
        <Form.Label>Volume USD 24Hr:</Form.Label>
        <Form.Control
          type="number"
          onChange={(e) => setVolumeUsd24Hr(e.target.value)}
          value={volumeUsd24Hr}
        />
      </Form.Group>

      <Form.Group controlId="priceUsd" className="mb-2">
        <Form.Label>Price USD:</Form.Label>
        <Form.Control
          type="number"
          onChange={(e) => setPriceUsd(e.target.value)}
          value={priceUsd}
        />
      </Form.Group>

      <Form.Group controlId="changePercent24Hr" className="mb-2">
        <Form.Label>Change Percent 24Hr:</Form.Label>
        <Form.Control
          type="number"
          onChange={(e) => setChangePercent24Hr(e.target.value)}
          value={changePercent24Hr}
        />
      </Form.Group>

      <Form.Group controlId="vwap24Hr" className="mb-2">
        <Form.Label>VWAP 24Hr:</Form.Label>
        <Form.Control
          type="number"
          onChange={(e) => setVwap24Hr(e.target.value)}
          value={vwap24Hr}
        />
      </Form.Group>

      <Form.Group controlId="explorer" className="mb-2">
        <Form.Label>Explorer:</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setExplorer(e.target.value)}
          value={explorer}
        />
      </Form.Group>

      <Button variant="secondary" type="submit" className="my-2 w-100">
        Create Coin
      </Button>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </Form>
  );
};

export default CreateCoin;
