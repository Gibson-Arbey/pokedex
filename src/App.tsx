import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Listado from './pages/Listado';


function App() {
  return (
    <Router>
      <div>
          <Routes>
            <Route path='/' element={<Listado />}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
