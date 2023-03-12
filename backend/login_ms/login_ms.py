from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connessione al database MySQL
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

# Rotta di login
@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']


    # Query per verificare se l'utente esiste nel database
    query = "SELECT * FROM users WHERE email=%s AND password=%s"
    values = (email, password)
    cursor.execute(query, values)
    user = cursor.fetchone()

    if user:
        return jsonify({'message': 'Login effettuato con successo!'})
    else:
        return jsonify({'message': 'email o password errati!'})


@app.route('/register', methods=['POST'])
def register():
    # Estrae i dati inviati dal client
    data = request.get_json()
    email = data['email']
    password = data['password']

    # Cerca l'utente nel database
    
    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()

    # Se l'utente esiste già, ritorna un errore
    if user:
        return jsonify({'message': 'email già esistente!'})

    # Altrimenti, registra l'utente
    cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
    #mysql.connection.commit()
    return jsonify({'message': 'Registrazione effettuata con successo!'})


# Avvio dell'applicazione
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')