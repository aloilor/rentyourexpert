import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddWorkerForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("profession", profession);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);

    fetch("http://localhost:5002/workers", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Worker added:", data);
        alert("Worker added successfully");
        navigate("/admin/workers");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <h1>Add New Worker</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            className="form-control"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Surname:</label>
          <input
            className="form-control"
            name="surname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Profession:</label>
          <input
            className="form-control"
            name="profession"
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            className="form-control"
            name="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="form-control"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            className="form-control"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            className="form-control"
            name="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            className="form-control"
            name="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            className="form-control"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary">
          Add worker
        </button>
      </form>
    </div>
  );
}

export default AddWorkerForm;
