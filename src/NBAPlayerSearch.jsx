import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Hero from "./images/hero.jpg";

const NBAPlayerSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const randomNumber = Math.floor(Math.random() * 450) + 1;

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchPlayerSuggestions = async () => {
      try {
        const response = await axios.get(
          `https://www.balldontlie.io/api/v1/players?search=${searchTerm}`
        );
        setSuggestions(response.data.data);
      } catch (error) {
        console.error("Error fetching player suggestions:", error);
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
      const response = await axios.get(
        `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`
      );
      setPlayerStats(response.data.data[0]); // Assuming the API returns the latest season averages
      setSelectedPlayer(playerId);
    } catch (error) {
      console.error("Error fetching player stats:", error);
      setPlayerStats(null);
    }
  };

  return (
    <div>
      <div className="container mx-auto mt-12 mb-12 lg:flex items-center justify-content">
        <div className="w-full lg:w-2/3 mb-8 lg:mb-0 lg:pr-4">
          <h1 className="text-4xl text-white font-semibold mb-4">
            Discover NBA Stats
          </h1>
          <h3 className="text-xl text-slate-300 font-semibold mb-8">
            Explore comprehensive player statistics and profiles
          </h3>
          <Link
            to={`/player/${randomNumber}`}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4 lg:mb-0"
          >
            Explore Random Player
          </Link>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="flex items-center justify-center">
            <img src={Hero} alt="heroimage" className="rounded-lg h-96" />
          </div>
        </div>
      </div>
      <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-md mt-8 mb-8">
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
            {suggestions.slice(0, 10).map((player) => (
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
              className="text-blue-500 hover:underline cursor-pointer block"
            >
              View Detailed Stats
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NBAPlayerSearch;
