import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import xrayBg from '../assets/xray-bg.jpg';
import profilePlaceholder from '../assets/profile-placeholder.png';
import '../styles/PatientRecordsPage.css';

const PatientRecordsPage = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/patients/getAllPatients', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);


  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient record?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(patients.filter(patient => patient._id !== id));
      alert('Patient record deleted successfully!');
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Failed to delete patient record.');
    }
  };

  const filteredPatients = patients.filter(patient =>
      patient?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="patient-records-container" style={{ backgroundImage: `url(${xrayBg})` }}>
        <header>
          <div className="profile-pic">
            <img src={profilePlaceholder} alt="Profile" />
          </div>
          <nav>
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/feedback">Feedback</a>
            <button onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}>Logout</button>
          </nav>
        </header>

        <div className="search-bar">
          <button className="btn" onClick={() => navigate('/dental-examination')}>Dental Examination</button>
          <button className="btn">Patient Records</button>
          <input
              type="text"
              placeholder="Search by Patient Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
            <p style={{ color: 'white', textAlign: 'center' }}>Loading patient records...</p>
        ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                <tr>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Date of Visit</th>
                  <th>Attrition</th>
                  <th>Abrasion</th>
                  <th>Erosion</th>
                  <th>Abfraction</th>
                  <th>Primary Dentition</th>
                  <th>Mixed Dentition</th>
                  <th>Permanent Dentition</th>
                  <th>Tooth Size</th>
                  <th>Tooth Shape</th>
                  <th>Tooth Structure</th>
                  <th>Tooth MP</th>
                  <th>Jaw</th>
                  <th>OPG</th>
                  <th>Bitewing</th>
                  <th>CBCT</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredPatients.map((patient) => (
                    <tr key={patient.name}>
                      <td>{patient.name}</td>
                      <td>{patient.dob ? new Date(patient.dob).toLocaleDateString() : '-'}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.address}</td>
                      <td>{patient.contact_number}</td>
                      <td>{patient.date_of_visit ? new Date(patient.date_of_visit).toLocaleDateString() : '-'}</td>
                      <td>{patient.attrition}</td>
                      <td>{patient.abrasion}</td>
                      <td>{patient.erosion}</td>
                      <td>{patient.abfraction}</td>
                      <td>{patient.primary_dent}</td>
                      <td>{patient.mixed_dent}</td>
                      <td>{patient.permanent_dent}</td>
                      <td>{patient.tooth_size}</td>
                      <td>{patient.tooth_shape}</td>
                      <td>{patient.tooth_struct}</td>
                      <td>{patient.tooth_mp}</td>
                      <td>{patient.jaw}</td>
                      <td>{patient.opg}</td>
                      <td>{patient.bitewing}</td>
                      <td>{patient.cbct}</td>
                      <td>
                        <button className="btn edit" onClick={() => navigate(`/dental-examination/${patient.name}`)}>Edit</button>
                        <button className="btn delete" onClick={() => handleDelete(patient.name)}>Delete</button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        )}

        <footer>
          <p>ADDRESS: Government Dental College & Hospital, P D’Mello Rd, Chhatrapati Shivaji Terminus Area, Fort, CSMT, Mumbai, Maharashtra 400001</p>
          <p>Contact Number: 02-22226-20668 | Email: deangdch_mumbai@yahoo.com</p>
          <p>© 2024 Government Dental College and Hospital, Mumbai</p>
        </footer>
      </div>
  );
};

export default PatientRecordsPage;
