import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfessionCard from './ConfessionCard';
import ConfessionForm from './ConfessionForm';
import '../styles/ConfessionList.css';

function ConfessionList() {
  const [confessions, setConfessions] = useState([]);

  useEffect(() => {
    const fetchConfessions = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/confessions`);
        setConfessions(res.data.confessions);
      } catch (error) {
        console.error('Error fetching confessions:', error);
      }
    };
    fetchConfessions();
  }, []);

  const addConfession = (newConfession) => {
    setConfessions((prev) => [newConfession, ...prev]); // Add new confession to the top
  };

  return (
    <>
      <ConfessionForm onConfessionAdded={addConfession} />
      <div className="confession-list">
        {confessions.map((confession) => (
          <ConfessionCard key={confession._id} confession={confession} />
        ))}
      </div>
    </>
  );
}

export default ConfessionList;