
import React, { useContext } from "react";
import { WalletContext } from "./WalletContext";

const WalletBar = () => {
  const { walletAddress, connectWallet } = useContext(WalletContext);

  return (
    <div style={{
      position: "absolute",
      top: 10,
      right: 20,
      backgroundColor: "#1f2937",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "8px",
      fontSize: "0.9rem"
    }}>
      {walletAddress ? (
        <span>Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
      ) : (
        <button onClick={connectWallet} style={{ background: "#2563eb", border: "none", padding: "8px 12px", color: "#fff", borderRadius: "6px", cursor: "pointer" }}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletBar;
