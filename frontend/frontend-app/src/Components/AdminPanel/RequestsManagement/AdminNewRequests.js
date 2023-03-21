import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function AdminNewRequest(){
    const [customerId, setCustomerId] = useState("");
    const [workerId, setWorkerId] = useState("");
    const navigate = useNavigate();
 

    const handleAddRequest = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('customer_id', customerId);
        formData.append('worker_id', workerId);
        formData.append('accepted', 1)

        fetch('http://localhost:5002/requests', {
            method: 'POST',
            body: formData,
        })
        .then((response) => {
            if (response.status === 200) {
                alert('Request added successfully');
                navigate('/admin/requests');
            }
        })
        .catch((error) => console.log(error));
    };

    return (
        <div>
            <form onSubmit={handleAddRequest}>
            <h2>Add a new Request</h2>
            <label htmlFor="customer_id">Customer ID:</label>
            <input type="text" id="customer_id" name="customer_id" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required />
            <br />
            <label htmlFor="worker_id">Worker ID:</label>
            <input type="text" id="worker_id" name="worker_id" value={workerId} onChange={(e) => setWorkerId(e.target.value)} required />
            <br />
            <button type="submit">Add Request</button>
            </form>
        </div>

    )
}
export default AdminNewRequest;