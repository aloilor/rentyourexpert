from flask import Flask 
from flask import jsonify


app = Flask(__name__)

  
@app.route('/home', methods=['GET'])
def index():
  return {
    "channel": "CIAO ELE",
  }
  
  
if __name__ == "__main__":
    app.run(debug = True, host = '0.0.0.0', port = 8000)