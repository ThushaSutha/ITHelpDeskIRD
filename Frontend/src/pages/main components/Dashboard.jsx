import { useParams } from "react-router-dom";

import NewTicket from "./NewTicket";
import MyTicket from "./MyTicket";
import AdminDashboard from "../admin/Dashboard"
import KpiCard from "../it-in-charge/KpiCard";

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
  ) : role === "it_in_charge" ? (
      <>
        <KpiCard />
      </>
  ): (
    <>
     User Dashboard
      </>
  )}


      
    </>
  );
}

export default Dashboard;
