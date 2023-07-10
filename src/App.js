import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import PrivateOutlet from "./components/Auth/PrivateOutlet/PrivateOutlet";
import Home from "./components/Home/Home";

function App() {
  return (
   <div className="container mx-auto my-8">
     <Routes>
      <Route path="/" element={<PrivateOutlet/>} >
        <Route path="/" element={<Home/>}/>
      </Route>
      <Route path="/auth" element={<Auth />} />
    </Routes>
   </div>
  );
}

export default App;
