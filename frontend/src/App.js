import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ConfessionList from './components/ConfessionList';
import ConfessionDetail from './components/ConfessionDetail';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ConfessionList />} />
          <Route path="/confession/:id" element={<ConfessionDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;