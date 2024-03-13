// Import necessary components from react-router-dom to handle routing.
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import the Home page and Navbar components to be used in the routing setup.
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    // Encapsulates the entire application within a BrowserRouter to enable client-side routing.
    <div className="App">
      <BrowserRouter>
        {/* Navbar component placed outside the Routes to ensure it's always visible, regardless of the route. */}
        <Navbar />
        {/* Container for the page content, allowing for easy styling and layout management. */}
        <div className="pages">
          {/* Defines the routing structure for the application. */}
          <Routes>
            {/* Route definition for the root path. Renders the Home component when the URL matches '/'. */}
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

// Makes the App component available for import in other files.
export default App;
