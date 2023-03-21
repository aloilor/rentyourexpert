import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

function RequestList(){
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5002/requests")
          .then((response) => response.json())
          .then((data) => setRequests(data))
          .catch((error) => console.log(error));
      }, []);

      const handleDeleteRequest = (id) => {
        fetch(`http://localhost:5002/requests/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.status === 200) {
                const updatedRequests = requests.filter(request => request.id !== id);
                setRequests(updatedRequests);
            }
        })
        .catch((error) => console.log(error));
    };


      return (
            <div>
                <h1>All Requests</h1>
                <Link to="/admin/requests/new">Add a new request</Link>
                {requests.map((request) => (
                    <div key={request.id}>
                    <p>Customer ID: {request.customer_id}</p>
                    <p>Worker ID: {request.worker_id}</p>
                    <p>Created At: {request.created_at}</p>
                    <button onClick={() => handleDeleteRequest(request.id)}>Delete</button>
                    </div>
                ))}                           
            </div>
      )


}

export default RequestList;