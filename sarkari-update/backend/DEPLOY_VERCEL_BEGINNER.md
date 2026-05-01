# Backend Deploy Guide (Beginner Friendly)

This guide shows exactly how to deploy this backend on Vercel and connect it to your frontend.

## 1) Push code to GitHub
1. Open your project folder.
2. Commit and push your latest code to GitHub.
3. Confirm these files exist in `sarkari-update/backend`:
   - `api/index.js`
   - `vercel.json`
   - `src/app.js`
   - `src/server.js`

## 2) Create backend project on Vercel
1. Go to [https://vercel.com](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Import your GitHub repository.
4. In **Root Directory**, choose: `sarkari-update/backend`
5. Click **Deploy** (first deploy may fail until env vars are added — this is normal).

## 3) Add Environment Variables (important)
In Vercel project:
1. Open **Settings** → **Environment Variables**.
2. Add these keys and values:

- `DB_HOST` = your MySQL host
- `DB_USER` = your MySQL username
- `DB_PASSWORD` = your MySQL password
- `DB_NAME` = your MySQL database name
- `JWT_SECRET` = any long random secret string
- `API_KEY` = any long random key (use same key in frontend)
- `CORS_ORIGINS` = `https://your-frontend.vercel.app`

> If you have a custom frontend domain, add both separated by comma:
> `https://your-frontend.vercel.app,https://www.yourdomain.com`

3. Click **Save**.
4. Go to **Deployments** and click **Redeploy** latest deployment.

## 4) Test backend URL
After deploy, Vercel gives URL like:
`https://your-backend-name.vercel.app`

Test in browser:
- `https://your-backend-name.vercel.app/health`

Expected response:
```json
{"status":"ok"}
```

## 5) Connect frontend to backend
Now set frontend env variables in your frontend Vercel project:

- `VITE_API_URL` = `https://your-backend-name.vercel.app`
- `VITE_API_KEY` = same value you used for backend `API_KEY`

Then redeploy frontend.

## 6) Final check
1. Open your frontend site.
2. Try loading data.
3. Try admin action (add article).
4. If errors happen, open:
   - Vercel backend **Logs**
   - Browser console (F12)

## Common mistakes
- Wrong Root Directory (must be `sarkari-update/backend`).
- Missing env vars.
- Frontend using old `VITE_API_URL`.
- `CORS_ORIGINS` not matching frontend URL exactly (`https://` + full domain).

## Local run (optional)
From backend folder:
```bash
npm install
npm run dev
```
Backend local URL:
`http://localhost:5000/health`
