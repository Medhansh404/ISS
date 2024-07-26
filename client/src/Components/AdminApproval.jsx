import React, { useState, useEffect } from "react";
import axios from "../Api/axios";

const AdminApproval = () => {
  const ALLTRIPS_URL = "/approvalTrips";
  const UPDATETRIPSTATUS_URL = '/updateStatus'
  const [trips, setTrips] = useState([]);
  const [errMssg, setErrMssg] = useState("");
  const [approvalStatus, setApprovalStatus] = useState({});

  useEffect(() => {
    setErrMssg("");
  },[trips]);
    const pendingRequests = async () => {
      try {
        const response = await axios.get(ALLTRIPS_URL, {
          headers: { "Content-Type": "application/json" },
        });
        const allTrips = response.data?.trips || [];
        setTrips(allTrips);
        const initialStatus = allTrips.reduce((acc, trip) => {
            acc[trip.t_id] = trip.adminApproval;
            return acc;
        }, {});
        setApprovalStatus(initialStatus);
      } 
      
      catch (err) {
        setErrMssg("Failed to fetch trips");
      }
    };
    pendingRequests();


  const handleCheckboxChange = (t_id, isApproved) => {
    setApprovalStatus((prevStatus) => ({
      ...prevStatus,
      [t_id]: isApproved,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const changedTrips = Object.keys(approvalStatus).filter(
      (t_id) =>
        approvalStatus[t_id] !== trips.find((trip) => trip.t_id === t_id).adminApproval
    );
    const dataToSend = changedTrips.map((t_id) => ({
      t_id,
      adminApproval: approvalStatus[t_id],
    }));
    
    try {
      await axios.post(UPDATETRIPSTATUS_URL, 
        JSON.stringify({dataToSend}), 
     {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Changes submitted successfully");
    } 
    
    catch (err) {
      console.error("Failed to submit changes", err);
    }
  }


  const handleApproveAll = () => {
    const newStatus = trips.reduce((acc, trip) => {
        acc[trip.t_id] = true;
        return acc;
      }, {});
    setApprovalStatus(newStatus);
  };

  return (
    <div>
      <h1>Hello Admin</h1>
      {errMssg && <p style={{ color: "red" }}>{errMssg}</p>}
      <form onSubmit={handleSubmit}>
        {trips.map((trip) => (
          <div key={trip.id}>
            <h3>{trip.name}</h3>
            <p>Source: {trip.src}</p>
            <p>Destination: {trip.dest}</p>
            <p>Departure Time: {trip.departureTime}</p>
            <p>Arrival Time: {trip.arrivalTime}</p>
            <p>Scheme: {trip.scheme}</p>
            <p>Distance: {trip.distance}</p>
            <p>Fare: {trip.fare}</p>
            <label>
              <input
                type="checkbox"
                checked={approvalStatus[trip.id]?.approve || false}
                onChange={() => handleCheckboxChange(trip.id, true)}
              />
              Approve
            </label>
            <label>
              <input
                type="checkbox"
                checked={approvalStatus[trip.id]?.disapprove || false}
                onChange={() => handleCheckboxChange(trip.id, false)}
              />
              Disapprove
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleApproveAll}>Approve All</button>
    </div>
  );
};

export default AdminApproval;
