# mini-results-flow

![React](https://img.shields.io/badge/React-19.2.7-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.1.0-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.1-06B6D4?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.42.0-0055FF?style=flat-square&logo=framer)
![React Router](https://img.shields.io/badge/React%20Router-7.18.0-F44250?style=flat-square&logo=reactrouter)
![Jest](https://img.shields.io/badge/Jest-30.4.2-C21325?style=flat-square&logo=jest)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> A React-based multi-step conversion funnel that transforms user health metrics into personalized insight cards and a high-converting sales page. Features responsive design, state persistence, smooth animations, and a realistic conversion experience with dynamic countdown timers and sticky CTAs.

**[🚀 Live Demo](https://mini-results-flow-two.vercel.app/)**

---

## 🎯 Overview

This application simulates a real-world health & wellness sales funnel with three distinct experiences:

1. **📋 Form Page** - Collects user health metrics (gender, body fat %, BMI, calorie target, hydration, weight loss goals)
2. **📊 Results Page** - 6-step stepper displaying personalized health insights computed from form data
3. **💳 Sales Page** - Plan comparison, benefits list, countdown timer, sticky CTA, and money-back guarantee

All user input is persisted via React Context + localStorage, so progress is never lost on refresh.

## ✨ Key Features

- ✅ **Multi-Step Form** with real-time validation
- ✅ **6-Card Results Stepper** with Framer Motion animations
- ✅ **Dynamic Sales Page** with:
  - 🖼️ Before/after transformation visualization
  - 💰 Plan comparison (installments vs. discount)
  - ⏱️ 10-minute countdown timer with urgency messaging
  - 📌 Sticky "Claim My Plan" button that appears/disappears on scroll
  - 🛡️ 60-day money-back guarantee section
  - 🔬 Social proof (PubMed, Mayo Clinic citations)
- 📱 **Responsive Design** - Mobile-first, fully responsive layouts
- 🌙 **Dark Mode Support** - Images and components adapt to dark/light themes
- 💾 **Persistent State** - Form data survives page refreshes
- ♿ **Accessible Forms** - Proper labels, semantic HTML, keyboard navigation

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| ![React](https://img.shields.io/badge/-React%2019-61DAFB?style=flat&logo=react) | UI Library |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript) | Type Safety |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite) | Build Tool |
| ![React Router](https://img.shields.io/badge/-React%20Router-F44250?style=flat&logo=reactrouter) | Navigation |
| ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss) | Styling |
| ![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-0055FF?style=flat&logo=framer) | Animations |
| ![Jest](https://img.shields.io/badge/-Jest-C21325?style=flat&logo=jest) | Testing |

## 📁 Project Structure

```
src/
├── 📂 features/
│   ├── form/
│   │   └── FormPage.tsx              # Initial data collection
│   ├── results/
│   │   ├── ResultsPage.tsx           # 6-step stepper orchestration
│   │   └── ResultCardComponent.tsx   # Individual result card with animations
│   └── sales/
│       └── SalesPage.tsx             # Conversion-focused pricing & benefits
├── 📂 components/
│   ├── RadioGroup.tsx                # Gender selection
│   └── SliderComponent.tsx           # Body fat & BMI sliders
├── 📂 context/
│   └── FormContext.tsx               # Global form state + localStorage sync
├── 📂 layout/
│   ├── MainLayout.tsx                # Page wrapper with header
│   └── Header.tsx                    # Navigation & branding
├── 📂 routes/
│   └── AppRoutes.tsx                 # Route definitions
├── 📂 types/
│   ├── form.ts                       # FormData type definition
│   └── resultCard.ts                 # ResultCard interface
├── 📂 utils/
│   ├── calculations.ts               # Health metric callouts & logic
│   ├── localStorage.ts               # Persist & retrieve form data
│   └── defaultFormData.ts            # Initial form state
├── App.tsx                           # Root component
└── main.tsx                          # Entry point
```

## 🚀 Getting Started

### Prerequisites

- ✔️ Node.js 18+ 
- ✔️ npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/IrajFatima/mini-results-flow.git
cd mini-results-flow

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📝 Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | 🔄 Start Vite dev server with hot module replacement |
| `npm run build` | 📦 Build TypeScript & optimize with Vite |
| `npm run lint` | 🔍 Run ESLint on all files |
| `npm run preview` | 👁️ Preview production build locally |
| `npm run test` | ✅ Run Jest test suite once |
| `npm run test:watch` | 👀 Run Jest in watch mode for development |

## 📋 Form Page Features

Collects the following metrics with validation:

| Field | Type | Validation | Purpose |
|-------|------|-----------|---------|
| 👤 Gender | Radio (Male/Female) | Required | Determines body fat percentage callouts |
| ⚖️ Body Fat % | Slider | 0-100, Required | Health metric visualization |
| 📊 BMI | Slider | 0-40, Required | Body composition indicator |
| 🔥 Daily Calorie Target | Number Input | > 0, Required | Dietary guidance |
| 💧 Water Intake | Dropdown | 1/2/4/6 cups, Required | Hydration awareness |
| 📉 Weekly Weight Loss Rate | Number Input | > 0, Required | Goal setting |
| ⏳ Days to See Results | Number Input | > 0, Required | Expectation management |

**✅ Submit Button** is disabled until all fields are valid and filled.

## 🎴 Results Page Features

Displays 6 sequential insight cards:

| # | Card | Description |
|---|------|-------------|
| 1️⃣ | **⚖️ Body Fat %** | Contextualizes body composition with gender-specific guidance |
| 2️⃣ | **📊 BMI** | Explains metabolic impact and energy balance |
| 3️⃣ | **🔥 Calorie Intake** | Discusses calorie quality vs. quantity |
| 4️⃣ | **💧 Hydration** | Highlights water's role in fat-burning and metabolism |
| 5️⃣ | **📉 Weight Loss Rate** | Manages expectations for weekly progress |
| 6️⃣ | **⏳ See Results Timeline** | Motivates with realistic timeframes |

**Each Card Includes:**
- 😊 Emoji header + main metric highlight
- 📝 2 paragraph body copy
- 💬 Dynamic callout message based on user inputs
- 🖼️ Contextual image (with dark mode variants)

**Navigation:**
- ⬅️ Previous button (hidden on first card)
- ➡️ Next button (becomes "Continue" on last card → navigates to sales page)
- 📍 Progress indicator (6 dots showing current step)
- ✨ Framer Motion slide animations between cards

## 💳 Sales Page Features

### 💰 Plan Options

**🔄 3 Payments of $29**
- $29 today + 2 future payments
- Flexible payment schedule

**⚡ 1 Payment of $67 (23% OFF)**
- 💰 Save $20 instantly
- 🌟 Marked as "Most Popular"
- 👍 Recommended option

### 🎯 Key Sections

**🖼️ Transformation Visualization**
- Before/after images with arrow graphic
- Metrics showing 6-month potential improvement

**✅ Benefits Grid**
- 🍽️ Daily custom meal plans
- 🛒 Done-for-you grocery lists
- 👨‍🍳 Overwhelm-free recipes
- 📚 Weekly tips & guidance

**🔬 Social Proof**
- 📖 PubMed citations on ketogenic diet efficacy
- 🏥 Mayo Clinic research on keto benefits

**⏱️ Countdown Timer**
- 🕐 10-minute urgency timer (MM:SS format)
- ⚠️ "Discount expires in" message
- 🎯 Drives conversion psychology

**📌 Sticky CTA Button**
- 🚀 "Claim My Plan" button
- 👀 Appears when user scrolls away from plan options
- 🙈 Disappears when plan section is in view
- ✨ Smooth animations (Framer Motion)

**🛡️ Money-Back Guarantee**
- ✅ 60-day risk-free offer
- 💯 Full refund terms
- 📋 Subscription details & cancellation policy
- 📞 Support contact information

## 🔄 State Management

### FormContext

Uses React Context API with localStorage persistence:

```typescript
export function useForm() {
  const { formData, setFormData, resetForm } = useContext(FormContext);
  // ...
}
```

**Methods:**
- 🔧 `setFormData()` - Update any form field (auto-persists)
- 🔄 `resetForm()` - Clear all data and localStorage
- 💾 Form state syncs to localStorage on every change

**Default Form Data:**
```typescript
{
  gender: "male",
  bodyFatPercent: null,
  BMI: null,
  calorieTarget: null,
  waterIntake: null,
  weightLossRate: null,
  seeResultsDays: null
}
```

## 🎨 Styling

- 🌈 **Tailwind CSS** with custom color palette
- 🎯 **Primary Color:** `#36BC9F` (teal/green)
- 🔴 **Secondary Color:** `#F75950` (coral red)
- 🌙 **Dark Mode:** Automatic via `dark:` class utilities
- 📱 **Responsive:** Mobile-first breakpoints (sm, md, lg, xl)
- ✨ **Custom Classes:**
  - `.highlight` - Teal text for key metrics
  - `.label` - Text styling for labels

## ✅ Calculations & Logic

The `calculations.ts` utility generates context-aware callout messages:

- 🔢 **Body Fat Callouts** - Gender-specific thresholds
- 📊 **BMI Callouts** - Three-tier categorization
- 🔥 **Calorie Callouts** - Ranges from extreme restriction to high intake
- 💧 **Water Callouts** - Four levels of hydration awareness
- 📈 **Weight Loss & Results Callouts** - Motivational messaging

All callouts dynamically populate result cards based on form inputs.

## 🧪 Testing

Jest + React Testing Library are configured for component & page tests:

```bash
npm run test           # Run tests once
npm run test:watch    # Watch mode during development
```

**Test Configuration:**
- 🔧 `jest.config.cjs` - Jest settings
- ⚙️ `jest.setup.ts` - Testing library setup
- 📦 `babel.config.cjs` - Babel transpilation for tests

## ♿ Accessibility

- ✅ Semantic HTML elements (`<form>`, `<label>`, `<button>`)
- ✅ Proper `htmlFor` attributes on labels
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Color contrast compliance
- ✅ Focus states on form inputs

## 🌐 Deployment

The app is deployed on **Vercel**:

**🚀 Live:** https://mini-results-flow-two.vercel.app/

To deploy your own version:

```bash
npm run build
# Then connect your GitHub repo to Vercel
```

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| ![Chrome](https://img.shields.io/badge/-Chrome-4285F4?style=flat&logo=googlechrome) | 90+ |
| ![Firefox](https://img.shields.io/badge/-Firefox-FF7139?style=flat&logo=firefox) | 88+ |
| ![Safari](https://img.shields.io/badge/-Safari-000000?style=flat&logo=safari) | 14+ |
| ![Edge](https://img.shields.io/badge/-Edge-0078D4?style=flat&logo=microsoftedge) | 90+ |

## 🔐 Persistence

💾 Form data is automatically saved to browser's localStorage under the key `formData`. On page refresh or revisit, data is restored. Users can reset via the "No Thanks" link on the sales page.

## 📦 Dependencies

| Dependency | Version | Purpose |
|-----------|---------|---------|
| ![React](https://img.shields.io/badge/react-19.2.7-61DAFB?style=flat&logo=react) | 19.2.7 | UI library |
| ![React DOM](https://img.shields.io/badge/react--dom-19.2.7-61DAFB?style=flat&logo=react) | 19.2.7 | DOM rendering |
| ![React Router](https://img.shields.io/badge/react--router--dom-7.18.0-F44250?style=flat&logo=reactrouter) | 7.18.0 | Client routing |
| ![Framer Motion](https://img.shields.io/badge/framer--motion-12.42.0-0055FF?style=flat&logo=framer) | 12.42.0 | Animations |
| ![Tailwind CSS](https://img.shields.io/badge/tailwindcss-4.3.1-06B6D4?style=flat&logo=tailwindcss) | 4.3.1 | Styling |
| ![React Icons](https://img.shields.io/badge/react--icons-5.6.0-FFD700?style=flat&logo=react) | 5.6.0 | Icon components |

## 📚 Learning Resources

- 📖 [React 19 Docs](https://react.dev)
- ⚡ [Vite Guide](https://vitejs.dev/guide/)
- 🛣️ [React Router v7](https://reactrouter.com)
- 🎨 [Tailwind CSS](https://tailwindcss.com/docs)
- ✨ [Framer Motion](https://www.framer.com/motion/)

## 🤝 Contributing

Contributions welcome! Please:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to branch (`git push origin feature/amazing-feature`)
5. 📝 Open a Pull Request

## 📄 License

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

This project is open source and available under the MIT License.

## 👤 Author

[![GitHub](https://img.shields.io/badge/GitHub-IrajFatima-181717?style=flat&logo=github)](https://github.com/IrajFatima)

Created by [IrajFatima](https://github.com/IrajFatima)

---

## 🙌 Support

**Questions or Feedback?** 
- 🐛 [Open an issue](https://github.com/IrajFatima/mini-results-flow/issues) on GitHub
- 🚀 Check out the [live demo](https://mini-results-flow-two.vercel.app/)
- ⭐ Give us a star if you found this useful!

---

<div align="center">

**Made with ❤️ by [IrajFatima](https://github.com/IrajFatima)**

[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel)](https://mini-results-flow-two.vercel.app/)

</div>
