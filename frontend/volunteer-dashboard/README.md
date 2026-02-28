# Vaani Volunteer Dashboard

A production-ready, role-based volunteer management dashboard built with React.js. Completely isolated from the Admin Dashboard with its own state management and architecture.

## 🎯 Overview

The Volunteer Dashboard provides volunteers with a comprehensive interface to manage their tasks, track performance, access training, and communicate with the team.

## ✨ Key Features

### Dashboard Sections
- **Overview**: KPI cards, progress bars, status distribution, satisfaction gauge
- **My Tasks**: Task management with search, filters, and progress tracking
- **My Activity**: Recent activity timeline
- **Training**: Course management with progress tracking
- **Performance**: Performance metrics and achievements
- **Messages**: Message inbox with unread indicators
- **Settings**: Account and preference management

### Interactive Components
- 4 KPI Cards with trend indicators
- 2 Progress bars (Training & Engagement)
- Donut chart for status distribution
- Gauge chart for satisfaction level
- Task cards with priority badges
- Real-time availability toggle
- Notification system

## 🎨 Design System

### Colors
- Background: `#e2e2e2`
- Primary Foreground: `#01070f`
- Positive Accent: `#10b981` (Green)
- Negative Accent: `#ef4444` (Red)
- Warning: `#f59e0b` (Orange)
- Info: `#3b82f6` (Blue)
- Purple: `#8b5cf6`

### Typography
- Headings: Montserrat (600, 700, 800)
- Body: Poppins (300, 400, 500, 600)
- Spacing: 8px grid system

## 🏗 Architecture

### Folder Structure
```
volunteer-dashboard/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── KPICards.js
│   │   ├── ProgressBars.js
│   │   ├── StatusDistribution.js
│   │   ├── SatisfactionGauge.js
│   │   └── LoadingScreen.js
│   ├── layout/              # Layout components
│   │   ├── Sidebar.js
│   │   └── Navbar.js
│   ├── pages/               # Page components
│   │   ├── Overview.js
│   │   ├── MyTasks.js
│   │   ├── MyActivity.js
│   │   ├── Training.js
│   │   ├── Performance.js
│   │   ├── Messages.js
│   │   └── Settings.js
│   ├── context/             # State management
│   │   └── VolunteerContext.js
│   └── App.js               # Main app component
└── public/
```

### State Management
- **Context API**: Role-based volunteer data management
- **Isolated State**: Completely separate from Admin Dashboard
- **Real-time Updates**: Availability toggle, notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ installed
- npm or yarn

### Installation
```bash
cd volunteer-dashboard
npm install
```

### Development
```bash
npm start
```
Opens at `http://localhost:3000`

### Production Build
```bash
npm run build
```

## 📊 Features by Page

### Overview
- 4 KPI cards (Engagement, Retention, Training, Feedback)
- Training completion progress bar (52%)
- Volunteer engagement progress bar (52%)
- Status distribution donut chart
- Satisfaction gauge (0-100%)

### My Tasks
- Task statistics (Total, In Progress, Completed, Pending)
- Searchable task list
- Priority badges (High, Medium, Low)
- Progress tracking per task
- Status indicators

### My Activity
- Activity timeline
- Completed tasks
- Training progress
- Team meetings
- Feedback submissions

### Training
- Course cards with progress
- Start/Continue/Review buttons
- Progress bars per course
- Course completion tracking

### Performance
- Tasks completed count
- Achievements earned
- Goals met tracking
- Average rating display

### Messages
- Unread message indicators
- Message list with timestamps
- Sender information
- Subject preview

### Settings
- Profile settings
- Notification preferences
- Privacy controls
- Language selection
- Toggle switches for quick settings

## 🎮 Interactive Features

### Navbar
- **Availability Toggle**: Switch between Online/Offline
- **Notification Bell**: Badge with unread count
- **Profile Section**: Name, role, and avatar
- **Date Display**: Current date with calendar icon

### Sidebar
- **Collapsible**: Click arrow to collapse/expand
- **Active Highlighting**: Green accent for active page
- **7 Navigation Items**: All pages accessible
- **Smooth Transitions**: Animated navigation

## 🎨 Component Highlights

### KPI Cards
- Animated counters
- Trend indicators (↑ ↓)
- Color-coded values
- Hover lift effect

### Progress Bars
- 0% to 100% scale
- Animated fill
- Centered percentage
- Thumb indicator

### Status Distribution
- Donut chart with 4 categories
- Hover tooltips
- Color-coded legend
- Smooth animations

### Satisfaction Gauge
- Semi-circle gauge (0-100%)
- Animated needle
- Color segments (Red, Orange, Green)
- Real-time value display

## 🔧 Technical Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18.x |
| Routing | React Router DOM 6.x |
| Animation | Framer Motion 11.x |
| Charts | Recharts 2.x |
| Icons | Lucide React |
| Styling | CSS3 (Modules) |
| State | Context API |

## 📱 Responsive Design

- **Desktop** (1200px+): Full layout, multi-column grids
- **Tablet** (768px-1199px): 2-column grids, adjusted spacing
- **Mobile** (<768px): Single column, stacked layout

## 🎯 Role-Based Features

### Volunteer-Specific
- Personal task management
- Individual performance tracking
- Training progress
- Availability status
- Personal messages

### Isolated from Admin
- Separate state management
- Different navigation structure
- Volunteer-focused metrics
- Personal activity tracking

## 🔄 Auto-Refresh

- Loading screen on initial load (2 seconds)
- Smooth fade transitions
- Animated logo
- Professional branding

## 💡 Best Practices

### Code Quality
- Functional components with hooks
- Clean, modular architecture
- Reusable components
- Consistent naming conventions
- Proper file organization

### Performance
- Lazy loading ready
- Optimized animations
- Efficient re-renders
- Minimal bundle size

### Accessibility
- Semantic HTML
- ARIA labels ready
- Keyboard navigation ready
- Color contrast compliant

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Docker

## 📝 Environment Variables

Create `.env` file:
```
REACT_APP_API_URL=https://api.vaani.gov.in/volunteer
REACT_APP_WS_URL=wss://ws.vaani.gov.in/volunteer
```

## 🔐 Security

- Role-based access control ready
- JWT token management ready
- Secure API calls ready
- XSS prevention
- CSRF protection ready

## 📊 Metrics

- **Components**: 12 main components
- **Pages**: 7 pages
- **Routes**: 7 functional routes
- **Lines of Code**: ~2,000+
- **Bundle Size**: ~214KB (gzipped)

## 🎓 Usage

### Navigate Between Pages
Click sidebar menu items to navigate

### Toggle Availability
Click Online/Offline button in navbar

### Search Tasks
Use search box in My Tasks page

### Track Progress
View progress bars and charts in Overview

### Manage Settings
Configure preferences in Settings page

## 🐛 Troubleshooting

### Port Already in Use
```bash
PORT=3001 npm start
```

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation

- Clean code with inline comments
- Component-level documentation
- Consistent patterns throughout
- Easy to extend and maintain

## 🎉 Production Ready

✅ Clean architecture
✅ Role-based isolation
✅ Responsive design
✅ Smooth animations
✅ Professional UI
✅ Scalable structure
✅ Performance optimized
✅ Build successful

---

**Built with ❤️ for Vaani Volunteer Platform**

Version: 1.0.0
Last Updated: February 27, 2026
