//sidebar 
import {Link} from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
          <h1>Dashboard</h1>
          <h1>Tours</h1>
          <div>
            <h2>Create Tour</h2>
            <Link to ="/addTrip">Add Journey</Link>
          </div>
          <div>
            <h2>Pending Approval</h2>
            <Link to ="/pending">Update</Link>
          </div>
          <div>
            <h2>Pending Approval</h2>
            <Link to ="/disapproved">Update</Link>
          </div>
        </div>
    );
  };
  
  export default Dashboard;
  