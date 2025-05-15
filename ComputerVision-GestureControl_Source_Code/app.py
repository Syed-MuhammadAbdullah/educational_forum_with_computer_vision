from flask import Flask, request
import threading
import subprocess

app = Flask(__name__)

@app.route('/start_volume_control', methods=['POST'])
def start_volume_control():
    def run_script():
        subprocess.call(['python', 'HandTrackingModule.py'])

    thread = threading.Thread(target=run_script)
    thread.start()
    return 'Volume control started!'

if __name__ == '__main__':
    app.run(debug=True) 