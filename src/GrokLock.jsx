import React, { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xYourLockContractAddressHere"; // Daha sonra güncellenecek

function GrokLock() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [tokenAddress, setTokenAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [unlockTime, setUnlockTime] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
    } else {
      alert("Metamask yüklü değil.");
    }
  };

  const handleLock = async () => {
    if (!walletAddress) return alert("Lütfen cüzdanınızı bağlayın.");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const token = new ethers.Contract(
        tokenAddress,
        [
          "function approve(address spender, uint256 amount) public returns (bool)"
        ],
        signer
      );

      const lockContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        [
          "function lockTokens(address token, uint256 amount, uint256 unlockTime) public"
        ],
        signer
      );

      const parsedAmount = ethers.parseUnits(amount, 18);
      const unlockTimestamp = parseInt(unlockTime);

      const approveTx = await token.approve(CONTRACT_ADDRESS, parsedAmount);
      await approveTx.wait();

      const lockTx = await lockContract.lockTokens(tokenAddress, parsedAmount, unlockTimestamp);
      await lockTx.wait();

      alert("✅ Token başarıyla kilitlendi!");
    } catch (err) {
      console.error(err);
      alert("❌ Hata: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>GrokLock - Token Kilitle</h2>

      {!walletAddress ? (
        <button onClick={connectWallet}>Cüzdanı Bağla</button>
      ) : (
        <p style={{ color: "#0f0" }}>Cüzdan: {walletAddress}</p>
      )}

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Token Adresi"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Kilitlenecek Miktar"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Açılma Zamanı (Unix Timestamp)"
          value={unlockTime}
          onChange={(e) => setUnlockTime(e.target.value)}
        /><br />
        <button onClick={handleLock} style={{ marginTop: "10px" }}>
          Kilitle
        </button>
      </div>
    </div>
  );
}

export default GrokLock;
