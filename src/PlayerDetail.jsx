import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PlayerDetail = () => {
  const { playerId } = useParams();
  const [playerDetails, setPlayerDetails] = useState(null);
  const [seasonAverages, setSeasonAverages] = useState(null);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await axios.get(`https://www.balldontlie.io/api/v1/players/${playerId}`);
        const responseSeason = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`);
        setPlayerDetails(response.data);
        setSeasonAverages(responseSeason.data.data[0]);
      } catch (error) {
        console.error('Error fetching player details:', error);
        setPlayerDetails(null);
      }
    };

    fetchPlayerDetails();
  }, [playerId]);

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-slate-500 to-slate-500 rounded-lg shadow-md mt-8 mb-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-white">
        {playerDetails ? `${playerDetails.first_name} ${playerDetails.last_name}` : 'Loading...'}
      </h1>
      <h3 className='text-xl mb-4 text-white hover:underline font-semibold'><a href='/'> Go back</a></h3>
      {playerDetails ? (
        <div className="grid grid-cols-1 auto-rows-[170px] md:grid-cols-2 lg:grid-cols-8 gap-4">
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-4">
            <p className="text-sm font-semibold text-gray-300">Team</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">{playerDetails.team.full_name}</p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">Position</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">{playerDetails.position}</p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4">
            <p className="text-sm font-semibold text-gray-300">Height</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">{playerDetails.height_feet}'{playerDetails.height_inches}"</p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4">
            <p className="text-sm font-semibold text-gray-300">Weight</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">{playerDetails.weight_pounds} lbs</p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">Points Per Game 🏀</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">{seasonAverages.pts}</p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">Field Goal Percentage 🎯</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">{seasonAverages.fg_pct}%</p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">Three-Point Percentage 🎯</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">{seasonAverages.fg3_pct}%</p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">Free-Throw Percentage 🎯</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">{seasonAverages.ft_pct}%</p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-4">
            <p className="text-sm font-semibold text-gray-300">Assists Per Game 🏀</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">{seasonAverages.ast}</p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">Steels Per Game 🏀</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">{seasonAverages.stl}</p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">Blocks Per Game 🏀</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">{seasonAverages.blk}</p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-3">
            <p className="text-sm font-semibold text-gray-300">Rebounds Per Game 🏀</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">{seasonAverages.reb}</p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">Ofensive Rebounds Per Game 🏀</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">{seasonAverages.oreb}</p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-3">
            <p className="text-sm font-semibold text-gray-300">Defensive Rebounds Per Game 🏀</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">{seasonAverages.dreb}</p>
          </div>
        </div>
      ) : (
        <p>Loading player details...</p>
      )}
    </div>
    
  );
};

export default PlayerDetail;
