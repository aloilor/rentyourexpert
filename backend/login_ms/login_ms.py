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
    response = {'message': ''}
    
    if request.method == 'POST':
        # Create variables for easy access
        email = request.form.get('email')
        password = request.form.get('password')
        
        cursor.execute('SELECT * FROM user WHERE email = %s AND password = %s ', (email, password))

        # Fetch one record and return result
        user = cursor.fetchone()
        # If account exists in accounts table in out database
        if user:
            # Create session data, we can access this data in other routes
            session['loggedin'] = True
            session['id'] = user[0]
            session['email'] = user[6]
            # Redirect to home page
            response['message'] = 'success'
            response['auth_token'] = str(email)+str(password)

        else:
            # Account doesnt exist or username/password incorrect
            response['message'] = 'failure'
            print(password)
    
    # Output message if something goes wrong...
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug = True, host = '0.0.0.0', port = 5001)