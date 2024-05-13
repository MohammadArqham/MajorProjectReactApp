
import { React,useState } from 'react'
import ManufacturerLogin from "./ManufacturerLogin"
import ManufacturerDashboard from './ManufacturerDashboard';
const Manufacturer = () => {
    const [isLogin,setIsLogin] = useState(true);

    function changeLogin(msg){
        setIsLogin(msg);
        console.log(isLogin)
    }

    return (
    <div>
        { isLogin ?(
            <ManufacturerDashboard/>
        ):(<ManufacturerLogin changeLogin={changeLogin} />)

        }
    </div>
  )
}

export default Manufacturer