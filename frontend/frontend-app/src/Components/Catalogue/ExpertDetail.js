import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LogoutCustomerButton from '../Logout/Logout';
import QeA from '../QeA/QeA';
import Reviews from '../Reviews/Reviews';
import { Card, Col, Button, Row } from "react-bootstrap";
import  Navbar  from '../Navbar';
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
  MDBListGroupItem
} from 'mdb-react-ui-kit';

function ExpertDetail() {
  const { id } = useParams();
  const [expert, setExpert] = useState({});
  const authToken = localStorage.getItem('auth_token');
  
  const sendRequest = () => {
    fetch(`http://localhost:5004/catalogue/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': authToken
      }
    })
    .then((response) => {
      if (response.ok) {
        console.log('Request sent successfully');
        // aggiorna il componente per visualizzare la richiesta inviata
      } else {
        console.log('Failed to send request');
      }
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetch(`http://localhost:5000/catalogue/${id}`)
      .then((response) => response.json())
      .then((data) => setExpert(data[0]))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
    <Navbar />
    <div>
  
  <h1>Expert Detail</h1>
  <Card style={{ width: '50rem' }}>
    
    <Card.Body>
      <Card.Title>{expert.name} {expert.surname}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{expert.profession}</Card.Subtitle>
      <Card.Text>{expert.description}</Card.Text>
      <Button onClick={sendRequest}>Invia richiesta</Button>
    </Card.Body>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">Location: {expert.location}</li>
      <li className="list-group-item">Phone: {expert.phone}</li>
      <li className="list-group-item">Availability: {expert.available ? 'Available' : 'Not available'}</li>
    </ul>
  </Card>
  <QeA id={id} />
  <Reviews id={id} />
</div>
</>
  );
} 
export default ExpertDetail;
