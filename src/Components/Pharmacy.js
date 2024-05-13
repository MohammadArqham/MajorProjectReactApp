import React,{useState} from 'react'
import PharmacyDashboard from './PharmacyDashboard';
import PharmacyLogin from './PharmacyLogin';

const Pharmacy = () => {
  const [isLogin,setIsLogin] = useState(true);
  return (
    <div>
      { isLogin ?(
            <PharmacyDashboard/>):(<PharmacyLogin/>)

        }
    </div>
  )
}

export default Pharmacy