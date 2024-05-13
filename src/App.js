
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Manufacturer from "./Components/Manufacturer";
import Distributer from "./Components/Distributer";
import Wholesaler from "./Components/Wholesaler";
import Pharmacy from "./Components/Pharmacy";
import Wallet from "./Components/Wallet";
import TemperatureData from "./Components/TemperatureData"
function App() {
  

  return (
    <div>
      
      <BrowserRouter>
      <Routes>
        <Route element={<Wallet/>} path="/"/>
        <Route element={<Home />} path="/home" />
        <Route element={<Manufacturer />} path="/manufacturer" />
        <Route element={<Distributer />} path="/distributer" />
        <Route element={<Wholesaler />} path="/wholesaler" />
        <Route element={<Pharmacy />} path="/pharmacy" />
        <Route element={<TemperatureData/>} path="/Temperature" />
      </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
