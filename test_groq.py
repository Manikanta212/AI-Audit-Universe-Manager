from groq import Groq
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Read API key
api_key = os.getenv("GROQ_API_KEY")

# Create Groq client
client = Groq(api_key=api_key)

# Send request
chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "Generate a short audit report summary"
        }
    ],
    model="llama-3.3-70b-versatile"
)

# Print response
print(chat_completion.choices[0].message.content)