from flask import Flask 
from flask import jsonify
from flask import request
import requests
import mysql.connector
import json

app = Flask(__name__)

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

@app.route('/users', methods=['GET'])
def getAllUsers():
    #connecting to the database
    db = dbConnect()

    query = "SELECT id,name,surname,profession,location,description,phone,available FROM user"
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

@app.route('/users', methods=['POST'])
def addUser():

    #connecting to the database
    db = dbConnect()

    query =  """INSERT INTO user (name, surname, profession, location, description, email, phone, address, available, isWorker, isAdmin)
             VALUES ('{name}', '{surname}', '{profession}', '{location}', '{description}', '{email}', '{phone}', '{address}', '{available}', '{isWorker}', '{isAdmin}')""".format(
              name = request.form.get('name'),
              surname = request.form.get('surname'),
              profession = request.form.get('profession'),
              location = request.form.get('location'),
              description = request.form.get('description'),
              email = request.form.get('email'),
              phone = request.form.get('phone'),
              address = request.form.get('address'),
              available = request.form.get('available'),
              isWorker = request.form.get('isWorker'),
              isAdmin = request.form.get('isAdmin')
             )
    

    #executing the query
    cursor = db.cursor()
    cursor.execute(query)
    db.commit()
    
    lastId = cursor.lastrowid

    #closing the connection to the database
    cursor.close()
    db.close()

    return str(lastId),200

@app.route('/users/<id>', methods=['DELETE'])
def delUser(id):
    
    #connecting to the database
    db = dbConnect()

    query = """DELETE FROM user WHERE id = {id}""".format(id=id)
    #executing the query
    cursor = db.cursor()
    cursor.execute(query)
    db.commit()

    #closing the connection to the database
    cursor.close()
    db.close()

    return str(id),200

@app.route('/requests', methods=['GET'])
def getAllRequests():
    #connecting to the database
    db = dbConnect()

    query = "SELECT id, customer_id, worker_id, created_at FROM request"
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

@app.route('/requests/<id>', methods=['GET'])
def getRequest(id):
    #connecting to the database
    db = dbConnect()

    query = "SELECT id, customer_id, worker_id, created_at FROM request WHERE id = {id}".format(id=id)
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

@app.route('/requests', methods=['POST'])
def addRequest():
    #connecting to the database
    db = dbConnect()

    query = """INSERT INTO request(customer_id, worker_id) 
                VALUES ('{customer_id}','{worker_id}')""".format(
                    customer_id = request.form.get('customer_id'),
                    worker_id = request.form.get('worker_id')   
                )

    #executing the query
    cursor = db.cursor()
    cursor.execute(query)
    db.commit()
    
    lastId = cursor.lastrowid

    #closing the connection to the database
    cursor.close()
    db.close()

    return str(lastId),200

@app.route('/requests/<id>', methods=['DELETE'])
def delRequest(id):
    
    #connecting to the database
    db = dbConnect()

    query = """DELETE FROM request WHERE id = {id}""".format(id=id)
    
    #executing the query
    cursor = db.cursor()
    cursor.execute(query)
    db.commit()

    #closing the connection to the database
    cursor.close()
    db.close()

    return str(id),200

