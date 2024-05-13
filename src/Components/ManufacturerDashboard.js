import React, { useState, useEffect } from "react";
import style from "./ManufacturerDashboard.module.css";
import style2 from "./ManufacturerLogin.module.css";
import ProcessesOrers from "./ProcessesOrers";
import TabContent1 from "./TabContent1";
//back end connections
import { ManufacturerAddresses } from "./Config/Config";
import ManufacturerABI from "./ABIFiles/ManufacturerABI.json";
import { ethers } from "ethers";
const provider = new ethers.BrowserProvider(window.ethereum);
let signer = await provider.getSigner();
let contract = new ethers.Contract(
  ManufacturerAddresses,
  ManufacturerABI,
  signer
);

// Sub-components for tab content

const TabContent2 = ({ data }) => {
  return (
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
};

const TabContent3 = ({orderData}) => (
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

const TabContent4 = () => <ProcessesOrers />;

const ManufacturerDashboard = () => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState(4);
  const [data, setData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  // Function to switch tabs
  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  async function getData() {
    try {
      console.log("inside getData");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        ManufacturerAddresses,
        ManufacturerABI,
        provider
      );
      const result = await contract.getAllMedicines();
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

      console.log(data);
      console.log(orderData);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <div className={style2.container}>
      <div className={style2.btnContainer2}>
        <button
          className={`${style2.btn2} ${activeTab === 1 ? style2.active : ""}`}
          onClick={() => {
            handleTabChange(1);
          }}
        >
          Create Medicine
        </button>
        <button
          className={`${style2.btn2} ${activeTab === 2 ? style2.active : ""}`}
          onClick={() => {
            handleTabChange(2);
            getData();
          }}
        >
          View Medicines
        </button>
        <button
          className={`${style2.btn2} ${activeTab === 3 ? style2.active : ""}`}
          onClick={() =>{ handleTabChange(3);getData();}}
        >
          Orders
        </button>
        <button
          className={`${style2.btn2} ${activeTab === 4 ? style2.active : ""}`}
          onClick={() => handleTabChange(4)}
        >
          Processes Orders
        </button>
      </div>

      {/* Tab content based on active tab */}
      {activeTab === 1 && <TabContent1 />}
      {activeTab === 2 && <TabContent2 data={data} />}
      {activeTab === 3 && <TabContent3 orderData={orderData} />}
      {activeTab === 4 && <TabContent4 />}
    </div>
  );
};

export default ManufacturerDashboard;
