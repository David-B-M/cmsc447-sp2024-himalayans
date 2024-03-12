from flask import Flask
app = Flask(__name__)


@app.route('/test')
def hello_world():  # put application's code here
    return {"sample": ["hello world", "random data", "booo"]}


if __name__ == '__main__':
    app.run(debug=True)
