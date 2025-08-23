import os
from dotenv import load_dotenv

load_dotenv()

CFBD_API_KEY = os.getenv("CFBD_API_KEY")
MONGO_URI = os.getenv("MONGO_URI")

BASE_URL = "https://api.collegefootballdata.com"
HEADERS = {"Authorization": f"Bearer {CFBD_API_KEY}"}
