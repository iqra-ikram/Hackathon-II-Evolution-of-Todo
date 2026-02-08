import sys
import os

# Add backend directory to sys.path so 'src' imports work
# We go up one level from 'api' to root, then into 'backend'
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))

from src.main import app

# Set root_path to match the rewrite rule in vercel.json
# This ensures OpenAPI docs and reverse URL lookups work correctly
app.root_path = "/api/py"
