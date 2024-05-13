import React,{useState} from "react";
import style from "./ManufacturerDashboard.module.css";
import style2 from "./ManufacturerLogin.module.css";


//back end connections
import { ManufacturerAddresses } from "./Config/Config.js";
import ManufacturerABI from "./ABIFiles/ManufacturerABI.json";
import { ethers } from "ethers";
const provider = new ethers.BrowserProvider(window.ethereum);
let signer = await provider.getSigner();
let contract = new ethers.Contract(ManufacturerAddresses, ManufacturerABI, signer);



const TabContent1 = () => {
  const [prefix, setPrefix] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(0);

  const addMedicine = async (e) => {
    e.preventDefault();
    try {
      console.log("add medicne called..!");
      const tx = await contract.addMedicine(prefix, name, des, price, date);
      await tx.wait();
      alert("Medicine Added..!");
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={style2.container}>
        <form className={style2.SignupContainer} onSubmit={addMedicine}>
          <h2>Add Medicine</h2>
          <input
            onChange={(e) => setPrefix(e.target.value)}
            className={style2.input}
            type="text"
            placeholder="Medicine Prefix"
            
          />
          <input
            onChange={(e) => setName(e.target.value)}
            className={style2.input}
            type="text"
            placeholder="Name"
          />
          <input
            onChange={(e) => setDes(e.target.value)}
            className={style2.input}
            type="text"
            placeholder="Discription"
          />
          <input
            onChange={(e) => setPrice(e.target.value)}
            className={style2.input}
            type="number"
            placeholder="price"
          />
          <input
            onChange={(e) => setDate(e.target.value)}
            className={style2.input}
            type="number"
            placeholder="expiry date"
          />
          <div className={style2.btnContainer}>
            <input className={style2.btn} type="submit" />
            <input className={style2.btn} type="reset" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TabContent1;
