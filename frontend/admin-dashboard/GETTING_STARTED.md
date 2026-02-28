# Getting Started with Admin Dashboard

Welcome! This guide will help you get the Admin Dashboard up and running in minutes.

## ✅ Prerequisites

Before you begin, ensure you have:
- Node.js 14.0 or higher installed
- npm (comes with Node.js) or yarn
- A code editor (VS Code recommended)
- A modern web browser

## 🚀 Installation

### Step 1: Navigate to Project Directory
```bash
cd vaani-dashboard
```

### Step 2: Install Dependencies
Dependencies are already installed, but if needed:
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm start
```

The dashboard will automatically open at `http://localhost:3000`

## 🎉 First Look

Once the server starts, you'll see:

1. **Sidebar** (left) - Navigation menu with 6 sections
2. **Top Navbar** - Dashboard controls and profile
3. **KPI Cards** - 4 metric cards showing key statistics
4. **Charts** - Real-time activity, service distribution, language usage
5. **Recent Activity** - Latest user interactions

## 🎮 Interactive Features to Try

### 1. Collapse the Sidebar
- Click the arrow button in the sidebar header
- Watch the smooth animation as it collapses to icon-only mode

### 2. View Activity Details
- Click any item in the "Recent Activity" section
- A drawer will slide in from the right with detailed information
- Click outside or the X button to close

### 3. Hover Effects
- Hover over KPI cards to see elevation effect
- Hover over chart elements for tooltips
- Hover over activity items for highlight effect

### 4. Responsive Design
- Resize your browser window
- Watch the layout adapt to different screen sizes
- Try mobile view (< 768px width)

## 📁 Project Structure Overview

```
vaani-dashboard/
├── src/
│   ├── components/     # Reusable UI components
│   ├── layout/         # Sidebar & Navbar
│   ├── pages/          # Dashboard page
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Helper functions
│   └── App.js          # Main app component
├── public/             # Static files
└── [documentation]     # README, guides, etc.
```

## 🎨 Customization Quick Start

### Change Dashboard Title
Edit `src/layout/Navbar.js`:
```javascript
<h1>Your Custom Title</h1>
<p>Your custom subtitle</p>
```

### Add a New KPI Card
Edit `src/components/KPICards.js`:
```javascript
const kpis = [
  // ... existing cards
  { 
    icon: YourIcon, 
    label: 'New Metric', 
    value: 999, 
    trend: '+10%', 
    color: '#3b82f6' 
  }
];
```

### Modify Colors
Edit `src/App.css`:
```css
/* Change background */
body {
  background: #your-color;
}

/* Change card background */
.kpi-card {
  background: #your-color;
}
```

## 🔧 Available Scripts

### Development
```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run tests
npm run eject      # Eject from Create React App (irreversible!)
```

## 📊 Understanding the Data

Currently, the dashboard uses mock data from `src/utils/mockData.js`. This includes:

- **KPI Metrics**: Active users, calls, response time, success rate
- **Activity Data**: Hourly call and resolution statistics
- **Service Categories**: Healthcare, Education, Legal Aid, Welfare
- **Language Usage**: Hindi, Bengali, Tamil, Telugu, Marathi
- **Recent Activities**: Sample user interactions

## 🔌 Connecting to Real Data

To connect to your backend API:

### Step 1: Create API Client
Create `src/api/client.js`:
```javascript
const API_BASE = process.env.REACT_APP_API_URL;

export const fetchDashboardData = async () => {
  const response = await fetch(`${API_BASE}/dashboard`);
  return response.json();
};
```

### Step 2: Update Components
Replace mock data imports with API calls:
```javascript
import { fetchDashboardData } from '../api/client';

useEffect(() => {
  const loadData = async () => {
    const data = await fetchDashboardData();
    setDashboardData(data);
  };
  loadData();
}, []);
```

### Step 3: Add Environment Variables
Create `.env` file:
```
REACT_APP_API_URL=https://your-api.com
```

## 🐛 Common Issues & Solutions

### Issue: Port 3000 Already in Use
**Solution**: Use a different port
```bash
PORT=3001 npm start
```

### Issue: Module Not Found
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build Fails
**Solution**: Check for syntax errors
```bash
npm run build
# Read error messages carefully
```

### Issue: Styles Not Loading
**Solution**: Clear cache and restart
```bash
# Stop server (Ctrl+C)
# Clear browser cache
npm start
```

## 📱 Testing Responsive Design

### Desktop View (1200px+)
- 4-column KPI grid
- Side-by-side charts
- Full sidebar visible

### Tablet View (768px-1199px)
- 2-column KPI grid
- Stacked charts
- Full sidebar visible

### Mobile View (<768px)
- 1-column layout
- Stacked everything
- Sidebar hidden by default

## 🎯 Next Steps

Now that you're up and running:

1. **Explore the Code**
   - Read through component files
   - Understand the structure
   - Try making small changes

2. **Read Documentation**
   - [README.md](./README.md) - Project overview
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical details
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide

3. **Customize**
   - Change colors to match your brand
   - Add your own data
   - Modify layouts as needed

4. **Integrate Backend**
   - Connect to your API
   - Add authentication
   - Implement real-time updates

## 💡 Pro Tips

1. **Use React DevTools** - Install the browser extension for debugging
2. **Check Console** - Keep browser console open to catch errors
3. **Hot Reload** - Changes auto-refresh, no need to restart
4. **Component Isolation** - Test components individually
5. **Mobile First** - Always test mobile view

## 📚 Learning Resources

- **React**: https://react.dev/learn
- **Framer Motion**: https://www.framer.com/motion/introduction/
- **Recharts**: https://recharts.org/en-US/guide
- **CSS Grid**: https://css-tricks.com/snippets/css/complete-guide-grid/

## 🆘 Need Help?

1. Check the documentation files in this project
2. Review component code for examples
3. Test with mock data first before integrating APIs
4. Use browser DevTools to debug issues

## 🎊 You're Ready!

You now have a fully functional admin dashboard. Start customizing it to fit your needs!

**Happy coding!** 🚀

---

**Quick Reference Commands**
```bash
npm start          # Start development
npm run build      # Build for production
npm test           # Run tests
```

**Important Files**
- `src/App.js` - Main application
- `src/pages/Dashboard.js` - Dashboard page
- `src/utils/mockData.js` - Sample data
- `public/index.html` - HTML template
