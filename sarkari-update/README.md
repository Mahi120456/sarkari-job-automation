# SarkariUpdate.in (Production Starter)

Automated bilingual Indian Government notification portal with React + Node + MySQL + Python automation.

## Folder Structure

```
sarkari-update/
├── frontend/
├── backend/
├── automation/
├── database/
└── README.md
```

## 1) Local Setup

### Backend
1. `cd backend`
2. `cp .env.example .env`
3. Fill DB credentials, `JWT_SECRET`, and `API_KEY`.
4. `npm install`
5. `npm run dev`

### Frontend
1. `cd frontend`
2. Create `.env` with:
   - `VITE_API_URL=http://localhost:5000`
   - `VITE_API_KEY=replace_with_api_key`
3. `npm install`
4. `npm run dev`

### Database
1. Create MySQL DB on Hostinger/cPanel.
2. Import `database/schema.sql` into phpMyAdmin.
3. Insert admin user using bcrypt hash.

## 2) Hostinger cPanel Deployment

1. Build frontend: `cd frontend && npm install && npm run build`.
2. Upload `frontend/dist` contents to `public_html`.
3. Upload `backend` folder to server (e.g. `~/nodeapps/sarkariupdate-backend`).
4. In Hostinger Node.js App manager:
   - Startup file: `src/server.js`
   - Node version: 18+
   - Set environment variables from `.env.example`.
5. Install backend packages on server: `npm install`.
6. Start app and map domain/subdomain (e.g. `api.sarkariupdate.in`).
7. Set `VITE_API_URL` in frontend build to your API domain.

## 3) Automation (Cron)

1. `cd automation`
2. Create `.env`:
   - `API_URL=https://api.sarkariupdate.in/api/articles/add`
   - `API_KEY=...`
   - `OPENAI_API_KEY=...`
3. `pip install -r requirements.txt`
4. Cron (every 2 hours):
   ```bash
   0 */2 * * * /usr/bin/python3 /home/USER/sarkari-update/automation/scraper.py >> /home/USER/sarkari-scraper.log 2>&1
   ```

## 4) API Endpoints

- `POST /api/articles/add` (x-api-key required)
- `GET /api/articles`
- `GET /api/articles/:id`
- `DELETE /api/articles/:id` (Admin JWT)
- `POST /api/admin/login`
- `GET /api/admin/dashboard`

## 5) SEO + Design Notes

- SEO-friendly slug route on frontend: `/article/:id/:slug`
- Hindi font: Noto Sans Devanagari
- Color palette: saffron + navy news-style layout
- Mobile responsive grid with Tailwind
