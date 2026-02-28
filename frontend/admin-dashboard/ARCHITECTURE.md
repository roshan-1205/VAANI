# Architecture Documentation

## Project Structure

```
vaani-dashboard/
├── public/                 # Static files
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── KPICards.js           # Animated metric cards
│   │   ├── ActivityChart.js      # Real-time line chart
│   │   ├── ServiceChart.js       # Donut chart for services
│   │   ├── LanguageChart.js      # Bar chart for languages
│   │   ├── RecentActivity.js     # Activity feed with drawer
│   │   ├── KPICards.css
│   │   ├── ChartCard.css
│   │   └── RecentActivity.css
│   ├── layout/            # Layout components
│   │   ├── Sidebar.js            # Collapsible navigation
│   │   ├── Navbar.js             # Top navigation bar
│   │   ├── Sidebar.css
│   │   └── Navbar.css
│   ├── pages/             # Page components
│   │   ├── Dashboard.js          # Main dashboard page
│   │   └── Dashboard.css
│   ├── hooks/             # Custom React hooks
│   │   └── useAutoRefresh.js     # Auto-refresh functionality
│   ├── utils/             # Utility functions
│   │   └── mockData.js           # Mock data & helpers
│   ├── App.js             # Root component
│   ├── App.css            # Global styles
│   └── index.js           # Entry point
├── README.md
├── DEPLOYMENT.md
└── package.json
```

## Component Hierarchy

```
App
├── Sidebar (collapsible)
└── MainContent
    ├── Navbar
    │   ├── DateFilter
    │   ├── ExportButton
    │   ├── LiveMonitor
    │   ├── NotificationBell
    │   └── ProfileDropdown
    └── Dashboard
        ├── KPICards (4 cards)
        ├── ActivityChart (line chart)
        ├── ServiceChart (donut chart)
        ├── LanguageChart (bar chart)
        └── RecentActivity
            └── ActivityDrawer (modal)
```

## State Management

Currently using React hooks (useState, useEffect). Ready for:
- Context API for global state
- Redux for complex state management
- React Query for server state

## Data Flow

```
Mock Data (utils/mockData.js)
    ↓
Dashboard Component
    ↓
Child Components (KPICards, Charts, etc.)
    ↓
Visual Rendering
```

## Styling Architecture

- **CSS Modules**: Component-scoped styles
- **Design Tokens**: Consistent spacing (8px grid)
- **Color System**: Centralized color palette
- **Responsive**: Mobile-first approach
- **Animations**: Framer Motion for smooth transitions

## Performance Optimizations

1. **Code Splitting**: Ready for React.lazy()
2. **Memoization**: Use React.memo for expensive components
3. **Virtualization**: For large lists (react-window)
4. **Image Optimization**: WebP format recommended
5. **Bundle Analysis**: Use webpack-bundle-analyzer

## Scalability Considerations

### Adding New Pages
```javascript
// 1. Create page component
src/pages/Analytics.js

// 2. Add route (when router added)
<Route path="/analytics" component={Analytics} />

// 3. Add sidebar link
{ icon: BarChart3, label: 'Analytics', path: '/analytics' }
```

### Adding New Charts
```javascript
// 1. Create chart component
src/components/NewChart.js

// 2. Import in Dashboard
import NewChart from '../components/NewChart';

// 3. Add to grid
<div className="grid-left">
  <NewChart />
</div>
```

### Backend Integration
```javascript
// Replace mock data with API calls
import { fetchDashboardData } from './api/dashboard';

useEffect(() => {
  const loadData = async () => {
    const data = await fetchDashboardData();
    setDashboardData(data);
  };
  loadData();
}, []);
```

## Security Best Practices

1. **Authentication**: Add JWT token management
2. **Authorization**: Role-based access control
3. **XSS Prevention**: Sanitize user inputs
4. **CSRF Protection**: Use CSRF tokens
5. **HTTPS Only**: Enforce secure connections

## Testing Strategy

```javascript
// Unit Tests (Jest)
src/components/__tests__/KPICards.test.js

// Integration Tests
src/pages/__tests__/Dashboard.test.js

// E2E Tests (Cypress)
cypress/integration/dashboard.spec.js
```

## Future Enhancements

- [ ] React Router for multi-page navigation
- [ ] Redux/Context for state management
- [ ] WebSocket for real-time updates
- [ ] PWA capabilities
- [ ] Dark/Light theme toggle
- [ ] Export to PDF functionality
- [ ] Advanced filtering and search
- [ ] User preferences persistence
- [ ] Internationalization (i18n)
- [ ] Accessibility improvements (ARIA)

## Dependencies

### Core
- react: ^18.x
- react-dom: ^18.x

### UI & Animation
- framer-motion: ^11.x
- lucide-react: ^0.x

### Charts
- recharts: ^2.x

### Development
- react-scripts: ^5.x

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## API Integration Guide

```javascript
// src/api/client.js
const API_BASE = process.env.REACT_APP_API_URL;

export const apiClient = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },
  
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};
```

## Deployment Architecture

```
User Browser
    ↓
CDN (CloudFront/Cloudflare)
    ↓
Static Hosting (S3/Netlify/Vercel)
    ↓
API Gateway
    ↓
Backend Services
```
