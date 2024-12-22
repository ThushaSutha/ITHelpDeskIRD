import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import ProtectedRoute from "./contexts/ProtectedRoute"
import PublicRoute from "./route/public route/PublicRoute";
import Unauthorized from "./pages/main components/UnauthorizedPage";
import Test from "./components/Test";
import NewTicket from "./pages/main components/NewTicket";

import AboutUs from "./pages/main components/AboutUs"
import Contact from "./pages/main components/Contact";
import Chatbot from "./pages/main components/Chatbot";
import FAQ from "./pages/main components/FAQ";
import AddServiceCompanyDetails from "./pages/supplystaff/addservicecompany";
import ManageService from "./pages/supplystaff/manageservicecompany";
import AddDeviceDetails from "./pages/supplystaff/adddevice";


function App() {
  return (
    <>
      {/* Toast Container for Global Notifications */}
      <ToastContainer />
      <Router>
        <Routes>
          {/* Routes with Main Layout */}
          <Route element={<MainLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/test" element={<Test />} />


            {/* Protected Routes */}
            <Route
              path="/dashboard/:view"
              element={
                <ProtectedRoute roles={['staff']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={['staff','admin']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tickets"
              element={
                <ProtectedRoute roles={['staff','admin']}>
                  <ManageTicket />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new-ticket"
              element={
                <ProtectedRoute roles={['staff','admin']}>
                  <NewTicket />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-service"
              element={
                <ProtectedRoute roles={['staff','admin']}>
                  <AddServiceCompanyDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/service"
              element={
                <ProtectedRoute roles={['staff','admin']}>
                  <ManageService />
                </ProtectedRoute>
              }
            />

              <Route
              path="/add-device"
              element={
                <ProtectedRoute roles={['staff','admin']}>
                  <AddDeviceDetails />
                </ProtectedRoute>
              }
            />        

            <Route
              path="/add"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AddUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AddUser
                    isEditMode = {true}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute roles = {['admin','it_staff']}>
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
          



          <Route path="*" element={<Navigate to= "/signIn" />}></Route>
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Contact" element={<Contact />} /> 
          <Route path="/FAQ" element={<FAQ />} /> 
          
          <Route path="/Chatbot" element={<Chatbot />} /> 

        </Routes>
      </Router>
    </>
  );
}

export default App;