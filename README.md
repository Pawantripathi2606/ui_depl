# Face Recognition Attendance System — Frontend UI

A clean, modern HTML/CSS/JavaScript frontend connected to the FastAPI backend.

## 🚀 Usage

Just open `index.html` in a browser, or serve via any static file server:

```bash
python -m http.server 3000
# Then open http://localhost:3000
```

## 📄 Pages

| File | Description |
|------|-------------|
| `index.html` | Dashboard with live stats and recent attendance |
| `students.html` | Student management (add, edit, delete, search) |
| `recognition.html` | Webcam photo capture, model training, face recognition |
| `attendance.html` | Attendance records with filters, Excel/PDF export, email |

## 🔗 Backend API
Connected to: `https://backend-2-1-ptmr.onrender.com`

To change the API URL, edit `js/api.js` → `const API_BASE = '...'`
