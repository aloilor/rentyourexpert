import re
from flask import Flask, render_template, request, redirect, url_for, session 
from flask import jsonify
import mysql.connector
from flask_cors import CORS


app = Flask(__name__, template_folder='templates')
app.secret_key = "super secret key"
CORS(app)

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
        
        cursor.execute('SELECT * FROM user WHERE email = %s AND password = %s ', (email, password))

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
            response['auth_token'] = str(email)+str(password)

        else:
            # Account doesnt exist or email/password incorrect
            response['message'] = 'failure'
            
    
    # Output message if something goes wrong...
    return jsonify(response)


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
        cursor.execute('SELECT * FROM user WHERE email = %s', (email,))
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
            cursor.execute('INSERT INTO user (name, surname, profession, location, description, email, phone, address, isAdmin, isWorker, available, password) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 0, 1, 0, %s)', (name, surname, profession, location, description, email, phone, address, password,))
            db.commit()
            response['message'] = 'You have successfully registered!'
        
    elif request.method == 'POST':
        # Form is empty... (no POST data)
         response['message'] = 'Please fill out the form!'
    # Show registration form with message (if any)
    return jsonify(response)











if __name__ == "__main__":
    app.run(debug = True, host = '0.0.0.0', port = 5001)
    
