import "./App.css";
import Login from "./Pages/Login.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Success from "./Pages/Success.js";
import Home from "./Pages/Home";

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
