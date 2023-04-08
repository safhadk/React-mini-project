import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./Routes/User";
import Admin from './Routes/Admin'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/admin/*' element={<Admin />} />
          <Route path='/*' element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
