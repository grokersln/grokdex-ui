
import React, { useEffect, useState } from 'react';

const dummyData = [
  {
    name: 'GrokToken',
    symbol: 'GRK',
    supply: '1,000,000',
    createdAt: '2025-07-05',
    address: '0x123...def'
  },
  {
    name: 'ChainStorm',
    symbol: 'CHS',
    supply: '500,000',
    createdAt: '2025-07-03',
    address: '0xabc...789'
  },
];

const GrokBoard = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    // Gelecekte burada API veya Web3 ile token listesi çekilebilir
    setTokens(dummyData);
  }, []);

  return (
    <div className="board-container">
      <h2>Token Listing Board</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Supply</th>
            <th>Created</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, i) => (
            <tr key={i}>
              <td>{token.name}</td>
              <td>{token.symbol}</td>
              <td>{token.supply}</td>
              <td>{token.createdAt}</td>
              <td><code>{token.address}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrokBoard;
