import mysql.connector
from flask import Flask 
from flask import jsonify


app = Flask(__name__)

# MySQL configurations
config = {
    'user' : 'root',
    'password' : 'root',
    'host' : 'db',
    'port' : '3306',
    'database' : 'rentYourExpert'
}

db = mysql.connector.connect(**config)

@app.route('/')
def main():
    #executing the query
    cursor = db.cursor()
    cursor.execute("SELECT * from user")
    result = cursor.fetchall()
    cursor.close()
    connection.close()

    return result

if __name__ == "__main__":
    app.run(debug = True, host = '0.0.0.0', port = 5000)