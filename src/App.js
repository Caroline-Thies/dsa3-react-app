import "./App.css";
import Login from "./Pages/Login.js";
import Home from "./Pages/Home";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState("Login");

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (currentPage === "Login") {
      return <Login navigate={navigate} />;
    } else if (currentPage === "Home") {
      return <Home navigate={navigate} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
