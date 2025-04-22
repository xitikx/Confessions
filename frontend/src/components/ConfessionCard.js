import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ConfessionCard.css';

function ConfessionCard({ confession: initialConfession, onClick, socket }) {
  const [confession, setConfession] = useState(initialConfession);

  useEffect(() => {
    // Sync initial confession
    setConfession(initialConfession);

    // Listen for new reactions
    socket.on("newReaction", (data) => {
      if (data.confessionId === confession._id) {
        setConfession((prev) => ({
          ...prev,
          reactions: data.reactions,
        }));
      }
    });

    // Cleanup listener
    return () => {
      socket.off("newReaction");
    };
  }, [initialConfession, socket, confession._id]);

  const handleReaction = async (reactionType) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/confessions/${confession._id}/react`,
        { reactionType }
      );
      setConfession((prev) => ({
        ...prev,
        reactions: response.data.reactions,
      }));
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  return (
    <div className="confession-card" onClick={onClick}>
      <p className="confession-text">{confession.text}</p>
      <div className="confession-meta">
        <span className="category">{confession.category}</span>
        <span className={`sentiment ${confession.sentiment.toLowerCase()}`}>
          {confession.sentiment}
        </span>
      </div>
      <div className="reactions">
        <button onClick={(e) => { e.stopPropagation(); handleReaction('heart'); }}>
          ❤️ {confession.reactions.heart}
        </button>
        <button onClick={(e) => { e.stopPropagation(); handleReaction('hug'); }}>
          🤗 {confession.reactions.hug}
        </button>
        <button onClick={(e) => { e.stopPropagation(); handleReaction('pray'); }}>
          🙏 {confession.reactions.pray}
        </button>
      </div>
    </div>
  );
}

export default ConfessionCard;