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
              alert('Tu e il worker non siete ancora amici!');
            }
          })
          .catch(error => console.log(error));
      }



      const handleReviewUpdate = (event, reviewId) => {
        event.preventDefault();
        const description = event.target.elements.description.value;
        const updatedReviews = reviews.map(review => {
          if (review.id === reviewId) {
            return { ...review, description };
          } else {
            return review;
          }
        });
        setReviews(updatedReviews);
        setEditMode(false);
        fetch(`http://localhost:5006/catalogue/${id}/${reviewId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authToken
          },
          body: `description=${description}`
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update review');
          }
        })
        .catch(error => console.error(error));
      };

      const handleReviewDelete = (reviewId) => {
        fetch(`http://localhost:5006/catalogue/${id}/${reviewId}`, {
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



if(lastAuthTokenPart=='C'){
  return(
    <div>
        <h2>Reviews</h2>
        <ul>
          {reviews.map(reviews => (
            <li key={reviews.id}>
              <div>Username: {reviews.username}</div>
              <div>Description: {reviews.description}</div>
              <div>Created At: {reviews.created_at}</div>
              {firstAuthTokenPart === reviews.customer_id.toString() && (
              <div>
                {editMode && reviews.id === editReviewId ? (
                  <form onSubmit={event => handleReviewUpdate(event, reviews.id)}>
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" defaultValue={reviews.description} />
                    <button type="submit">Update</button>
                  </form>
                ) : (
                  <div>
                    {reviews.description}
                    <br />
                    <button onClick={() => {
                      setEditMode(true);
                      setEditReviewId(reviews.id);
                    }}>Edit</button>
                    <button onClick={() => handleReviewDelete(reviews.id)}>Delete</button>
                  </div>
                )}         
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
          <button type="submit">Add Review</button>
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
              <div>Username: {reviews.username}</div>
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
