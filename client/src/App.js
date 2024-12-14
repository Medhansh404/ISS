import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; 
import HomePage from "./Components/Home"; 
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import AddTrip from "./Components/AddTrip";
import Tours from "./Components/Tours";
import Pending from "./Components/Pending";
import TripRequest from "./Components/Requests"
import TripApproval from "./Components/Approval";
import RequireAuth from "./Components/RequireAuth";
import Staff from "./Components/Staff";
import "./styles.css";

const App = () => {
  return (
    <div className="app bg-gray-800">
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth allowedRoles={[2020, 2021, 2022, 2023]}/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allTours" element={<Tours />} />
          <Route path="/status" element={<TripApproval />} />
          <Route path="/addTrip" element={<AddTrip />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[2020, 2021, 2022, 2023]}/>}>
            <Route path="/requests" element={<TripRequest />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[2020, 2021]}/>}>
            <Route path="profile" element={<Staff />} />
          </Route>

          {/* Catch All */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
