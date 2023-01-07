import "./App.css";
import Login from "./Pages/Login.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Success from "./Pages/Success.js";
import Home from "./Pages/Home";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/dsa3-react-app" element={<Login />} />
        <Route path="/dsa3-react-app/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
