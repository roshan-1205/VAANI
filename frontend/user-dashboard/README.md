# Vaani User Dashboard

Modern, AI-powered User Dashboard for the Vaani government-tech assistance platform.

## Features

### Core Components
- **AI Voice Interaction**: Central hero component with animated waveform, breathing mic button, and voice state transitions (idle, listening, processing, responding)
- **Previous Issues Panel**: Searchable, filterable issue tracker with detailed drawer view showing timeline, department info, and responses
- **Quick Actions**: Three prominent action buttons for reporting issues, tracking existing issues, and connecting to live help
- **Analytics Charts**: 
  - Issue Category Distribution (Donut Chart)
  - Issue Trend Analysis (Bar + Line Hybrid Chart)

### Navigation
- **Sidebar**: Collapsible navigation with 7 menu items
  - My Activity
  - Report an Issue
  - Live Help
  - Notifications
  - Community Forums
  - Help & Support
  - Settings
- **Navbar**: Status indicators (online/pending/critical), notification bell with badge, profile section

### Design System
- **Colors**:
  - Background: `#e2e2e2`
  - Primary Surfaces: `#01070f`
  - Accent Colors: Purple (`#8b5cf6`), Blue (`#3b82f6`), Green (`#10b981`), Orange (`#f59e0b`)
- **Typography**:
  - Headings: Montserrat (600, 700, 800)
  - Body: Poppins (300, 400, 500, 600)
- **Spacing**: 8px grid system
- **Effects**: Glassmorphism, soft shadows, smooth animations

## Tech Stack
- React.js (Functional Components + Hooks)
- React Router DOM (Navigation)
- Framer Motion (Animations)
- Recharts (Data Visualization)
- Lucide React (Icons)
- Context API (State Management)

## Project Structure
```
user-dashboard/
├── src/
│   ├── components/
│   │   ├── AIVoiceInteraction.js
│   │   ├── IssueCategoryChart.js
│   │   ├── IssueTrendChart.js
│   │   ├── PreviousIssues.js
│   │   ├── QuickActions.js
│   │   └── LoadingScreen.js
│   ├── context/
│   │   └── UserContext.js
│   ├── layout/
│   │   ├── Sidebar.js
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── MyActivity.js
│   │   ├── ReportIssue.js
│   │   ├── LiveHelp.js
│   │   ├── Notifications.js
│   │   ├── Community.js
│   │   ├── Support.js
│   │   └── Settings.js
│   └── App.js
```

## Getting Started

### Installation
```bash
cd user-dashboard
npm install
```

### Development
```bash
npm start
```
Runs on `http://localhost:3000`

### Build
```bash
npm run build
```
Creates optimized production build in `build/` folder

## Key Features

### AI Voice Interaction
- Animated waveform visualization
- Breathing mic button with pulse effect
- Voice states: Idle → Listening → Processing → Responding
- Smooth transitions and animations

### Previous Issues
- Search functionality
- Status filtering (All, Resolved, In Progress, Escalated)
- Click to open detailed drawer panel
- Timeline view with event tracking
- Department and category information

### Quick Actions
- Report New Issue
- Track Existing Issue
- Connect to Live Help
- Hover animations and smooth transitions

### Analytics
- Issue category distribution with donut chart
- Monthly trend analysis with bar and line charts
- Custom tooltips and legends
- Smooth loading animations

## State Management
Uses Context API with UserContext providing:
- User data (name, email, role, avatar)
- System status (online, pending, critical)
- Notifications count
- Dynamic greeting based on time of day

## Responsive Design
- Desktop-first approach
- Tablet and mobile optimized
- Collapsible sidebar
- Adaptive grid layouts

## Performance
- Lazy loading for charts
- Optimized re-renders with React.memo
- Smooth 60fps animations
- Efficient state updates

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
MIT
