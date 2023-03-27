import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar'


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
        <>
        <Navbar />
        <div class="container">
            <form onSubmit={handleAddRequest}>
                <h2>Add a new Request</h2>
                <div class="form-group">
                    <label htmlFor="customer_id">Customer ID:</label>
                    <input type="text" class="form-control" id="customer_id" name="customer_id" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required />
                </div>
                <div class="form-group">
                    <label htmlFor="worker_id">Worker ID:</label>
                    <input type="text" class="form-control" id="worker_id" name="worker_id" value={workerId} onChange={(e) => setWorkerId(e.target.value)} required />
                </div>
                <br></br>
                <button type="submit" class="btn btn-primary">Add Request</button>
            </form>
        </div>
        </>
    )
}
export default AdminNewRequest;
