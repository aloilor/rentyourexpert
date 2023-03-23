import React, { useEffect, useState } from 'react';

function WorkerRequests({ id }) {
  const [requests, setRequests] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:5001/worker_profile/${id}/pending_requests`)
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
      .then(response => response.text())
      .then(data => {
        // Aggiorna lo stato della richiesta selezionata nella lista
        const updatedRequests = requests.map(request => {
          if (request.id === requestId) {
            return {
              ...request,
              accepted: accepted
            };
          }
          return request;
        });
        setRequests(updatedRequests);
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
            {!request.accepted && <button onClick={() => handleRequestResponse(request.id, true)}>Accept</button>}
            {request.accepted &&<button onClick={() => handleRequestResponse(request.id, false)}>Reject</button>}
            </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkerRequests;