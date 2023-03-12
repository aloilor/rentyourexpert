from flask import Flask, render_template, request, redirect, url_for, session 
from flask import jsonify
import mysql.connector


app = Flask(__name__, template_folder='templates')
app.secret_key = "super secret key"


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
    
    msg = ''
    if request.method == 'POST' and 'email' in request.form:
        # Create variables for easy access
        email = request.form['email']
        #password = request.form['password']
        
        # Check if account exists using MySQL
        cursor.execute('SELECT * FROM user WHERE email = %s ', (email,))
        # Fetch one record and return result
        user = cursor.fetchone()
        # If account exists in accounts table in out database
        if user:
            # Create session data, we can access this data in other routes
            session['loggedin'] = True
            session['id'] = user[0]
            session['email'] = user[6]
            # Redirect to home page
            return 'Logged in successfully!'
        else:
            # Account doesnt exist or username/password incorrect
            msg = 'Incorrect username/password!'
    
    # Output message if something goes wrong...
    return render_template('index.html', msg=msg)

    