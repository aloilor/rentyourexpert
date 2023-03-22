import React, { useEffect, useState } from 'react';
import WorkerRequests from '../../Requests/WorkerRequests/WorkerRequests';
import LogoutCustomerButton from '../../Logout/Logout';
import QeA from '../../QeA/QeA';
import Reviews from '../../Reviews/Reviews';



function WorkerProfile() {
  const authToken = localStorage.getItem('auth_token');
  const authTokenParts = authToken ? authToken.split(';') : [];
  const id  = authTokenParts.length > 0 ? authTokenParts[0] : null;
  const [worker, setWorker] = useState({});
  

  useEffect(() => {
    fetch(`http://localhost:5001/worker_profile/${id}`)
      .then((response) => response.json())
      .then((data) => setWorker(data[0]))
      .catch((error) => console.log(error));
  }, [id]);

  

  
  return (
    <div>
      <LogoutCustomerButton />
      <h1>Worker Profile</h1>
      <ul>
        <li>Name: {worker.name}</li>
        <li>Surname: {worker.surname}</li>
        <li>Profession: {worker.profession}</li>
        <li>Location: {worker.location}</li>
        <li>Description: {worker.description}</li>
        <li>Email: {worker.email}</li>
        <li>Phone: {worker.phone}</li>
        <li>Address: {worker.address}</li>
        <li>Available: {worker.available}</li>
        <li>Password: {worker.password}</li>
      </ul>
      <WorkerRequests id={id} />
      <QeA id={id} />
      <Reviews id={id} />
     
    </div>
  );
}

export default WorkerProfile;