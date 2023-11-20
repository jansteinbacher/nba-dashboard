import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PlayerDetail = () => {
  const { playerId } = useParams();
  const [playerDetails, setPlayerDetails] = useState(null);
  const [seasonAverages, setSeasonAverages] = useState(null);
  const [playerStats, setPlayerStats] = useState([]);
  const [showStatsTable, setShowStatsTable] = useState(false);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        // Calculate the start date (first day of the last month)
        const today = new Date();
        const lastMonthStart = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        const lastMonthStartISO = lastMonthStart.toISOString().split("T")[0];

        // Make a request to the balldontlie.io API for the player with ID 115
        const response = await axios.get(
          "https://www.balldontlie.io/api/v1/stats",
          {
            params: {
              player_ids: [playerId],
              start_date: lastMonthStartISO,
              end_date: today.toISOString().split("T")[0],
            },
          }
        );

        const stats = response.data.data;
        setPlayerStats(stats);
      } catch (error) {
        console.error("Error fetching player stats:", error);
      }
    };

    fetchPlayerStats();
  }, [playerId]);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.balldontlie.io/api/v1/players/${playerId}`
        );
        const responseSeason = await axios.get(
          `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`
        );
        setPlayerDetails(response.data);
        setSeasonAverages(responseSeason.data.data[0]);
      } catch (error) {
        console.error("Error fetching player details:", error);
        setPlayerDetails(null);
        setSeasonAverages(null);
      }
    };

    fetchPlayerDetails();
  }, [playerId]);

  const handleStatsToggle = () => {
    setShowStatsTable(!showStatsTable);
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-slate-500 to-slate-500 rounded-lg shadow-md mt-8 mb-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-white">
        {playerDetails
          ? `${playerDetails.first_name} ${playerDetails.last_name}`
          : "Loading..."}
      </h1>
      <h3 className="text-xl mb-4 text-white hover:underline font-semibold">
        <a href="/"> Go back to Search</a>
      </h3>
      {playerDetails ? (
        <div className="grid grid-cols-1 auto-rows-[170px] md:grid-cols-2 lg:grid-cols-8 gap-4">
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-4">
            <p className="text-sm font-semibold text-gray-300">Team</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">
              {playerDetails.team.full_name}
            </p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">Position</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">
              {playerDetails.position}
            </p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4">
            <p className="text-sm font-semibold text-gray-300">Height</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">
              {playerDetails.height_feet}'{playerDetails.height_inches}"
            </p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4">
            <p className="text-sm font-semibold text-gray-300">Weight</p>
            <p className="text-3xl font-bold text-center mt-8 text-white">
              {playerDetails.weight_pounds} lbs
            </p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">
              Points Per Game 🏀
            </p>
            <p className="text-3xl font-bold text-center mt-8 text-white">
              {seasonAverages ? seasonAverages.pts : "N/A"}
            </p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">
              Field Goal Percentage 🎯
            </p>
            <p className="text-3xl font-bold text-center mt-8 text-white">
              {seasonAverages ? seasonAverages.fg_pct : "N/A"}%
            </p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">
              Three-Point Percentage 🎯
            </p>
            <p className="text-3xl font-bold text-center mt-8 text-white">
              {seasonAverages ? seasonAverages.fg3_pct : "N/A"}%
            </p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">
              Free-Throw Percentage 🎯
            </p>
            <p className="text-3xl font-bold text-center mt-8 text-white">
              {seasonAverages ? seasonAverages.ft_pct : "N/A"}%
            </p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-4">
            <p className="text-sm font-semibold text-gray-300">
              Assists Per Game 🏀
            </p>
            <p className="text-3xl font-bold text-center mt-8 text-white">
              {seasonAverages ? seasonAverages.ast : "N/A"}
            </p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">
              Steels Per Game 🏀
            </p>
            <p className="text-3xl font-bold text-center mt-8 text-white">
              {seasonAverages ? seasonAverages.stl : "N/A"}
            </p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">
              Blocks Per Game 🏀
            </p>
            <p className="text-3xl font-bold text-center mt-8 text-white">
              {seasonAverages ? seasonAverages.blk : "N/A"}
            </p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-3">
            <p className="text-sm font-semibold text-gray-300">
              Rebounds Per Game 🏀
            </p>
            <p className="text-3xl font-bold text-center mt-8 text-white">
              {seasonAverages ? seasonAverages.reb : "N/A"}
            </p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-300">
              Ofensive Rebounds Per Game 🏀
            </p>
            <p className="text-3xl font-bold text-center mt-8 text-white">
              {seasonAverages ? seasonAverages.oreb : "N/A"}
            </p>
          </div>
          <div className="row-span-1 rounded-xl border-2 border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 p-4 lg:col-span-3">
            <p className="text-sm font-semibold text-gray-300">
              Defensive Rebounds Per Game 🏀
            </p>
            <p className="text-3xl font-bold text-center mt-8 text-white">
              {seasonAverages ? seasonAverages.dreb : "N/A"}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading player details...</p>
      )}
      <h3
        className="text-xl mt-4 mb-4 text-white text-center hover:font-semibold"
        onClick={handleStatsToggle}
      >
        Click for the latest game stats &darr;
      </h3>
      {showStatsTable && (
        <div className="container mx-auto mt-8 overflow-x-auto">
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Player Stats - Last Month</h1>

          <table className="min-w-full text-center text-white border-slate-500 bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Game Date</th>
                <th className="px-4 py-2">Minutes</th>
                <th className="px-4 py-2">Points</th>
                <th className="px-4 py-2">FG</th>
                <th className="px-4 py-2">3P</th>
                <th className="px-4 py-2">Assists</th>
                <th className="px-4 py-2">Rebounds</th>
                <th className="px-4 py-2">Steels</th>
                <th className="px-4 py-2">Blocks</th>
              </tr>
            </thead>
            <tbody>
              {playerStats
                .slice()
                .reverse()
                .map((game) => (
                  <tr key={game.id}>
                    <td className="border px-4 py-2">
                      {game.game.date.split("T")[0]}
                    </td>
                    <td className="border px-4 py-2">{game.min}</td>
                    <td className="border px-4 py-2">{game.pts}</td>
                    <td className="border px-4 py-2">{game.fgm}-{game.fga}</td>
                    <td className="border px-4 py-2">{game.fg3m}-{game.fg3a}</td>
                    <td className="border px-4 py-2">{game.ast}</td>
                    <td className="border px-4 py-2">{game.reb}</td>
                    <td className="border px-4 py-2">{game.stl}</td>
                    <td className="border px-4 py-2">{game.blk}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PlayerDetail;
