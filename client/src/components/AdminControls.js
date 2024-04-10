// Import React and its hooks to build the component functionality.
import React, { useEffect } from "react";
// Import components related to user actions within the admin panel.
import SignUpUser from "./SignUpUser";
import AddNewCoin from "./AddNewCoin";
import UserDetails from "./UserDetails";
import CoinDetails from "./CoinDetails";
import { Container, Row, Col } from "react-bootstrap";
import { useAdminContext } from "../hooks/useAdminContext";
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
/**
 * AdminControls component for managing user-related administrative functions.
 * This component handles user registration and displays a list of users.
 */
const AdminControls = () => {
  const { users, coins, dispatch } = useAdminContext();
  const { user } = useAuthenticationContext();
  useEffect(() => {
    /**
     * Fetches and updates the state with user data from the server.
     * It asynchronously retrieves user data from the `/api/adminRoutes` endpoint and updates the `users` state.
     */
    const fetchUsers = async () => {
      const response = await fetch("/api/admin", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        //executes the usersReducer function
        dispatch({ type: "SET_USERS", payload: json });
      }
    };
    const fetchCoins = async () => {
      const response = await fetch("/api/coins", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        //executes the usersReducer function
        dispatch({ type: "SET_COINS", payload: json });
      }
    };
    if (user) {
      fetchUsers();
      fetchCoins(); // Execute the fetch operation when the component mounts.
    }
  }, [dispatch, user]);

  return (
    <>
      <Row className="admin-controls mt-4">
        <Col sm={12} className="text-center">
          <h1>Admin Controls</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Container fluid className="bg-primary p-4 rounded">
            <Row>
              <Col sm={12} className="text-center">
                <h2>Users Controls</h2>
              </Col>
            </Row>
            <hr className="bg-dark" />
            <Row>
              <Col sm={12} className="text-center">
                <h3>Create a New User</h3>
              </Col>
              <Col sm={12}>
                <Row className="justify-content-center my-2">
                  <Col sm={6}>
                    <SignUpUser />
                  </Col>
                </Row>
              </Col>
              <hr className="bg-dark" />
              <Col sm={12}>
                <Container fluid>
                  <Row>
                    <Col sm={12} className="text-center mb-2">
                      <h3>List of Users</h3>
                    </Col>
                  </Row>
                  <Row>
                    {users &&
                      users.map((user) => (
                        <Col sm={4} className="text-center p-2">
                          <UserDetails key={user._id} user={user} />
                        </Col>
                      ))}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col sm={6}>
          <Container fluid className="bg-primary p-4 rounded">
            <Row>
              <Col sm={12} className="text-center">
                <h2>Coins Controls</h2>
              </Col>
            </Row>
            <hr className="bg-dark" />
            <Row>
              <Col sm={12} className="text-center">
                <h3>Add Coin</h3>
              </Col>
            </Row>
            <Row className="justify-content-center my-2">
              <Col sm={6}>
                <AddNewCoin />
              </Col>
            </Row>
            <hr className="bg-dark" />
            <Row>
              <Col sm={12}>
                <Container fluid>
                  <Row className="text-center">
                    <Col sm={12}>
                      <h3>List of Coins</h3>
                    </Col>
                  </Row>
                  <Row>
                    {coins &&
                      coins.map((coin) => (
                        <Col sm={4} className="text-center p-2">
                          <CoinDetails key={coin._id} coin={coin} />
                        </Col>
                      ))}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default AdminControls; // Make AdminControls available for import in other components.
