// Import necessary components from react-router-dom to manage routing within the application.
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Imports React Components
import Container from "react-bootstrap/Container";
// Import the Home component to be used as the main page of the application.
import Home from "./pages/Home";

import AdminControls from "./pages/AdminControls";
import Blog from "./pages/Blog";
import SignUp from "./pages/SignUp";
// import LogIn from "./pages/LogIn";
import LogIn from './pages/LogIn';
import Support from "./pages/Support";
import Markets from "./pages/Markets";
import Wallets from "./pages/Wallets";
import Account from "./pages/Account";

import { useAuthenticationContext } from "./hooks/useAuthenticationContext";

// import Navbar from "./components/NavigationBar";
import Navbar from "./components/NavigationBar";
import "react-bootstrap";
/**
 * The App component acts as the root component of the application, wrapping all other components.
 */
function App() {
  const { user } = useAuthenticationContext();

  return (
    // Use BrowserRouter to enable client-side routing throughout the application.
    <Container fluid className="App bg-dark">
      <BrowserRouter>
        {/* Render the Navbar component to be displayed across all routes for consistent navigation. */}
        <Navbar />
        {/* Routes component manages the mapping between URL paths and the components that should be rendered. */}
        <Routes>
          {/* Define a Route for the root path ('/'). It specifies that the Home component should be rendered when the path matches exactly '/'. */}
          <Route exact path="/" element={<Home />} />
          <Route
            path="/Admin-Controls"
            element={user ? <AdminControls /> : <LogIn />}
          />
          {/* Protected routes that require the user to be logged in */}
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Markets" element={user ? <Markets /> : <LogIn />} />
          <Route path="/Account" element={user ? <Account /> : <LogIn />} />
          <Route path="/Support" element={user ? <Support /> : <LogIn />} />

          {/* Routes that are inaccessible to logged-in users, redirecting them to the Home page */}
          <Route
            path="/Sign-Up"
            element={user ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/Log-In"
            element={user ? <Navigate to="/" /> : <LogIn />}
          />
          <Route path="/Wallets" element={user ? <Wallets /> : <LogIn />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

// Export the App component so it can be used as the entry point for the React application.
export default App;
