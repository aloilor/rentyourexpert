import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ExpertsList() {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    fetch("/catalogue")
      .then((response) => response.json())
      .then((data) => setExperts(data))
      .catch((error) => console.log(error));
  }, []);

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
}

export default ExpertsList;