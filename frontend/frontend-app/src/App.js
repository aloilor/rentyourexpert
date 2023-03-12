
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpertsList from "./Components/Catalogue/ExpertsList";
import ExpertDetail from "./Components/Catalogue/ExpertDetail";

function App() {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((response) => response.json())
      .then((data) => setExperts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/catalogue" element={<ExpertsList experts={experts} />} />
          <Route path="/catalogue/:id" element={<ExpertDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;