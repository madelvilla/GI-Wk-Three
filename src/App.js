import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Easy from './pages/Easy';
import Medium from './pages/Medium';
import Hard from './pages/Hard';
import TaskDetail from './pages/TaskDetail';
import Nav from './components/Nav';

const App = () => (
  <Router>
  <div className='nav-container'>
    <Nav />
    <div className='page-content'>
      <Routes>
      <Route path="/" element={<Easy />} />
      <Route path="/medium" element={<Medium />} />
      <Route path="/hard" element={<Hard />} />
      <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </div>
  </div>
</Router>
);

export default App;