import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/main components/Home";
import SignInForm from "./pages/main components/SignIn";
import MainLayout from "./Layouts/user/MainLayout";
import BlankLayout from "./Layouts/user/BlankLayout";
import AddUser from "./pages/admin/AddUser";
import Dashboard from "./pages/main components/Dashboard";
import ManageUser from "./pages/admin/ManageUser";
import ManageTicket from "./pages/main components/ManageTicket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ProtectedRoute from "./route/protected route/ProtectedRoute";
import ProtectedRoute from "./contexts/ProtectedRoute";
import PublicRoute from "./route/public route/PublicRoute";
import Unauthorized from "./pages/main components/UnauthorizedPage";
// import Test from "./components/Test";
import NewTicket from "./pages/main components/NewTicket";

import AboutUs from "./pages/main components/AboutUs";
import Contact from "./pages/main components/Contact";
import Chatbot from "./pages/main components/Chatbot";
import FAQ from "./pages/main components/FAQ";
import AddServiceCompanyDetails from "./pages/supplystaff/addservicecompany";
import ManageService from "./pages/supplystaff/manageservicecompany";
import AddDeviceDetails from "./pages/supplystaff/adddevice";
import ReportGenerator from "./pages/it-in-charge/ReportGenerator";
import Managedevice from "./pages/supplystaff/managedevice";
import KpiCard from "./pages/it-in-charge/KpiCard"
import Test from "./pages/main components/Test"
import TicketAssignment from "./pages/it-in-charge/TicketAssignment";



function App() {
  const role = localStorage.getItem("userRole");
  return (
    <>
      {/* Toast Container for Global Notifications */}
      <ToastContainer />
      {/*  Staff - 1.submit ticket 2.view ticket status 3.Provide feedback */}
      {/*  IT_Team 1.Assign ticket 2.update status 3.communication with user 4. Add comments 5.Resolve issues */}
      {/* Supply_Division_staff - 1.Add new IT Equipment  */}
      {/* IT in-charge (IT_Officer) - 1.Assign Priority 2.Oversee all Tickets 3.Monitor system performance 4. view pending repair requests 5.Generate reports */}
      {/* IT_director - 1.View Dashboard  */}
      {/* Account_branch_staff - 1.View offsite tickets 2.Add service companies 3.Assign tickets to Service companies 4.Approve payment for repair */}
      <Router>
        <Routes>
          {/* Routes with Main Layout */}
          <Route element={<MainLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/test" element={<KpiCard />} />
            <Route path="/dial" element={<Test />} />
            <Route path="/TicketAssignment" element={<TicketAssignment />} />


            {/* IT in-charge - 1.Assign Priority 2.Oversee all Tickets 3.Monitor system performance 4. view pending repair requests 5.Generate reports */}
            <Route
              path="/ticket-report"
              element={
                <ProtectedRoute roles={["it_in_charge", "admin"]}>
                  <ReportGenerator />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ticket-assign"
              element={
                <ProtectedRoute roles={["it_in_charge", "admin"]}>
                  <TicketAssignment />
                </ProtectedRoute>
              }
            />

            {/*  Staff - 1.submit ticket 2.view ticket status 3.Provide feedback */}
            <Route
              path="/new-ticket"
              element={
                <ProtectedRoute roles={["staff", "admin"]}>
                  <NewTicket />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tickets"
              element={
                <ProtectedRoute roles={["staff", "admin","it_in_charge"]}>
                  {role==="it_in_charge" ? 
                  (
                  <>
                   <ManageTicket role={role} />
                  </>
                  ):(
                    <>
                      <ManageTicket />
                    </>
                  )
                }
                  
                  
                </ProtectedRoute>
              }
            />

            {/*  IT_Team 1.Assign ticket 2.update status 3.communication with user 4. Add comments 5.Resolve issues */}

            {/* Supply Division staff - 1.Add new IT Equipment  */}
            <Route
              path="/add-device"
              element={
                <ProtectedRoute roles={["staff", "supply_staff"]}>
                  <AddDeviceDetails />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/manage-device"
              element={
                <ProtectedRoute roles={['staff',"supply_staff"]}>
                  <Managedevice />
                </ProtectedRoute>
              }
            />  


            {/* Protected Routes */}
            <Route
              path="/dashboard/:view"
              element={
                <ProtectedRoute roles={["staff"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={["staff", "admin","it_in_charge"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />            

            <Route
              path="/add-service"
              element={
                <ProtectedRoute roles={["staff", "account_staff"]}>
                  <AddServiceCompanyDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/service"
              element={
                <ProtectedRoute roles={["staff", "aaccount_staff"]}>
                  <ManageService />
                </ProtectedRoute>
              }
            />     

            <Route
              path="/ticket-report"
              element={
                <ProtectedRoute roles={["admin","it_in_charge"]}>
                  <AddUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute roles={["admin","it_officier"]}>
                  <AddUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update"
              element={
                <ProtectedRoute roles={["admin","it_officier"]}>
                  <AddUser isEditMode={true} />
                </ProtectedRoute>
              }
            />
           
            <Route
              path="/users"
              element={
                <ProtectedRoute roles={["admin", "it_officier"]}>
                  <ManageUser />
                </ProtectedRoute>
              }
            />
          </Route>
         
        

          {/* Routes with Blank Layout */}
          <Route element={<BlankLayout />}>
            <Route
              path="/signIn"
              element={
                <PublicRoute>
                  <SignInForm />
                </PublicRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/signIn" />}></Route>
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/Chatbot" element={<Chatbot />} />

          <Route path="/Chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
