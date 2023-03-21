import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function WorkersManagement() {
  const { id } = useParams();
  const [worker, setWorker] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5002/workers/${id}`)
      .then((response) => response.json())
      .then((data) => setWorker(data[0]))
      .catch((error) => console.log(error));
  }, [id]);


  const handleDeleteWorker = () => {
    fetch(`http://localhost:5002/workers/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Worker deleted successfully");
          navigate('/admin/workers');  
        }
      })
      .catch((error) => console.log(error));
  };
  
  return (
    <div>
      <h1>Worker Detail</h1>
      <p>Name: {worker.name} {worker.surname}</p>
      <button onClick={handleDeleteWorker}>Delete</button>
    </div>
  );

  
} 
export default WorkersManagement;