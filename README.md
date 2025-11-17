# FitTrack Pro 🏃‍♂️💪

A modern fitness tracking web application that helps you monitor your daily wellness goals, track activities, plan meals, and visualize your progress through interactive charts.

**Live Demo:** [https://kartikbansal4976.github.io/](https://kartikbansal4976.github.io/)

![FitTrack Pro](https://img.shields.io/badge/status-live-success)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38bdf8)

---

## What is FitTrack Pro?

FitTrack Pro is a personal wellness companion that makes health tracking simple and engaging. Whether you're trying to hit your daily step goals, monitor calorie intake, or stay hydrated, this app provides an intuitive dashboard to keep you on track.

I built this project to explore modern web technologies while creating something genuinely useful for everyday life. The focus was on clean UI design, smooth interactions, and making data visualization both informative and beautiful.

---

## Key Features

### 🎯 Daily Wellness Overview
- Track steps, calories burned, and water intake
- Set personalized daily goals
- View real-time progress with circular progress indicators
- Beautiful gradient cards with hover effects

### 📊 Activity Log
- Log different types of workouts (Running, Cycling, Gym, Yoga, Swimming, Walking)
- Record duration, distance, and calories for each activity
- Edit or delete past activities
- Clean, organized view of your exercise history

### 🍎 Meal Planner
- Plan meals throughout the day (Breakfast, Lunch, Dinner, Snacks)
- Track nutritional information (Calories, Protein, Carbs, Fats)
- Add, edit, and remove meal entries
- Organize meals by time of day

### 📈 Interactive Insights
- Weekly activity visualization with bar charts
- Calorie burn trends over the week
- Time-based activity breakdown (Morning, Afternoon, Evening, Night)
- Hover effects showing detailed data points
- Aggregated statistics from your activity log

### 🏠 Informative Home Page
- Health facts and WHO exercise guidelines
- Benefits of regular fitness tracking
- Daily wellness tips
- Modern, engaging design with gradient banners

---

## Technology Stack

### Frontend Framework
- **React 18** - Component-based UI with functional components and hooks
- **TypeScript** - Type-safe code for better development experience
- **Vite** - Lightning-fast build tool and dev server

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- Custom gradients and animations
- Fully responsive design (mobile, tablet, desktop)

### Icons & UI Components
- **Lucide React** - Beautiful, consistent icon library
- Custom circular progress components
- Modal dialogs for forms and confirmations

### Authentication
- **Clerk** - Secure user authentication
- Sign up / Sign in flows
- User profile management
- Session handling

### Data Storage
- **localStorage** - Client-side data persistence
- No backend required for demo purposes
- Data survives page refreshes
- Easy to expand to a real database later

---

## How It Works

### Authentication Flow
The app uses Clerk for user authentication. When you first visit:

1. You can browse the home page without signing in
2. To access the dashboard features, click "Sign In" in the top right
3. Clerk provides a secure authentication modal
4. Choose to sign in with email or OAuth providers
5. Once authenticated, you get full access to all features

The authentication state is managed by Clerk's React SDK, which handles:
- User sessions
- Token management
- Protected routes
- Sign in/out functionality

### Data Management
All your fitness data is stored locally in your browser using localStorage:

```typescript
// Data structure
WellnessData {
  steps: number
  stepsGoal: number
  calories: number
  caloriesGoal: number
  water: number
  waterGoal: number
}

Activity {
  id: string
  type: string
  duration: number
  distance?: number
  calories: number
  date: string
}

Meal {
  id: string
  name: string
  time: string
  calories: number
  protein: number
  carbs: number
  fats: number
}
```

### Navigation
- Single-page application with client-side routing
- Navigation handled via React state management
- Smooth transitions between pages
- Click the logo to return home anytime

### Data Visualization
The Insights page processes your activity data:
1. Reads all activities from localStorage
2. Groups them by day of week
3. Calculates totals for each day
4. Renders interactive bar charts with gradients
5. Shows empty states for days with no data

---

## Project Structure

```
project/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CircularProgress.tsx    # Progress ring component
│   │   ├── CustomModal.tsx         # Modal dialog component
│   │   └── DashboardLayout.tsx     # Main layout with navigation
│   │
│   ├── pages/               # Main page components
│   │   ├── Home.tsx                # Landing page
│   │   ├── WellnessOverview.tsx   # Daily wellness dashboard
│   │   ├── ActivityLog.tsx        # Activity tracking page
│   │   ├── MealPlanner.tsx        # Meal planning page
│   │   └── InsightsSummary.tsx    # Data visualization page
│   │
│   ├── utils/               # Helper functions
│   │   └── dataStore.ts           # localStorage management
│   │
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
│
├── public/                  # Static assets
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

---

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/KartikBansal4976/kartikBansal4976.github.io.git
cd kartikBansal4976.github.io
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Clerk Authentication**
- Create a free account at [clerk.com](https://clerk.com)
- Create a new application
- Copy your Publishable Key
- Create a `.env` file in the project root:
```
VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
- Navigate to `http://localhost:5173`
- The app will hot-reload as you make changes

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run deploy     # Build and deploy to GitHub Pages
```

---

## Deployment

This project is automatically deployed to GitHub Pages. To deploy updates:

1. Make your changes
2. Run the deploy command:
```bash
npm run deploy
```

The script will:
- Build the optimized production version
- Deploy to the `gh-pages` branch
- Update the live site within minutes

---

## Future Enhancements

Some ideas I'm considering for future versions:

- [ ] Backend integration with real database
- [ ] Social features (share progress, challenges)
- [ ] Mobile app version
- [ ] Advanced analytics and AI insights
- [ ] Integration with fitness wearables
- [ ] Export data to CSV/PDF
- [ ] Dark mode support
- [ ] Workout recommendations based on goals

---

## What I Learned

Building this project helped me gain experience with:

- Modern React patterns (hooks, state management)
- TypeScript for type-safe development
- Responsive design with Tailwind CSS
- Data visualization with pure CSS and JavaScript
- Authentication flows with Clerk
- Deploying React apps to GitHub Pages
- Managing application state without Redux
- Creating smooth user interactions and animations

---

## Contributing

This is a personal learning project, but suggestions and feedback are welcome! Feel free to:

- Open an issue for bugs or feature requests
- Submit a pull request with improvements
- Share your ideas for new features

---

## License

This project is open source and available under the MIT License.

---

## Contact

**Kartik Bansal**

- GitHub: [@KartikBansal4976](https://github.com/KartikBansal4976)
- Project Link: [https://github.com/KartikBansal4976/kartikBansal4976.github.io](https://github.com/KartikBansal4976/kartikBansal4976.github.io)
- Live Demo: [https://kartikbansal4976.github.io/](https://kartikbansal4976.github.io/)

---

⭐ If you found this project helpful or interesting, consider giving it a star!

**Made with ❤️ and React**
