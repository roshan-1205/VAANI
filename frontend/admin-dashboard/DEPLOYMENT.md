# Deployment Guide

## Development

```bash
cd vaani-dashboard
npm start
```

The app will open at `http://localhost:3000`

## Production Build

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## Deployment Options

### 1. Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

### 2. Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### 3. GitHub Pages
```bash
# Add to package.json
"homepage": "https://yourusername.github.io/vaani-dashboard"

# Install gh-pages
npm install --save-dev gh-pages

# Add scripts
"predeploy": "npm run build"
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

### 4. Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
EXPOSE 3000
```

```bash
docker build -t vaani-dashboard .
docker run -p 3000:3000 vaani-dashboard
```

## Environment Variables

Create `.env` file for API endpoints:

```
REACT_APP_API_URL=https://api.vaani.gov.in
REACT_APP_WS_URL=wss://ws.vaani.gov.in
```

## Performance Optimization

- Code splitting implemented
- Lazy loading ready
- Image optimization recommended
- CDN for static assets recommended

## Backend Integration

Replace mock data in `src/utils/mockData.js` with actual API calls:

```javascript
// Example API integration
export const fetchDashboardData = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/dashboard`);
  return response.json();
};
```

## Security Checklist

- [ ] Enable HTTPS
- [ ] Configure CORS
- [ ] Add authentication
- [ ] Implement rate limiting
- [ ] Add CSP headers
- [ ] Enable security headers

## Monitoring

Recommended tools:
- Google Analytics
- Sentry (Error tracking)
- LogRocket (Session replay)
- New Relic (Performance monitoring)
