import SystemStart from "./Components/SystemStart";
import { Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

function App() {
  return (
    <div className="App">


<Routes>
                  <Route path="/" element={<SystemStart />} />

                </Routes>
     
    </div>
  );
}

export default App;
