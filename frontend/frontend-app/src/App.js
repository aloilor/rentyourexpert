
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpertsList from "./Components/Catalogue/ExpertsList";
import ExpertDetail from "./Components/Catalogue/ExpertDetail";
import Login from "./Components/Login/Login";



function App() {
  const [experts, setExperts] = useState([]);
  


  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/catalogue" element={<ExpertsList experts={experts} />} />
          <Route path="/catalogue/:id" element={<ExpertDetail />} />
          <Route path="/login" element={<Login  />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;