import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FileUpload from './FileUpload';
import Header from './Header';
import TagCloudPage from './Cloud';
import SearchComponent from './SearchEngine';
import DocumentPage from './DocumentPage';
import GlobalTagCloud from './GlobalTagCLoud';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
      <Route path='/' Component={FileUpload}/>
      <Route path='/cloud' Component={TagCloudPage}/>
      <Route path='/search' Component={SearchComponent}/>
      <Route path="/document/:id" Component={DocumentPage} />
      <Route path="/GlobalCloud" Component={GlobalTagCloud} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
