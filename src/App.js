import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Workout from './pages/Workout'; // We'll create this next
import Meal from './pages/Meal'; // We'll create this next
// import Measurements from './pages/Measurements'; // We'll create this later
import ProgressTracker from './pages/ProgressTracker'; // We'll create this later

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/meal" element={<Meal />} />
       {/*} <Route path="/measurements" element={<Measurements />} />*/}
        <Route path="/progress" element={<ProgressTracker />} /> 
      </Routes>
    </Router>
  );
};

export default App;
