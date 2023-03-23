import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-5">
      <h1 className="text-center">Welcome to my App!</h1>
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <p>Please login to access as customer:</p>
          <Button variant="primary" href="/login_customer">
            Login
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}>
          <p>Please login to access as worker:</p>
          <Button variant="primary" href="/login">
            Login
          </Button>
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
