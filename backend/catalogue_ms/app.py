import pymysql
from flask import Flask 
from flask import jsonify
from flaskext.mysql import MySQL 


app = Flask(__name__)
mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'rentYourExpert'
app.config['MYSQL_DATABASE_HOST'] = 'db'
mysql.init_app(app)

@app.route('/')
def users():
    conn = mysql.connect()
    cursor = conn.cursor(pymsql.cursors.DictCursor)
    cursor.execute("SELECT * FROM user")

    rows = cursor.fetchall()

    resp = jsonify(rows)
    resp.status_code = 200
    return resp

if __name__ == "__main__":
    app.run(debug = True, host = '0.0.0.0')