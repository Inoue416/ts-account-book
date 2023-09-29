# バックエンド
# 主にデータ管理

from flask import Flask

app = Flask(__name__)

@app.route('/sample')
def hello():
    return "Hello from Flask!"

if __name__ == '__main__':
    app.run(debug=True)