import React from 'react';
import { Link } from 'react-router-dom';
import LogoutCustomerButton from '../Logout/Logout';


function AdminPanel() {
  return (
    <div>
       <LogoutCustomerButton />
      <Link to="/admin/customers">
        <button>Customers</button>
      </Link>
      <br />
      <Link to="/admin/workers">
        <button>Workers</button>
      </Link>
      <br />
      <Link to="/admin/requests">
        <button>Requests</button>
      </Link>

    </div>
  );


}

export default AdminPanel;