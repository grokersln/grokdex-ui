import React, { useState } from 'react';
import { ethers } from 'ethers';

function Mint() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState('');
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
        alert("Cüzdan bağlandı: " + accounts[0]);
      } catch (error) {
        console.error("Cüzdan bağlantısı reddedildi:", error);
      }
    } else {
      alert("Metamask yüklü değil. Lütfen tarayıcınıza Metamask ekleyin.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!walletAddress) {
      alert("Lütfen önce cüzdanınızı bağlayın.");
      return;
    }

    console.log("Cüzdan:", walletAddress);
    console.log("Token Adı:", name);
    console.log("Sembol:", symbol);
    console.log("Toplam Arz:", supply);
    alert("Veriler alındı. Bir sonraki adım: blockchain'e yazmak!");
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>GrokMint - Jeton Oluşturma</h2>

      {!walletAddress && (
        <button
          onClick={connectWallet}
          style={{
            backgroundColor: '#ffc107',
            color: '#000',
            padding: '10px 20px',
            marginBottom: '20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Cüzdanı Bağla
        </button>
      )}

      {walletAddress && (
        <p style={{ color: '#0f0' }}>Bağlı: {walletAddress}</p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Token Adı:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '300px', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Sembol:</label><br />
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
            style={{ width: '300px', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Toplam Arz:</label><br />
          <input
            type="number"
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            required
            style={{ width: '300px', padding: '8px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#28a745',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Oluştur
        </button>
      </form>
    </div>
  );
}

export default Mint;
