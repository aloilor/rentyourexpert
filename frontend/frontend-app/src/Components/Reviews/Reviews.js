import React, { useEffect, useState } from 'react';


function Reviews({ id }) {
    const [reviews, setReviews] = useState([]);
    const authToken = localStorage.getItem('auth_token');
    const authTokenParts = authToken ? authToken.split(';') : [];
    const firstAuthTokenPart = authTokenParts.length > 0 ? authTokenParts[0] : null;
    const lastAuthTokenPart = authTokenParts.length > 0 ? authTokenParts[authTokenParts.length - 1] : null;
    const [editMode, setEditMode] = useState(false);
    const [editReviewId, setEditReviewId] = useState(null);


    useEffect(() => {
        fetch(`http://localhost:5006/catalogue/${id}`)
          .then(response => response.json())
          .then(data => setReviews(data))
          .catch(error => console.log(error));
      }, [id]);


      const handleReviewSubmit = (description) => {
        fetch(`http://localhost:5006/catalogue/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authToken
          },
          body: `description=${description}`
        })
          .then(response => {
            if (response.status === 200) {
              alert('Recensione aggiunta con successo');
              // Aggiornare la lista delle recensioni
              fetch(`http://localhost:5006/catalogue/${id}`)
              .then(response => response.json())
              .then(data => setReviews(data))
              .catch(error => console.log(error));
            } else {
              alert('Errore durante l\'aggiunta della recensione');
            }
          })
          .catch(error => console.log(error));
      }

      const handleEditReview = (description, reviewId) => {
    fetch(`http://localhost:5006/catalogue/${id}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authToken
      },
      body: `description=${description}`
    })
      .then(response => {
        if (response.status === 200) {
          alert('Recensione modificata con successo');
          // Aggiornare la lista delle recensioni
          fetch(`http://localhost:5006/catalogue/${id}`)
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.log(error));
        } else {
          alert('Errore durante la modifica della recensione');
        }
      })
      .catch(error => console.log(error));
    setEditReviewId(null);
    setEditMode(false);
  };


if(lastAuthTokenPart=='C'){
  return(
    <div>
        <h2>Reviews</h2>
        <ul>
          {reviews.map(reviews => (
            <li key={reviews.id}>
              <div>ID: {reviews.customer_id}</div>
              <div>Description: {reviews.description}</div>
              <div>Created At: {reviews.created_at}</div>
              {firstAuthTokenPart === reviews.customer_id.toString() && (
              <div>
                <br />
                
                
              </div>
      )}
      </li>
          ))}
        </ul>
        <h2>Aggiungi una recensione</h2>
        <form onSubmit={e => {
          e.preventDefault();
          handleReviewSubmit(e.target.elements.description.value);
          }}>
          <label htmlFor="description">Descrizione:</label>
          <input type="text" id="description" name="description" />
          <button type="submit">Aggiungi recensione</button>
        </form>
    </div>

)


}
else{
  return(
    <div>
        <h2>Reviews</h2>
        <ul>
          {reviews.map(reviews => (
            <li key={reviews.id}>
              <div>ID: {reviews.customer_id}</div>
              <div>Description: {reviews.description}</div>
              <div>Created At: {reviews.created_at}</div>
            </li>
          ))}
        </ul>
        </div>

)
}


}

export default Reviews;
