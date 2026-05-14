from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
import os

# Load .env
load_dotenv()

# Get API key
api_key = os.getenv("GROQ_API_KEY")

# Create Flask app
app = Flask(__name__)
CORS(app)

# Create Groq client
client = Groq(api_key=api_key)


# Home Route
@app.route("/")
def home():
    return "Audit Universe AI Service Running"


# Health Route
@app.route("/health")
def health():
    return jsonify({
        "status": "healthy",
        "service": "Audit Universe AI Service"
    })


# Generate Report Route
@app.route("/generate-report", methods=["POST"])
def generate_report():

    # Get JSON data
    data = request.json

    department = data.get("department")
    risk = data.get("risk")
    issue = data.get("issue")

    # Validation
    if not department or not risk or not issue:
        return jsonify({
            "error": "All fields are required"
        }), 400

    # AI Prompt
    prompt = f"""
    Generate an audit report for:

    Department: {department}
    Risk Level: {risk}
    Issue: {issue}

    Give:
    1. Summary
    2. Recommendations
    """

    # Send request to AI
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        model="llama-3.3-70b-versatile"
    )

    # Get AI response
    result = chat_completion.choices[0].message.content

    # Return JSON
    return jsonify({
        "report": result
    })


# Run app
if __name__ == "__main__":
    app.run(debug=True)