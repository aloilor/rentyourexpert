
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpertsList from "./Components/Catalogue/ExpertsList";
import ExpertDetail from "./Components/Catalogue/ExpertDetail";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import Home from "./Components/Home/Home";
import LoginCustomer from "./Components/LoginCustomer/LoginCustomer";
import RegisterCustomer from "./Components/LoginCustomer/RegisterCustomer";

function App() {
  const [experts] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<ExpertsList experts={experts} />} />
          <Route path="/catalogue/:id" element={<ExpertDetail />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/register" element={<Register  />} />
          <Route path="/login_customer" element={<LoginCustomer  />} />
          <Route path="/register_customer" element={<RegisterCustomer  />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
