# FinTrack Usage Guide

## Quick Start

### Accessing the Application

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to: `http://localhost:3001`

## Feature Guide

### 🌙 Dark Mode

**Location:** Top-right corner of the header

**How to Use:**
1. Look for the moon/sun icon in the header
2. Click the icon to toggle between light and dark mode
3. Your preference is automatically saved

**What Changes:**
- Background colors become darker
- Text colors adjust for readability
- Charts adapt their colors
- All UI elements maintain contrast

**Tip:** Dark mode is great for:
- Reducing eye strain in low-light environments
- Saving battery on OLED screens
- Personal preference

---

### 👥 Admin/Viewer Role Toggle

**Location:** Top-right corner of the header (left of dark mode toggle)

**How to Use:**
1. Find the "Admin" and "Viewer" buttons in the header
2. Click either button to switch roles
3. The active role is highlighted in color

**Role Differences:**

**Admin Mode (Green highlight):**
- ✅ View all pages
- ✅ See all data
- ✅ Add new transactions
- ✅ Full access to features

**Viewer Mode (Secondary color highlight):**
- ✅ View all pages
- ✅ See all data
- ❌ Cannot add transactions
- ℹ️ Read-only access

**Where It Matters:**
- **Transactions Page**: "Add Transaction" button only visible in Admin mode
- **Context Section**: Shows which mode is active

---

### 📊 Interactive Charts

**Location:** Dashboard page, Financial Statistics section

**Features:**

**1. Hover Tooltips**
- Hover over any bar to see exact values
- Shows both Income and Expenses for that month
- Formatted with currency

**2. Period Toggle**
- Switch between "Monthly" and "Weekly" views
- Located at the top-right of the chart
- Data updates accordingly

**3. Legend**
- Green circles = Income
- Red circles = Expenses
- Click legend items to show/hide data (Recharts feature)

**4. Average Display**
- Below the chart
- Shows average income and expenses
- Updates based on visible data

**Chart Interactions:**
- **Hover**: See detailed values
- **Click Legend**: Toggle data series
- **Responsive**: Adapts to screen size

---

## Navigation

### Main Pages

**Dashboard (/):**
- Financial overview
- Balance and account summary
- Income/Expenses cards
- Interactive chart
- Expense breakdown
- Recent transactions

**Insights (/insights):**
- Spending analysis
- Annual cashflow
- Allocation breakdown
- Financial tips
- Growth metrics

**Transactions (/transactions):**
- Transaction history table
- Search and filter
- Add transactions (Admin only)
- Pagination

### Sidebar Navigation

**Active Page Indicator:**
- Green background
- Bold text
- Shadow effect

**Hover Effects:**
- Links slide right slightly
- Color changes

---

## Tips & Tricks

### Keyboard Navigation
- Use Tab to navigate between interactive elements
- Enter to activate buttons
- Escape to close modals

### Search & Filter (Transactions)
1. **Search**: Type in the search box to filter by description
2. **Category**: Select from dropdown to filter by category
3. **Type**: Filter by Income or Expense
4. **Sort**: Click sort button to change order

### Adding Transactions (Admin Only)
1. Click "+ Add Transaction" button
2. Fill in the form:
   - Date (required)
   - Amount (required)
   - Category (dropdown)
   - Type (Income/Expense toggle)
   - Description (optional)
3. Click "Record Transaction" or "Cancel"

### Data Persistence
- Dark mode preference: Saved automatically
- User role: Saved automatically
- Persists across browser sessions
- Stored in browser's localStorage

---

## Troubleshooting

### Dark Mode Not Working?
- Check if your browser supports localStorage
- Try clearing browser cache
- Refresh the page

### Role Toggle Not Saving?
- Ensure localStorage is enabled
- Check browser privacy settings
- Try a different browser

### Charts Not Loading?
- Check internet connection (for fonts/icons)
- Refresh the page
- Clear browser cache

### Performance Issues?
- Close unused browser tabs
- Disable browser extensions
- Check system resources

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Navigate links | Tab |
| Activate button | Enter |
| Close modal | Escape |
| Toggle dark mode | Click icon |
| Switch role | Click button |

---

## Best Practices

### For Admins:
- Review transactions regularly
- Use filters to find specific entries
- Add transactions promptly
- Monitor spending patterns

### For Viewers:
- Use Insights page for analysis
- Export data if needed (future feature)
- Review charts for trends
- Check recent transactions

### General:
- Choose dark mode for comfort
- Use appropriate role for your needs
- Explore all three pages
- Hover over charts for details

---

## Support

For issues or questions:
1. Check this guide first
2. Review the README.md
3. Check ENHANCEMENTS.md for technical details
4. Contact your administrator

---

## What's Next?

Upcoming features:
- Export transactions to CSV
- Custom date ranges
- More chart types
- Budget tracking
- Notifications
- Multi-currency support

Stay tuned for updates!
