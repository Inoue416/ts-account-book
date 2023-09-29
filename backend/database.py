import sqlite3


def create_connect(dbname):
    conn = None
    try:
        conn = sqlite3.connect(dbname)
    except:
        conn = None
    return conn

def close_db(conn):
    conn.close()

def get_cursor(conn):
    cur = None
    try:
        cur = conn.cursor()
    except:
        cur = None

    return cur

    

