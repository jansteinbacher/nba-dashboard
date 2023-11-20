import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import axios from 'axios';

const NBAPlayerSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const fetchPlayerSuggestions = async () => {
      try {
        const response = await axios.get(`https://www.balldontlie.io/api/v1/players?search=${searchTerm}`);
        setSuggestions(response.data.data);
      } catch (error) {
        console.error('Error fetching player suggestions:', error);
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(fetchPlayerSuggestions, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedPlayer(null);
    setPlayerStats(null);
  };

  const handlePlayerClick = async (playerId) => {
    try {
      const response = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`);
      setPlayerStats(response.data.data[0]); // Assuming the API returns the latest season averages
      setSelectedPlayer(playerId);
    } catch (error) {
      console.error('Error fetching player stats:', error);
      setPlayerStats(null);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-md mt-24 mb-24">
      <h1 className="text-3xl font-semibold mb-4">NBA Player Search</h1>
      <div className="mb-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Search for NBA player"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <ul className="list-none p-0 m-0">
          {suggestions.slice(0,10).map((player) => (
            <li
              key={player.id}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={() => handlePlayerClick(player.id)}
            >
              {player.first_name} {player.last_name}
            </li>
          ))}
        </ul>
      </div>
      {selectedPlayer && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Player Stats:</h2>
          {playerStats ? (
            <ul className="list-none p-0 m-0">
              <li className="mb-2">Points: {playerStats.pts}</li>
              <li className="mb-2">Assists: {playerStats.ast}</li>
              <li className="mb-2">Rebounds: {playerStats.reb}</li>
              {/* Add more stats as needed */}
            </ul>
          ) : (
            <p>Loading player stats...</p>
          )}
          {/* Link to navigate to the detailed player stats page */}
          <Link
            to={`/player/${selectedPlayer}`}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            View Detailed Stats
          </Link>
        </div>
      )}
    </div>
  );
};

export default NBAPlayerSearch;
