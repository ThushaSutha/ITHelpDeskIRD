import { useParams } from "react-router-dom";


import MyTicket from "./MyTicket";
import AdminDashboard from "../admin/Dashboard"

function Dashboard() {
  // Get the current route parameter (either 'my-ticket' or 'create-ticket')
  const { view } = useParams();
  const role = localStorage.getItem("userRole");

  return (
    <>
      {role === "admin" ? (
        <>
        <AdminDashboard />
        
      
    </>
  ) : (
    <>
     User Dashboard
      </>
  )}


      
    </>
  );
}

export default Dashboard;
