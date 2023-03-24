
import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";

function SearchBar() {
   const [searchTerm, setSearchTerm] = useState([]);

   const handleSubmit = (event) => {
      event.preventDefault();
      fetch(`https://example.com/api/search?query=${searchTerm}`)
         .then(response => response.json())
         .then((data) => setExperts(data))
         .catch(error => console.error(error));
   }

   return (
      <Form onSubmit={handleSubmit} inline>
         <FormControl type="text" placeholder="Search" className="mr-sm-2"
            value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
         <Button variant="outline-success" type="submit">Search</Button>
      </Form>
   )
}

export default SearchBar;