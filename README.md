# WhatToEat Frontend

A university dining hall meal recommendation app that automatically suggests personalized meal combinations based on each user's health goals and nutritional preferences.

---

## Tech Stack

- **React Native** + **Expo** (with Expo Router for file-based navigation)
- **TypeScript**
- **Zustand** — lightweight state management
- **TanStack React Query** — data fetching + caching
- **Axios** — HTTP client

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Tyrrnien81/WhatToEat-Frontend.git
cd WhatToEat-Frontend
```

### 2. Install dependencies
```bash
npm install
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
npm install @tanstack/react-query axios zustand
npm install -D @types/react @types/react-native
```

### 3. Start the dev server
```bash
npx expo start
```

Then press:
- `i` to open in iOS Simulator
- `a` to open in Android Emulator
- `w` to open in browser
- Scan the QR code with **Expo Go** on your phone

---

## Screens

- **Login** — Choose between logging in (email or Google), signing up, or continuing as a guest.
- **Onboarding** — After login, collect basic user info (birthday, gender required; rest skippable) to personalize recommendations.
- **Home** — Swipeable daily meal recommendations per dining hall at the top, plus a log of what you've eaten today with calorie tracking below.
- **Dining Halls** — Browse 6 dining halls with expandable dropdowns showing recommended meal plates, today's menu, open/close status, and live occupancy.
- **Scan** — Camera screen that analyzes a photo of your food and returns calorie + macro breakdown.
- **Community** — Social feed filtered by dining hall where users can post text, photos, and videos with tags.
- **Settings** — Manage personal info, password, favorites, dietary preferences, notifications, and account actions like logout.

---

## Project Structure
```
WhatToEat-Frontend/
├── src/
│   ├── screens/              # One file per screen
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── DiningHallsScreen.tsx
│   │   ├── ScanScreen.tsx
│   │   ├── CommunityScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── components/           # Reusable UI pieces
│   ├── navigation/           # React Navigation stack/tab setup
│   ├── hooks/                # Custom hooks
│   ├── store/                # Zustand state
│   ├── services/             # API calls
│   ├── types/                # TypeScript interfaces
│   └── constants/            # Colors, spacing, API URLs
├── assets/
│   ├── images/
│   └── fonts/
├── App.tsx                   # Entry point
└── app.json
```

---

## Contributing

1. Branch off `main` — `git checkout -b feat/your-feature`
2. Commit with clear messages — `git commit -m "feat: add menu filtering"`
3. Open a PR against `main`