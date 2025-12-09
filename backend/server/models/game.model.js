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

const passingSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        completion: {
            type: String,
            required: false
        },
        yards: {
            type: Number,
            required: false
        },
        avg: {
            type: Number,
            required: false
        },
        tds: {
            type: Number,
            required: false
        },
        ints: {
            type: Number,
            required: false
        },
        qbr: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const rushingSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        carries: {
            type: Number,
            required: false
        },
        yards: {
            type: Number,
            required: false
        },
        avg: {
            type: Number,
            required: false
        },
        tds: {
            type: Number,
            required: false
        },
        long: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const receivingSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        receptions: {
            type: Number,
            required: false
        },
        yards: {
            type: Number,
            required: false
        },
        avg: {
            type: Number,
            required: false
        },
        tds: {
            type: Number,
            required: false
        },
        long: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const fumblesSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        fumbles: {
            type: Number,
            required: false
        },
        lost: {
            type: Number,
            required: false
        },
        recovered: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const defensiveSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        total: {
            type: Number,
            required: false
        },
        solo: {
            type: Number,
            required: false
        },
        sacks: {
            type: Number,
            required: false
        },
        tfl: {
            type: Number,
            required: false
        },
        pd: {
            type: Number,
            required: false
        },
        hurries: {
            type: Number,
            required: false
        },
        tds: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const interceptionsSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        ints: {
            type: Number,
            required: false
        },
        yards: {
            type: Number,
            required: false
        },
        tds: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const kickReturnsSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        num: {
            type: Number,
            required: false
        },
        yards: {
            type: Number,
            required: false
        },
        avg: {
            type: Number,
            required: false
        },
        long: {
            type: Number,
            required: false
        },
        tds: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const puntReturnsSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        num: {
            type: Number,
            required: false
        },
        yards: {
            type: Number,
            required: false
        },
        avg: {
            type: Number,
            required: false
        },
        long: {
            type: Number,
            required: false
        },
        tds: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const kickingSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        fg: {
            type: String,
            required: false
        },
        pct: {
            type: Number,
            required: false
        },
        long: {
            type: Number,
            required: false
        },
        xp: {
            type: String,
            required: false
        },
        points: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const puntingSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        num: {
            type: Number,
            required: false
        },
        yards: {
            type: Number,
            required: false
        },
        avg: {
            type: Number,
            required: false
        },
        touchbacks: {
            type: Number,
            required: false
        },
        in20: {
            type: Number,
            required: false
        },
        long: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const boxScoreSchema = new mongoose.Schema(
    {
        passing: {
            type: [passingSchema],
            required: false
        },
        rushing: {
            type: [rushingSchema],
            required: false
        },
        receiving: {
            type: [receivingSchema],
            required: false
        },
        fumbles: {
            type: [fumblesSchema],
            required: false
        },
        defensive: {
            type: [defensiveSchema],
            required: false
        },
        interceptions: {
            type: [interceptionsSchema],
            required: false
        },
        kickReturns: {
            type: [kickReturnsSchema],
            required: false
        },
        puntReturns: {
            type: [puntReturnsSchema],
            required: false
        },
        kicking: {
            type: [kickingSchema],
            required: false
        },
        punting: {
            type: [puntingSchema],
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
        },
        homeBoxScore: {
            type: boxScoreSchema,
            required: false
        },
        awayBoxScore: {
            type: boxScoreSchema,
            required: false
        },
        notes: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Game = mongoose.model('Game', gameSchema)

export default Game