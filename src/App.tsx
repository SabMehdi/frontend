import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FileUpload from './FileUpload';
import Header from './Header';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' Component={FileUpload}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
