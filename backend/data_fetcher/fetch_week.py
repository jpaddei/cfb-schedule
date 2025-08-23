from pymongo import MongoClient
import sys
from config import BASE_URL, HEADERS, MONGO_URI, CFBD_API_KEY
import cfbd

conferences = ["Mid-American", "Mountain West", "Pac-12", "SEC", "ACC", "Big 12", "Big Ten", "Conference USA", "FBS Independents", "Sun Belt", "American Athletic"]

try:
    client = MongoClient(MONGO_URI)
    db = client["cfb"]
    games_collection = db["games"]
    print("MongoDB connection successful")
except Exception as e:
    print(f"[ERROR] MongoDB connection failed: {e}")
    sys.exit(1)

configuration = cfbd.Configuration(
    host = BASE_URL,
    access_token = CFBD_API_KEY,
)
    
def build_team_records_map(year):
    with cfbd.ApiClient(configuration) as api_client:
        api_instance = cfbd.GamesApi(api_client)
    records = api_instance.get_records(year=2024) # 2025 records not in yet
    record_map = {}
    for rec in records:
        record_map[rec.team] = [rec.total.wins, rec.total.losses, rec.conference_games.wins, rec.conference_games.losses]
    return record_map

def build_team_rankings_map(year, week):
    with cfbd.ApiClient(configuration) as api_client:
        api_instance = cfbd.RankingsApi(api_client)
    rankings = api_instance.get_rankings(year=year,week=week)
    rankings_map = {}
    for poll in rankings[0].polls:
        if poll.poll == "AP Top 25":
            ap_poll = poll
    for rank in ap_poll.ranks:
        # Handle if ranks or pollrank is missing
        try:
            rankings_map[rank.school] = rank.rank
        except Exception:
            continue
    return rankings_map

def build_media_map(year, week):
    with cfbd.ApiClient(configuration) as api_client:
        api_instance = cfbd.GamesApi(api_client)
    media = api_instance.get_media(year=year, week=week)
    media_types = {}
    media_channels = {}
    for m in media:
        if m.home_team not in media_types:
            media_types[m.home_team] = [m.media_type]
            media_channels[m.home_team] = [m.outlet]
        else:
            media_types[m.home_team].append(m.media_type)
            media_channels[m.home_team].append(m.outlet)
        if m.away_team not in media_types:
            media_types[m.away_team] = [m.media_type]
            media_channels[m.away_team] = [m.outlet]
        else:
            media_types[m.away_team].append(m.media_type)
            media_channels[m.away_team].append(m.outlet)
    return media_types, media_channels

def build_venues_map():
    with cfbd.ApiClient(configuration) as api_client:
        api_instance = cfbd.VenuesApi(api_client)
    venues = api_instance.get_venues()
    venue_map = {}
    for venue in venues:
        venue_map[venue.name] = [venue.city, venue.state]
    return venue_map

def build_betting_map(year, week):
    with cfbd.ApiClient(configuration) as api_client:
        api_instance = cfbd.BettingApi(api_client)
    bets = api_instance.get_lines(year=year,week=week)
    betting_map = {}
    for bet in bets:
        if len(bet.lines) == 0:
            betting_map[bet.id] = [None, None, None]
        else:
            betting_map[bet.id] = [bet.lines[0].provider, bet.lines[0].formatted_spread, bet.lines[0].over_under]
    return betting_map

def get_weekly_games(year, week):
    record_map = build_team_records_map(year)
    rankings_map = build_team_rankings_map(year, week)
    media_types, media_channels = build_media_map(year, week)
    venue_map = build_venues_map()
    betting_map = build_betting_map(year, week)

    with cfbd.ApiClient(configuration) as api_client:
        api_instance = cfbd.GamesApi(api_client)
    
    games = api_instance.get_games(year=year,week=week,classification='fbs')

    if not games:
        print("[WARN] No games found for that week.")
        return

    # Clear existing games data
    games_collection.delete_many({})

    for g in games:
        # Fill media maps with all teams
        if g.home_team not in media_types:
            media_types[g.home_team] = None
        if g.home_team not in media_channels:
            media_channels[g.home_team] = None
        # Get record and ranking data, fallback to None if missing
        home_record = record_map.get(g.home_team, [None, None, None, None])
        away_record = record_map.get(g.away_team, [None, None, None, None])
        home_rank = rankings_map.get(g.home_team, None)
        away_rank = rankings_map.get(g.away_team, None)
        venue_location = venue_map.get(g.venue, [None, None])
        betting_info = betting_map.get(g.id, [None, None, None])
        # handle missing attributes in g
        home_data = {
            "name": getattr(g, 'home_team', None),
            "conference": getattr(g, 'home_conference', None),
            "wins": home_record[0],
            "losses": home_record[1],
            "conferenceWins": home_record[2],
            "conferenceLosses": home_record[3],
            "rank": home_rank
        }
        away_data = {
            "name": getattr(g, 'away_team', None),
            "conference": getattr(g, 'away_conference', None),
            "wins": away_record[0],
            "losses": away_record[1],
            "conferenceWins": away_record[2],
            "conferenceLosses": away_record[3],
            "rank": away_rank
        }
        venue_data = {
            "name": getattr(g, 'venue', None),
            "city": venue_location[0],
            "state": venue_location[1]
        }
        # Handle missing points, venue, etc.
        game_doc = {
            "date": getattr(g, 'start_date', None),
            "venue": venue_data,
            "mediaType": media_types[g.home_team],
            "channel": media_channels[g.home_team],
            "homeTeam": home_data,
            "awayTeam": away_data,
            "homePoints": getattr(g, 'home_points', None),
            "awayPoints": getattr(g, 'away_points', None),
            "provider": betting_info[0],
            "spread": betting_info[1],
            "overUnder": betting_info[2]
        }
        # Use upsert to insert if not present
        games_collection.update_one(
            {"date": game_doc["date"], "homeTeam.name": home_data["name"], "awayTeam.name": away_data["name"]},
            {"$set": game_doc},
            upsert=True
        )

    print(f"Successfully stored {len(games)} games")

def job():
    year = 2025
    week = 1
    get_weekly_games(year, week)


if __name__ == "__main__":
    # Run immediately for testing
    job()

    # Uncomment to run daily at 3 AM UTC
    # schedule.every().day.at("03:00").do(job)
    # while True:
    #     schedule.run_pending()
    #     time.sleep(60)