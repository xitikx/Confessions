import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ConfessionForm.css';

function ConfessionForm({ onConfessionAdded }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('general');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/confessions`, {
        text,
        category,
      });
      setText('');
      setCategory('general');
      onConfessionAdded(response.data); // Pass the new confession to the parent
    } catch (error) {
      console.error('Error posting confession:', error);
    }
  };

  return (
    <form className="confession-form" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your confession..."
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="mental health">Mental Health</option>
        <option value="love">Love</option>
      </select>
      <button type="submit">Confess</button>
    </form>
  );
}

export default ConfessionForm;