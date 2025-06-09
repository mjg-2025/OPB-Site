import os
import time
import uuid
import json
from pathlib import Path
import tkinter as tk
from tkinter import filedialog, messagebox, ttk
from tkinterdnd2 import DND_FILES, TkinterDnD  # ✅ Correct location

# Config file to store last used folder
CONFIG_PATH = Path("config.json")

# ✅ Set your actual folder path here
BASE_DIR = Path(r"C:\Users\MelissaGall\OneDrive - Range Realty Partners\Range Shared Files\Tenant Advisory\OPB\Map 2\Public\Images")

def get_subfolders(base_dir):
    return sorted([f.name for f in base_dir.iterdir() if f.is_dir()])

def generate_filename(prefix, ext):
    timestamp = int(time.time() * 1000)
    rand = uuid.uuid4().hex[:5]
    return f"{prefix}_{timestamp}_{rand}{ext}"

def load_last_used_folder():
    if CONFIG_PATH.exists():
        with open(CONFIG_PATH, "r") as f:
            return json.load(f).get("last_folder")
    return None

def save_last_used_folder(folder):
    with open(CONFIG_PATH, "w") as f:
        json.dump({"last_folder": folder}, f)

class ImageUploaderApp(TkinterDnD.Tk):  # ✅ Correct base class
    def __init__(self):
        super().__init__()
        self.title("🖼️ Image Uploader")
        self.geometry("500x300")
        self.configure(bg="#1e1e1e")

        self.folder_var = tk.StringVar()
        self.last_folder = load_last_used_folder()

        tk.Label(self, text="Select Folder", bg="#1e1e1e", fg="white").pack(pady=10)
        self.folder_dropdown = ttk.Combobox(self, textvariable=self.folder_var, state="readonly", width=50)
        self.folder_dropdown.pack()

        self.refresh_folders()

        if self.last_folder and self.last_folder in self.folder_dropdown["values"]:
            self.folder_var.set(self.last_folder)

        tk.Button(self, text="Browse Images", command=self.browse_files).pack(pady=10)

        drop_label = tk.Label(self, text="⬇️ Drag and Drop Files Below", bg="#1e1e1e", fg="gray")
        drop_label.pack()

        self.drop_frame = tk.LabelFrame(self, width=400, height=100, bg="#2e2e2e", text="Drop Here", fg="white")
        self.drop_frame.pack(pady=10)
        self.drop_frame.pack_propagate(False)

        self.drop_frame.drop_target_register(DND_FILES)
        self.drop_frame.dnd_bind("<<Drop>>", self.on_drop)

        self.drop_frame.bind("<Button-1>", lambda e: self.browse_files())

    def refresh_folders(self):
        folders = get_subfolders(BASE_DIR)
        self.folder_dropdown["values"] = folders
        if folders:
            self.folder_dropdown.current(0)

    def browse_files(self):
        files = filedialog.askopenfilenames(filetypes=[("Images", "*.jpg *.jpeg *.png *.gif *.webp")])
        self.process_files(files)

    def on_drop(self, event):
        files = self.tk.splitlist(event.data)
        self.process_files(files)

    def process_files(self, files):
        folder = self.folder_var.get()
        if not folder:
            messagebox.showerror("Error", "Please select a destination folder.")
            return

        dest_folder = BASE_DIR / folder
        for file in files:
            ext = Path(file).suffix
            new_name = generate_filename(folder, ext)
            new_path = dest_folder / new_name
            try:
                Path(file).replace(new_path)
                print(f"[+] {file} → {new_path}")
            except Exception as e:
                print(f"[!] Error moving file: {file} → {e}")

        save_last_used_folder(folder)
        messagebox.showinfo("Done", f"Uploaded {len(files)} image(s) to {folder}!")

if __name__ == "__main__":
    app = ImageUploaderApp()
    app.mainloop()
