import React, { useState } from 'react';
import { ethers } from 'ethers';

function Launch() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [softcap, setSoftcap] = useState('');
  const [hardcap, setHardcap] = useState('');
  const [rate, setRate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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
    console.log("Token Adresi:", tokenAddress);
    console.log("Softcap:", softcap);
    console.log("Hardcap:", hardcap);
    console.log("Fiyat (1 BNB = ? Token):", rate);
    console.log("Başlangıç:", startDate);
    console.log("Bitiş:", endDate);
    alert("Veriler alındı. Akıllı kontrat bağlantısı bir sonraki adım.");
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>GrokLaunch - Ön Satış Oluştur</h2>

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
          <label>Token Adresi:</label><br />
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            required
            style={{ width: '350px', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Softcap (BNB):</label><br />
          <input
            type="number"
            value={softcap}
            onChange={(e) => setSoftcap(e.target.value)}
            required
            style={{ width: '350px', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Hardcap (BNB):</label><br />
          <input
            type="number"
            value={hardcap}
            onChange={(e) => setHardcap(e.target.value)}
            required
            style={{ width: '350px', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Fiyat: 1 BNB = ? Token</label><br />
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
            style={{ width: '350px', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Başlangıç Tarihi:</label><br />
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={{ width: '350px', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Bitiş Tarihi:</label><br />
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={{ width: '350px', padding: '8px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Ön Satışı Başlat
        </button>
      </form>
    </div>
  );
}

export default Launch;
