import React, { useState } from "react";
import style1 from "./ManufacturerDashboard.module.css";
import style2 from "./ManufacturerLogin.module.css";
import style from "./TrackMedicine.module.css";
import { ethers } from "ethers";
import { PharmacyAddresses } from "./Config/Config";
import PharmacyABI from "./ABIFiles/PharmacyABI.json";
import { Link } from "react-router-dom";

const provider = new ethers.BrowserProvider(window.ethereum);
let signer = await provider.getSigner();
let contract = new ethers.Contract(PharmacyAddresses, PharmacyABI, signer);



const TrackMedicine = () => {

  const [medicineData,setMedicineData] = useState(null)
  const [orderId,setOrderId] = useState(null)

  const searchMedicine = async () => {
    try{
      const medicine = await contract.getMedicineOrderById(orderId);
    setMedicineData(medicine.toObject());
    console.log(medicineData);
    }catch(e){
      alert("error occured: check for wallet coonnection and order id entered.!")
    }
    
    
  };

  return (
    <div className={style2.SignupContainer}>
      <div >
        <input onChange={(e)=>setOrderId(e.target.value)} className={style2.input} type="number" placeholder="Enter Order ID" />
        <button onClick={searchMedicine} className={style2.btn}>Search</button>
        
      </div>
      <h4>status: {medicineData ? (medicineData.status):("-- --")}</h4>
      <div style={{margin:"1rem 0"}}>
        {medicineData && (
          <Link to="/Temperature">
            <button className={style2.btn}>View Cold Chain Record</button>
          </Link>
        )}
      </div>      
      <div className={(medicineData && medicineData.status == "WithManufacturer")? style.active: style.inactive}>
        <h4>Manufacturer</h4>
        <p>
          Address: {medicineData ? (medicineData.ManufacturerAddresses):("-- --")} <br /> 
          
        </p>
      </div>
      <div className={(medicineData && medicineData.status == "AcceptedByDistributer")? style.active: style.inactive}>
        <h4>Distributer</h4>
        <p>
        Address: {medicineData ? (medicineData.DistributerAddresses):("-- --")} <br /> 
          
        </p>
      </div>
      <div className={(medicineData && medicineData.status == "AcceptedByWholeseller4")? style.active: style.inactive}>
        <h4>Wholesaler</h4>
        <p>
        Address: {medicineData ? (medicineData.WholesellerAddresses):("-- --")} <br /> 
         
        </p>
      </div>
      <div className={(medicineData && medicineData.status == "AcceptedByPharmacy")? style.active: style.inactive}>
        <h4>Pharmacy</h4>
        Address: {medicineData ? (medicineData.PharmacyId):("-- --")} <br /> 
         
      </div>
    </div>
  );
};

export default TrackMedicine;
