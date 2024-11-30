import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/not_found/NotFound";
import Address from "./pages/address/Address";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/address" element={<PrivateRoute element={<Address/>} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <ToastContainer position='top-right' />
      </Router>
    </>
  )
}

export default App
