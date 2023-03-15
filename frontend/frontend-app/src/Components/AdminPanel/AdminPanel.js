import React from 'react';
import { Link } from 'react-router-dom';

function AdminPanel() {
  return (
    <div>
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