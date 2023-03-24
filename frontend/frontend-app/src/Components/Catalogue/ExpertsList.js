import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LogoutCustomerButton from '../Logout/Logout';
import  Navbar  from '../Navbar';
import { Card, Col, Button, Row } from "react-bootstrap";

function ExpertsList() {
  const authToken = localStorage.getItem('auth_token');
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem('auth_token')
    fetch("http://localhost:5000/catalogue")
      .then((response) => response.json())
      .then((data) => setExperts(data))
      .catch((error) => console.log(error));
  }, []);


  
    return (
      <>
      <Navbar />
      
      <div className="container my-5">

      <h1 className="my-4">Expert List</h1>
      <Row>
        {experts.map((expert, index) => (
          <Col md={4} sm={12} key={index}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>{expert.name} {expert.surname}</Card.Title>
                <Card.Text>{expert.profession}, {expert.location}</Card.Text>
                <Link to={`/catalogue/${expert.id}`}>
                  <Button variant="outline-dark">View Profile</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    </>
    );
  
  
}

export default ExpertsList;