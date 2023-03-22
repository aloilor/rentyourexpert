import React, { useState } from 'react';

function RegisterCustomer() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const surname = form.surname.value;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    let formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);


    fetch('http://localhost:5003/register_customer/', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
    <h1>Registration Form</h1>
    <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Surname:</label>
        <input name='surname' type='text' value={surname} onChange={(e) => setSurname(e.target.value)} />
        <br />
        <label>Username:</label>
        <input name='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label>Email:</label>
        <input name='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type='submit'>Register</button>
    </form>
    <p>{message}</p>
    </div>
  );
}

export default RegisterCustomer;

