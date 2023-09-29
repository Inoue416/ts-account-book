import sqlite3
from database import *
import random


DBNAME = "./data.db"

conn = create_connect(DBNAME)
cur = get_cursor(conn)

# テーブルの初期化
cmd = """
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT, money INTERGET NOT NULL,
        kind TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
        updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
    )
"""

cur.execute(cmd)
conn.commit()

# ダミーデータの挿入
income_data = ["給料", 100000, "2023-04-20 09:00:00", "2023-04-20 09:00:00"]
output_data = [
    ["食費", -1000, "2023-04-01 12:00:00", "2023-04-01 12:00:00"],
    ["娯楽費", -10000, "2023-05-15 10:00:00", "2023-05-15 10:00:00"]
]
# 収入データ
cmd = """
    INSERT INTO posts (kind, money, created_at, updated_at) VALUES(?, ?, ?, ?)
"""
cur.execute(cmd, income_data)
conn.commit()
# 支出データの挿入
for out_data in output_data:
    cur.execute(cmd, out_data)
    conn.commit()

close_db(conn)