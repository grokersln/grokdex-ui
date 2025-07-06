
import React, { useEffect, useState } from "react";
import Web3 from "web3";

const GrokBoard = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });

          const addresses = [
            "0xE3aE58d31578AbF034595478feF14887C7B39d57",
            "0x74fFa9134d45E9C5D3b1576BaD66CB6e5F12fb9B"
          ];

          const tokenData = await Promise.all(addresses.map(async (address) => {
            try {
              const name = await web3.eth.call({
                to: address,
                data: web3.utils.sha3("name()").slice(0, 10)
              });
              const symbol = await web3.eth.call({
                to: address,
                data: web3.utils.sha3("symbol()").slice(0, 10)
              });

              return {
                name: web3.utils.hexToUtf8(name),
                symbol: web3.utils.hexToUtf8(symbol),
                address
              };
            } catch (err) {
              return {
                name: "HATA",
                symbol: "???",
                address
              };
            }
          }));

          setTokens(tokenData);
        }
      } catch (error) {
        console.error("Web3 bağlantı hatası:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>GrokBoard – Jeton Listesi</h2>
      <table>
        <thead>
          <tr>
            <th>Jeton Adı</th>
            <th>Sembol</th>
            <th>Adres</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index}>
              <td>{token.name}</td>
              <td>{token.symbol}</td>
              <td>{token.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrokBoard;
