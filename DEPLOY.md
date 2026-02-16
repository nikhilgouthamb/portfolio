# Deploy nikhilgoutham.space

Build is ready. Deploy using one of these methods:

## Option A: Vercel CLI (quick)

1. **Log in to Vercel** (one-time):
   ```bash
   npx vercel login
   ```
   Follow the link to log in in your browser.

2. **Deploy**:
   ```bash
   npx vercel --prod
   ```
   First time: link this folder to a Vercel project (or create one). Your domain `nikhilgoutham.space` can be added in the Vercel project → Settings → Domains.

## Option B: Git push (auto-deploy)

If this repo is already connected to Vercel:

1. Commit and push:
   ```bash
   git add -A
   git commit -m "Improvements and deploy-ready build"
   git push origin main
   ```
2. Vercel will build and deploy from the push. Check the deployment at https://vercel.com/dashboard.

## Option C: Deploy from Vercel dashboard

1. Go to [vercel.com](https://vercel.com) → Add New → Project.
2. Import your Git repository (e.g. GitHub).
3. Leave build settings as default (Next.js).
4. Deploy. Then add **nikhilgoutham.space** under Project → Settings → Domains.

---

**Build command:** `npm run build`  
**Output directory:** (default for Next.js)  
**Install command:** `npm install`
