import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function CustomersList() {
  
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem('auth_token')
    fetch("http://localhost:5002/customers")
      .then((response) => response.json())
      .then((data) => setCustomer(data))
      .catch((error) => console.log(error));
  }, []);


  
    // l'utente è autenticato, visualizza il catalogo
    return (
      
      <div>
        <h1>Customers List</h1>
        {customer.map((customer, index) => (
          <div key={index}>
            <Link to={`/admin/customers/${customer.id}`}>{customer.name} {customer.surname}</Link>
          </div>
        ))}
        <Link to="/admin/customers/new">
        <button>Add new customer</button>
      </Link>
      </div>
    );
 
   
  
  
}

export default CustomersList;