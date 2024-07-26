import useAuth from '../hooks/useAuth';
import axios from "../Api/axios";
import { useState, useEffect } from 'react';
import Update from './Update';

const GETTRIP_URL = '/trip';

const Books = () => {
    const { auth } = useAuth();
    const[edit, setEdit] = useState(false);
    const [trips, setTrips] = useState([]);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get(
                    GETTRIP_URL,
                    {
                        params: { emp_id: auth.id },
                        withCredentials: true,
                        headers: {
                            'Authorization': `Bearer ${auth.accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(response.data);
                setTrips(response.data || []);
            } catch (error) {
                console.log(error);
            }
        };

        if (clicked) {
            fetchTrips();
        }
    }, [clicked, auth]);

    const handleClick = (e) => {
        setClicked(true);
    };

    const handleUpdateClick =(e)=>{
        
    }

    const handleEditClick =(e)=>{
        setEdit(!edit)
    }

    return (
        <div>
            <button onClick={handleClick}>fetch pending requests</button>
            {clicked && (
                <div className="space-y-4">
                    {trips.map((trip) => (
                        <div key={trip.id} className="flex space-x-4">
                            <div className="w-1/4">{`Trip ID: ${trip.id}`}</div>
                            <div className="w-1/4">{`Trip Name: ${trip.name}`}</div>
                            {/* Add more trip details as needed */}
                            <button onClick={handleEditClick}>Edit</button>
                            {edit &&(<Update props = {trip.id}></Update>)}
                        </div>
                    ))}
                </div>
            )}
            
        </div>
    );
};

export default Books;
