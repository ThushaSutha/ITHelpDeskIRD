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
          <Route path="/AboutUs" element={<PublicRoute><AboutUs /></PublicRoute>} />
          <Route path="/Contact" element={<PublicRoute><Contact /></PublicRoute>} /> 
          <Route path="/FAQ" element={<PublicRoute><FAQ /></PublicRoute>} /> 
          
          <Route path="/Chatbot" element={<PublicRoute><Chatbot /></PublicRoute>} /> 

        </Routes>
      </Router>
    </>
  );
}

export default App;