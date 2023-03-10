from flask import Flask 
from flask import jsonify
import mysql.connector


app = Flask(__name__)

@app.route('/')
def main():

    #MySQL connection config
    config = {
        'user' : 'root',
        'password' : 'root',
        'host' : 'db',
        'port' : '3306',
        'database' : 'rentYourExpert',
    }
    db = mysql.connector.connect(**config)

    #executing the query
    cursor = db.cursor()
    cursor.execute("SELECT * from user")
    result = cursor.fetchall()
    cursor.close()
    db.close()
    response = "Hello Daniele \n"

    for x in result: 
        response += str(x) + '\n'

    return response

if __name__ == "__main__":
    app.run(debug = True, host = '0.0.0.0', port = 5000)