import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth'



const UPDATE_URL = '/trip'


const Update = (props) => {
  const {auth} = useAuth();
  const [trip, setTrip] = useState({
    Id: 0,
    title: "",
    description: "",
    price: null,
    cover: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = props.id;
  // console.log(bookId);
  function handleChange(e) {
    setTrip((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const res = await axios.put(
        UPDATE_URL ,
        JSON.stringify({trip}),
        {
          headers: { 
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json'},
          withCredentials: true
        }
      );
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(books);
  return (
    <div className="form">
      <h1>Update trip</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="desc"
        onChange={handleChange}
        name="description"
      />
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Update;
