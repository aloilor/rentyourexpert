import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LogoutCustomerButton from '../LogoutCustomer/LogoutCustomer';
import LoginCustomer from '../LoginCustomer/LoginCustomer';

function ExpertsList() {
  const authToken = localStorage.getItem('auth_token');
  const authTokenParts = authToken ? authToken.split(';') : [];
  const lastAuthTokenPart = authTokenParts.length > 0 ? authTokenParts[authTokenParts.length - 1] : null;
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem('auth_token')
    fetch("http://localhost:5000/catalogue")
      .then((response) => response.json())
      .then((data) => setExperts(data))
      .catch((error) => console.log(error));
  }, []);


  if (lastAuthTokenPart=='C') {
    // l'utente è autenticato, visualizza il catalogo
    return (
      
      <div>
        <LogoutCustomerButton />
        <h1>Expert List</h1>
        {experts.map((expert, index) => (
          <div key={index}>
            <Link to={`/catalogue/${expert.id}`}>{expert.name} {expert.surname}</Link>
          </div>
        ))}
      </div>
    );
  } else {
    return(
    // l'utente non è autenticato, visualizza il componente di login
    <div>
        <LoginCustomer />
    </div>
    )
  }
  
}

export default ExpertsList;