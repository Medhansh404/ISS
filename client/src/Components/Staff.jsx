import React, { useState, useEffect } from "react";
import axios from "../Api/axios";
import useAuth from '../hooks/useAuth';


const APPROVE_URL = '/approval'

const TripApproval = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [error, setError] = useState("");
  const [errMssg, setErrMssg] = useState('');
  const [clicked, setClicked] = useState(true);
  const { auth } = useAuth();



  useEffect(() => {
    const fetchtrips = async () =>{
      try {
        const response = await axios.get(
          APPROVE_URL, 
          {
          params: { empId: auth.id },
          withCredentials: true
          }
        );
      const approval_trips = response?.data
      setTrips(approval_trips)
      }
      catch(error){
        
      }
    }
    fetchtrips()
  }, [clicked]); 

  const handleCheckboxChange = (tripId) => {
    setSelectedTrips((prevSelected) =>
      prevSelected.includes(tripId)
        ? prevSelected.filter((id) => id !== tripId)
        : [...prevSelected, tripId]
    );
  };

  const handleSelectAll = () => {
    setSelectedTrips(trips.map((trip) => trip.id));
  };

  const handleDeselectAll = () => {
    setSelectedTrips([]);
  };

  const handleApprove = async(e) =>{
    const trip_ids = trips?.map(obj=>obj.t_id)
    try{
      const response = await axios.post( APPROVE_URL, 
        JSON.stringify({trips: trip_ids, status: true}),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
    
    const click = clicked
    setClicked(!click)

    }
    catch(error) {
      if (!error?.response) {
        setErrMssg('No Server Response');
      } else if (error.response?.status === 400) {
        setErrMssg('Missing Username or Password');
      } else if (error.response?.status === 401) {
        setErrMssg('Unauthorized, Contact administration or try again');
      } else {
        setErrMssg('Login Failed, Try again');
      }
    }
  }
    const handleDisapprove = async(e) =>{
      const trip_ids = trips?.map(obj=>obj.t_id)
      try{
        const response = await axios.post( URL, 
          JSON.stringify({trips: trip_ids, status: false}),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
      
      const click = clicked
      setClicked(!click)
  
      }
      catch(error) {
        if (!error?.response) {
          setErrMssg('No Server Response');
        } else if (error.response?.status === 400) {
          setErrMssg('Missing Username or Password');
        } else if (error.response?.status === 401) {
          setErrMssg('Unauthorized, Contact administration or try again');
        } else {
          setErrMssg('Login Failed, Try again');
        }
      }
    };

  return (
    <div className="p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Select Trips</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{trip.name}</h3>
            <p>Source: {trip.src}</p>
            <p>Destination: {trip.dest}</p>
            <label>
              <input
                type="checkbox"
                checked={selectedTrips.includes(trip.id)}
                onChange={() => handleCheckboxChange(trip.id)}
              />
              Select
            </label>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          className="mr-4 px-4 py-2 bg-blue-900 text-white rounded"
          onClick={handleSelectAll}
        >
          Select All
        </button>
        <button
          className="mr-4 px-4 py-2 bg-green-900 text-white rounded"
          onClick={handleApprove}
        >
          Approve
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={handleDeselectAll}
        >
          Deselect All
        </button>
        <button
          className="mr-4 px-4 py-2 bg-red-900 text-white rounded"
          onClick={handleDisapprove}
        >
          Approve
        </button>
      </div>
    </div>
  );
};

export default TripApproval;
