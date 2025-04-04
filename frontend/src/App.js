import React from 'react';
import Header from './components/Header';
import ConfessionList from './components/ConfessionList';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <ConfessionList />
      </main>
    </div>
  );
}

export default App;