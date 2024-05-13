import React, { useState,useEffect } from "react";
import style from "./ManufacturerDashboard.module.css";
import style2 from "./ManufacturerLogin.module.css";
import TrackMedicine from "./TrackMedicine";
import { ethers } from "ethers";
import { PharmacyAddresses } from "./Config/Config";
import PharmacyABI from "./ABIFiles/PharmacyABI.json";


const provider = new ethers.BrowserProvider(window.ethereum);
let signer = await provider.getSigner();
let contract = new ethers.Contract(PharmacyAddresses, PharmacyABI, signer);

const TabContent1 = ({ data }) => (
  <div>
      <table className={style.table} border={1}>
        <tr className={style.tr}>
          <th>Id</th>
          <th>prefix</th>
          <th>Name</th>
          <th>Discription</th>
          <th>Price</th>
          <th>Expiry Date</th>
        </tr>
        {data.map((value, index) => (
          <tr key={index}>
            <td>{Number(value.id)}</td>
            <td>{value.medicinePrefix}</td>
            <td>{value.medicineName}</td>
            <td>{value.medicineDescription}</td>
            <td>{Number(value.medicinePrice)}</td>
            <td>{Number(value.medicineExpiryDate)}</td>
          </tr>
        ))}
      </table>
    </div>
);

const TabContent2 = ({orderData}) => (
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
);

const TabContent3 = () => {
  const [id,setId] = useState(0);
  const [quantity,setQuantity] = useState(0);

  const placeOrder = async ()=> {
    console.log("place Order")
    try{
      await contract.callPlaceOrder(id,quantity);
      alert("Order Placed")
    }catch(err){
      console.error(err)
      alert("error occured,check order id and wallet connection..!")
    }
  }

  return(
  <div>
    <div className={style2.container}>
      <div className={style2.SignupContainer}>
        <h2>Place Order</h2>
        <input onChange={(e)=>setId(e.target.value)} className={style2.input} type="number" placeholder="Medicine Id" />
        <input onChange={(e)=>setQuantity(e.target.value)} className={style2.input} type="number" placeholder="quantity" />

        <div className={style2.btnContainer}>
          <input onClick={placeOrder} className={style2.btn} type="submit" />
          <input className={style2.btn} type="reset" />
        </div>
      </div>
    </div>
  </div>)
};

const TabContent4 = () => (
  <div>
    <TrackMedicine />
  </div>
);

const PharmacyDashboard = () => {
  const [data, setData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  useEffect(()=>{
    async function getData() {
      try {
        console.log("inside getData");
        const result = await contract.callGetAllMedicineAddresses();
        const orders = await contract.callGetAllOrders();
  
        let value = [];
        let value2 = [];
        async function fetchMedicineDetails() {
          for (const medicineId of result) {
            const medicine = await contract.getMedicineById(Number(medicineId));
            value = value.concat(medicine.toObject());
          }
          setData(value);
  
          for (const orderId of orders) {
            const order = await contract.getMedicineOrderById(Number(orderId));
            value2 = value2.concat(order.toObject());
          }
          setOrderData(value2);
        }
        fetchMedicineDetails();
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  },[])


  const [activeTab, setActiveTab] = useState(1);
  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };


  

  return (
    <div className={style2.container}>
      <div className={style2.btnContainer2}>
        <button
          className={`${style2.btn2} ${activeTab === 1 ? style2.active : ""}`}
          onClick={() => handleTabChange(1)}
        >
          View Medicines
        </button>
        <button
          className={`${style2.btn2} ${activeTab === 2 ? style2.active : ""}`}
          onClick={() => handleTabChange(2)}
        >
          Orders
        </button>
        <button
          className={`${style2.btn2} ${activeTab === 3 ? style2.active : ""}`}
          onClick={() => handleTabChange(3)}
        >
          Place Order
        </button>
        <button
          className={`${style2.btn2} ${activeTab === 4 ? style2.active : ""}`}
          onClick={() => handleTabChange(4)}
        >
          Track Medicine
        </button>
      </div>

      {/* Tab content based on active tab */}
      {activeTab === 1 && <TabContent1 data={data} />}
      {activeTab === 2 && <TabContent2 orderData={orderData}/>}
      {activeTab === 3 && <TabContent3 />}
      {activeTab === 4 && <TabContent4 />}
    </div>
  );
};

export default PharmacyDashboard;
