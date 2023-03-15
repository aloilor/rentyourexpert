import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function CustomerManagement() {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5002/customers/${id}`)
      .then((response) => response.json())
      .then((data) => setCustomer(data[0]))
      .catch((error) => console.log(error));
  }, [id]);


  const handleDeleteCustomer = () => {
    fetch(`http://localhost:5002/customers/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Customer deleted successfully");
          navigate('/admin/customers');  
        }
      })
      .catch((error) => console.log(error));
  };
  
  return (
    <div>
      <h1>Expert Detail</h1>
      <p>Name: {customer.name} {customer.surname}</p>
      <button onClick={handleDeleteCustomer}>Delete</button>
    </div>
  );

  
} 
export default CustomerManagement;