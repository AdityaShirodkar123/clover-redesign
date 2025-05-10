from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Strapi configuration
STRAPI_URL = os.getenv("STRAPI_API_URL")
STRAPI_TOKEN = os.getenv("STRAPI_API_KEY")

@app.route("/top_games", methods=["GET"])
def get_top_games():
    try:
        top_n = int(request.args.get("n", 4))
        
        response = requests.get(
            STRAPI_URL,
            params={
                "pagination[pageSize]": top_n,
                "sort[0]": "Place:asc"
            },
            headers={
                "Authorization": f"Bearer {STRAPI_TOKEN}",
                "Content-Type": "application/json"
            }
        )
        
        if response.status_code != 200:
            return jsonify({
                "error": "Strapi API request failed",
                "status_code": response.status_code,
                "endpoint": response.url,
                "response_snippet": response.text[:200]  # first 200 characters for context
            }), 502
        
        strapi_data = response.json()
        
        # Transform the Strapi response to include all needed fields
        #print("Strapi Data:", strapi_data)  # Print the raw Strapi response data

        top_games = strapi_data["data"]

        
        return jsonify(top_games)
        
    except ValueError:
        return jsonify({
            "error": "Invalid 'n' parameter. Must be a number.",
            "message": "Please provide a valid number for the 'n' parameter"
        }), 400
    except Exception as e:
        return jsonify({
            "error": str(e),
            "message": "Failed to fetch data from Strapi"
        }), 500

@app.route('/health')
def health_check():
    """
    Health check endpoint
    """
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000) 