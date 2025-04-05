import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfessionCard from './ConfessionCard';
import ConfessionForm from './ConfessionForm';
import ConfessionModal from './ConfessionModal';
import io from 'socket.io-client';
import '../styles/ConfessionList.css';

const socket = io(process.env.REACT_APP_API_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
});

function ConfessionList() {
  const [confessions, setConfessions] = useState([]);
  const [selectedConfessionIndex, setSelectedConfessionIndex] = useState(null);

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

    socket.on("newConfession", (newConfession) => {
      setConfessions((prev) => {
        // Prevent duplicates by _id
        if (prev.some((conf) => conf._id === newConfession._id)) {
          return prev;
        }
        return [newConfession, ...prev];
      });
    });

    return () => {
      socket.off("newConfession");
    };
  }, []);

  const openModal = (index) => setSelectedConfessionIndex(index);
  const closeModal = () => setSelectedConfessionIndex(null);
  const goPrevious = () => {
    if (selectedConfessionIndex > 0) setSelectedConfessionIndex(selectedConfessionIndex - 1);
  };
  const goNext = () => {
    if (selectedConfessionIndex < confessions.length - 1) setSelectedConfessionIndex(selectedConfessionIndex + 1);
  };

  return (
    <>
      <ConfessionForm /> {/* No prop needed */}
      <div className="confession-list">
        {confessions.map((confession, index) => (
          <ConfessionCard
            key={confession._id}
            confession={confession}
            onClick={() => openModal(index)}
            socket={socket}
          />
        ))}
      </div>
      {selectedConfessionIndex !== null && (
        <ConfessionModal
          confession={confessions[selectedConfessionIndex]}
          onClose={closeModal}
          onPrevious={goPrevious}
          onNext={goNext}
          hasPrevious={selectedConfessionIndex > 0}
          hasNext={selectedConfessionIndex < confessions.length - 1}
        />
      )}
    </>
  );
}

export default ConfessionList;