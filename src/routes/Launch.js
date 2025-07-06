
import React, { useState } from 'react';
import Web3 from 'web3';
import GrokPresaleABI from '../abi/GrokPresaleABI.json';

const contractAddress = '0x74fFa9134d45E9C5D3b1576BaD66CB6e5F12fb9B';

const Launch = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [softCap, setSoftCap] = useState('');
  const [hardCap, setHardCap] = useState('');
  const [minBuy, setMinBuy] = useState('');
  const [maxBuy, setMaxBuy] = useState('');
  const [message, setMessage] = useState('');

  const handleLaunch = async () => {
    if (!window.ethereum) return alert("MetaMask is not installed");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    const contract = new web3.eth.Contract(GrokPresaleABI, contractAddress);

    try {
      setMessage('Transaction is being sent...');

      await contract.methods
        .startPresale(
          tokenAddress,
          web3.utils.toWei(softCap, 'ether'),
          web3.utils.toWei(hardCap, 'ether'),
          web3.utils.toWei(minBuy, 'ether'),
          web3.utils.toWei(maxBuy, 'ether')
        )
        .send({ from: accounts[0] });

      setMessage('Presale successfully launched ✅');
    } catch (err) {
      console.error(err);
      setMessage('Transaction failed ❌');
    }
  };

  return (
    <div className="launch-container">
      <h2>Launch Token Presale</h2>
      <input placeholder="Token Address" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} />
      <input placeholder="Soft Cap (BNB)" value={softCap} onChange={(e) => setSoftCap(e.target.value)} />
      <input placeholder="Hard Cap (BNB)" value={hardCap} onChange={(e) => setHardCap(e.target.value)} />
      <input placeholder="Min Buy (BNB)" value={minBuy} onChange={(e) => setMinBuy(e.target.value)} />
      <input placeholder="Max Buy (BNB)" value={maxBuy} onChange={(e) => setMaxBuy(e.target.value)} />
      <button onClick={handleLaunch}>Start Presale</button>
      <p>{message}</p>
    </div>
  );
};

export default Launch;
