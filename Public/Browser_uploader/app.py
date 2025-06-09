from flask import Flask, request, render_template, jsonify, send_from_directory, url_for
from pathlib import Path
import uuid, time, os

app = Flask(__name__)

# Adjust path to your actual image storage
BASE_DIR = Path(r"C:\Users\MelissaGall\OneDrive - Range Realty Partners\Range Shared Files\Tenant Advisory\OPB\Map 2\Public\Images")

@app.route('/')
def index():
    # List all folders inside the image directory for dropdown
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
        # Return a usable frontend image URL
        saved.append(url_for('serve_image', filename=f"{folder}/{new_name}"))

    return jsonify({'status': 'success', 'files': saved})

@app.route('/images/<path:filename>')
def serve_image(filename):
    # Serve image by path (e.g. folder/image.jpg)
    return send_from_directory(BASE_DIR, filename)

@app.route('/images/<folder>')
def list_images(folder):
    # List all image filenames in a given folder
    folder_path = BASE_DIR / folder
    if not folder_path.exists() or not folder_path.is_dir():
        return jsonify([])

    images = [
        url_for('serve_image', filename=f"{folder}/{f.name}")
        for f in folder_path.iterdir()
        if f.suffix.lower() in ['.jpg', '.jpeg', '.png', 'avif']
    ]
    return jsonify(images)

if __name__ == '__main__':
    app.run(debug=True)
