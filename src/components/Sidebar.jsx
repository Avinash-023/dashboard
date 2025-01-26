// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config'; // Import Firebase auth
import { FiMenu, FiX } from 'react-icons/fi'; // Menu and close icons
import './../styles/Sidebar.css'; // Import the Sidebar CSS

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar__toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>
      <nav>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <Link to="/students" className="sidebar__link">Students List</Link>
          </li>
          <li className="sidebar__item">
            <Link to="/addstudent" className="sidebar__link">Add Student</Link>
          </li>
          <li className="sidebar__item">
            <button onClick={handleLogout} className="sidebar__link logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
