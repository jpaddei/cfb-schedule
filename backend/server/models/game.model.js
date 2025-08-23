import mongoose from "mongoose"

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        conference: {
            type: String,
            required: true
        },
        wins: {
            type: Number,
            required: false
        },
        losses: {
            type: Number,
            required: false
        },
        conferenceWins: {
            type: Number,
            required: false
        },
        conferenceLosses: {
            type: Number,
            required: false
        },
        rank: {
            type: Number,
            required: false
        }
    }, 
    {
        timestamps: true
    }
)

const venueSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const gameSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        venue: {
            type: venueSchema,
            required: false
        },
        mediaType: {
            type: [String],
            required: false
        },
        channel: {
            type: [String],
            required: false
        },
        homeTeam: {
            type: teamSchema,
            required: true
        },
        awayTeam: {
            type: teamSchema,
            required: true
        },
        homePoints: {
            type: Number,
            required: false
        },
        awayPoints: {
            type: Number,
            required: false
        },
        provider: {
            type: String,
            required: false
        },
        spread: {
            type: String,
            required: false
        },
        overUnder: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Game = mongoose.model('Game', gameSchema)

export default Game