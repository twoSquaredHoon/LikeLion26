# WhatToEat — Frontend

A university dining hall meal recommendation app that automatically suggests personalized meal combinations based on each user's health goals and nutritional preferences.

---

## Tech Stack

| Library | Purpose |
|---|---|
| React Native + Expo | Mobile app framework |
| TypeScript | Type safety |
| React Navigation | Screen navigation (stack + bottom tabs) |
| Zustand | Lightweight global state |
| TanStack React Query | Data fetching + caching |
| Axios | HTTP client |
| react-native-gesture-handler | Swipe gestures |
| react-native-svg | SVG icons |

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
npx expo install react-native-screens react-native-safe-area-context react-native-svg react-native-gesture-handler
```

### 3. Start the dev server

```bash
npx expo start
```

Then:
- Scan the QR code with Expo Go on your phone (must be on the same WiFi)
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Press `w` for browser

---

## Project Structure

```
WhatToEat-Frontend/
├── App.tsx                          # Entry point + navigation stack
├── src/
│   ├── screens/
│   │   ├── HomeScreen/              # Meal flow (4 screens)
│   │   │   ├── components/          # Reusable pieces scoped to meal flow
│   │   │   │   ├── FoodCard.tsx     # Single food row UI
│   │   │   │   ├── SwipeableFoodItem.tsx  # Swipe-to-swap + picker
│   │   │   │   └── foodData.ts      # ⚠️ Static mock data — needs API
│   │   │   ├── HomeScreenMain.tsx   # Main home tab
│   │   │   ├── HomeScreenMeal.tsx   # Food list with swipe-to-swap
│   │   │   ├── HomeScreenConfirm.tsx # Dish hero card (plate + macros)
│   │   │   └── HomeScreenAdd.tsx    # "Eat anything else?" review
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── DiningHallsScreen.tsx
│   │   ├── ScanScreen.tsx
│   │   ├── CommunityScreen.tsx
│   │   ├── MyProfileScreen.tsx
│   │   ├── ForgotPasswordScreen.tsx
│   │   ├── ResetPasswordScreen.tsx
│   │   └── VerifyEmailScreen.tsx
│   ├── components/                  # Reusable across all screens
│   │   └── MealHeroCard.tsx         # Parked plate card — ready to use
│   ├── navigation/
│   │   └── BottomBar.tsx            # Bottom tab navigator
│   ├── store/
│   │   └── index.ts                 # Zustand store
│   ├── services/
│   │   └── api.ts                   # Axios instance + API calls
│   ├── types/
│   │   └── index.ts                 # Shared TypeScript interfaces
│   └── constants/
│       ├── index.ts
│       └── theme.ts                 # Colors, spacing, fonts
└── assets/
```

---

## Screen Flow

```
Login → Signup → Onboarding → Home
                                └── Meal → Confirm → Add → Home
```

| Screen | File | Description |
|---|---|---|
| Home | `HomeScreenMain.tsx` | Daily summary + entry to meal flow |
| Meal | `HomeScreenMeal.tsx` | Food list, swipe left to swap items |
| Confirm | `HomeScreenConfirm.tsx` | Plate hero card with macros |
| Add | `HomeScreenAdd.tsx` | Log anything else eaten |
| Dining Halls | `DiningHallsScreen.tsx` | Browse halls, menus, hours, occupancy |
| Scan | `ScanScreen.tsx` | Camera scanner → calorie + macro breakdown |
| Community | `CommunityScreen.tsx` | Social feed filtered by dining hall |
| Profile | `MyProfileScreen.tsx` | Goals, preferences, notifications |

---

## Contributing

1. Branch off `main` — `git checkout -b feat/your-feature`
2. Commit with clear messages — `git commit -m "feat: add menu filtering"`
3. Open a PR against `main`