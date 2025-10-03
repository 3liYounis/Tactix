# Tactix - Football Match Management App

<div align="center">
  <img src="tactixMain/assets/images/football.png" alt="Tactix Logo" width="120" height="120"/>

  <h3>🏆 The Ultimate Football Match Experience</h3>

  <p>A modern, feature-rich React Native application for managing football matches, connecting players, and tracking performance with beautiful interfaces and real-time capabilities.</p>

  [![React Native](https://img.shields.io/badge/React%20Native-0.81.4-61DAFB?style=flat&logo=react&logoColor=white)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-54.0.10-000020?style=flat&logo=expo&logoColor=white)](https://expo.dev/)
  [![Firebase](https://img.shields.io/badge/Firebase-12.3.0-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
</div>

---

## 🎯 Overview

**Tactix** is a comprehensive football match management application that brings players together through an intuitive and engaging platform. The app combines match creation, player networking, performance tracking, and social features to create the ultimate football experience.

### 🚀 Key Highlights

- **Cross-Platform**: Built with React Native and Expo for iOS, Android, and Web
- **Real-time Match Management**: Create, join, and manage football matches with live updates
- **Player Performance Tracking**: Comprehensive skill assessment and statistics
- **Social Networking**: Connect with other players, add friends, and build your football community
- **Beautiful UI/UX**: Modern design with dark/light theme support and smooth animations
- **Backend Integration**: Express.js server with Firebase Firestore for data persistence

---

## ✨ Features

### 🏟️ Match Management
- **Create Matches**: Set up matches with custom formations (5v5, 7v7, 11v11)
- **Join Matches**: Enter match codes to join existing games
- **Live Match Tracking**: Real-time match status and player count
- **Match History**: View past matches and performance data
- **Team Formation**: Visual field layout with player positioning

### 👥 Player Network
- **Player Directory**: Discover and connect with other players
- **Friend System**: Add/remove friends and build your network
- **Position-based Filtering**: Filter players by position (GK, DEF, MID, FWD)
- **Player Profiles**: Detailed profiles with statistics and achievements
- **Search & Discovery**: Find players by name or position

### 📊 Performance & Analytics
- **Skill Assessment**: Rate players across multiple skill categories
- **Post-Match Surveys**: Comprehensive feedback system after matches
- **Statistics Tracking**: Win/loss ratios, match history, and performance trends
- **Achievement System**: Badges and rewards for various accomplishments
- **Performance Insights**: Visual charts and progress tracking

### 🎨 User Experience
- **Dark/Light Themes**: Automatic theme switching based on system preferences
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Responsive Design**: Optimized for all screen sizes
- **Intuitive Navigation**: Tab-based navigation with clear information hierarchy
- **Accessibility**: Screen reader support and high contrast modes

### 🔐 Authentication & Security
- **Firebase Authentication**: Secure user registration and login
- **Google Sign-in**: One-tap authentication with Google accounts
- **Password Recovery**: Secure password reset functionality
- **User Profiles**: Customizable profile information and settings

---

## 🛠️ Tech Stack

### Frontend (Mobile App)
```
📱 React Native 0.81.4
🎨 Expo 54.0.10
⚡ TypeScript 5.9.2
🎯 Expo Router 6.0.8
🎭 React Navigation 7.1.6
🎨 Lucide React Native (Icons)
📱 React Native Reanimated 4.1.0
🎭 Lottie React Native (Animations)
```

### Backend (Server)
```
🚀 Express.js 4.18.2
🔥 Firebase Admin SDK 12.0.0
📊 Firestore Database
🌐 CORS Support
🔧 TypeScript 5.3.3
```

### Development Tools
```
🔧 Babel (Transpilation)
📦 Metro (Bundler)
🎨 ESLint (Code Quality)
🏷️ TypeScript (Type Safety)
📱 Expo CLI (Development)
```

### Third-Party Services
```
🔥 Firebase (Authentication & Database)
📱 Google Fonts (Typography)
🎨 Expo Vector Icons
📱 Async Storage (Local Storage)
🌐 React Native WebView
```

---

## 🏗️ Project Structure

```
Tactix/
├── 📱 tactixMain/                 # Main React Native App
│   ├── 🎨 app/                   # App screens and navigation
│   │   ├── (auth)/              # Authentication screens
│   │   ├── (tabs)/              # Main app tabs
│   │   └── (register)/          # Registration flow
│   ├── 🧩 components/           # Reusable UI components
│   │   ├── animated/            # Animation components
│   │   ├── custom/              # Custom UI elements
│   │   ├── dashboard/           # Dashboard components
│   │   ├── friends/             # Friend management
│   │   ├── match/               # Match-related components
│   │   ├── survey/              # Post-match survey
│   │   └── Profile/             # Profile components
│   ├── 🔧 hooks/                # Custom React hooks
│   ├── 🌐 services/             # API and service layer
│   ├── 📊 context/              # React Context providers
│   ├── 🎨 constants/            # App constants and themes
│   ├── 📈 data/                 # Mock data and utilities
│   └── 📝 types/                # TypeScript type definitions
│
├── 🖥️ server/                   # Express.js Backend
│   ├── 🔧 src/
│   │   ├── config/              # Firebase configuration
│   │   ├── routes/              # API routes
│   │   ├── types/               # Server type definitions
│   │   └── index.ts             # Server entry point
│   └── 📦 package.json          # Server dependencies
│
└── 📚 README.md                 # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 18.0.0)
- npm or yarn
- Expo CLI
- Firebase project setup
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Tactix
   ```

2. **Install mobile app dependencies**
   ```bash
   cd tactixMain
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Firebase Setup**
   - Create a Firebase project
   - Enable Authentication and Firestore
   - Download `serviceAccount.json` to `server/` directory
   - Update Firebase config in `tactixMain/services/firebaseConfig.ts`

5. **Start the development server**
   ```bash
   # Terminal 1: Start the backend server
   cd server
   npm run dev

   # Terminal 2: Start the mobile app
   cd tactixMain
   npm start
   ```

### Running the App

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

---

## 🎮 Usage Guide

### 1. **Authentication**
- Sign up with email/password or Google
- Complete your player profile
- Set your position and initial preferences

### 2. **Creating a Match**
- Navigate to the Match tab
- Tap "Host Match"
- Fill in match details (name, location, time, formation)
- Share the generated match code with friends

### 3. **Joining a Match**
- Enter a match code in the "Join Match" section
- View match details and current players
- Wait for the host to start the match

### 4. **Managing Friends**
- Go to the Friends tab
- Search for players by name or position
- Add friends to your network
- View their profiles and statistics

### 5. **Performance Tracking**
- Complete post-match surveys after games
- Rate teammates on various skills
- View your statistics and achievements
- Track your performance trends

---

## 🎨 Design System

### Color Palette
- **Primary**: Dynamic blue tones for main actions
- **Secondary**: Green accents for success states
- **Warning**: Orange for attention-grabbing elements
- **Error**: Red for error states and warnings
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Space Grotesk (Bold, Medium)
- **Body**: JetBrains Mono (Regular)
- **UI Elements**: Inter (Regular, Medium, Bold)
- **Special**: Kalam (Badges and highlights)

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Multiple variants (primary, outline, ghost)
- **Inputs**: Clean design with focus states
- **Navigation**: Tab-based with clear hierarchy

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:
```env
PORT=3000
FIREBASE_PROJECT_ID=tact-7ffd0
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

### API Configuration
Update `tactixMain/config/api.ts`:
```typescript
export const API_BASE_URL = 'http://localhost:3000'; // Development
// export const API_BASE_URL = 'https://your-production-url.com'; // Production
```

---

## 📱 Screenshots

<details>
<summary>Click to view app screenshots</summary>

### Dashboard
- Player profile overview
- Statistics and achievements
- Quick access to recent matches

### Match Management
- Create/join match interface
- Live match status
- Team formation visualization

### Friends Network
- Player directory
- Friend management
- Search and filtering

### Performance Tracking
- Post-match surveys
- Skill assessment
- Statistics visualization

</details>

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Test on both iOS and Android
- Ensure accessibility compliance
- Update documentation for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Expo Team** for the amazing development platform
- **Firebase** for backend services
- **React Native Community** for excellent libraries
- **Football Community** for inspiration and feedback

---

## 📞 Support

For support, email [support@tactix.app](mailto:support@tactix.app) or create an issue in the repository.

---

<div align="center">
  <p>Made with ❤️ by the Tactix Team</p>
  <p>⚽ Bringing football players together, one match at a time ⚽</p>
</div>
