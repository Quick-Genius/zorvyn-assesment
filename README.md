# FinTrack React Application

A modern React single-page application for financial tracking and management, converted from static HTML pages.

## ✨ New Features

- **🌙 Dark Mode**: Toggle between light and dark themes with persistent preference
- **👥 Role-Based Access**: Switch between Admin and Viewer modes with context-aware UI
- **📊 Interactive Charts**: Recharts-powered visualizations with hover tooltips and responsive design

See [ENHANCEMENTS.md](./frontend/ENHANCEMENTS.md) for detailed feature documentation and [USAGE_GUIDE.md](./frontend/USAGE_GUIDE.md) for usage instructions.

## Features

- **Dashboard Overview**: View balance, income, expenses, and financial statistics
- **Insights Analysis**: Deep dive into spending patterns with visualizations
- **Transactions Management**: View, filter, and add transactions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS and Material Design 3 principles

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and development server
- **React Router v6** - Client-side routing
- **Tailwind CSS v3** - Utility-first CSS framework
- **Material Symbols** - Icon library
- **Recharts** - Interactive charting library
- **Context API** - State management for dark mode and user roles

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

#### Local Development

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit: `http://localhost:3001`

#### Build from Root (for deployment)

If you're deploying from the root directory (e.g., on Vercel):

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

The build output will be in `frontend/dist/`

## Deployment

### Vercel Deployment

This project is configured for Vercel deployment with the following files:

- `vercel.json` - Vercel configuration
- `package.json` (root) - Build scripts for deployment

The configuration automatically:
- Installs dependencies from the `frontend` folder
- Builds the Vite project
- Serves the static files from `frontend/dist`
- Handles client-side routing with rewrites

Simply connect your GitHub repository to Vercel and it will deploy automatically.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/          # Shared layout components (Sidebar, Header)
│   │   ├── dashboard/       # Dashboard page components
│   │   ├── insights/        # Insights page components
│   │   ├── transactions/    # Transactions page components
│   │   └── common/          # Shared components (WealthTicker)
│   ├── pages/               # Page components (Dashboard, Insights, Transactions)
│   ├── data/                # Mock data files
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles and Tailwind imports
├── public/                  # Static assets
├── index.html               # HTML template
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies and scripts
```

## Routes

- `/` - Dashboard Overview
- `/insights` - Financial Insights
- `/transactions` - Transaction History

## Features by Page

### Dashboard (`/`)
- Current balance with card information
- Monthly income and expenses summary
- Financial statistics chart with monthly/weekly toggle
- Expense breakdown donut chart
- Recent transactions list
- Savings optimization banner

### Insights (`/insights`)
- Highest spending category analysis
- Annual cashflow comparison chart
- Spending allocation breakdown
- Actionable financial insights
- Growth forecast and emergency fund metrics

### Transactions (`/transactions`)
- Transaction history table
- Search and filter functionality
- Add new transaction modal
- Pagination controls
- Context-aware interface explanation

## Customization

### Tailwind Theme

The application uses a custom Material Design 3 color palette. You can modify the theme in `tailwind.config.js`.

### Mock Data

All data is currently static and defined in `src/data/` directory:
- `mockFinancials.js` - Balance, income, expenses
- `mockCharts.js` - Chart data for visualizations
- `mockTransactions.js` - Transaction history

To integrate with a real API, replace the mock data imports with API calls.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project was created as part of a conversion from static HTML to React.
