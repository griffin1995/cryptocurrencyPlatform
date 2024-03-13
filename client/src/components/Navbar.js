// Import the Link component from react-router-dom for client-side navigation.
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    // Defines the navigation bar area.
    <header>
      {/* Wraps navigation elements in a div for styling and layout purposes. */}
      <div className="container">
        {/* Link component used for navigation. Here, it navigates to the home page ("/"). */}
        <Link to="/">
          {/* The clickable title inside the Link. Clicking this text navigates users to the home page. */}
          <h1>CryptoIQ or whatever it was</h1>
        </Link>{" "}
      </div>
    </header>
  );
};

// Exports the Navbar component for use in other parts of the application.
export default Navbar;
