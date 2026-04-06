# Design Document: React FinTrack Conversion

## Overview

This design document outlines the architecture and implementation strategy for converting the FinTrack Finance Dashboard from static HTML pages into a modern React single-page application (SPA). The conversion preserves all existing visual design, styling, and interactive elements while implementing proper component architecture, client-side routing, and state management.

### Goals

- Convert three static HTML pages into a React SPA with proper routing
- Implement reusable component architecture with shared layout components
- Preserve all existing Tailwind CSS styling and Material Design aesthetics
- Maintain responsive design across all breakpoints
- Enable client-side navigation without page reloads
- Set up modern development tooling with Vite

### Non-Goals

- Backend API integration (using static mock data)
- Authentication and authorization logic
- Real-time data updates or WebSocket connections
- Dark mode implementation (UI elements present but non-functional)
- Actual transaction CRUD operations (form UI only)

## Architecture

### Technology Stack

- **Framework**: React 18.x
- **Build Tool**: Vite 5.x (fast development server, optimized builds)
- **Routing**: React Router DOM 6.x
- **Styling**: Tailwind CSS 3.x with custom theme configuration
- **Icons**: Google Material Symbols Outlined
- **Fonts**: Google Fonts (Inter, Manrope)
- **Language**: JavaScript (ES6+) or TypeScript (optional)

### Application Structure

```
fintrack-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Header.jsx
│   │   ├── dashboard/
│   │   │   ├── BalanceCard.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── FinancialChart.jsx
│   │   │   ├── ExpenseDonut.jsx
│   │   │   └── RecentTransactions.jsx
│   │   ├── insights/
│   │   │   ├── SpendingCategory.jsx
│   │   │   ├── CashflowChart.jsx
│   │   │   ├── AllocationDonut.jsx
│   │   │   └── InsightCard.jsx
│   │   ├── transactions/
│   │   │   ├── TransactionTable.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── AddTransactionModal.jsx
│   │   └── common/
│   │       ├── WealthTicker.jsx
│   │       └── Button.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Insights.jsx
│   │   └── Transactions.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

### Routing Architecture

The application uses React Router v6 with a nested route structure:

```
/ (Layout wrapper)
├── / → Dashboard page
├── /insights → Insights page
└── /transactions → Transactions page
```

All routes share the Layout component which contains Sidebar and Header navigation. The Layout component uses `<Outlet />` to render child routes.



## Components and Interfaces

### Core Layout Components

#### Layout Component

**Purpose**: Wrapper component that provides consistent navigation structure across all pages.

**Props**: None (uses React Router's `<Outlet />`)

**Structure**:
```jsx
<div className="min-h-screen bg-background">
  <Sidebar />
  <Header />
  <main className="ml-64 pt-24 pb-12 px-8">
    <Outlet />
  </main>
  <WealthTicker />
</div>
```

**Responsibilities**:
- Render Sidebar and Header components
- Provide main content area with proper spacing (ml-64 for sidebar, pt-24 for header)
- Render child routes via Outlet
- Include WealthTicker footer component

#### Sidebar Component

**Purpose**: Left-side navigation menu with primary navigation links.

**Props**:
```typescript
interface SidebarProps {
  // No props - uses useLocation() hook for active state
}
```

**State**:
- Uses `useLocation()` hook from React Router to determine active route

**Navigation Items**:
- Dashboard (/) - icon: dashboard
- Transactions (/transactions) - icon: receipt_long
- Insights (/insights) - icon: insights
- Settings (non-functional) - icon: settings
- Logout (non-functional) - icon: logout

**Active State Logic**:
```javascript
const location = useLocation();
const isActive = (path) => location.pathname === path;
```

**Styling**:
- Fixed positioning: `fixed left-0 top-0 h-screen w-64`
- Background: `bg-stone-50 dark:bg-stone-950`
- Active link: `text-green-800 font-semibold bg-white shadow-sm rounded-lg`
- Inactive link: `text-stone-500 hover:text-stone-900 hover:translate-x-1 transition-transform`

#### Header Component

**Purpose**: Top navigation bar with horizontal navigation, user controls, and page context.

**Props**:
```typescript
interface HeaderProps {
  pageTitle?: string; // Optional page title override
}
```

**State**:
- Uses `useLocation()` hook for active navigation state
- Local state for user role toggle (Admin/Viewer) - UI only, no functional impact

**Features**:
- FinTrack logo/brand
- Horizontal navigation links (Dashboard, Transactions, Insights)
- User role toggle (Admin/Viewer)
- Dark mode button (UI only)
- Account menu button

**Styling**:
- Fixed positioning: `fixed top-0 right-0 left-64 h-16`
- Backdrop blur: `bg-white/80 backdrop-blur-xl`
- Shadow: `shadow-[0_20px_40px_-12px_rgba(25,28,27,0.06)]`

### Page Components

#### Dashboard Page

**Purpose**: Main dashboard overview displaying financial summary, statistics, and recent activity.

**Component Structure**:
```jsx
<Dashboard>
  <GreetingSection />
  <div className="grid grid-cols-12 gap-8">
    <section className="col-span-8">
      <BalanceCard />
      <div className="grid grid-cols-3 gap-6">
        <StatCard type="income" />
        <StatCard type="expenses" />
      </div>
      <FinancialChart />
      <OptimizationBanner />
    </section>
    <aside className="col-span-4">
      <ExpenseDonut />
      <RecentTransactions />
    </aside>
  </div>
</Dashboard>
```

**Sub-components**:

1. **BalanceCard**: Displays current balance with card number and action buttons
   - Props: `{ balance, cardNumber, changePercent }`
   - Features: Send Money and Request buttons

2. **StatCard**: Reusable card for income/expenses with progress bar
   - Props: `{ type, amount, previousAmount, label }`
   - Variants: income (green accent), expenses (tertiary accent)

3. **FinancialChart**: Bar chart visualization with monthly/weekly toggle
   - Props: `{ data, period }`
   - State: Selected period (monthly/weekly)
   - Renders: Fake chart bars with grid lines, average calculations

4. **ExpenseDonut**: Multi-ring donut chart showing expense breakdown
   - Props: `{ categories }`
   - Renders: SVG donut chart with legend

5. **RecentTransactions**: List of recent transaction items
   - Props: `{ transactions }`
   - Displays: Avatar, description, category, amount

#### Insights Page

**Purpose**: Deep dive into spending patterns with visualizations and actionable insights.

**Component Structure**:
```jsx
<Insights>
  <PageHeader title="Financial Insights" />
  <div className="grid grid-cols-12 gap-6">
    <SpendingCategory className="col-span-4" />
    <CashflowChart className="col-span-8" />
    <AllocationDonut className="col-span-4" />
    <InsightCallout className="col-span-8" />
    <div className="col-span-12 grid grid-cols-3 gap-6">
      <InsightCard type="growth" />
      <InsightCard type="emergency" />
      <InsightCard type="daily" />
    </div>
  </div>
</Insights>
```

**Sub-components**:

1. **SpendingCategory**: Highest spending category with progress indicator
   - Props: `{ category, amount, budgetPercent, insight }`
   - Features: Icon, amount, progress bar, AI insight text

2. **CashflowChart**: Annual bar chart comparing income vs expenses
   - Props: `{ monthlyData }`
   - Renders: 12 months of dual-bar chart data

3. **AllocationDonut**: Pie chart showing spending allocation
   - Props: `{ allocations }`
   - Renders: SVG donut with percentage breakdown

4. **InsightCallout**: Prominent CTA card with actionable insight
   - Props: `{ title, message, actionLabel }`
   - Styling: Gradient background, decorative blur element

5. **InsightCard**: Small metric card with icon and description
   - Props: `{ icon, label, value, description }`
   - Variants: growth, emergency, daily spend

#### Transactions Page

**Purpose**: Transaction history table with filtering, sorting, and add functionality.

**Component Structure**:
```jsx
<Transactions>
  <PageHeader 
    title="Transaction History"
    action={<AddButton onClick={openModal} />}
  />
  <FilterBar 
    onSearch={handleSearch}
    onCategoryChange={handleCategory}
    onTypeChange={handleType}
    onSortChange={handleSort}
  />
  <TransactionTable transactions={filteredTransactions} />
  <Pagination 
    currentPage={page}
    totalPages={totalPages}
    onPageChange={setPage}
  />
  {isModalOpen && (
    <AddTransactionModal 
      onClose={closeModal}
      onSubmit={handleAddTransaction}
    />
  )}
</Transactions>
```

**Sub-components**:

1. **FilterBar**: Search and filter controls
   - Props: `{ onSearch, onCategoryChange, onTypeChange, onSortChange }`
   - Features: Search input, category dropdown, type dropdown, sort toggle

2. **TransactionTable**: Data table with transaction rows
   - Props: `{ transactions }`
   - Columns: Date, Description, Category, Type, Amount
   - Features: Hover effects, color-coded amounts (green for income, red for expenses)

3. **AddTransactionModal**: Modal form for adding transactions
   - Props: `{ isOpen, onClose, onSubmit }`
   - State: Form fields (date, amount, category, type, description)
   - Features: Controlled inputs, validation, backdrop click to close

### Common Components

#### WealthTicker

**Purpose**: Floating ticker ribbon showing market data.

**Props**:
```typescript
interface WealthTickerProps {
  items: Array<{
    symbol: string;
    value: string;
    change: string;
    changeType: 'up' | 'down' | 'neutral';
  }>;
}
```

**Styling**:
- Fixed positioning: `fixed bottom-0 left-64 right-0 h-12`
- Backdrop blur: `bg-white/60 backdrop-blur-md`
- Scrolling animation (CSS or JavaScript-based)

#### Button Component

**Purpose**: Reusable button with consistent styling variants.

**Props**:
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  icon?: string; // Material icon name
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
```

**Variants**:
- Primary: `bg-gradient-to-br from-primary to-primary-container text-white`
- Secondary: `bg-secondary text-on-secondary`
- Outline: `border border-outline-variant text-on-surface`
- Ghost: `text-on-surface hover:bg-surface-container-low`



## Data Models

### Mock Data Structure

Since this is a frontend-only conversion, all data will be defined as static mock data in JavaScript/JSON format.

#### Transaction Model

```typescript
interface Transaction {
  id: string;
  date: string; // ISO date string
  description: string;
  merchant: string;
  category: 'Shopping' | 'Income' | 'Groceries' | 'Travel' | 'Dining' | 'Entertainment' | 'Utilities';
  type: 'income' | 'expense';
  amount: number; // Positive number, sign determined by type
}
```

**Example**:
```javascript
{
  id: 'txn_001',
  date: '2023-10-24',
  description: 'Apple Store - Union Square',
  merchant: 'Apple Store',
  category: 'Shopping',
  type: 'expense',
  amount: 1299.00
}
```

#### Financial Summary Model

```typescript
interface FinancialSummary {
  balance: number;
  cardNumber: string; // Masked format: "**** **** **** 8824"
  balanceChange: number; // Percentage
  monthlyIncome: number;
  previousIncome: number;
  monthlyExpenses: number;
  previousExpenses: number;
}
```

#### Chart Data Model

```typescript
interface MonthlyData {
  month: string; // 'Jan', 'Feb', etc.
  income: number;
  expenses: number;
}

interface ExpenseCategory {
  name: string;
  percentage: number;
  color: string; // Tailwind color class
  amount: number;
}
```

#### Market Ticker Model

```typescript
interface MarketItem {
  symbol: string; // 'BTC/USD', 'AAPL', etc.
  value: string; // Formatted price
  change: string; // '+2.4%', '-0.8%'
  changeType: 'up' | 'down' | 'neutral';
}
```

### Data Location

Mock data will be stored in:
- `src/data/mockTransactions.js` - Transaction history
- `src/data/mockFinancials.js` - Financial summary data
- `src/data/mockCharts.js` - Chart data for visualizations
- `src/data/mockMarket.js` - Market ticker data

This approach allows easy replacement with API calls in the future without changing component interfaces.

## State Management

### Approach

For this application, we'll use **React's built-in state management** (useState, useContext) rather than external libraries like Redux or Zustand. The application is relatively simple with minimal shared state.

### State Categories

#### 1. Local Component State (useState)

Used for UI-specific state that doesn't need to be shared:

- Modal open/closed state
- Form input values
- Dropdown selections
- Active tab/period selections
- Hover states

**Example**:
```javascript
const [isModalOpen, setIsModalOpen] = useState(false);
const [formData, setFormData] = useState({
  date: '',
  amount: '',
  category: '',
  type: 'expense',
  description: ''
});
```

#### 2. URL State (React Router)

Navigation state managed by React Router:

- Current route/page
- Active navigation item
- Route parameters (if needed for future expansion)

**Example**:
```javascript
const location = useLocation();
const navigate = useNavigate();
```

#### 3. Shared Application State (useContext - Optional)

For state that needs to be shared across multiple components:

- User role (Admin/Viewer)
- Theme preference (light/dark)
- Filter/search state across pages

**Example Context**:
```javascript
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('admin');
  const [theme, setTheme] = useState('light');
  
  return (
    <AppContext.Provider value={{ userRole, setUserRole, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};
```

### State Management Patterns

#### Form State Management

Use controlled components with useState:

```javascript
const [formData, setFormData] = useState(initialState);

const handleChange = (field) => (e) => {
  setFormData(prev => ({
    ...prev,
    [field]: e.target.value
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Process form data
  onSubmit(formData);
};
```

#### Filter State Management

Manage filters locally in the Transactions page:

```javascript
const [filters, setFilters] = useState({
  search: '',
  category: 'all',
  type: 'all',
  sortBy: 'date',
  sortOrder: 'desc'
});

const filteredTransactions = useMemo(() => {
  return transactions
    .filter(txn => {
      if (filters.search && !txn.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.category !== 'all' && txn.category !== filters.category) {
        return false;
      }
      if (filters.type !== 'all' && txn.type !== filters.type) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort logic based on filters.sortBy and filters.sortOrder
    });
}, [transactions, filters]);
```

#### Modal State Management

Simple boolean state with open/close handlers:

```javascript
const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => setIsModalOpen(true);
const closeModal = () => {
  setIsModalOpen(false);
  setFormData(initialFormState); // Reset form
};
```



## Tailwind CSS Configuration

### Custom Theme Configuration

The application uses a custom Tailwind theme that extends the default configuration with Material Design 3 color tokens and custom typography.

#### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Material Design 3 Color Tokens
        "on-tertiary-fixed": "#3f001c",
        "inverse-surface": "#2e3130",
        "primary-fixed-dim": "#88d982",
        "error": "#ba1a1a",
        "background": "#f8faf8",
        "primary-fixed": "#a3f69c",
        "primary": "#0d631b",
        "on-background": "#191c1b",
        "surface": "#f8faf8",
        "on-primary-fixed-variant": "#005312",
        "error-container": "#ffdad6",
        "on-secondary-fixed-variant": "#304e2e",
        "secondary-fixed-dim": "#add0a6",
        "on-primary-fixed": "#002204",
        "outline": "#707a6c",
        "on-primary": "#ffffff",
        "inverse-on-surface": "#eff1ef",
        "surface-container-lowest": "#ffffff",
        "outline-variant": "#bfcaba",
        "on-primary-container": "#cbffc2",
        "secondary-container": "#c6e9be",
        "secondary": "#476644",
        "surface-variant": "#e1e3e1",
        "surface-dim": "#d8dad9",
        "on-surface-variant": "#40493d",
        "on-secondary-fixed": "#052106",
        "tertiary": "#923357",
        "tertiary-container": "#b14b6f",
        "surface-tint": "#1b6d24",
        "surface-container": "#eceeec",
        "surface-container-low": "#f2f4f2",
        "surface-bright": "#f8faf8",
        "on-tertiary": "#ffffff",
        "on-error-container": "#93000a",
        "surface-container-high": "#e7e9e7",
        "tertiary-fixed": "#ffd9e2",
        "primary-container": "#2e7d32",
        "tertiary-fixed-dim": "#ffb1c7",
        "surface-container-highest": "#e1e3e1",
        "on-tertiary-container": "#ffedf0",
        "on-secondary-container": "#4c6a48",
        "on-secondary": "#ffffff",
        "secondary-fixed": "#c9ecc1",
        "on-surface": "#191c1b",
        "on-error": "#ffffff",
        "inverse-primary": "#88d982",
        "on-tertiary-fixed-variant": "#7f2448"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"]
      },
      boxShadow: {
        'editorial': '0 20px 40px -12px rgba(25, 28, 27, 0.06)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

### Custom CSS Classes

Additional custom styles in `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Material Icons Configuration */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Custom Utility Classes */
@layer utilities {
  .editorial-shadow {
    box-shadow: 0 20px 40px -12px rgba(25, 28, 27, 0.06);
  }
  
  .mask-card {
    background: linear-gradient(135deg, #0d631b 0%, #2e7d32 100%);
  }
}

/* Base Styles */
@layer base {
  body {
    @apply font-body text-on-surface antialiased bg-background;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-headline;
  }
}
```

### Font Integration

Fonts are loaded via Google Fonts CDN in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
```

### Responsive Design Strategy

The application uses Tailwind's responsive prefixes consistently:

- **Mobile-first approach**: Base styles apply to mobile, then override with breakpoints
- **Breakpoints**:
  - `sm:` - 640px and up
  - `md:` - 768px and up
  - `lg:` - 1024px and up
  - `xl:` - 1280px and up

**Example responsive grid**:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

### Color Usage Guidelines

- **Primary colors** (`primary`, `primary-container`): Main actions, income, positive changes
- **Secondary colors** (`secondary`, `secondary-container`): Supporting elements, neutral states
- **Tertiary colors** (`tertiary`, `tertiary-container`): Expenses, warnings, negative changes
- **Surface colors** (`surface-*`): Backgrounds, cards, containers
- **Outline colors** (`outline`, `outline-variant`): Borders, dividers
- **On-* colors**: Text colors that sit on top of their corresponding background



## Build Tool Setup (Vite)

### Why Vite?

Vite is chosen over Create React App for several advantages:

- **Fast development server**: Instant server start with native ES modules
- **Lightning-fast HMR**: Hot Module Replacement without full page reloads
- **Optimized builds**: Uses Rollup for production with automatic code splitting
- **Modern by default**: Native ESM, TypeScript support out of the box
- **Smaller bundle sizes**: Better tree-shaking and optimization

### Project Initialization

```bash
npm create vite@latest fintrack-react -- --template react
cd fintrack-react
npm install
```

### Dependencies

**Core dependencies**:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  }
}
```

**Development dependencies**:
```json
{
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "@tailwindcss/forms": "^0.5.7",
    "vite": "^5.0.8"
  }
}
```

### vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@data': path.resolve(__dirname, './src/data'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
```

### PostCSS Configuration

**postcss.config.js**:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Package Scripts

**package.json scripts**:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

### Environment Configuration

**.env.example**:
```
VITE_APP_TITLE=FinTrack
VITE_API_URL=http://localhost:3001/api
```

Environment variables in Vite must be prefixed with `VITE_` to be exposed to the client.

### Development Workflow

1. **Start development server**:
   ```bash
   npm run dev
   ```
   - Server runs on http://localhost:3000
   - Hot Module Replacement enabled
   - Fast refresh for React components

2. **Build for production**:
   ```bash
   npm run build
   ```
   - Outputs to `dist/` directory
   - Minified and optimized
   - Source maps generated

3. **Preview production build**:
   ```bash
   npm run preview
   ```
   - Serves the production build locally
   - Test before deployment

### Code Splitting Strategy

Vite automatically code-splits by route when using React Router with lazy loading:

```javascript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Insights = lazy(() => import('./pages/Insights'));
const Transactions = lazy(() => import('./pages/Transactions'));

// In router configuration
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/insights" element={<Insights />} />
    <Route path="/transactions" element={<Transactions />} />
  </Routes>
</Suspense>
```

This creates separate chunks for each page, loaded on-demand.



## Error Handling

### Error Boundaries

Implement React Error Boundaries to catch and handle component errors gracefully.

**ErrorBoundary Component**:
```javascript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service in production
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8">
            <span className="material-symbols-outlined text-6xl text-error mb-4">
              error
            </span>
            <h1 className="text-2xl font-headline font-bold text-on-surface mb-2">
              Something went wrong
            </h1>
            <p className="text-stone-500 mb-6">
              We're sorry for the inconvenience. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-white rounded-lg font-bold"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Usage**:
```javascript
// Wrap the entire app
<ErrorBoundary>
  <App />
</ErrorBoundary>

// Or wrap individual routes
<Route 
  path="/transactions" 
  element={
    <ErrorBoundary>
      <Transactions />
    </ErrorBoundary>
  } 
/>
```

### Form Validation

Implement client-side validation for the Add Transaction form:

```javascript
const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.date) {
    errors.date = 'Date is required';
  }
  
  if (!formData.amount || formData.amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }
  
  if (!formData.category) {
    errors.category = 'Category is required';
  }
  
  if (!formData.description || formData.description.trim().length < 3) {
    errors.description = 'Description must be at least 3 characters';
  }
  
  return errors;
};

// In component
const [errors, setErrors] = useState({});

const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validateForm(formData);
  
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  
  // Process valid form
  onSubmit(formData);
  closeModal();
};
```

### Route Error Handling

Handle 404 and invalid routes:

```javascript
// In App.jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="insights" element={<Insights />} />
    <Route path="transactions" element={<Transactions />} />
    <Route path="*" element={<NotFound />} />
  </Route>
</Routes>

// NotFound component
const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <span className="material-symbols-outlined text-8xl text-stone-300 mb-4">
        search_off
      </span>
      <h1 className="text-3xl font-headline font-bold mb-2">Page Not Found</h1>
      <p className="text-stone-500 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-primary text-white rounded-lg font-bold"
      >
        Go to Dashboard
      </button>
    </div>
  );
};
```

### Loading States

Implement loading states for lazy-loaded components:

```javascript
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
  </div>
);

// Usage with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    {/* Routes */}
  </Routes>
</Suspense>
```

### Console Error Suppression

In production, suppress console errors and warnings:

```javascript
// In main.jsx for production
if (import.meta.env.PROD) {
  console.error = () => {};
  console.warn = () => {};
}
```



## Testing Strategy

### Testing Approach

This React application conversion focuses on UI components, routing, and visual consistency. The testing strategy emphasizes:

1. **Component rendering tests** - Verify components render without errors
2. **Integration tests** - Test routing and navigation flows
3. **Visual regression tests** - Ensure styling matches original HTML
4. **Accessibility tests** - Verify ARIA labels and keyboard navigation

### Testing Tools

**Recommended testing stack**:
- **Vitest**: Fast unit test runner (Vite-native alternative to Jest)
- **React Testing Library**: Component testing with user-centric queries
- **@testing-library/user-event**: Simulate user interactions
- **@testing-library/jest-dom**: Custom matchers for DOM assertions

**Installation**:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**vitest.config.js**:
```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
  },
});
```

**src/test/setup.js**:
```javascript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
```

### Unit Tests

#### Component Rendering Tests

Test that components render without crashing and display expected content:

```javascript
// Sidebar.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Sidebar from '../components/layout/Sidebar';

describe('Sidebar Component', () => {
  it('renders FinTrack logo', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(screen.getByText('FinTrack')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('Insights')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('applies active styling to current route', () => {
    render(
      <BrowserRouter initialEntries={['/insights']}>
        <Sidebar />
      </BrowserRouter>
    );
    const insightsLink = screen.getByText('Insights').closest('a');
    expect(insightsLink).toHaveClass('text-green-800');
  });
});
```

#### Form Validation Tests

Test form validation logic:

```javascript
// AddTransactionModal.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AddTransactionModal from '../components/transactions/AddTransactionModal';

describe('AddTransactionModal', () => {
  it('shows validation errors for empty required fields', async () => {
    const onSubmit = vi.fn();
    render(<AddTransactionModal isOpen={true} onSubmit={onSubmit} />);
    
    const submitButton = screen.getByText('Record Transaction');
    await userEvent.click(submitButton);
    
    expect(screen.getByText('Date is required')).toBeInTheDocument();
    expect(screen.getByText('Amount must be greater than 0')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    const onSubmit = vi.fn();
    render(<AddTransactionModal isOpen={true} onSubmit={onSubmit} />);
    
    await userEvent.type(screen.getByLabelText('Date'), '2023-10-25');
    await userEvent.type(screen.getByLabelText('Amount'), '150.00');
    await userEvent.selectOptions(screen.getByLabelText('Category'), 'Dining');
    await userEvent.type(screen.getByLabelText('Description'), 'Lunch at restaurant');
    
    await userEvent.click(screen.getByText('Record Transaction'));
    
    expect(onSubmit).toHaveBeenCalledWith({
      date: '2023-10-25',
      amount: 150.00,
      category: 'Dining',
      type: 'expense',
      description: 'Lunch at restaurant'
    });
  });
});
```

### Integration Tests

#### Routing Tests

Test navigation between pages:

```javascript
// App.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Routing', () => {
  it('navigates to Dashboard by default', () => {
    render(<App />);
    expect(screen.getByText('Good morning, User')).toBeInTheDocument();
  });

  it('navigates to Insights page when clicking Insights link', async () => {
    render(<App />);
    const insightsLink = screen.getByRole('link', { name: /insights/i });
    await userEvent.click(insightsLink);
    expect(screen.getByText('Financial Insights')).toBeInTheDocument();
  });

  it('navigates to Transactions page when clicking Transactions link', async () => {
    render(<App />);
    const transactionsLink = screen.getByRole('link', { name: /transactions/i });
    await userEvent.click(transactionsLink);
    expect(screen.getByText('Transaction History')).toBeInTheDocument();
  });

  it('redirects to Dashboard for invalid routes', () => {
    window.history.pushState({}, '', '/invalid-route');
    render(<App />);
    expect(screen.getByText('Good morning, User')).toBeInTheDocument();
  });
});
```

### Snapshot Tests

Use snapshot testing to catch unintended visual changes:

```javascript
// Dashboard.test.jsx
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

describe('Dashboard Snapshot', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
```

### Accessibility Tests

Verify accessibility compliance:

```javascript
// Sidebar.test.jsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';

expect.extend(toHaveNoViolations);

describe('Sidebar Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Test Coverage Goals

- **Component rendering**: 100% of components should have basic render tests
- **User interactions**: All interactive elements (buttons, links, forms) should be tested
- **Routing**: All routes and navigation flows should be tested
- **Form validation**: All validation rules should be tested
- **Error boundaries**: Error states should be tested

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test Sidebar.test.jsx
```

**package.json scripts**:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Manual Testing Checklist

In addition to automated tests, perform manual testing for:

- [ ] Visual comparison with original HTML pages (side-by-side)
- [ ] Responsive design at different breakpoints (mobile, tablet, desktop)
- [ ] Browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Screen reader compatibility (NVDA, JAWS, VoiceOver)
- [ ] Performance (Lighthouse score, bundle size)
- [ ] Hover states and transitions
- [ ] Modal interactions (open, close, backdrop click)
- [ ] Form submission and validation feedback



## Implementation Plan

### Phase 1: Project Setup and Configuration

**Objective**: Initialize the React project with all necessary dependencies and configuration.

**Tasks**:
1. Create new Vite React project
2. Install dependencies (React Router, Tailwind CSS, etc.)
3. Configure Tailwind with custom theme
4. Set up PostCSS configuration
5. Configure Vite with path aliases
6. Add Google Fonts and Material Icons to index.html
7. Create basic folder structure
8. Set up ESLint and Prettier (optional)

**Deliverables**:
- Working development server
- Tailwind CSS configured with custom theme
- Project structure in place

**Estimated Time**: 2-3 hours

### Phase 2: Layout Components

**Objective**: Build the shared layout components that wrap all pages.

**Tasks**:
1. Create Layout component with Outlet
2. Build Sidebar component with navigation links
3. Build Header component with top navigation
4. Implement WealthTicker footer component
5. Add active link styling using useLocation
6. Test navigation between placeholder pages

**Deliverables**:
- Functional Layout, Sidebar, and Header components
- Working navigation with active states
- Responsive layout matching original HTML

**Estimated Time**: 4-6 hours

### Phase 3: Dashboard Page

**Objective**: Convert the dashboard overview page to React components.

**Tasks**:
1. Create Dashboard page component
2. Build BalanceCard component
3. Build StatCard component (reusable for income/expenses)
4. Build FinancialChart component with fake chart bars
5. Build ExpenseDonut component with SVG donut chart
6. Build RecentTransactions component
7. Build OptimizationBanner component
8. Create mock data for dashboard
9. Implement responsive grid layout
10. Test all interactive elements (hover states, buttons)

**Deliverables**:
- Complete Dashboard page matching original HTML
- All sub-components functional
- Mock data integrated

**Estimated Time**: 8-10 hours

### Phase 4: Insights Page

**Objective**: Convert the insights analysis page to React components.

**Tasks**:
1. Create Insights page component
2. Build SpendingCategory component with progress bar
3. Build CashflowChart component with 12-month bar chart
4. Build AllocationDonut component with SVG pie chart
5. Build InsightCallout component with gradient background
6. Build InsightCard component (reusable for 3 metrics)
7. Create mock data for insights
8. Implement bento grid layout
9. Test responsive behavior

**Deliverables**:
- Complete Insights page matching original HTML
- All visualization components functional
- Mock data integrated

**Estimated Time**: 6-8 hours

### Phase 5: Transactions Page

**Objective**: Convert the transactions admin view page to React components.

**Tasks**:
1. Create Transactions page component
2. Build FilterBar component with search and filters
3. Build TransactionTable component
4. Build AddTransactionModal component
5. Implement modal open/close state management
6. Implement form validation
7. Implement filter logic (search, category, type, sort)
8. Build Pagination component
9. Create mock transaction data
10. Test table interactions and modal behavior

**Deliverables**:
- Complete Transactions page matching original HTML
- Functional filter and search
- Working modal with form validation
- Mock data integrated

**Estimated Time**: 8-10 hours

### Phase 6: Polish and Refinement

**Objective**: Ensure all details match the original HTML and fix any issues.

**Tasks**:
1. Side-by-side comparison with original HTML pages
2. Fix any styling discrepancies
3. Verify all hover states and transitions
4. Test responsive design at all breakpoints
5. Optimize performance (code splitting, lazy loading)
6. Add loading states for lazy-loaded routes
7. Implement error boundaries
8. Add 404 page for invalid routes
9. Test keyboard navigation
10. Run accessibility audit

**Deliverables**:
- Pixel-perfect match with original HTML
- All interactions working smoothly
- Optimized performance
- Accessibility compliance

**Estimated Time**: 4-6 hours

### Phase 7: Testing and Documentation

**Objective**: Write tests and document the codebase.

**Tasks**:
1. Set up Vitest and React Testing Library
2. Write component render tests
3. Write routing integration tests
4. Write form validation tests
5. Add snapshot tests for pages
6. Run accessibility tests
7. Write README with setup instructions
8. Document component props and usage
9. Create deployment guide

**Deliverables**:
- Comprehensive test suite
- Documentation for developers
- Deployment-ready application

**Estimated Time**: 6-8 hours

### Total Estimated Time

**38-51 hours** (approximately 1-1.5 weeks for a single developer)

### Milestones

1. **Week 1, Day 1-2**: Project setup and layout components (Phases 1-2)
2. **Week 1, Day 3-4**: Dashboard page (Phase 3)
3. **Week 1, Day 5**: Insights page (Phase 4)
4. **Week 2, Day 1-2**: Transactions page (Phase 5)
5. **Week 2, Day 3**: Polish and refinement (Phase 6)
6. **Week 2, Day 4-5**: Testing and documentation (Phase 7)

### Risk Mitigation

**Potential Risks**:
1. **SVG chart complexity**: The donut charts use complex SVG paths
   - Mitigation: Extract SVG code directly from HTML, test thoroughly
   
2. **Tailwind class conflicts**: Custom theme may conflict with default classes
   - Mitigation: Test theme configuration early, use Tailwind's JIT mode
   
3. **Responsive breakpoints**: Grid layouts may break at certain sizes
   - Mitigation: Test at all breakpoints during development
   
4. **Performance with large datasets**: Transaction table may lag with many rows
   - Mitigation: Implement pagination, consider virtualization for future

### Success Criteria

The conversion is successful when:
- [ ] All three pages render identically to original HTML
- [ ] Navigation works smoothly with proper active states
- [ ] All interactive elements (buttons, links, modals) function correctly
- [ ] Responsive design works at mobile, tablet, and desktop sizes
- [ ] Form validation provides clear feedback
- [ ] No console errors or warnings
- [ ] Lighthouse performance score > 90
- [ ] All automated tests pass
- [ ] Accessibility audit shows no critical issues



## Summary

This design document provides a comprehensive blueprint for converting the FinTrack Finance Dashboard from static HTML pages into a modern React single-page application. The conversion maintains 100% visual fidelity with the original design while implementing proper React architecture patterns.

### Key Design Decisions

1. **Vite over Create React App**: Chosen for faster development experience and optimized production builds

2. **React Router v6**: Modern routing with nested routes and shared layouts

3. **Component-based architecture**: Modular, reusable components organized by feature (dashboard, insights, transactions)

4. **Tailwind CSS with custom theme**: Preserves exact Material Design 3 color system and typography from original HTML

5. **Mock data approach**: Static data files that can easily be replaced with API calls in the future

6. **Built-in state management**: Uses React hooks (useState, useContext) instead of external libraries for simplicity

7. **Lazy loading**: Route-based code splitting for optimal performance

8. **Comprehensive testing**: Unit tests, integration tests, and accessibility tests using Vitest and React Testing Library

### Architecture Highlights

- **Shared Layout Pattern**: Sidebar and Header components wrap all pages via React Router's Outlet
- **Responsive-first**: Mobile-first Tailwind approach with consistent breakpoints
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support
- **Error Handling**: Error boundaries, form validation, 404 handling
- **Performance**: Code splitting, optimized builds, minimal bundle size

### Next Steps

After design approval, proceed to implementation following the 7-phase plan outlined in the Implementation Plan section. The estimated timeline is 1-1.5 weeks for a single developer, with clear milestones and success criteria defined.

