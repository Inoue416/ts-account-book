# バックエンド
# 主にデータ管理

from flask import Flask, request
from flask_cors import CORS
import json
from database import *
from datetime import datetime


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

def request_month_data() -> list:
    """
        This function have not params.
        return: [(id, money, thing, kind, created_at, update_at), (..), ...]
    """
    conn = create_connect(DBNAME)
    cur = get_cursor(conn)
    now_ym = datetime.now().strftime("%Y-%m")
    cmd = """
        SELECT * FROM posts WHERE strftime("%Y-%m", updated_at) = ?;
    """
    month_data = cur.execute(cmd, [now_ym,]).fetchall()
    close_db(conn)
    return month_data

@app.route('/send_sample_message')
def hello():
    return "Hello from Flask!"

@app.route('/get_month_data', methods=["GET"])
def get_month_data():
    res = "error"
    if request.method == "GET":
        request_month_data()
        res = "success"
    return {"response_message": res}

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