
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpertsList from "./Components/Catalogue/ExpertsList";
import ExpertDetail from "./Components/Catalogue/ExpertDetail";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import Home from "./Components/Home/Home";
import LoginCustomer from "./Components/LoginCustomer/LoginCustomer";
import RegisterCustomer from "./Components/LoginCustomer/RegisterCustomer";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import CustomersList from "./Components/AdminPanel/CustomersList";
import CustomerManagement from "./Components/AdminPanel/CustomersManagement";
import AddCustomerForm from "./Components/AdminPanel/newCustomer";
import WorkersList from "./Components/AdminPanel/WorkersList";
import WorkersManagement from "./Components/AdminPanel/WorkersManagement";
import AddWorkerForm from "./Components/AdminPanel/newWorker";

function App() {
  const [experts] = useState([]);
  const [customers] = useState([]);
  const [workers] = useState([]);

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
          <Route path="/admin" element={<AdminPanel  />} />
          <Route path="/admin/customers" element={<CustomersList customers={customers} />} />
          <Route path="/admin/customers/:id" element={<CustomerManagement />} />
          <Route path="/admin/customers/new" element={<AddCustomerForm />} />
          <Route path="/admin/workers" element={<WorkersList workers={workers} />} />
          <Route path="/admin/workers/:id" element={<WorkersManagement />} />
          <Route path="/admin/workers/new" element={<AddWorkerForm />} />



        
        
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
