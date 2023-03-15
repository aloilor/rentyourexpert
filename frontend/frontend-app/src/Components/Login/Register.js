import React, { useState } from 'react';

function Register() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [profession, setProfession] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const surname = form.surname.value;
    const profession = form.profession.value;
    const location = form.location.value;
    const description = form.description.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const password = form.password.value;

    let formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('profession', profession);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('password', password);


    fetch('http://localhost:5001/worker_register/', {
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
        <label>Profession:</label>
        <input name='profession' type='text' value={profession} onChange={(e) => setProfession(e.target.value)} />
        <br />
        <label>Location:</label>
        <input name='location' type='text' value={location} onChange={(e) => setLocation(e.target.value)} />
        <br />
        <label>Description:</label>
        <textarea name='description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <br />
        <label>Email:</label>
        <input name='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Phone:</label>
        <input name='phone' type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
        <br />
        <label>Address:</label>
        <input name='address' type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
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

export default Register;

