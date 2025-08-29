import { useGameStore } from "../store/game"
import { useEffect, useState, React } from "react";

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

    function SimpleTable({ data, headers }) {
        return (
            <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="border border-gray-300 px-1">{header.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, colIndex) => (
                                <td key={colIndex} className="border border-gray-300 px-1">{row[header.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    const passingHeaders = [
        { key: 'name', label: 'Name' },
        { key: 'catt', label: 'C/ATT' },
        { key: 'yds', label: 'Yards' },
        { key: 'avg', label: 'Avg' },
        { key: 'td', label: 'TD' },
        { key: 'int', label: 'INT' },
        { key: 'qbr', label: 'QBR' },
    ]

    const rushingHeaders = [
        { key: 'name', label: 'Name' },
        { key: 'car', label: 'Carries' },
        { key: 'yds', label: 'Yards' },
        { key: 'avg', label: 'Avg' },
        { key: 'td', label: 'TD' },
        { key: 'long', label: 'Long' },
    ]

    const receivingHeaders = [
        { key: 'name', label: 'Name' },
        { key: 'rec', label: 'Receptions' },
        { key: 'yds', label: 'Yards' },
        { key: 'avg', label: 'Avg' },
        { key: 'td', label: 'TD' },
        { key: 'long', label: 'Long' },
    ]

    const fumblesHeaders = [
        { key: 'name', label: 'Name' },
        { key: 'fum', label: 'Fumbles' },
        { key: 'lost', label: 'Lost' },
        { key: 'rec', label: 'Recovered' },
    ]

    const defensiveHeaders = [
        { key: 'name', label: 'Name' },
        { key: 'tot', label: 'Total' },
        { key: 'solo', label: 'Solo' },
        { key: 'sacks', label: 'Sacks' },
        { key: 'tfl', label: 'TFL' },
        { key: 'pd', label: 'PD' },
        { key: 'qbhur', label: 'Hurries' },
        { key: 'td', label: 'TD' },
    ]

    const interceptionsHeaders = [
        { key: 'name', label: 'Name' },
        { key: 'int', label: 'INT' },
        { key: 'yds', label: 'Yards' },
        { key: 'td', label: 'TD' },
    ]

    const kickReturnsHeaders = [
        { key: 'name', label: 'Name' },
        { key: 'no', label: 'NO' },
        { key: 'yds', label: 'Yards' },
        { key: 'avg', label: 'Avg' },
        { key: 'long', label: 'Long' },
        { key: 'td', label: 'TD' },
    ]

    const puntReturnsHeaders = [
        { key: 'name', label: 'Name' },
        { key: 'no', label: 'NO' },
        { key: 'yds', label: 'Yards' },
        { key: 'avg', label: 'Avg' },
        { key: 'long', label: 'Long' },
        { key: 'td', label: 'TD' },
    ]

    const kickingHeaders = [
        { key: 'name', label: 'Name' },
        { key: 'fg', label: 'FG' },
        { key: 'pct', label: 'PCT' },
        { key: 'long', label: 'Long' },
        { key: 'xp', label: 'XP' },
        { key: 'pts', label: 'Pts' },
    ]

    const puntingHeaders = [
        { key: 'name', label: 'Name' },
        { key: 'no', label: 'NO' },
        { key: 'yds', label: 'Yards' },
        { key: 'avg', label: 'Avg' },
        { key: 'tb', label: 'TB' },
        { key: 'in20', label: 'In 20' },
        { key: 'long', label: 'Long' },
    ]
    
    
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
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/75 text-4xl w-full h-full overflow-auto" onMouseUp={e => {
                                                if (!window.getSelection().toString()) setOpenDialog(null);
                                            }}>
                                                <div className="bg-white p-6 rounded shadow-lg relative min-w-[300px] min-h-[100px] flex flex-col items-start justify-start max-h-[90vh] max-w-[90vw] overflow-auto" onClick={e => e.stopPropagation()}>
                                                    <div className="max-h-screen max-w-screen">
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
                                                            <div className="flex justify-between lg:w-full gap-4">
                                                                <div className="flex flex-col gap-4">
                                                                    <div className="flex flex-row justify-between">
                                                                        <div className="flex flex-col">
                                                                            <span>
                                                                                {game.awayTeam?.rank ? `${game.awayTeam.rank} ` : ""}
                                                                                <span className="font-bold">
                                                                                    {game.awayTeam?.name || "?"}&nbsp;
                                                                                </span>
                                                                            </span>
                                                                            <div className="text-2xl">
                                                                                ({game.awayTeam.wins}-{game.awayTeam.losses}, {game.awayTeam.conferenceWins}-{game.awayTeam.conferenceLosses} {game.awayTeam.conference})
                                                                            </div>
                                                                        </div>
                                                                        <div className="font-bold text-7xl">
                                                                            {game.awayPoints || 0}
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-xl">
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Passing
                                                                        </div>
                                                                        <SimpleTable data={game.awayBoxScore.passing} headers={passingHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Rushing
                                                                        </div>
                                                                        <SimpleTable data={game.awayBoxScore.rushing} headers={rushingHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Receiving
                                                                        </div>
                                                                        <SimpleTable data={game.awayBoxScore.receiving} headers={receivingHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Fumbles
                                                                        </div>
                                                                        <SimpleTable data={game.awayBoxScore.fumbles} headers={fumblesHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Defensive
                                                                        </div>
                                                                        <SimpleTable data={game.awayBoxScore.defensive} headers={defensiveHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Interceptions
                                                                        </div>
                                                                        <SimpleTable data={game.awayBoxScore.interceptions} headers={interceptionsHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Kick Returns
                                                                        </div>
                                                                        <SimpleTable data={game.awayBoxScore.kickReturns} headers={kickReturnsHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Punt Returns
                                                                        </div>
                                                                        <SimpleTable data={game.awayBoxScore.puntReturns} headers={puntReturnsHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Kicking
                                                                        </div>
                                                                        <SimpleTable data={game.awayBoxScore.kicking} headers={kickingHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Punting
                                                                        </div>
                                                                        <SimpleTable data={game.awayBoxScore.punting} headers={puntingHeaders}></SimpleTable>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col gap-4">
                                                                    <div className="flex flex-row justify-between">
                                                                        <div className="flex flex-col">
                                                                            <span>
                                                                                {game.homeTeam?.rank ? `${game.homeTeam.rank} ` : ""}
                                                                                <span className="font-bold">
                                                                                    {game.homeTeam?.name || "?"}&nbsp;
                                                                                </span>
                                                                            </span>
                                                                            <div className="text-2xl">
                                                                                ({game.homeTeam.wins}-{game.homeTeam.losses}, {game.homeTeam.conferenceWins}-{game.homeTeam.conferenceLosses} {game.homeTeam.conference})
                                                                            </div>
                                                                        </div>
                                                                        <div className="font-bold text-7xl">
                                                                            {game.homePoints || 0}
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className="text-xl">
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Passing
                                                                        </div>
                                                                        <SimpleTable data={game.homeBoxScore.passing} headers={passingHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Rushing
                                                                        </div>
                                                                        <SimpleTable data={game.homeBoxScore.rushing} headers={rushingHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Receiving
                                                                        </div>
                                                                        <SimpleTable data={game.homeBoxScore.receiving} headers={receivingHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Fumbles
                                                                        </div>
                                                                        <SimpleTable data={game.homeBoxScore.fumbles} headers={fumblesHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Defensive
                                                                        </div>
                                                                        <SimpleTable data={game.homeBoxScore.defensive} headers={defensiveHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Interceptions
                                                                        </div>
                                                                        <SimpleTable data={game.homeBoxScore.interceptions} headers={interceptionsHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Kick Returns
                                                                        </div>
                                                                        <SimpleTable data={game.homeBoxScore.kickReturns} headers={kickReturnsHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Punt Returns
                                                                        </div>
                                                                        <SimpleTable data={game.homeBoxScore.puntReturns} headers={puntReturnsHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Kicking
                                                                        </div>
                                                                        <SimpleTable data={game.homeBoxScore.kicking} headers={kickingHeaders}></SimpleTable>
                                                                        <div className="font-bold text-2xl mb-1">
                                                                            Punting
                                                                        </div>
                                                                        <SimpleTable data={game.homeBoxScore.punting} headers={puntingHeaders}></SimpleTable>
                                                                    </div>
                                                                </div>
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
                                                                    {game.overUnder ? `O/U: ${game.overUnder}` : ""}
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
                                                            <br />
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