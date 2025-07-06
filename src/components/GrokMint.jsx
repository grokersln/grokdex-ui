import React, { useState } from "react";
import Web3 from "web3";
import TokenABI from "../abi/TokenABI.json";
import TokenBytecode from "../abi/TokenBytecode.json";

function GrokMint() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");

  const handleDeploy = async () => {
    if (!window.ethereum) return alert("MetaMask yüklü değil.");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    const sender = accounts[0];

    const contract = new web3.eth.Contract(TokenABI);

    try {
      const deployTx = contract.deploy({
        data: TokenBytecode.bytecode,
        arguments: [name, symbol, web3.utils.toWei(supply, "ether")],
      });

      const newToken = await deployTx.send({
        from: sender,
        gas: 3000000,
      });

      alert(`✅ Token oluşturuldu: ${newToken.options.address}`);
    } catch (err) {
      console.error(err);
      alert("❌ Token oluşturulamadı: " + err.message);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>GrokMint - Token Oluştur</h2>
      <input
        type="text"
        placeholder="Token Adı"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Sembol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Toplam Arz (örn: 1000000)"
        value={supply}
        onChange={(e) => setSupply(e.target.value)}
      /><br />
      <button onClick={handleDeploy} style={{ marginTop: "10px" }}>
        Yarasa
      </button>
    </div>
  );
}

export default GrokMint;
