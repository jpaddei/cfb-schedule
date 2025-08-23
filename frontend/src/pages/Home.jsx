import { useGameStore } from "../store/game"
import { useEffect, useState } from "react";

export const Home = () => {

    const {fetchGames,games} = useGameStore();
    const [openDialog, setOpenDialog] = useState(null);;
    useEffect(() => {
        fetchGames(); 
    }, [fetchGames]);
    console.log("Games:", games);

    const Timezones = ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles"]
    const [selectedTimezone, setSelectedTimezone] = useState(() =>
        localStorage.getItem("selectedTimezone") || "America/New_York"
    );
    useEffect(() => {
        localStorage.setItem("selectedTimezone", selectedTimezone);
    }, [selectedTimezone]);

    function groupGamesByDay(games) {
        return games.reduce((groups, game) => {
            const dateObj = new Date(game.date);
            const dayKey = dateObj.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                timeZone: "America/Denver"
            });
            if (!groups[dayKey]) groups[dayKey] = [];
            groups[dayKey].push(game);
            return groups;
        }, {});
    }

    function sortGamesByTime(games) {
        return games.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    const groupedByDay = groupGamesByDay(games)
    
    return (
        <section id="home">
            <div>
                <div className="font-bold text-2xl p-2">
                    <label for="timezones">Choose Timezone: </label>
                    <select name="timezones" id="timezones" value={selectedTimezone} onChange={e => setSelectedTimezone(e.target.value)}>
                        <option value={Timezones[0]}>Eastern Time</option>
                        <option value={Timezones[1]}>Central Time</option>
                        <option value={Timezones[2]}>Mountain Time</option>
                        <option value={Timezones[3]}>Pacific Time</option>
                    </select>
                </div>
                {Object.entries(groupedByDay).map(([day, gamesOnDay]) => (
                    <div key={day} className="mb-8 p-2">
                        <h2 className="font-bold text-2xl mb-4">{day}</h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
                            {sortGamesByTime(gamesOnDay).map(game => (
                                <div key={game._id || game.gameId || Math.random()} className="border rounded bg-gray-100 p-3">
                                    <div className="text-xl font-bold">
                                        {new Date(game.date).toLocaleTimeString("en-US", {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                            timeZone: selectedTimezone
                                        })}
                                    </div>
                                    <div key={game._id || game.gameId || Math.random()}>
                                        <div>
                                            <br />
                                        </div>
                                        {/* Modal */}
                                        {openDialog === game._id && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/75 text-4xl" onClick={() => setOpenDialog(null)}>
                                                <div className="bg-white p-6 rounded shadow-lg relative min-w-[300px] min-h-[100px] flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
                                                    <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={() => setOpenDialog(null)}>
                                                        ×
                                                    </button>
                                                    <div>
                                                        <div className="text-xl font-bold">
                                                            {day}
                                                        </div>
                                                        <div>
                                                            <div className="text-xl font-bold">
                                                                {new Date(game.date).toLocaleTimeString("en-US", {
                                                                    hour: "numeric",
                                                                    minute: "2-digit",
                                                                    hour12: true,
                                                                    timeZone: selectedTimezone
                                                                })}
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div className="flex flex-col gap-4">
                                                            <span>
                                                                {game.awayTeam?.rank ? `${game.awayTeam.rank} ` : ""}
                                                                <span className="font-bold">
                                                                    {game.awayTeam?.name || "?"}&nbsp;
                                                                </span>
                                                            </span>
                                                            ({game.awayTeam.wins}-{game.awayTeam.losses}, {game.awayTeam.conferenceWins}-{game.awayTeam.conferenceLosses} {game.awayTeam.conference})
                                                        </div>
                                                        <div className="flex flex-col gap-4">
                                                            <br />
                                                            <span>
                                                                {game.homeTeam?.rank ? `${game.homeTeam.rank} ` : ""}
                                                                <span className="font-bold">
                                                                    {game.homeTeam?.name || "?"}&nbsp;
                                                                </span>
                                                            </span>
                                                            ({game.homeTeam.wins}-{game.homeTeam.losses}, {game.homeTeam.conferenceWins}-{game.homeTeam.conferenceLosses} {game.homeTeam.conference})
                                                        </div>
                                                        <div className="flex flex-col text-3xl">
                                                            <div>
                                                                {game.provider ? <br /> : ""}
                                                                {game.provider}
                                                            </div>
                                                            <div>
                                                                {game.spread}
                                                            </div>
                                                            <div>
                                                                {game.overUnder}
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div>
                                                            {game.channel && game.channel.length > 0
                                                                ? game.channel.map((ch, idx) => (
                                                                    <span key={idx}>{ch}{idx < game.channel.length - 1 ? ', ' : ''}</span>
                                                                ))
                                                                : null
                                                            }
                                                        </div>
                                                        <div >
                                                            {game.venue.name}
                                                        </div>
                                                        <div>
                                                            {game.venue.city}{game.venue.state ? `, ${game.venue.state}` : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <button className="w-full bg-white border border-black/50 rounded p-1 flex flex-col justify-between" onClick={() => setOpenDialog(game._id)}>
                                            <div className="text-2xl flex flex-col gap-1">
                                                <div className="flex flex-row justify-between items-center w-full">
                                                    <div>
                                                        {game.awayTeam?.rank && (
                                                            <>{game.awayTeam.rank}&nbsp;</>
                                                        )}
                                                        <span className="font-bold">{game.awayTeam?.name || "?"}</span>
                                                    </div>
                                                    <span className="font-bold">{game.awayPoints || 0}</span>
                                                </div>
                                                <div className="flex flex-row justify-between items-center w-full">
                                                    <div>
                                                        {game.homeTeam?.rank && (
                                                            <>{game.homeTeam.rank}&nbsp;</>
                                                        )}
                                                        <span className="font-bold">{game.homeTeam?.name || "?"}</span>
                                                    </div>
                                                    <span className="font-bold">{game.homePoints || 0}</span>
                                                </div>
                                            </div>
                                            <div className="text-left">
                                                {game.channel && game.channel.length > 0
                                                    ? game.channel.map((ch, idx) => (
                                                        <span key={idx}>{ch}{idx < game.channel.length - 1 ? ', ' : ''}</span>
                                                    ))
                                                    : null
                                                }
                                            </div>
                                            <div className="flex flex-row justify-between items-center w-full">
                                                <div>
                                                    {game.spread}
                                                </div>
                                                <div>
                                                    {game.overUnder ? `O/U: ${game.overUnder}` : ""}
                                                </div>
                                            </div>
                                        </button>
                                    </div>                              
                                </div>
                            ))}
                        </div>
                    </div>
                ))}           
            </div>
        </section>
    )
}