// Import the Link component from react-router-dom to enable client-side navigation between routes.
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
/**
 * Navbar component for the application.
 * Provides a top-level navigation element, allowing users to navigate through the app without full page reloads.
 */
const Navbar = () => {
  return (
    // Semantically marks the navigation area of the application.
    <header>
      {/* Container div for styling purposes, often used to limit content width or center content horizontally. */}
      <div className="container">
        {/* The Link component is used here for client-side routing to the application's home page ("/"). */}
        <Link to="/">
          {/* The site's title or logo inside the Link; clicking it navigates the user to the home page. */}
          <h1>CryptIQ</h1>
        </Link>
      </div>
    </header>
  );
};

// Export the Navbar component to make it available for use in other parts of the application.
export default Navbar;
