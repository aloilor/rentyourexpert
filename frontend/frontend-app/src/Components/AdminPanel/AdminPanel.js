import React from 'react';
import { Link } from 'react-router-dom';
import LogoutCustomerButton from '../Logout/Logout';
import LoginAdmin from '../AdminPanel/AdminLogin';


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

    </div>
  );


}

export default AdminPanel;