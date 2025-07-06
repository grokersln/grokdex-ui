
import React, { useState } from 'react';
import Web3 from 'web3';
import GrokPresaleABI from '../abi/GrokPresaleABI.json';

const contractAddress = '0x74fFa9134d45E9C5D3b1576BaD66CB6e5F12fb9B';

const GrokBuy = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleBuy = async () => {
    if (!window.ethereum) return alert('MetaMask is not installed');

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    const contract = new web3.eth.Contract(GrokPresaleABI, contractAddress);

    try {
      setMessage('Transaction is being sent...');

      await contract.methods.buyTokens().send({
        from: accounts[0],
        value: web3.utils.toWei(amount, 'ether'),
      });

      setMessage('Tokens successfully purchased ✅');
    } catch (err) {
      console.error(err);
      setMessage('Transaction failed ❌');
    }
  };

  return (
    <div className="buy-container">
      <h2>Buy Tokens from Presale</h2>
      <input
        placeholder="Amount (BNB)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleBuy}>Buy Tokens</button>
      <p>{message}</p>
    </div>
  );
};

export default GrokBuy;
