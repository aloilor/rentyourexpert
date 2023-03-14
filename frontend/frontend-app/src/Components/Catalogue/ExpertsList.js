import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
  if (authToken) {
    // l'utente è autenticato, visualizza il catalogo
    return (
    
      <div>
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
        <h1>NON HAI L'AUTORIZZAZIONE</h1>
    </div>
    )
  }
  
}

export default ExpertsList;