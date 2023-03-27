import React from 'react';
import { Link } from 'react-router-dom';
import LogoutCustomerButton from '../Logout/Logout';
import { Button, ButtonGroup } from 'react-bootstrap';

function AdminPanel() {
  return (
    <div>
      <ButtonGroup vertical style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
        <Link to="/admin/customers">
          <Button color="primary" className="my-1">Customers</Button>
        </Link>
        <Link to="/admin/workers">
          <Button color="primary" className="my-1">Workers</Button>
        </Link>
        <Link to="/admin/requests">
          <Button color="primary" className="my-1">Requests</Button>
        </Link>
      </ButtonGroup>
      <LogoutCustomerButton />
    </div>
  );
}

export default AdminPanel;
