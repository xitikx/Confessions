import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import '../styles/ConfessionModal.css';

const socket = io(process.env.REACT_APP_API_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
});

// ... (same imports and socket setup)

function ConfessionModal({ confession, onClose, onPrevious, onNext, hasPrevious, hasNext }) {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(confession.comments);

  useEffect(() => {
    setComments(confession.comments);

    socket.on("newComment", (data) => {
      if (data.confessionId === confession._id) {
        setComments((prevComments) => {
          if (prevComments.some((c) => c._id === data.comment._id)) {
            return prevComments;
          }
          return [...prevComments, data.comment];
        });
      }
    });

    return () => {
      socket.off("newComment");
    };
  }, [confession._id, confession.comments]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/confessions/${confession._id}/comments`,
        { text: commentText }
      );
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // ... (same return JSX, but update key to use _id)
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        <div className="modal-confession">
          <p className="confession-text">{confession.text}</p>
          <div className="confession-meta">
            <span className="category">{confession.category}</span>
            <span className={`sentiment ${confession.sentiment.toLowerCase()}`}>
              {confession.sentiment}
            </span>
          </div>
          <div className="reactions">
            <span>❤️ {confession.reactions.heart}</span>
            <span>🤗 {confession.reactions.hug}</span>
            <span>🙏 {confession.reactions.pray}</span>
          </div>
        </div>
        <div className="modal-comments">
          <h3>Comments</h3>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="comment">
                <p>{comment.text}</p>
                <span className="comment-date">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
        <form className="modal-comment-form" onSubmit={handleAddComment}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a supportive comment..."
            required
          />
          <button type="submit">Add Comment</button>
        </form>
        <div className="modal-navigation">
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className={!hasPrevious ? 'disabled' : ''}
          >
            ← Previous
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={!hasNext ? 'disabled' : ''}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfessionModal;