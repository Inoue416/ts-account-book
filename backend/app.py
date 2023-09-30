# バックエンド
# 主にデータ管理

from flask import Flask, request
from flask_cors import CORS
import json
from database import *


app = Flask(__name__)
CORS(app)

DBNAME = "data.db" # 本来はだめ

def insert_data(thing, money, kind):
    try:
        conn = create_connect(DBNAME)
        cur = get_cursor(conn)
        cmd = """
            INSERT INTO posts (money, kind, thing) VALUES(?, ?, ?)
        """
        if kind != "income":
            money = 0 - money
        cur.execute(cmd, [money, kind, thing])
        conn.commit()
        close_db(conn)
        return 1

    except:
        return 0
    

@app.route('/send_sample_message')
def hello():
    return "Hello from Flask!"

@app.route("/add_info", methods=["POST"])
def add_info():
    res_mess = "success"
    try:
        if request.method == "POST":
            post_data = request.get_json()
            thing = post_data["thing"]
            money = int(post_data["money"])
            kind = post_data["kind"]
            if not insert_data(thing, money, kind):
                res_mess = "error"
    except:
        res_mess = "error"
    return {"response_message": res_mess}


if __name__ == '__main__':
    app.run(debug=True)