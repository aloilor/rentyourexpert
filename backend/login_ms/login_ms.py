import re
from flask import Flask, render_template, request, redirect, url_for, session 
from flask import jsonify
import mysql.connector
from flask_cors import CORS


app = Flask(__name__, template_folder='templates')
app.secret_key = "super secret key"
CORS(app)



#### WORKER LOGIN 
@app.route('/login/', methods=['GET', 'POST'])
def login():

    #MySQL connection config
    config = {
        'user' : 'root',
        'password' : 'root',
        'host' : 'db',
        'port' : '3306',
        'database' : 'rentYourExpert',
    }
    db = mysql.connector.connect(**config)
    cursor = db.cursor()
    response = {'message': ''}
    
    if request.method == 'POST':
        # Create variables for easy access
        email = request.form.get('email')
        password = request.form.get('password')
        
        cursor.execute('SELECT * FROM worker WHERE email = %s AND password = %s ', (email, password))

        # Fetch one record and return result
        user = cursor.fetchone()
        # If account exists in user table in out database
        if user:
            # Create session data, we can access this data in other routes
            session['loggedin'] = True
            session['id'] = user[0]
            session['email'] = user[6]
            # Redirect to home page
            response['message'] = 'success'
            response['auth_token'] = str(user[0])+";"+str(email)+";"+str(password)+";"+"W"

        else:
            # Account doesnt exist or email/password incorrect
            response['message'] = 'failure'
            
    # Output message if something goes wrong...
    return jsonify(response)



#### WORKER REGISTER 
@app.route('/register/', methods=['GET', 'POST'])
def register():
    #MySQL connection config
    config = {
        'user' : 'root',
        'password' : 'root',
        'host' : 'db',
        'port' : '3306',
        'database' : 'rentYourExpert',
    }
    db = mysql.connector.connect(**config)
    cursor = db.cursor()
    response = {'message': ''}
    # Check if "email", "password" and "email" POST requests exist (user submitted form)
    if request.method == 'POST' and 'email' in request.form and 'password' in request.form:
        # Create variables for easy access
        email = request.form['email']
        password = request.form['password']
        name = request.form['name']
        surname = request.form['surname']
        profession = request.form['profession']
        location = request.form['location']
        description = request.form['description']
        phone = request.form['phone']
        address = request.form['address']
        
        
        # Check if account exists using MySQL
        cursor.execute('SELECT * FROM worker WHERE email = %s', (email,))
        account = cursor.fetchone()
        # If account exists show error and validation checks
        if account:
            response['message'] = 'Account already exists!'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            response['message'] = 'Invalid email address!'
        elif not re.match(r'[A-Za-z0-9]+', email):
            response['message'] = 'email must contain only characters and numbers!'
        elif not email or not password or not email:
            response['message'] = 'Please fill out the form!'
        else:
            # Account doesnt exists and the form data is valid, now insert new account into user table
            cursor.execute('INSERT INTO worker (name, surname, profession, location, description, email, phone, address, available, password) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 1, %s)', (name, surname, profession, location, description, email, phone, address, password,))
            db.commit()
            response['message'] = 'You have successfully registered!'
        
    elif request.method == 'POST':
        # Form is empty... (no POST data)
         response['message'] = 'Please fill out the form!'
    # Show registration form with message (if any)
    return jsonify(response)



#### CUSTOMER REGISTER 
@app.route('/register_customer/', methods=['GET', 'POST'])
def register_customer():
    #MySQL connection config
    config = {
        'user' : 'root',
        'password' : 'root',
        'host' : 'db',
        'port' : '3306',
        'database' : 'rentYourExpert',
    }
    db = mysql.connector.connect(**config)
    cursor = db.cursor()
    response = {'message': ''}
    # Check if "email", "password" and "email" POST requests exist (user submitted form)
    if request.method == 'POST' and 'email' in request.form and 'password' in request.form:
        # Create variables for easy access
        email = request.form['email']
        password = request.form['password']
        name = request.form['name']
        surname = request.form['surname']
        username = request.form['username']
        
        
        # Check if account exists using MySQL
        cursor.execute('SELECT * FROM customer WHERE email = %s', (email,))
        account = cursor.fetchone()
        # If account exists show error and validation checks
        if account:
            response['message'] = 'Account already exists!'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            response['message'] = 'Invalid email address!'
        elif not re.match(r'[A-Za-z0-9]+', email):
            response['message'] = 'email must contain only characters and numbers!'
        elif not email or not password or not email:
            response['message'] = 'Please fill out the form!'
        else:
            # Account doesnt exists and the form data is valid, now insert new account into user table
            cursor.execute('INSERT INTO customer (username, name, surname, email, password, isAdmin) VALUES (%s, %s, %s, %s, %s, 0)', (username, name, surname, email, password,))
            db.commit()
            response['message'] = 'You have successfully registered!'
        
    elif request.method == 'POST':
        # Form is empty... (no POST data)
         response['message'] = 'Please fill out the form!'
    # Show registration form with message (if any)
    return jsonify(response)


#### CUSTOMER LOGIN 
@app.route('/login_customer/', methods=['GET', 'POST'])
def login_customer():

    #MySQL connection config
    config = {
        'user' : 'root',
        'password' : 'root',
        'host' : 'db',
        'port' : '3306',
        'database' : 'rentYourExpert',
    }
    db = mysql.connector.connect(**config)
    cursor = db.cursor()
    response = {'message': ''}
    
    if request.method == 'POST':
        # Create variables for easy access
        email = request.form.get('email')
        password = request.form.get('password')
        
        cursor.execute('SELECT * FROM customer WHERE email = %s AND password = %s ', (email, password))

        # Fetch one record and return result
        user = cursor.fetchone()
        # If account exists in user table in out database
        if user:
            # Create session data, we can access this data in other routes
            session['loggedin'] = True
            session['id'] = user[0]
            session['email'] = user[6]
            # Redirect to home page
            response['message'] = 'success'
            response['auth_token'] = str(user[0])+";"+str(email)+";"+str(password)+";"+"C"

        else:
            # Account doesnt exist or email/password incorrect
            response['message'] = 'failure'
            
    # Output message if something goes wrong...
    return jsonify(response)




if __name__ == "__main__":
    app.run(debug = True, host = '0.0.0.0', port = 5001)
    
