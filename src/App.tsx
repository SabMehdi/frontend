import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FileUpload from './FileUpload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={FileUpload}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
