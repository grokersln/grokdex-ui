import React, { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x74fFa9134d45E9C5D3b1576BaD66CB6e5F12fb9B";

function GrokBuy() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [bnbAmount, setBnbAmount] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
    } else {
      alert("Metamask yüklü değil.");
    }
  };

  const handleBuy = async () => {
    try {
      if (!walletAddress) return alert("Cüzdan bağlı değil.");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: CONTRACT_ADDRESS,
        value: ethers.parseEther(bnbAmount),
      });

      await tx.wait();
      alert("✅ Token satın alımı başarılı!");
    } catch (err) {
      console.error(err);
      alert("❌ Hata: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>GrokBuy - Token Satın Al</h2>

      {!walletAddress ? (
        <button onClick={connectWallet}>Cüzdanı Bağla</button>
      ) : (
        <p style={{ color: "#0f0" }}>Cüzdan: {walletAddress}</p>
      )}

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="BNB miktarı"
          value={bnbAmount}
          onChange={(e) => setBnbAmount(e.target.value)}
        />
        <br />
        <button onClick={handleBuy} style={{ marginTop: "10px" }}>
          Token Satın Al
        </button>
      </div>
    </div>
  );
}

export default GrokBuy;
