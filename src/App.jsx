import './App.css';
import React from "react";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { MovieDetail } from './components/MovieDetail';
import { TvShowDetail } from './components/TvShowDeatail';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/movie/:id" element={<MovieDetail/>}/>
        <Route path="/tv/:id" element={<TvShowDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
