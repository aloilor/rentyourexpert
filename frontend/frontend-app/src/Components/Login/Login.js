import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    
    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
  
    
    fetch('http://localhost:5001/login/', {
      method: 'POST',
      body: 
        formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'success') {
          setMessage('Logged in successfully!');
          console.log(data.auth_token);
          localStorage.setItem('auth_token', data.auth_token);
        } else {
          setMessage('Incorrect email/password!');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
      <label>Email:</label>
        <input name = 'email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input name = 'password' type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;

