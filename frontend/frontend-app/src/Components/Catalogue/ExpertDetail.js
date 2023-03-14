import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ExpertDetail() {
  const { id } = useParams();
  const [expert, setExpert] = useState({});
  const authToken = localStorage.getItem('auth_token');
  const authTokenParts = authToken ? authToken.split(';') : [];
  const lastAuthTokenPart = authTokenParts.length > 0 ? authTokenParts[authTokenParts.length - 1] : null;

  useEffect(() => {
    fetch(`http://localhost:5000/catalogue/${id}`)
      .then((response) => response.json())
      .then((data) => setExpert(data[0]))
      .catch((error) => console.log(error));
  }, [id]);

  console.log(id); // aggiungi questa linea per stampare l'id
  if (lastAuthTokenPart=='C') {
  return (
    <div>
      <h1>Expert Detail</h1>
      <p>Name: {expert.name} {expert.surname}</p>
      <p>Profession: {expert.profession}</p>
      <p>Location: {expert.location}</p>
      <p>Description: {expert.description}</p>
      <p>Phone: {expert.phone}</p>
      <p>Availability: {expert.available ? 'Available' : 'Not available'}</p>
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
export default ExpertDetail;
