import React, { useState } from "react";
import axios from "../Api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth'

const TRIP_URL = '/trip'

const AddTrip = () => {
  const [add, setAdd] = useState(false);
  const {auth} = useAuth();
  const navigate = useNavigate();
  const [Id, setId] = useState();
  const [trip, setTrip] = useState({
    src: '',
    dest: '',
    departureTime: '',
    arrivalTime: '',
    scheme: 'Standard',
    distance: 0,
    fare: 0,
    employeeId: auth.id
  });


  function handleChange(e) {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(TRIP_URL,
        JSON.stringify({trip}),
        {
          headers: { 
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json'},
          withCredentials: true
        }
      );
      console.log(response);
      const TripId = response.data?.t_id;
      setId(TripId)
      //TODO: empty all the states to default and placeholders should look the same: completed
      
    } 
    catch (error) {
      console.log(error);
    }
  }


  async function handleClick(e){
    e.preventDefault();
    setAdd(true)
    function resetForm(){
      setTrip({    src: '',
        dest: '',
        departureTime: '',
        arrivalTime: '',
        scheme: 'Standard',
        distance: 0,
        fare: 0,
        employeeId: auth.id})
    }
    resetForm();
  }

  async function handleAddClick(e){
    try {
      const response = await axios.post(TRIP_URL,
        JSON.stringify({trip}),
        {
          params:{
            id:Id
          },
          headers: { 
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json'},
          withCredentials: true
        }
      );
      //TODO: instead of sending id in request send as a url param: completed
      const TripId = response.data?.id;
      setId(TripId)
    } 
    catch (error) {
      console.log(error);
    }
  }

  function handleBackClick(e){
    navigate('/dashboard');
  }
  

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <label>Source:</label>
      <input type="text" name="src" value={trip.src} onChange={handleChange} required />
    </div>
    <div>
      <label>Destination:</label>
      <input type="text" name="dest" value={trip.dest} onChange={handleChange} required />
    </div>
    <div>
      <label>Time of Departure:</label>
      <input type="time" name="departureTime" value={trip.departureTime} onChange={handleChange} required />
    </div>
    <div>
      <label>Time of Arrival:</label>
      <input type="time" name="arrivalTime" value={trip.arrivalTime} onChange={handleChange} required />
    </div>
    <div>
      <label>Scheme:</label>
      <select name="scheme" value={trip.scheme} onChange={handleChange}>
        <option value="Standard">Standard</option>
        <option value="Premium">Premium</option>
      </select>
    </div>
    <div>
      <label>Distance (km):</label>
      <input type="number" name="distance" value={trip.distance} onChange={handleChange} required />
    </div>
    <div>
      <label>Fare (Rs.):</label>
      <input type="number" name="fare" value={trip.fare} onChange={handleChange} required />
    </div>
    <button type="submit">Submit</button>
    <button onClick={handleClick}>Add another Trip</button>
    <button onClick={handleBackClick}>Return to dashboard</button>
    {add &&(
      <button onClick= {handleAddClick}>Add</button>)
    }
  </form>
);
}
export default AddTrip;
