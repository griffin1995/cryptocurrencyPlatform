//Navbar component for the application.
//Provides a top-level navigation element, allowing users to navigate through the app without full page reloads.
import { Row, Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavigationBar.scss";
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import { useLogout } from "../hooks/useLogout";

export default function NavigationBar() {
  const { user } = useAuthenticationContext();
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  return (
    <Row>
      <Navbar expand="lg" className="navbar-dark bg-secondary">
        <Container fluid className="px-5">
          <Navbar.Brand as={Link} to="/">
            <span className="h4">
              Crypti<span className="text-primary fw-bold">Q</span>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1">
              {/* Display the user's email if logged in */}
              {user && (
                <>
                  <Nav.Link disabled className="text-light">
                    {user.email}
                  </Nav.Link>
                  <Nav.Link>
                    Account
                  </Nav.Link>
                  <Nav.Link>
                    Wallets
                  </Nav.Link>
                </>
              )}
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/Markets">
                Markets
              </Nav.Link>
              <Nav.Link as={Link} to="/Blog">
                Blog
              </Nav.Link>
              <Nav.Link as={Link} to="/Support">
                Support
              </Nav.Link>
              {/* Show sign up and login links only if user is not logged in */}
              {!user && (
                <>
                  <Nav.Link as={Link} to="/login">
                    Log In
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup" className="btn btn-primary rounded-pill">
                    Sign Up
                  </Nav.Link>
                </>
              )}
              {/* Logout button visible only if user is logged in */}
              {user && (
                <Button type="submit" onClick={handleClick}>
                  Log Out
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Row>
  );
}
