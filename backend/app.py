# バックエンド
# 主にデータ管理

from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/send_sample_message')
def hello():
    return "Hello from Flask!"

@app.route("/add_info")
def add_info(data):
    print(data)
    

if __name__ == '__main__':
    app.run(debug=True)