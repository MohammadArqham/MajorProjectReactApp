import React,{useState,useEffect} from "react";
import style from "./ManufacturerDashboard.module.css";
import style2 from "./ManufacturerLogin.module.css";
import { Html5QrcodeScanner } from "html5-qrcode";

import { WholesalerAddresses } from "./Config/Config";
import WholesalerABI from "./ABIFiles/WholesalerABI.json";
import { ethers } from "ethers";
const provider = new ethers.BrowserProvider(window.ethereum);
let signer = await provider.getSigner();
let contract = new ethers.Contract(
  WholesalerAddresses,
  WholesalerABI,
  signer
);



const Wholesaler = () => {
  const [orderData, setOrderData] = useState([]);
  useEffect(()=>{
    async function getData(){
      contract = new ethers.Contract(
        WholesalerAddresses,
        WholesalerABI,
        provider
      );
      const orders = await contract.callGetAllOrders();
      let value2 = [];
      for (const orderId of orders) {
        const order = await contract.getMedicineOrderById(Number(orderId));
        value2 = value2.concat(order.toObject());
      }
      console.log("value"+value2)
      setOrderData(value2);
    }
    getData();
  },[])

  const scanQR = async () => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 300,
        height: 300,
      },
      fps: 5,
    });

    const success = async (result) => {
      try {
        scanner.clear();
        contract = new ethers.Contract(
          WholesalerAddresses,
          WholesalerABI,
          signer
        );
        
        await contract.updateMedicineOrderStatus(Number(result));
        alert("Order Has been Processed..!");
      } catch (err) {
        alert("invalid qr code..!")
        console.log(err);
      }
    };
    const error = (err) => {
      //console.log(err);
    };
    scanner.render(success, error);
  };

  return (
    <div style={{fontFamily:"Segoe UI"}}>
      <div style={{display:"flex",justifyContent:"center",fontFamily:"Segoe UI"}}>
        <div className={style2.SignupContainer}>
          <h3>Processes Order</h3>
          <p>Scan QR code to process orders</p>
          <button onClick={scanQR} className={style2.btn}>Scan QR Code</button>
          <div className="reader" id="reader"></div>
        </div>
      </div>

      <div>
    <table className={style.table} border={1}>
      <tr className={style.tr}>
        <th>Id</th>
        <th>Medicine Id</th>
        <th>Pharmacy Id</th>
        <th>Quantity</th>
        <th>Status</th>
      </tr>
      {orderData.map((value,index)=>(
      <tr key={index}>
        <td>{Number(value.id)}</td>
        <td>{Number(value.MedicineId)}</td>
        <td>{value.PharmacyId}</td>
        <td>{Number(value.quantity)}</td>
        <td>{value.status}</td>
      </tr>
      ))}
      
    </table>
  </div>
      
    </div>
  );
};

export default Wholesaler;
