import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/main components/Home";
import SignInForm from "./components/main components/SignIn";
import MainLayout from "./Layouts/user/MainLayout";
import BlankLayout from "./Layouts/user/BlankLayout";
import AddUser from "./components/admin/AddUser";
import Dashboard from "./components/main components/Dashboard";
import ManageUser from "./components/admin/ManageUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/route/protected route/ProtectedRoute";
import PublicRoute from "./components/route/public route/PublicRoute";

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

            {/* Protected Routes */}
            <Route
              path="/dashboard/:view"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <AddUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
