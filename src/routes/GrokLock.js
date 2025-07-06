
import React, { useState } from 'react';
import Web3 from 'web3';
import GrokLockABI from '../abi/GrokLockABI.json';

const contractAddress = '0xYourLockContractAddressHere'; // Değiştirilecek

const GrokLock = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [lockTime, setLockTime] = useState('');
  const [message, setMessage] = useState('');

  const handleLock = async () => {
    if (!window.ethereum) return alert("MetaMask is not installed");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    const contract = new web3.eth.Contract(GrokLockABI, contractAddress);

    try {
      setMessage('Transaction is being sent...');

      await contract.methods
        .lockToken(tokenAddress, web3.utils.toWei(amount, 'ether'), lockTime)
        .send({ from: accounts[0] });

      setMessage('Token successfully locked ✅');
    } catch (err) {
      console.error(err);
      setMessage('Transaction failed ❌');
    }
  };

  return (
    <div className="lock-container">
      <h2>Lock Your Tokens</h2>
      <input
        placeholder="Token Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Lock Duration (seconds)"
        value={lockTime}
        onChange={(e) => setLockTime(e.target.value)}
      />
      <button onClick={handleLock}>Lock Token</button>
      <p>{message}</p>
    </div>
  );
};

export default GrokLock;
