# バックエンド
# 主にデータ管理

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from database import *
from datetime import datetime


app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
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

def request_month_data(target_year, target_month) -> list:
    """
        This function have not params.
        return: [(id, money, thing, kind, created_at, update_at), (..), ...]
    """
    conn = create_connect(DBNAME)
    cur = get_cursor(conn)
    target_year_month = "{}-{}".format(target_year, str(target_month).zfill(2))
    print(target_year_month)
    cmd = """
        SELECT * FROM posts WHERE strftime("%Y-%m", updated_at) = ?;
    """
    month_data = cur.execute(cmd, [target_year_month,]).fetchall()
    close_db(conn)
    return month_data


@app.route('/send_sample_message')
def hello():
    return "Hello from Flask!"


@app.route('/get_month_data', methods=["GET"])
def get_month_data():
    res = "error"
    month_data = None
    get_params = request.args
    now_year_month = (datetime.now().strftime("%Y-%m")).split("-")
    target_year = int(now_year_month[0])
    target_month = int(now_year_month[1])
    try:
        if list(get_params) == []:
            pass
        else:
            print("Set Date....")
            target_year = int(get_params.get('target_year'))
            target_month = int(get_params.get('target_month'))
        print(target_year, target_month)

    except:
        pass

    if request.method == "GET":
        month_data = request_month_data(target_year, target_month)
        res = "success"
    return {"response_message": res, 'month_data': month_data}


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


def get_now_year_data(ty: int):
    conn = create_connect(DBNAME)
    cur = get_cursor(conn)
    cmd = """
        SELECT * FROM posts WHERE strftime("%Y", updated_at) = ?;
    """
    year_data = cur.execute(cmd, [ty,]).fetchall()
    return year_data


@app.route('/get_year_data', methods=['GET'])
def get_year_data():
    res_mess = "error"
    year_data = None
    name2number = {
        1: "January",   
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
    } 

    each_year_data = {}
    target_year = int(datetime.now().strftime("%Y"))
    print(target_year)
    get_params = request.args
    try:
        if list(get_params) == []:
            pass
        else:
            target_year = get_params.get("target_year")
        print(target_year)
        res_mess = 'success'
        year_data = get_now_year_data(target_year)
        for y_d in year_data:
            month = int(y_d[4].split("-")[1])
            if not(name2number[month] in each_year_data.keys()):
                each_year_data[name2number[month]] = []
            each_year_data[name2number[month]].append(y_d)
    except:
        pass
    return jsonify({"response_message": res_mess, "data": each_year_data})


if __name__ == '__main__':
    app.run(debug=True)