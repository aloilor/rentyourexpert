import React, { useEffect, useState } from 'react';



function CustomerRequests({ id }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5003/customer_profile/${id}/requests`)
      .then(response => response.json())
      .then(data => setRequests(data))
      .catch(error => console.log(error));
  }, [id]);

  const handleDeleteRequest = (requestId) => {
    fetch(`http://localhost:5004/customer_profile/${id}/request/${requestId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth_token')
      }
    })
      .then(response => {
        if (response.ok) {
          const updatedRequests = requests.filter(request => request.id !== requestId);
          setRequests(updatedRequests);
        } else {
          alert('Cannot delete the request, it has already been accepted by the worker');
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Requests</h2>
      <ul>
        {requests.map(request => (
          <li key={request.id}>
            <div>Name: {request.name}</div>
            <div>Surname: {request.surname}</div>
            <div>Username: {request.username}</div>
            <div>Accepted: {request.accepted ? 'yes' : 'no'}</div>
            {!request.accepted && <button onClick={() => handleDeleteRequest(request.id)}>Delete</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerRequests;