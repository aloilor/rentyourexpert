import React from 'react';

function Home() {
  return (
    <div>
      <h1>Welcome to my App!</h1>
      <p>Please login to access as customer:</p>
      <a href="/login_customer">Login</a>
      <p>Please login to access as worker:</p>
      <a href="/login">Login</a>
    </div>
  );
}

export default Home;