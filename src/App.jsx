import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddStudent from './components/AddStudent';
import StudentsList from './components/StudentsList'; 
import LoginPage from './components/LoginPage'; 
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/StudentsList" element={<StudentsList />} />
        <Route path="/addstudent" element={<AddStudent />} /> {/* For adding new student */}
        <Route path="/addstudent/:id" element={<AddStudent />} /> {/* For editing student */}
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
