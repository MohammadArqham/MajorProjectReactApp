import React, { useState } from "react";
import style from "./ManufacturerLogin.module.css";


//back end connections
import {ManufacturerAddresses} from "./Config/Config"
import ManufacturerABI from "./ABIFiles/ManufacturerABI.json"
import { ethers } from "ethers";
const provider =new ethers.BrowserProvider(window.ethereum);
let signer = await provider.getSigner();
let contract = new ethers.Contract(ManufacturerAddresses,ManufacturerABI,signer);


//credentials


const ManufacturerLogin = ({changeLogin}) => {
  const [login, setLogin] = useState(false);


  //credentials
  const [id,setId] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');



  const toggleLogin = () => {
    setLogin(!login); 
  };

  const onLogin = async ()=>{
    try{
      const tx = await contract.login(id,password);
      await tx.wait();
      alert("transaction Complete..!")
      console.log(tx)
      changeLogin(true)
    }catch(error){

    }
    
  }
  const onSignUp = async () =>{
    try{
      
      const tx = await contract.addManufacturer(name,email,phoneNumber,password,role);
      await tx.wait();
      alert("user Added")

      console.log(tx)
      setLogin(true)
    }catch(error){
      alert("an error occured")
      console.log(error)
    }
  }

  return (
    <div className={style.container}>
      <div>
        <button className={style.btn2} onClick={toggleLogin}>{login ? "Signup" :"Login" }</button>
        {login ? (
          <div className={style.SignupContainer}>
            <h2>Login</h2>
            <input onChange={(e)=>setId(e.target.value)} className={style.input} type="number" placeholder="Id" />
            <input
              onChange={(e)=>setPassword(e.target.value)}
              className={style.input}
              type="password"
              placeholder="Password"
            />
            <div className={style.btnContainer}>
              <input className={style.btn} onClick={onLogin} type="submit" />
              <input className={style.btn} type="reset" />
            </div>
          </div>
        ) : (
          <div className={style.SignupContainer}>
            <h2>Sign Up</h2>
            <input onChange={(e) => setName(e.target.value)} className={style.input} type="text" placeholder="Name" />
            <input onChange={(e) => setEmail(e.target.value)} className={style.input} type="email" placeholder="email" />
            <input
              className={style.input}
              type="text"
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              className={style.input}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input onChange={(e) => setRole(e.target.value)} className={style.input} type="text" placeholder="role" />
            <div className={style.btnContainer}>
              <input className={style.btn} onClick={onSignUp} type="submit" />
              <input className={style.btn} type="reset" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManufacturerLogin;
