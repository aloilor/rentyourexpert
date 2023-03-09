from flask import Flask

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def index():
    return {"Eleonora":"CIAO"}

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)