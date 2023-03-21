
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ExpertsList from "./Components/Catalogue/ExpertsList";
import ExpertDetail from "./Components/Catalogue/ExpertDetail";
import Login from "./Components/Login/LoginWorker/LoginWorker";
import Register from "./Components/Login/LoginWorker/RegisterWorker";
import Home from "./Components/Home/Home";
import LoginCustomer from "./Components/Login/LoginCustomer/LoginCustomer";
import RegisterCustomer from "./Components/Login/LoginCustomer/RegisterCustomer";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import CustomersList from "./Components/AdminPanel/CustomersManagement/CustomersList";
import CustomerManagement from "./Components/AdminPanel/CustomersManagement/CustomersManagement";
import AddCustomerForm from "./Components/AdminPanel/CustomersManagement/newCustomer";
import WorkersList from "./Components/AdminPanel/WorkersManagement/WorkersList";
import WorkersManagement from "./Components/AdminPanel/WorkersManagement/WorkersManagement";
import AddWorkerForm from "./Components/AdminPanel/WorkersManagement/newWorker";
import CustomerProfile from "./Components/Profile/CustomerProfile/CustomerProfile";
import WorkerProfile from "./Components/Profile/WorkerProfile/WorkerProfile";
import WorkerRequests from "./Components/Requests/WorkerRequests/WorkerRequests";
import CustomerRequests from "./Components/Requests/CustomerRequests/CustomerRequests";
import LoginAdmin from "./Components/AdminPanel/AdminLogin";





function App() {
  const [experts] = useState([]);
  const [customers] = useState([]);
  const [workers] = useState([]);


  function isAdmin() {
    const authToken = localStorage.getItem('auth_token');
    const authTokenParts = authToken ? authToken.split(';') : [];
    const lastAuthTokenPart = authTokenParts.length > 0 ? authTokenParts[authTokenParts.length - 1] : null; 
    return lastAuthTokenPart === 'A';
  }

  function isWorker() {
    const authToken = localStorage.getItem('auth_token');
    const authTokenParts = authToken ? authToken.split(';') : [];
    const lastAuthTokenPart = authTokenParts.length > 0 ? authTokenParts[authTokenParts.length - 1] : null; 
    return lastAuthTokenPart === 'W';
  }

  function isCustomer() {
    const authToken = localStorage.getItem('auth_token');
    const authTokenParts = authToken ? authToken.split(';') : [];
    const lastAuthTokenPart = authTokenParts.length > 0 ? authTokenParts[authTokenParts.length - 1] : null; 
    return lastAuthTokenPart === 'C';
  }
  
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={isCustomer() ? <ExpertsList experts={experts} /> : <LoginCustomer /> } />
          <Route path="/catalogue/:id" element={isCustomer() ? <ExpertDetail /> : <LoginCustomer /> } />
          
          <Route path="/login" element={<Login  />} />
          <Route path="/register" element={<Register  />} />
          <Route path="/login_customer" element={<LoginCustomer  />} />
          <Route path="/register_customer" element={<RegisterCustomer  />} />
        
          
          <Route path="/admin" element={<AdminPanel  />} />
          <Route path="/admin/customers" element={isAdmin() ? <CustomersList customers={customers} /> : <LoginAdmin /> } /> 
          <Route path="/admin/customers/:id" element={isAdmin() ? <CustomerManagement />: <LoginAdmin /> } /> 
          <Route path="/admin/customers/new" element={isAdmin() ? <AddCustomerForm />: <LoginAdmin /> } /> 
          <Route path="/admin/workers" element={isAdmin() ? <WorkersList workers={workers} />: <LoginAdmin /> } /> 
          <Route path="/admin/workers/:id" element={isAdmin() ? <WorkersManagement />: <LoginAdmin /> } /> 
          <Route path="/admin/workers/new" element={isAdmin() ? <AddWorkerForm />: <LoginAdmin /> } />  
          <Route path="/admin_login" element={<LoginAdmin />} />
          
         

          <Route path="/customer_profile/:id" element={isCustomer() ? <CustomerProfile /> : <LoginCustomer /> } />
          <Route path="/customer_profile/:id/requests" element={isCustomer() ? <CustomerRequests /> : <LoginCustomer /> } />
          
          <Route path="/worker_profile/:id" element={isWorker() ? <WorkerProfile /> : <Login /> } />
          <Route path="/worker_profile/:id/requests" element={isWorker() ? <WorkerRequests /> : <Login /> } />
        
        </Routes>
        
          
      </div>
    </BrowserRouter>
  );
}

export default App;
