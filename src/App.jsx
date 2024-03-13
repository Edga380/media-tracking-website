import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import NotFound from "./NotFound";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          }
        />
        {isLoggedIn && <Route path="/Home" element={<Home />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
