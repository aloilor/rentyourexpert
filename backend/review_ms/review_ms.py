from flask import Flask 
from flask import jsonify
from flask import request
from flask_cors import CORS
import requests
import mysql.connector
import json

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


#GET ALL REVIEWS FOR THAT CUSTOMER ID
@app.route('/catalogue/<worker_id>', methods=['GET'])
def getAllReviews(worker_id):
    db = dbConnect()

    query = "SELECT * FROM review, customer WHERE worker_id = {worker_id}  AND customer_id = customer.id".format(worker_id=worker_id)

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

    return json.dumps(json_data, indent=4, sort_keys=True, default=str)


@app.route('/catalogue/<worker_id>', methods=['POST'])
def addReview(worker_id):
    
    db = dbConnect()

    token = request.headers.get('Authorization').split(";")
    customer_id = token[0]

    description = request.form['description']

    query = """SELECT * FROM request WHERE customer_id={customer_id} AND worker_id={worker_id}""".format(        
        customer_id=customer_id,
        worker_id = worker_id)

    #executing the query
    cursor = db.cursor()
    cursor.execute(query)

    if(not cursor.fetchall()):
        cursor.close()
        db.close()
        
    #jsonifying 
    row_headers = [x[0] for x in cursor.description] #this will extract row headers
    rv = cursor.fetchone()
    dic = dict(zip(row_headers,rv))
    
    if str(dic['accepted']) == '0':
        cursor.close()
        db.close()
        return ("Cannot create review, this customer has never sent a request to the worker.")   

    query = """ INSERT INTO review (customer_id, worker_id, description) VALUES 
            ('{customer_id}', '{worker_id}', '{description}') """.format(
                customer_id = customer_id,
                worker_id = worker_id,
                description = description
            )
    cursor.execute(query)
    db.commit()

    #closing the connection to the database
    cursor.close()
    db.close()

    return "Recensione aggiunta con successo",200  

@app.route('/catalogue/<worker_id>/<id>', methods=['PUT'])
def updateReview(worker_id, id):
    db = dbConnect()
    cursor = db.cursor()

    token = request.headers.get('Authorization').split(";")
    customer_id = token[0]
    description = request.form['description']


    query = """UPDATE review SET description = '{description}' 
               WHERE id = '{id}'""".format(
                description = description,
                id = id
               )

    cursor.execute(query)
    db.commit()

    #closing the connection to the database
    cursor.close()
    db.close()

    return "Recensione modificata con successo",200  

@app.route('/catalogue/<worker_id>/<id>', methods=['DELETE'])
def deleteReview(worker_id, id):
    db = dbConnect()
    cursor = db.cursor()

    token = request.headers.get('Authorization').split(";")
    customer_id = token[0]

    query = """ DELETE FROM review 
            WHERE id = '{id}' AND customer_id = '{customer_id}' AND worker_id = '{worker_id}' """.format(
        id = id,
        customer_id = customer_id,
        worker_id = worker_id
    )

    cursor.execute(query)
    db.commit()

    #closing the connection to the database
    cursor.close()
    db.close()

    return "Recensione eliminata con successo",200
