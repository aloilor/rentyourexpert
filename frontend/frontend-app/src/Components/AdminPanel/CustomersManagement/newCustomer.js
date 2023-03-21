import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


function AddCustomerForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const surname = form.surname.value;
    const username = form.username.value;
    

    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('username', username);

    fetch("http://localhost:5002/customers", {
      method: "POST",
      body: 
        formData
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Customer added:", data);
        alert("Customer added successfully");
        navigate('/admin/customers');  

      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
    <h1>Add New Customer</h1>
    <form onSubmit={handleSubmit}>
    <label>Email:</label>
      <input name = 'email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Name:</label>
      <input name = 'name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label>Surname:</label>
      <input name = 'surname' type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
      <br />
      <label>Username:</label>
      <input name = 'username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Password:</label>
      <input name = 'password' type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button type="submit">Add Customer</button>
    </form>
  </div>
  );
}

export default AddCustomerForm;