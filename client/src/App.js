// Import necessary components from react-router-dom to manage routing within the application.
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Imports React Components
import Container from 'react-bootstrap/Container'
// Import the Home component to be used as the main page of the application.
import Home from "./pages/Home";

import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"
import Support from './pages/Support';
import Markets from "./pages/Markets";
import Blog from "./pages/Blog"

// import Navbar from "./components/NavigationBar";
import Navbar from "./components/NavigationBar";
import "react-bootstrap"
/**
 * The App component acts as the root component of the application, wrapping all other components.
 */
function App() {
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
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/Support" element={<Support />} />
            <Route path="/Markets" element={<Markets/>}/>
            <Route path="/Blog" element={<Blog/>}/>
          </Routes>
      </BrowserRouter>
    </Container>
  );
}

// Export the App component so it can be used as the entry point for the React application.
export default App;
