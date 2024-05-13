import React, { useState, useRef, useEffect } from "react";
import style from "./ProcessesOrers.module.css";
import style2 from "./ManufacturerLogin.module.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "react-qr-code";
import { Html5QrcodeScanner } from "html5-qrcode";

//back end connections
import { ManufacturerAddresses } from "./Config/Config";
import ManufacturerABI from "./ABIFiles/ManufacturerABI.json";
import { ethers } from "ethers";
import Bill from "./Bill";
const provider = new ethers.BrowserProvider(window.ethereum);
let signer = await provider.getSigner();
let contract = new ethers.Contract(
  ManufacturerAddresses,
  ManufacturerABI,
  signer
);

const ProcessesOrers = () => {
  const [scannerResult, setScannerResult] = useState(null);

  useEffect(() => {}, []);

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
        await contract.updateMedicineOrderStatus(Number(result));
        alert("Order Has been Processed..!");
      } catch (err) {
        console.log(err);
        console.log("invalid Qr code.!")
      }
    };
    const error = (err) => {
      //console.log(err);
    };
    scanner.render(success, error);
  };

  const [medicinId, setMedicinId] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [medicineData, setMedicineData] = useState(null);
  const [medicineOrderData, setMedicineOrderData] = useState(null);
  const reportTemplateRef = useRef(null); // Move useRef inside the functional component

  const printDocument = async () => {
    const input = reportTemplateRef.current;

    try {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("document.pdf");
    } catch (error) {
      console.log(error);
    }
  };

  const searchMedicine = async () => {
    try{
      const medicine = await contract.getMedicineById(Number(medicinId));
    setMedicineData(medicine.toObject());
    }
    catch(e){
      window.alert("invalid order Id")
    }


    console.log(medicineData);
  };

  const searchOrder = async () => {
    try{
      const order = await contract.getMedicineOrderById(orderId);
      setMedicineOrderData(order.toObject());
    }catch(e){
      window.alert("invalid Order id")
    }
    
    console.log(medicineOrderData);
  };

  return (
    <div>
      <div className={style.contianer}>
        <div className={style2.SignupContainer}>
          <h3>Search Medicines</h3>
          <div className={style.inputIdContainer}>
            <input
              onChange={(e) => setMedicinId(e.target.value)}
              className={style2.input}
              type="number"
              placeholder="Medine Id"
            />
            <button onClick={searchMedicine} className={style2.btn}>
              Search
            </button>
          </div>
          {medicineData && (
            <div
              className={style.medicinInfoConatiner}
              style={{ overflow: "auto" }}
            >
              <span>Id</span>: {Number(medicineData.id)}
              <br />
              <span>ownerAddress</span>:{medicineData.ownerAddress}
              <br />
              <span>Medicine Prifix</span>:{medicineData.medicinePrefix}
              <br />
              <span>Medicine Name</span>: {medicineData.medicineName}
              <br />
              <span>Discription</span>: {medicineData.medicineDescription}
              <br />
              <span>Price</span>: {Number(medicineData.medicinePrice)}
              <br />
              <span>Expiry</span>: {Number(medicineData.medicineExpiryDate)}
              <br />
            </div>
          )}
        </div>
        <div className={style2.SignupContainer}>
          <h3>Generate Bill</h3>
          <div className={style.inputIdContainer}>
            <input
              onChange={(e) => setOrderId(e.target.value)}
              className={style2.input}
              type="text"
              placeholder="Order Id"
            />
            <button onClick={searchOrder} className={style2.btn}>
              Seacrh
            </button>
          </div>
          {medicineOrderData && (
            <div ref={reportTemplateRef} className={style.medicinInfoConatiner}>
              <span>Id</span>: {String(medicineOrderData.id)} <br />
              <span>Medicine Id</span>: {Number(medicineOrderData.MedicineId)}{" "}
              <br />
              <span>Pharmacy Id</span>: {medicineOrderData.PharmacyId}
              <br />
              <span>Quantity</span>: {Number(medicineOrderData.quantity)} <br />
              <span>Status</span>: {medicineOrderData.status}
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <QRCode
                  value={String(medicineOrderData.id)}
                  size={100}
                  fgColor="#2b3b35"
                />
              </div>
              <br />
              <p style={{ textAlign: "center" }}>
                Scan QR Code to Process Order
              </p>
            </div>
          )}
          <button onClick={printDocument} className={style.btn}>
            Generate Bill
          </button>
        </div>
        <div className={style2.SignupContainer}>
          <h3>Processes Order</h3>
          <p>Scan QR code to process orders</p>
          <button onClick={scanQR} className={style.btn}>
            Scan QR Code
          </button>

          <div className="reader" id="reader"></div>
        </div>
      </div>
    </div>
  );
};

export default ProcessesOrers;
