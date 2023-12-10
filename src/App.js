import React,{useState} from 'react';
import Header from './components/Header';
import List from './components/list';
import './App.css';

function App() {
  
  //console.log("APP",users);
  return (
    <div className="container">
      <Header />
      <List />
    </div>
  );
}

export default App;
