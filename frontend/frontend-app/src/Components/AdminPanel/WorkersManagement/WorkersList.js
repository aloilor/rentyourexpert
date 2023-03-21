import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function WorkersList() {
  const [worker, setworker] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem('auth_token')
    fetch("http://localhost:5002/workers")
      .then((response) => response.json())
      .then((data) => setworker(data))
      .catch((error) => console.log(error));
  }, []);


  
    return (
      
        <div>
        <h1>Worker List</h1>
        {worker.map((worker, index) => (
          <div key={index}>
            <Link to={`/admin/workers/${worker.id}`}>{worker.name} {worker.surname}</Link>
          </div>
        ))}
        <Link to="/admin/workers/new">
        <button>Add new worker</button>
      </Link>
      </div>
    );
  
  
}

export default WorkersList;