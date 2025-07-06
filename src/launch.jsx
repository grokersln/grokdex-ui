import React, { useState } from "react";
import Web3 from "web3";
import ABI from "../abi/GrokPresale.abi.json";

const CONTRACT_ADDRESS = "0x74fFa9134d45E9C5D3b1576BaD66CB6e5F12fb9B";

const Launch = () => {
  const [form, setForm] = useState({
    token: "",
    softcap: "",
    hardcap: "",
    rate: "",
    start: "",
    end: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const startPresale = async () => {
    try {
      const provider = window.ethereum;
      if (!provider) return alert("Cüzdan bağlı değil");

      const web3 = new Web3(provider);
      const accounts = await web3.eth.requestAccounts();
      const sender = accounts[0];
      const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

      const start = Math.floor(new Date(form.start).getTime() / 1000);
      const end = Math.floor(new Date(form.end).getTime() / 1000);

      await contract.methods
        .startPresale(form.token, form.rate, form.softcap, form.hardcap, start, end)
        .send({ from: sender });

      alert("✅ Ön satış başlatıldı!");
    } catch (err) {
      console.error(err);
      alert("❌ Hata: " + err.message);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>GrokLaunch - Ön Satış Oluştur</h2>
      <input name="token" onChange={handleChange} placeholder="Token Adresi" /><br />
      <input name="softcap" onChange={handleChange} placeholder="Yumuşak sermaye (BNB)" /><br />
      <input name="hardcap" onChange={handleChange} placeholder="Sert Kapak (BNB)" /><br />
      <input name="rate" onChange={handleChange} placeholder="Fiyat: 1 BNB = ? Token" /><br />
      <input name="start" type="datetime-local" onChange={handleChange} /><br />
      <input name="end" type="datetime-local" onChange={handleChange} /><br />
      <button onClick={startPresale}>Ön Satışı Başlat</button>
    </div>
  );
};

export default Launch;
