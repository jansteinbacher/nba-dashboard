// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NBAPlayerSearch from './NBAPlayerSearch';
import PlayerDetail from './PlayerDetail';

const App = () => {
  return (
    <Router>
      <div className='bg-slate-800 min-h-screen flex flex-col'>
        <Routes>
          <Route path="/" element={<NBAPlayerSearch />} />
          <Route path="/player/:playerId" element={<PlayerDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
