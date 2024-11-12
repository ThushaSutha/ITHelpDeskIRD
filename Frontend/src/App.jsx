import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/main components/Home";
import SignInForm from "./components/main components/SignIn";


import MainLayout from "./Layouts/user/MainLayout";
import BlankLayout from "./Layouts/user/BlankLayout";
import AddUser from "./components/admin/AddUser";
import Dashboard from "./components/main components/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard/:view" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddUser />} />
          </Route>

          <Route element={<BlankLayout />}>
            <Route path="/signIn" element={<SignInForm />} />
          </Route>

          {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
