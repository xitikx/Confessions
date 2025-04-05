import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/ConfessionDetail.css';

function ConfessionDetail() {
  const { id } = useParams();
  const [confession, setConfession] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchConfession = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/confessions`);
        const foundConfession = res.data.confessions.find(c => c._id === id);
        setConfession(foundConfession);
      } catch (error) {
        console.error('Error fetching confession:', error);
      }
    };
    fetchConfession();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/confessions/${id}/comments`,
        { text: commentText }
      );
      setConfession((prev) => ({
        ...prev,
        comments: [...prev.comments, res.data.comment],
      }));
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!confession) return <div>Loading...</div>;

  return (
    <div className="confession-detail">
      <div className="confession-detail-card">
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
      <div className="comments-section">
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
      <form className="comment-form" onSubmit={handleAddComment}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a supportive comment..."
          required
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default ConfessionDetail;