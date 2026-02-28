# Admin Dashboard

A production-ready, enterprise-grade admin dashboard built with React.js for monitoring and analytics.

## Features

- **Real-time Monitoring**: Live activity tracking with auto-refresh
- **Interactive Charts**: Line charts, donut charts, and bar charts using Recharts
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion for professional transitions
- **Collapsible Sidebar**: Space-efficient navigation
- **Activity Drawer**: Detailed view panel for recent activities
- **Dark Premium UI**: Clean design with #01070f theme
- **Modular Architecture**: Scalable component structure

## Tech Stack

- React.js (Functional Components + Hooks)
- Framer Motion (Animations)
- Recharts (Data Visualization)
- Lucide React (Icons)
- CSS3 (Custom Styling)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── KPICards.js
│   ├── ActivityChart.js
│   ├── ServiceChart.js
│   ├── LanguageChart.js
│   └── RecentActivity.js
├── layout/             # Layout components
│   ├── Sidebar.js
│   └── Navbar.js
├── pages/              # Page components
│   └── Dashboard.js
├── hooks/              # Custom hooks
│   └── useAutoRefresh.js
├── utils/              # Utility functions
│   └── mockData.js
└── App.js              # Main app component
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Design System

### Colors
- Background: `#e2e2e2`
- Primary Foreground: `#01070f`
- Accent Blue: `#3b82f6`
- Success Green: `#10b981`
- Warning Orange: `#f59e0b`
- Purple: `#8b5cf6`

### Typography
- Headings: Montserrat
- Body: Poppins
- Spacing: 8px grid system

## Features Implementation

✅ KPI Cards with trend indicators
✅ Real-time activity line chart
✅ Service category donut chart
✅ Language usage bar chart
✅ Recent activity feed with drawer
✅ Collapsible sidebar
✅ Responsive navbar
✅ Live monitor indicator
✅ Export functionality (UI ready)
✅ Notification badge
✅ Smooth animations
✅ Professional glassmorphism effects

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
