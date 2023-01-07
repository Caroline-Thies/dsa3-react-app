import "./App.css";
import Login from "./Pages/Login.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Success from "./Pages/Success.js";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
