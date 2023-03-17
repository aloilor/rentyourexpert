import React, { useEffect, useState } from 'react';

function WorkerRequests({ id }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/worker_profile/${id}/requests`)
      .then(response => response.json())
      .then(data => setRequests(data))
      .catch(error => console.log(error));
  }, [id]);

  return (
    <div>
      <h2>Requests</h2>
      <ul>
        {requests.map(request => (
          <li key={request.username}>
            <div>Name: {request.name}</div>
            <div>Surname: {request.surname}</div>
            <div>Username: {request.username}</div>
            <div>Accepted: {request.accepted ? 'yes' : 'no'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkerRequests;