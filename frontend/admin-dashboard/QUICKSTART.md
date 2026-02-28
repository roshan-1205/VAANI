# Quick Start Guide

## Prerequisites

- Node.js 14+ installed
- npm or yarn package manager

## Installation

```bash
# Navigate to project directory
cd vaani-dashboard

# Install dependencies
npm install

# Start development server
npm start
```

The dashboard will open at `http://localhost:3000`

## First Steps

### 1. Explore the Dashboard
- View KPI metrics at the top
- Check real-time activity chart
- Explore service distribution
- Review language usage statistics
- Click on recent activities for details

### 2. Test Responsive Design
- Resize browser window
- Test on mobile devices
- Try collapsing the sidebar

### 3. Customize Colors
Edit `src/App.css` to change the color scheme:
```css
/* Background */
background: #e2e2e2;

/* Primary foreground */
background: #01070f;
```

### 4. Add Your Data
Replace mock data in `src/utils/mockData.js`:
```javascript
export const fetchDashboardData = async () => {
  const response = await fetch('YOUR_API_ENDPOINT');
  return response.json();
};
```

### 5. Build for Production
```bash
npm run build
```

## Common Tasks

### Add a New KPI Card
Edit `src/components/KPICards.js`:
```javascript
const kpis = [
  // ... existing cards
  { 
    icon: YourIcon, 
    label: 'New Metric', 
    value: 123, 
    trend: '+5%', 
    color: '#3b82f6' 
  }
];
```

### Change Sidebar Menu
Edit `src/layout/Sidebar.js`:
```javascript
const menuItems = [
  // ... existing items
  { icon: NewIcon, label: 'New Page' }
];
```

### Modify Chart Data
Edit respective chart components:
- `src/components/ActivityChart.js`
- `src/components/ServiceChart.js`
- `src/components/LanguageChart.js`

## Troubleshooting

### Port Already in Use
```bash
# Use different port
PORT=3001 npm start
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check for syntax errors
npm run build

# Fix linting issues
npm run lint --fix
```

## Next Steps

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed structure
2. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment options
3. Review [README.md](./README.md) for features overview

## Support

For issues or questions:
- Check documentation files
- Review component code
- Test with mock data first

## Development Tips

- Use React DevTools for debugging
- Check browser console for errors
- Test on multiple screen sizes
- Keep components modular
- Follow existing code patterns

Happy coding! 🚀
