import React from "react";
import styles from "../App.module.css";
import { useState } from "react";
import { ethers } from "ethers";
import {useNavigate} from "react-router-dom";


import AbiFile from "./AbiFile.json"
const contractAddress  = "0xE28d2c95Dd19923eBeb99799064850F5847adFfD"
const provider = new ethers.BrowserProvider(window.ethereum);
let contract = new ethers.Contract(contractAddress,AbiFile,provider);
let signer;

const loadData = async ()=>{
  // await provider.send("eth_requestAccounts",[]);
  // signer = provider.getSigner();
  const balance = await contract.getBalance();

  alert(balance);
  //contract = new ethers.Contract(contractAddress,AbiFile,signer);
  //const userAddresses = await signer.getAddress;
  //console.log(userAddresses)
}

const deposit = async (amount)=> {
  try{
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress,AbiFile,signer);
    const tx = await contract.deposit(amount);
    await tx.wait();
    
    alert("Deposit successfuk!");
    console.log(tx)
  }catch(error){
    console.log("Error during deposit:",error);
    alert("Error during deposit. Please check the console.");
  }
}

const withdraw = async ()=> {}

const Wallet = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState(0);  
  const navigation = useNavigate();
  

  const connectWallet = async () => {
    try {
      const ethereum = window.ethereum;

      if (ethereum) {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(account[0]);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        setProvider(provider);
        navigation("/home");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.connect} onClick={connectWallet}>
        Connect Wallet
      </button>
    </div>
  );
};

export default Wallet;
