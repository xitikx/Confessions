import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ConfessionModal.css';

function ConfessionModal({ confession, onClose, onPrevious, onNext, hasPrevious, hasNext }) {
  const [commentText, setCommentText] = useState('');

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/confessions/${confession._id}/comments`,
        { text: commentText }
      );
      const newComment = {
        ...res.data.comment,
        createdAt: res.data.comment.createdAt || new Date().toISOString(),
      };
      confession.comments.push(newComment);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

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
          {confession.comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            confession.comments.map((comment, index) => (
              <div key={index} className="comment">
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