from flask import Flask, jsonify, request
from utils import Utils
from flask_cors import CORS

llm = Utils

app = Flask(__name__)
CORS(app)

@app.route('/api/<city>', methods=['POST'])
def hello_world(city):
    # This route will respond to GET requests with a JSON message
    # call gopal's function
    # store data in data variable
    data = request.json

    # Extract 'prompt' from the request data
    prompt = data.get('prompt', 'No prompt provided')
    ans = llm.finalInputAndOutput(city, prompt)
    return jsonify(message=ans)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
