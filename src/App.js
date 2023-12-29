import React from 'react';
import logo from "./logo.png"
import JokeList from "./JokeList";
import './App.css';

/** Top-level component */

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to CheeseZ Jokes!</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <JokeList />
      </header>
    </div>
  );
}

export default App;
