from flask import Flask, jsonify
from flask_cors import CORS   

import sqlite3

app = Flask(__name__)
CORS(app)  

@app.route('/get-chart-data', methods=['GET'])
def get_chart_data():
    conn = sqlite3.connect('chartdata.db')
    cursor = conn.cursor()
    cursor.execute('SELECT category, value FROM sales_data')
    rows = cursor.fetchall()
    conn.close()

    data = [{"name": row[0], "value": row[1]} for row in rows]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
