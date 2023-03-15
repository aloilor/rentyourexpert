from flask import Flask 
from flask import jsonify
import mysql.connector
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def dbConnect():
    #MySQL connection config
    config = {
        'user' : 'root',
        'password' : 'root',
        'host' : 'db',
        'port' : '3306',
        'database' : 'rentYourExpert',
    }
    db = mysql.connector.connect(**config)
    return db

@app.route('/catalogue', methods=['GET'])
def getAllWorkers():
    #connecting to the database
    db = dbConnect()

    query = "SELECT id,name,surname,profession,location,description,phone,available FROM worker "
    #executing the query
    cursor = db.cursor()
    cursor.execute(query)

    #jsonifying 
    row_headers = [x[0] for x in cursor.description] #this will extract row headers
    rv = cursor.fetchall()
    json_data = []
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))

    #closing the connection to the database
    cursor.close()
    db.close()

    return json.dumps(json_data)


@app.route('/catalogue/<id>', methods=['GET'])
def getWorker(id):
    #connecting to the database
    db = dbConnect()

    query = "SELECT id,name,surname,profession,location,description,phone,available FROM worker WHERE id={id}".format(id=id)
    #executing the query
    cursor = db.cursor()
    cursor.execute(query)

    #jsonifying 
    row_headers = [x[0] for x in cursor.description] #this will extract row headers
    rv = cursor.fetchall()
    json_data = []
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))

    #closing the connection to the database
    cursor.close()
    db.close()

    return json.dumps(json_data)

@app.route('/catalogue/<id>', methods=['POST'])
def sendRequest(id):
    
    db = dbConnect()

    token = request.headers.get('Authorization').split(";")
    customer_id = token[0]
    worker_id = id
    
        
    query = """INSERT INTO request (customer_id, worker_id, accepted)
    VALUES ({customer_id}, {worker_id}, 0)""".format(
        worker_id = worker_id, 
        customer_id = customer_id)
    cursor = db.cursor()
    cursor.execute(query)
    db.commit()

    #closing the connection to the database
    cursor.close()
    db.close()

    return str(id),200    


if __name__ == "__main__":
    app.run(debug = True, host = '0.0.0.0', port = 5000)