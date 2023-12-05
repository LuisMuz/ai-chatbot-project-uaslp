import subprocess

from flask import Flask, render_template, request
from load_model import get_message

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat_response', methods=['POST'])
def mi_endpoint():
    message = request.form.get('user_message')
    #folder = request.form.get('folder_location')

    #with open('chat_model/folder_value.txt', 'w') as file:
    #    file.write(folder)

    subprocess.run(["python", "load_model.py"])
    data = get_message(message)
    return data

if __name__ == '__main__':
    app.run(debug=True)
