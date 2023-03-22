import React, { useEffect, useState } from 'react';


function Reviews({ id }) {
    const [reviews, setReviews] = useState([]);
    const authToken = localStorage.getItem('auth_token');
    const authTokenParts = authToken ? authToken.split(';') : [];
    const firstAuthTokenPart = authTokenParts.length > 0 ? authTokenParts[0] : null;
    const lastAuthTokenPart = authTokenParts.length > 0 ? authTokenParts[authTokenParts.length - 1] : null;

    useEffect(() => {
        fetch(`http://localhost:5006/catalogue/${id}`)
          .then(response => response.json())
          .then(data => setReviews(data))
          .catch(error => console.log(error));
      }, [id]);


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

export default Reviews;
