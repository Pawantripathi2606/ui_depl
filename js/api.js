// ── API Configuration ──────────────────────────────────────
const API_BASE = 'https://backend-2-1-ptmr.onrender.com';

// ── Generic fetch wrapper ───────────────────────────────────
async function apiFetch(path, options = {}) {
    const url = `${API_BASE}${path}`;
    const headers = { 'Accept': 'application/json', ...options.headers };
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
        let err;
        try { err = await res.json(); } catch { err = { detail: res.statusText }; }
        throw err;
    }
    // Handle non-JSON responses (file downloads)
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('json')) return res.json();
    return res;
}

// ── Students ────────────────────────────────────────────────
const Students = {
    list: (search = '') => apiFetch(`/students/?search=${encodeURIComponent(search)}`),
    create: (data) => apiFetch('/students/', { method: 'POST', body: JSON.stringify(data) }),
    get: (id) => apiFetch(`/students/${id}`),
    update: (id, data) => apiFetch(`/students/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiFetch(`/students/${id}`, { method: 'DELETE' }),
};

// ── Recognition ─────────────────────────────────────────────
const Recognition = {
    savePhoto: (student_id, image) =>
        apiFetch('/recognition/save-photo', {
            method: 'POST',
            body: JSON.stringify({ student_id, image }),
        }),
    train: () => apiFetch('/recognition/train', { method: 'POST' }),
    recognize: (formData) =>
        apiFetch('/recognition/recognize', { method: 'POST', body: formData }),
};

// ── Attendance ──────────────────────────────────────────────
const Attendance = {
    list: (params = {}) => apiFetch(`/attendance/?${new URLSearchParams(params)}`),
    stats: () => apiFetch('/attendance/stats'),
    delete: (id) => apiFetch(`/attendance/${id}`, { method: 'DELETE' }),
    sendEmail: (id) => apiFetch(`/attendance/${id}/send-email`, { method: 'POST' }),
    sendAllEmails: () => apiFetch('/attendance/send-all-emails', { method: 'POST' }),
    excelUrl: (params = {}) => `${API_BASE}/attendance/export/excel?${new URLSearchParams(params)}`,
    pdfUrl: (params = {}) => `${API_BASE}/attendance/export/pdf?${new URLSearchParams(params)}`,
    studentPdfUrl: (sid) => `${API_BASE}/attendance/export/student-pdf/${sid}`,
};

// ── Toast notifications ─────────────────────────────────────
function toast(msg, type = 'info') {
    let wrap = document.getElementById('toast-wrap');
    if (!wrap) {
        wrap = document.createElement('div');
        wrap.id = 'toast-wrap';
        wrap.className = 'toast-wrap';
        document.body.appendChild(wrap);
    }
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    el.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
    wrap.appendChild(el);
    setTimeout(() => el.remove(), 4000);
}

// ── Modal helpers ───────────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ── Active nav link ─────────────────────────────────────────
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    if (link.href === location.href) link.classList.add('active');
});
