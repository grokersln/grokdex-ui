
import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Mint from "./Mint";
import Launch from "./Launch";
import GrokBuy from "./GrokBuy";
import GrokLock from "./GrokLock";
import GrokScanner from "./GrokScanner";
import GrokBoard from "./GrokBoard";
import logo from "./assets/grokdex-logo.png";
import "./App.css";

const Home = () => {
  const navigate = useNavigate();

  const modules = [
    { title: "Token Mint", path: "/mint", color: "blue", icon: "🪙" },
    { title: "Launch Presale", path: "/launch", color: "green", icon: "🚀" },
    { title: "Buy Tokens", path: "/buy", color: "yellow", icon: "💸" },
    { title: "Lock Tokens", path: "/lock", color: "blue", icon: "🔐" },
    { title: "Token Scanner", path: "/scanner", color: "orange", icon: "🔎" },
    { title: "Token Board", path: "/board", color: "purple", icon: "📊" },
  ];

  return (
    <div className="home-container">
      <img src={logo} alt="GrokDex Logo" className="logo" />
      <h1>Welcome to GrokDex</h1>
      <p>Build your decentralized exchange</p>
      <div className="card-grid">
        {modules.map((mod, index) => (
          <div key={index} className={`card ${mod.color}`} onClick={() => navigate(mod.path)}>
            <div className="card-icon">{mod.icon}</div>
            <div className="card-title">{mod.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/launch" element={<Launch />} />
        <Route path="/buy" element={<GrokBuy />} />
        <Route path="/lock" element={<GrokLock />} />
        <Route path="/scanner" element={<GrokScanner />} />
        <Route path="/board" element={<GrokBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
