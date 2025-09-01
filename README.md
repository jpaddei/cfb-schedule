# CFB Schedule

[cfb-schedule.onrender.com](cfb-schedule.onrender.com)

This is a full-stack web application providing NCAA college football schedules, scores, and detailed player/team statistics. The backend fetches and normalizes data from the CollegeFootballData API, stores it in MongoDB, and exposes a REST API via Node.js/Express. The frontend, built with React and Tailwind CSS, displays games grouped by date, supports timezone selection, and features interactive modals with box scores and sports betting information.

Built with: Python, Node.js, Express, MongoDB, React, Tailwind CSS

## Installation

Install requirements in backend/data_fetcher

```bash
pip install -r requirements.txt
```

Create a new MongoDB cluster to store the data in. fetch_week.py will create a database called "cfb" and a collection called "games"

Go to collegefootballdata.com and get an API key.

Create a .env file in the root directory with:

* MONGO_URI = your MongoDB URI
* CFBD_API_KEY = your CollegeFootballAPI key
* PORT = whatever port you want to run the app on

Run fetch_week.py to fill/refresh the database with games.

Run quick_update.py to only update scores, box scores, and betting information.

## Running the program

[cfb-schedule.onrender.com](cfb-schedule.onrender.com) (May take a moment to wake up the server)

To run locally, see installation. Then, in the root directory, run

```bash
npm run build
npm run start
```

## Future Developments

Schedule the python scripts either with a cron job or on my own computer (Currently the scripts have to be ran manually)

Add real-time scores (Currently only displays score if game is completed)