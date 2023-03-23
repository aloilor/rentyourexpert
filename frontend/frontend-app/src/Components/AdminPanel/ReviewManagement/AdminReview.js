import React, { useEffect, useState } from 'react';


function AdminReviews({ id }) {
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:5006/catalogue/${id}`)
          .then(response => response.json())
          .then(data => setReviews(data))
          .catch(error => console.log(error));
      }, [id]);



      const handleReviewDelete = (reviewId) => {
        fetch(`http://localhost:5002/catalogue/${id}/${reviewId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': localStorage.getItem('auth_token')
          }
        })
        .then(response => {
          if (response.status === 200) {
            alert('Recensione eliminata con successo');
            // Aggiornare la lista delle recensioni
            fetch(`http://localhost:5006/catalogue/${id}`)
              .then(response => response.json())
              .then(data => setReviews(data))
              .catch(error => console.log(error));
          } else {
            alert('Errore nella delete');
          }
        })
        .catch(error => console.log(error));
      };


      return(
        <div>
            <h2>Reviews</h2>
            <ul>
              {reviews.map(reviews => (
                <li key={reviews.id}>
                  <div>ID: {reviews.customer_id}</div>
                  <div>Description: {reviews.description}</div>
                  <div>Created At: {reviews.created_at}</div>
                  <button onClick={() => handleReviewDelete(reviews.id)}>Delete</button>
                
                </li>
              ))}
            </ul>
            </div>
    
    )
    }

    export default AdminReviews;