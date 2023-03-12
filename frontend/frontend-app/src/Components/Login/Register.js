import React, { useState } from 'react';

function Register() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Le password non corrispondono!');
      return;
    }

    // Effettua la richiesta POST utilizzando fetch
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      setMessage(data.message);
    })
    .catch(error => {
      setMessage('Errore nella registrazione!');
    });
  };

  return (
    <div>
      <h1>Registrazione</h1>
      <form onSubmit={handleRegister}>
        <label>
          email:
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Conferma password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Registrazione</button>
      </form>
      <div>{message}</div>
    </div>
  );
}

export default Register;

