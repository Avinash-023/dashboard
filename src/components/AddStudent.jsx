import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config'; // Your Firebase config file
import { collection, addDoc, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import './../styles/AddStudent.css'; // Import the new styles

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    dob: '',
    gender: '',
    grade: '',
    section: '',
    rollNumber: '',
    parentName: '',
    parentPhone: '',
  });

  const { id } = useParams(); // For editing existing student
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };

  // Fetch existing student data if in edit mode
  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        const studentRef = doc(db, 'students', id);
        const studentDoc = await getDoc(studentRef);
        if (studentDoc.exists()) {
          setStudent(studentDoc.data());
        }
      };
      fetchStudent();
    }
  }, [id]);

  // Add or Edit student
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      // Update existing student
      const studentRef = doc(db, 'students', id);
      await updateDoc(studentRef, student);
      alert('Student updated successfully!');
    } else {
      // Add new student
      await addDoc(collection(db, 'students'), student);
      alert('Student added successfully!');
    }

    navigate('/studentsList'); // Redirect to students list page
  };

  // Delete student
  const handleDelete = async () => {
    const studentRef = doc(db, 'students', id);
    await deleteDoc(studentRef);
    alert('Student deleted successfully!');
    navigate('/studentsList'); // Redirect to students list page
  };

  return (
    <div className="add-student">
      <h2 className="login__title">{id ? 'Edit Student' : 'Add Student'}</h2>
      <form className="login__inputs" onSubmit={handleSubmit}>
        <div className="add-student__form-row">
          {/* Left Column (5 Fields) */}
          <div className="add-student__form-column">
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              placeholder="Name"
              className="login__input"
              required
            />
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              placeholder="Email"
              className="login__input"
              required
            />
            <input
              type="text"
              name="address"
              value={student.address}
              onChange={handleChange}
              placeholder="Address"
              className="login__input"
              required
            />
            <input
              type="text"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="login__input"
              required
            />
            <input
              type="date"
              name="dob"
              value={student.dob}
              onChange={handleChange}
              className="login__input"
              required
            />
          </div>

          {/* Right Column (Remaining Fields) */}
          <div className="add-student__form-column">
            <select
              name="gender"
              value={student.gender}
              onChange={handleChange}
              className="login__input"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="grade"
              value={student.grade}
              onChange={handleChange}
              placeholder="Grade"
              className="login__input"
              required
            />
            <input
              type="text"
              name="section"
              value={student.section}
              onChange={handleChange}
              placeholder="Section"
              className="login__input"
              required
            />
            <input
              type="text"
              name="rollNumber"
              value={student.rollNumber}
              onChange={handleChange}
              placeholder="Roll Number"
              className="login__input"
              required
            />
            <input
              type="text"
              name="parentName"
              value={student.parentName}
              onChange={handleChange}
              placeholder="Parent Name"
              className="login__input"
              required
            />
          </div>
        </div>

        <button type="submit" className="login__button">
          {id ? 'Update Student' : 'Add Student'}
        </button>
      </form>

      {id && (
        <button onClick={handleDelete} className="login__button" style={{ backgroundColor: 'red' }}>
          Delete Student
        </button>
      )}
    </div>
  );
};

export default AddStudent;
