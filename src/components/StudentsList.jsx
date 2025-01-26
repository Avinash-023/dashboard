// src/components/StudentsList.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config'; // Your Firebase config file
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { signOut } from 'firebase/auth'; // Import signOut for logging out
import { auth } from '../firebase/config'; // Import Firebase auth
import './../styles/StudentsList.css'; // Import the styles

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate(); // Initialize the navigation hook

  // Fetch all students from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollection = collection(db, 'students');
      const studentsSnapshot = await getDocs(studentsCollection);
      const studentsList = studentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentsList);
    };
    fetchStudents();
  }, []);

  // Delete student
  const handleDelete = async (id) => {
    const studentRef = doc(db, 'students', id);
    await deleteDoc(studentRef);
    setStudents(students.filter(student => student.id !== id)); // Remove deleted student from state
    alert('Student deleted successfully!');
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      navigate('/LoginPage'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="students-list">
      <div className="students-list-header">
        <h2 className="login__title">Students List</h2>
        <div className="header-actions">
          <Link to="/addstudent" className="add-student-link">Add Student</Link>
          {/* Add Logout Button with margin */}
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
      
      {/* Display students in a card layout */}
      <div className="students-list__cards">
        {students.map(student => (
          <div key={student.id} className="student-card">
            <h3>{student.name}</h3>
            
            <div className="student-card__details">
              {/* First Column with Max 6 Fields */}
              <div className="student-card__column">
                <p><strong>Roll Number:</strong> {student.rollNumber}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Phone:</strong> {student.phone}</p>
                <p><strong>Address:</strong> {student.address}</p>
                <p><strong>Grade:</strong> {student.grade}</p>
                <p><strong>Section:</strong> {student.section}</p>
              </div>

              {/* Second Column with Remaining Fields */}
              <div className="student-card__column">
                <p><strong>Parent Name:</strong> {student.parentName}</p>
                <p><strong>Parent Phone:</strong> {student.parentPhone}</p>
                <p><strong>Date of Birth:</strong> {student.dob}</p>
                <p><strong>Gender:</strong> {student.gender}</p>
              </div>
            </div>

            <div className="student-card__actions">
              <Link to={`/addstudent/${student.id}`} className="edit-link">Edit</Link>
              <button onClick={() => handleDelete(student.id)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsList;
