import React, { useState } from "react";
import { ethers } from "ethers";

function GrokScanner() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    try {
      if (!tokenAddress) return alert("Token adresi girin.");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        tokenAddress,
        [
          "function name() view returns (string)",
          "function symbol() view returns (string)",
          "function decimals() view returns (uint8)",
          "function totalSupply() view returns (uint256)"
        ],
        provider
      );

      const [name, symbol, decimals, totalSupply] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
        contract.totalSupply()
      ]);

      setResult({
        name,
        symbol,
        decimals,
        totalSupply: ethers.formatUnits(totalSupply, decimals)
      });
    } catch (err) {
      console.error(err);
      alert("❌ Token bilgileri alınamadı.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>GrokScanner - Token Bilgisi Tara</h2>
      <input
        type="text"
        placeholder="Token adresi girin"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        style={{ width: "300px", padding: "8px" }}
      />
      <br />
      <button onClick={handleScan} style={{ marginTop: "10px" }}>
        Taramayı Başlat
      </button>

      {result && (
        <div style={{ marginTop: "20px", textAlign: "left", display: "inline-block" }}>
          <p><strong>Ad:</strong> {result.name}</p>
          <p><strong>Sembol:</strong> {result.symbol}</p>
          <p><strong>Desimal:</strong> {result.decimals}</p>
          <p><strong>Toplam Arz:</strong> {result.totalSupply}</p>
        </div>
      )}
    </div>
  );
}

export default GrokScanner;
