import React, { useEffect, useState } from 'react';
import CustomerRequests from '../CustomerRequests/CustomerRequests';
import LogoutCustomerButton from '../Logout/Logout';

function CustomerProfile() {
  const authToken = localStorage.getItem('auth_token');
  const authTokenParts = authToken ? authToken.split(';') : [];
  const id  = authTokenParts.length > 0 ? authTokenParts[0] : null;
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5003/customer_profile/${id}`)
      .then((response) => response.json())
      .then((data) => setCustomer(data[0]))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
       <LogoutCustomerButton />
      <h1>Customer Profile</h1>
      <ul>
        <li>Username: {customer.username}</li>
        <li>Name: {customer.name}</li>
        <li>Surname: {customer.surname}</li>
        <li>Email: {customer.email}</li>
        <li>Password: {customer.password}</li>
      </ul>
      <CustomerRequests id={id} />
    </div>
  );
}

export default CustomerProfile;