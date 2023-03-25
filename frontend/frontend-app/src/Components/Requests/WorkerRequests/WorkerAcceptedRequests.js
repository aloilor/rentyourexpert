import React, { useEffect, useState } from 'react';

function WorkerAcceptedRequests({ id }) {
  const [requests, setRequests] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:5001/worker_profile/${id}/accepted_requests`)
      .then(response => response.json())
      .then(data => setRequests(data))
      .catch(error => console.log(error));
  }, [id]);


  const handleRequestResponse = (requestId, accepted) => {
    fetch(`http://localhost:5004/worker_profile/${id}/request/${requestId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('auth_token')
      },
      body: `accepted=${accepted}`
    })
      .then(response => {
        if (response.status == 200) {
          alert("Request succesfully managed")
          // Aggiornare la lista delle recensioni
          fetch(`http://localhost:5001/worker_profile/${id}/accepted_requests`)
          .then(response => response.json())
          .then(data => setRequests(data))
          .catch(error => console.log(error));
          window.location.reload(false);
        } else {
          alert('Cannot delete the request, something has happened');
        }
      }).catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Accepted requests</h2>
      <ul>
        {requests.map(request => (
          <li key={request.id}>
            <div>Name: {request.name}</div>
            <div>Surname: {request.surname}</div>
            <div>Username: {request.username}</div>
            <div>Accepted: {request.accepted ? 'yes' : 'no'}</div>
            {!request.accepted && <button onClick={() => handleRequestResponse(request.id, 1)}>Accept</button>}
            {request.accepted && <button onClick={() => handleRequestResponse(request.id, 0)}>Delete</button>}
            </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkerAcceptedRequests;