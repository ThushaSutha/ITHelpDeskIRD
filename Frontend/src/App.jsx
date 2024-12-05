import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/main components/Home";
import SignInForm from "./pages/main components/SignIn";
import MainLayout from "./Layouts/user/MainLayout";
import BlankLayout from "./Layouts/user/BlankLayout";
import AddUser from "./pages/admin/AddUser";
import Dashboard from "./pages/main components/Dashboard";
import ManageUser from "./pages/admin/ManageUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ProtectedRoute from "./route/protected route/ProtectedRoute";
import ProtectedRoute from "./contexts/ProtectedRoute"
import PublicRoute from "./route/public route/PublicRoute";
import Unauthorized from "./pages/main components/UnauthorizedPage";
import Test from "./components/Test";


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
                <ProtectedRoute roles = {['admin']}>
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
