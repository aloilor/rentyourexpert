import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-5">
      <h1 className="text-center">Welcome to Rent Your Expert!</h1>
      <Row className="mt-5">
        <Col md={{ span: 6 }}>
          <p>Rent Your Expert is a platform that connects customers with top-notch professionals in various fields. Whether you're looking for a plumber, a lawyer, a graphic designer, or anything in between, we've got you covered. Our platform offers a seamless experience for both parties, allowing customers to find the right expert for their needs and professionals to showcase their skills and grow their business.</p>
        </Col>
        <Col md={{ span: 6 }}>
          <div className="d-flex justify-content-center">
            <div className="mx-3">
              <h3>Customers</h3>
              <p>Join our community as a customer:</p>
              <Button variant="primary" href="/login_customer">
                Sign In
              </Button>
            </div>
            <div className="mx-3">
              <h3>Workers</h3>
              <p>Ready to offer your expertise? Sign in as a worker:</p>
              <Button variant="primary" href="/login">
                Sign In
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}>
          <Button variant="outline-primary" href="/admin">
            Admin Panel
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
