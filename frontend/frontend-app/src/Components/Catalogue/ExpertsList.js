import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LogoutCustomerButton from '../Logout/Logout';
import LoginCustomer from '../Login/LoginCustomer/LoginCustomer';
import ProfileButton from '../Profile/CustomerProfile/ButtonCustomerProfile';


function ExpertsList() {
  const authToken = localStorage.getItem('auth_token');
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem('auth_token')
    fetch("http://localhost:5000/catalogue")
      .then((response) => response.json())
      .then((data) => setExperts(data))
      .catch((error) => console.log(error));
  }, []);


  
    return (
      
      <div>
        <LogoutCustomerButton />
        <ProfileButton />
        <h1>Expert List</h1>
        {experts.map((expert, index) => (
          <div key={index}>
            <Link to={`/catalogue/${expert.id}`}>{expert.name} {expert.surname}</Link>
          </div>
        ))}
      </div>
    );
  
  
}

export default ExpertsList;