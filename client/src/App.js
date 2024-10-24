import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Layout from "./Components/Layout";
import AddTrip from "./Components/AddTrip";
import Tours from "./Components/Tours";
import Pending from "./Components/Pending";
import TripApproval from "./Components/Approval";
import RequireAuth from "./Components/RequireAuth";
import Staff from "./Components/Staff";
import "./styles.css";
const App = () => {
  return (
    
      <div className="app bg-gray-800">
        
          <Routes>
            <Route path='/' element={<Layout />}>
            <Route path="login" element={<Login />}/>
              
              {/*Protected Routes*/ }
              <Route element={<RequireAuth allowedRoles={[2020, 2021, 2022, 2023]}/>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="allTours" element={<Tours />} />
              <Route path="addTrip" element={<AddTrip />} />
              <Route path="status" element={<Pending/>} />
              <Route path="approval" element={<TripApproval />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={[2020, 20021, 2022]}/>}>
                
              </Route>
              <Route element={<RequireAuth allowedRoles={[2020, 2021]}/>}>
                
                <Route path="profile" element={<Staff/>} />
                
              </Route>
              <Route element={<RequireAuth allowedRoles={[2020]}/>}>
              </Route>  
              

              {/* catch all*/}
              <Route path="*" element={<></>} />
            </Route>
          </Routes>
        
      </div>

  );
};

export default App;
