import os
import requests

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

DIFY_API_KEY = os.getenv("DIFY_API_KEY")

DIFY_URL = "https://api.dify.ai/v1/workflows/run"


@app.route("/api/plan-trip", methods=["POST"])
def plan_trip():

    data = request.json

    destination = data.get("destination")
    travelers = data.get("travelers")
    days = data.get("days")
    budget = data.get("budget")

    dify_response = requests.post(
        DIFY_URL,
        headers={
            "Authorization": f"Bearer {DIFY_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "inputs": {
                "destination": destination,
                "travelers": travelers,
                "days": days,
                "budget": budget
            },
            "response_mode": "blocking",
            "user": "staynest-user"
        }
    )

    return jsonify(dify_response.json())


if __name__ == "__main__":
    app.run(debug=True, port=5000)