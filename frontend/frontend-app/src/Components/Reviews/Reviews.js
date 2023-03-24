import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBCardGroup
} from 'mdb-react-ui-kit';
import { FaGlobe, FaGithub, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button, Form, Input } from 'react-bootstrap';

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
  <MDBCol lg="12">
    <MDBCard className="mb-4">
      <MDBCardBody>
        <MDBCardText>
          <h2>Reviews</h2>
          {reviews.map(review => (
            <MDBCard key={review.id} className="mb-3">
              <MDBCardBody>
                <div>Username: {review.username}</div>
                <div>Description: {review.description}</div>
                <div>
                  <MDBRow>
                    <MDBCol sm="3">Created At:</MDBCol>
                    <MDBCol sm="9">{review.created_at}</MDBCol>
                  </MDBRow>
                </div>
                {firstAuthTokenPart === review.customer_id.toString() && (
                  <div>
                    <MDBRow>
                      <MDBCol sm="3">Actions:</MDBCol>
                      <MDBCol sm="9">
                        {editMode && review.id === editReviewId ? (
                          <form onSubmit={event => handleReviewUpdate(event, review.id)}>
                            <label htmlFor="description">Description:</label>
                            <input type="text" name="description" defaultValue={review.description} />
                            <button type="submit">Update</button>
                          </form>
                        ) : (
                          <div>
                            <button onClick={() => {
                              setEditMode(true);
                              setEditReviewId(review.id);
                            }}>Edit</button>
                            <button onClick={() => handleReviewDelete(review.id)}>Delete</button>
                          </div>
                        )}
                      </MDBCol>
                    </MDBRow>
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>
          ))}
        </MDBCardText>
        <h2>Add Review</h2>
        <form onSubmit={e => {
          e.preventDefault();
          handleReviewSubmit(e.target.elements.description.value);
        }}>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" />
          <button type="submit">Add Review</button>
        </form>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
</div>

)


}
else{
  return(
    <div>
  <MDBCol lg="12">
    <MDBCard className="mb-4">
      <MDBCardBody>
        <MDBCardText>
          <h2>Reviews</h2>
          {reviews.map(review => (
            <MDBCard key={review.id}>
              <MDBCardBody>
                <div>Username: {review.username}</div>
                <div>Description: {review.description}</div>
                <div>Created At: {review.created_at}</div>
              </MDBCardBody>
            </MDBCard>
          ))}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
</div>

)
}


}

export default Reviews;
