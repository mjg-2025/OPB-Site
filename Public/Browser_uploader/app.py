from flask import Flask, request, render_template, jsonify, send_from_directory
from pathlib import Path
import uuid, time, os

app = Flask(__name__)
BASE_DIR = Path(r"C:\Users\MelissaGall\OneDrive - Range Realty Partners\Range Shared Files\Tenant Advisory\OPB\Map 2\Public\Images")

@app.route('/')
def index():
    folders = sorted([f.name for f in BASE_DIR.iterdir() if f.is_dir()])
    return render_template('index.html', folders=folders)

@app.route('/upload', methods=['POST'])
def upload():
    folder = request.form['folder']
    files = request.files.getlist('files[]')
    saved = []

    dest = BASE_DIR / folder
    dest.mkdir(parents=True, exist_ok=True)

    for f in files:
        ext = Path(f.filename).suffix
        new_name = f"{int(time.time()*1000)}_{uuid.uuid4().hex[:5]}{ext}"
        save_path = dest / new_name
        f.save(save_path)
        saved.append(f"{folder}/{new_name}")  # return full path for JS

    return jsonify({'status': 'success', 'files': saved})

@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(BASE_DIR, filename)

@app.route('/images/<folder>')
def list_images(folder):
    folder_path = BASE_DIR / folder
    if not folder_path.exists() or not folder_path.is_dir():
        return jsonify([])

    images = [
        f"{folder}/{f.name}"
        for f in folder_path.iterdir()
        if f.suffix.lower() in ['.jpg', '.jpeg', '.png']
    ]
    return jsonify(images)

if __name__ == '__main__':
    app.run(debug=True)
