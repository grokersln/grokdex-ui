
import React, { useState } from 'react';
import Web3 from 'web3';
import GrokMintABI from './abi/GrokMintABI.json';

const Mint = () => {
  const [tokenName, setTokenName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');

  const handleMint = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed!');
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      const contractAddress = '0x74fFa9134d45E9C5D3b1576BaD66CB6e5F12fb9B';
      const contract = new web3.eth.Contract(GrokMintABI, contractAddress);

      const supplyInWei = web3.utils.toWei(totalSupply, 'ether');

      await contract.methods.createToken(tokenName, symbol, supplyInWei).send({ from: account });
      alert('Token successfully created!');
    } catch (error) {
      console.error(error);
      alert('Error occurred during token creation.');
    }
  };

  return (
    <div className="mint-container">
      <h2>GrokMint – Create Token</h2>
      <input
        type="text"
        placeholder="Token Name"
        value={tokenName}
        onChange={(e) => setTokenName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        type="text"
        placeholder="Total Supply (e.g., 1000000)"
        value={totalSupply}
        onChange={(e) => setTotalSupply(e.target.value)}
      />
      <button className="mint-button" onClick={handleMint}>Mint Token</button>
    </div>
  );
};

export default Mint;
