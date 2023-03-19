
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpertsList from "./Components/Catalogue/ExpertsList";
import ExpertDetail from "./Components/Catalogue/ExpertDetail";
import Login from "./Components/LoginWorker/LoginWorker";
import Register from "./Components/LoginWorker/RegisterWorker";
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
import CustomerProfile from "./Components/Profile/CustomerProfile";
import WorkerProfile from "./Components/Profile/WorkerProfile";
import WorkerRequests from "./Components/WorkerRequests/WorkerRequests";
import CustomerRequests from "./Components/CustomerRequests/CustomerRequests";

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
          
          <Route path="/customer_profile/:id" element={<CustomerProfile />} />
          <Route path="/customer_profile/:id/requests" element={<CustomerRequests />} />
          <Route path="/worker_profile/:id" element={<WorkerProfile />} />
          <Route path="/worker_profile/:id/requests" element={<WorkerRequests />} />
        
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
