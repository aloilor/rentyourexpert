import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ExpertDetail() {
  const { id } = useParams();
  const [expert, setExpert] = useState({});

  useEffect(() => {
    fetch(`/catalogue/${id}`)
      .then((response) => response.json())
      .then((data) => setExpert(data[0]))
      .catch((error) => console.log(error));
  }, [id]);

  console.log(id); // aggiungi questa linea per stampare l'id

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
}

export default ExpertDetail;
