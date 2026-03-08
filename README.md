# 🚀 Startup Generator

Describe any problem → get a full startup landing page, instantly. Powered by Google Gemini (free).

## Setup

### 1. Get your free Gemini API key
1. Go to https://aistudio.google.com
2. Sign in with your Google account
3. Click "Get API Key" → "Create API key" → copy it

### 2. Add your API key
Open `.env.local` and replace the placeholder:
```
GEMINI_API_KEY=your_actual_key_here
```

### 3. Install & run
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy to Vercel (free)
1. Push to a GitHub repo
2. Import at vercel.com
3. Add environment variable: GEMINI_API_KEY = your key
4. Deploy!

⚠️ Never commit .env.local — it's already in .gitignore.
