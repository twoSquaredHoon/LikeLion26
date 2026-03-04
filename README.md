# WhatToEat Frontend

A university dining hall meal recommendation app that automatically suggests personalized meal combinations based on each user's health goals and nutritional preferences.

---

## Tech Stack

- **React Native** + **Expo**
- **TypeScript**
- **React Navigation** — screen navigation
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
npm install expo@54
npx expo install --fix
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install @tanstack/react-query axios zustand
npm install -D @types/react @types/react-native
npx expo install react-native-screens react-native-safe-area-context react-native-svg
```

### 3. Start the dev server
```bash
npx expo start
```

Then:
- Scan the QR code with **Expo Go** on your phone (must be on the same WiFi)
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Press `w` for browser

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
├── App.tsx                   # Entry point
└── app.json
```

---

## Screens

- **Login** — Email/Google login or continue as guest
- **Signup** — Email or Google sign up
- **Onboarding** — Set health goals and dietary preferences after first login
- **Home** — Daily meal recommendations + personal meal log with calorie tracking
- **Dining Halls** — Browse 6 dining halls with menus, recommended plates, hours, and occupancy
- **Scan** — Camera food scanner that returns calorie + macro breakdown
- **Community** — Social feed filtered by dining hall with posts, photos, and videos
- **Settings** — Profile, password, favorites, preferences, and notifications

---

## Contributing

1. Branch off `main` — `git checkout -b feat/your-feature`
2. Commit with clear messages — `git commit -m "feat: add menu filtering"`
3. Open a PR against `main`