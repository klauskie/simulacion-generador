import React from 'react';
import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/Routes/Routes';
import './App.css';
import Header from './containers/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
