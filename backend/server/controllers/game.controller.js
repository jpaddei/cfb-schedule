import mongoose from "mongoose"
import Game from "../models/game.model.js"

export const getGamesByDate = async (req, res) => {
    try {
        const games = await Game.find({}).sort({date: 1})
        res.status(200).json({success: true, data: games});
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Failed to fetch games"});
    }
}

export const getGamesByRank = async (req, res) => {
    try {
        const games = await Game.aggregate([
            {
                $addFields: {
                    bestRank: {
                        $cond: [
                            { $and: [ { $ifNull: ["$homeTeam.rank", false] }, { $ifNull: ["$awayTeam.rank", false] } ] },
                            { $min: ["$homeTeam.rank", "$awayTeam.rank"] },
                            { $ifNull: ["$homeTeam.rank", "$awayTeam.rank"] }
                        ]
                    }
                }
            },
            {
                $sort: { 
                    bestRank: 1 // ascending: best (lowest) rank first; nulls last
                }
            }
        ]);
        res.status(200).json({success: true, data: games});
    } catch (error) {
        res.status(500).json({success: false, message: "Failed to fetch games"});
    }
}
