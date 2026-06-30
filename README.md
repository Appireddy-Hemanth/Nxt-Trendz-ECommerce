# ⚡ Nxt Trendz — Premium Fashion & Lifestyle ECommerce

<div align="center">

![React](https://img.shields.io/badge/React-17.0.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Custom%20Design-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-5.2.0-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A fully-featured, premium eCommerce web application built with React.js — featuring a stunning dark-mode UI, gamification elements, AI chatbot, virtual try-on, and 45+ handcrafted components.**

[Live Demo](#) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Screenshots](#-screenshots)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Authentication](#-authentication)
- [API Reference](#-api-reference)
- [Component Documentation](#-component-documentation)
- [State Management](#-state-management)
- [Routing](#-routing)
- [Design System](#-design-system)
- [Animations & Micro-interactions](#-animations--micro-interactions)
- [Gamification Features](#-gamification-features)
- [Utility Functions](#-utility-functions)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🎯 About the Project

**Nxt Trendz** is a modern, production-grade eCommerce web application that goes far beyond a simple shopping site. It features a **cyberpunk-inspired dark theme** with neon accents, glassmorphism effects, and smooth animations throughout — creating an immersive, premium shopping experience.

The application includes advanced features like an **AI-powered chatbot**, **virtual try-on for clothing**, **interactive size guides**, a **"Make an Offer" price negotiation system**, **gamification elements** (Spin-to-Win, Scratch Cards, Mini-Games), and much more.

### 🎥 User Flow

1. **Login** → User signs in with credentials on a visually stunning login page with lightning bolt animations
2. **Home** → Lands on the homepage with animated hero section, promo banners, recently viewed carousel, and scratch card rewards
3. **Products** → Browse all products with advanced filters (category, price range, rating), voice search, auto-suggestions, quick view, and product comparison
4. **Product Details** → View detailed product info with similar products, reviews, bundle suggestions, virtual try-on (clothing), size guide, and offer negotiation
5. **Cart** → Manage cart items with quantity controls, promo codes, Spin-to-Win discount wheel, and crypto checkout option
6. **Checkout** → Complete purchase with order summary
7. **Order Success** → Animated order confirmation page
8. **Profile** → View user profile with order history
9. **Wishlist** → Save favorite items for later
10. **Discover Feed** → Instagram-style product discovery feed
11. **Style Matcher** → AI-powered style recommendation tool
12. **Outfit Builder** → Mix and match clothing items to build outfits

---

## ✨ Features

### 🛍️ Core Shopping Features
| Feature | Description |
|---------|-------------|
| **Product Listing** | Grid view of all products with sorting options (Price Low-High, Price High-Low, Rating High) |
| **Advanced Filters** | Filter by Category (Clothing, Electronics, Appliances, Grocery, Toys), Rating (1-4★ & up), and Max Price slider |
| **Search with Auto-suggest** | Real-time search suggestions as you type, powered by debounced API calls |
| **Voice Search** | Browser-based speech recognition for hands-free product search |
| **Product Details** | Detailed product page with images, pricing, brand, description, availability, and ratings |
| **Similar Products** | Related product recommendations on each product detail page |
| **Quick View Modal** | Preview product details without leaving the products page |
| **Product Comparison** | Compare up to 3 products side-by-side with a sticky comparison bar |
| **Prime Deals** | Exclusive deals section for premium users |

### 🛒 Cart & Checkout
| Feature | Description |
|---------|-------------|
| **Shopping Cart** | Full cart management with add, remove, increment, decrement, and clear all functionality |
| **Cart Badge** | Real-time cart item count displayed in the navigation header |
| **Fly-to-Cart Animation** | Animated product image that flies from the product card to the cart icon |
| **Promo Code System** | Apply discount codes (e.g., `WELCOME15`, `FLAT20`, `NXT50`) for percentage-based discounts |
| **Cart Summary** | Detailed order summary with subtotal, discount, and total amount |
| **Checkout Flow** | Complete checkout process with delivery address form |
| **Crypto Checkout** | Mock cryptocurrency payment option (BTC, ETH, SOL, USDT) |
| **Order Success** | Animated order confirmation page with confetti effects |
| **Order History** | View past orders in the Profile section |

### 👗 Fashion-Specific Features (Clothing Only)
| Feature | Description |
|---------|-------------|
| **Virtual Try-On** | Upload your photo and see how clothing looks on you (simulated overlay) |
| **Interactive Size Guide** | Visual body-measurement size guide with drag-to-measure functionality |
| **Offer Negotiator** | "Make an Offer" — negotiate the price with an AI-powered counter-offer system |

### 💰 Gamification & Engagement
| Feature | Description |
|---------|-------------|
| **Spin-to-Win Wheel** | Interactive spinning discount wheel on the Cart page (prizes: 5%, 10%, 15%, 20% off, Free Shipping, Mystery Gift) |
| **Scratch Card** | Scratch-to-reveal discount card on the Home page |
| **Mini-Game** | Fun mini-game to earn rewards |
| **Social Proof Notifications** | "Someone in New York just bought a Classic Watch" — real-time purchase notifications |
| **Newsletter Pop-up** | Subscribe for 15% off — beautiful modal with email capture |
| **Promo Banner** | Scrolling announcement banner with current deals |

### 🤖 AI & Smart Features
| Feature | Description |
|---------|-------------|
| **Chatbot Widget** | Floating AI chatbot for customer support with pre-built quick replies |
| **Style Matcher** | AI-powered style recommendation engine |
| **Outfit Builder** | Mix and match products to create complete outfits |
| **Bundle Suggestions** | Smart "Frequently Bought Together" product bundles |
| **Recently Viewed** | Carousel of recently viewed products for easy re-discovery |

### 🎨 UI/UX Features
| Feature | Description |
|---------|-------------|
| **Dark Mode** | Premium cyberpunk-inspired dark theme with neon accents |
| **Glassmorphism** | Frosted glass effects with `backdrop-filter: blur()` |
| **Parallax Images** | Depth-based parallax scrolling effects on product images |
| **Micro-animations** | Smooth hover effects, transitions, and state changes throughout |
| **Lightning Bolt Animations** | Animated SVG lightning bolts on login and home pages |
| **Floating Particles** | Ambient animated particles on background |
| **Scroll-to-Top** | Smooth scroll-to-top button appears on scroll |
| **Live Cursors** | Simulated real-time cursor presence (collaborative feel) |
| **Toast Notifications** | Success/error/info toast notifications for user actions |
| **Responsive Design** | Fully responsive across desktop, tablet, and mobile |
| **Custom Scrollbar** | Styled neon scrollbar matching the theme |

### 🔐 Authentication & Security
| Feature | Description |
|---------|-------------|
| **JWT Authentication** | Secure login with JSON Web Tokens stored in cookies |
| **Protected Routes** | Automatic redirect to login for unauthenticated users |
| **Persistent Sessions** | 30-day cookie persistence for staying logged in |
| **Password Toggle** | Show/hide password visibility on the login form |

### ❤️ Personalization
| Feature | Description |
|---------|-------------|
| **Wishlist** | Save products to a wishlist with heart icon toggle |
| **Product Reviews** | Rate and review products with star ratings |
| **Discover Feed** | Personalized Instagram-style product discovery |
| **Profile View** | User profile page with personal details and order history |

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React.js** | 17.0.1 | Core UI library — component-based architecture |
| **React Router DOM** | 5.2.0 | Client-side routing with `BrowserRouter`, `Switch`, `Route`, `Redirect` |
| **JavaScript (ES6+)** | — | Application logic with modern syntax (arrow functions, destructuring, async/await, template literals) |
| **CSS3** | — | Custom styling with CSS Variables, Flexbox, Grid, animations, gradients, glassmorphism |
| **React Icons** | 4.2.0 | Icon library (FontAwesome, Bootstrap icons) |
| **React Loader Spinner** | 4.0.0 | Loading state spinners (ThreeDots) |
| **js-cookie** | 2.2.1 | Cookie management for JWT token storage |

### Development Tools
| Tool | Version | Purpose |
|------|---------|---------|
| **React Scripts** | 4.0.3 | Create React App build toolchain (Webpack, Babel, ESLint) |
| **ESLint** | — | Code linting with Airbnb config |
| **Prettier** | 2.2.1 | Code formatting |
| **Husky** | 4.3.8 | Git hooks for pre-commit linting |
| **lint-staged** | 10.5.4 | Run linters on staged files only |

### API
| API | Description |
|-----|-------------|
| **CCBP Products API** | `https://apis.ccbp.in/products` — Product listing and search |
| **CCBP Product Details API** | `https://apis.ccbp.in/products/:id` — Individual product details |
| **CCBP Prime Deals API** | `https://apis.ccbp.in/prime-deals` — Exclusive prime deals |
| **CCBP Login API** | `https://apis.ccbp.in/login` — User authentication |

---

## 📁 Project Structure

```
Nxt-Trendz-ECommerce/
├── public/
│   ├── index.html              # Main HTML template with SEO meta tags
│   ├── manifest.json           # PWA manifest
│   └── robots.txt              # Search engine crawling rules
│
├── src/
│   ├── App.js                  # Root component — routing, context provider, global overlays
│   ├── App.css                 # Global styles, CSS variables, keyframe animations
│   ├── index.js                # React DOM entry point
│   │
│   ├── context/
│   │   └── CartContext.js      # React Context for global state (cart, wishlist, orders, reviews, theme)
│   │
│   ├── utils/
│   │   ├── flyToCart.js        # Fly-to-cart animation utility
│   │   └── haptics.js          # Haptic feedback utility (vibration API)
│   │
│   └── components/
│       │
│       │── LoginForm/          # 🔐 Authentication page with lightning animations
│       │── ProtectedRoute/     # 🛡️ Route guard — redirects to /login if not authenticated
│       │── Header/             # 🧭 Navigation bar with cart badge, wishlist, theme toggle, logout
│       │── Home/               # 🏠 Landing page with hero section, particles, grid effects
│       │── Products/           # 📦 Products page wrapper
│       │── AllProductsSection/ # 📋 Products list with filters, sorting, comparison
│       │── ProductCard/        # 🃏 Individual product card with hover effects, quick view
│       │── ProductItemDetails/ # 📄 Full product detail page
│       │── ProductsHeader/     # 📊 Sort dropdown and product count
│       │── PrimeDealsSection/  # ⭐ Exclusive prime deals section
│       │── SimilarProductItem/ # 🔄 Similar product cards
│       │── FiltersGroup/       # 🔍 Search, categories, price range, ratings filters
│       │── QuickViewModal/     # 👁️ Quick product preview modal
│       │── CompareBar/         # ⚖️ Product comparison sticky bar
│       │
│       │── Cart/               # 🛒 Shopping cart page
│       │── CartItem/           # 📦 Individual cart item with quantity controls
│       │── CartListView/       # 📃 Cart items list
│       │── CartSummary/        # 💳 Order summary with promo codes
│       │── EmptyCartView/      # 🛒 Empty cart illustration
│       │
│       │── CheckoutView/       # 💳 Checkout page with delivery form
│       │── CryptoCheckout/     # ₿ Cryptocurrency payment option
│       │── OrderSuccessView/   # ✅ Order confirmation with animations
│       │
│       │── WishlistView/       # ❤️ Wishlist page
│       │── ProfileView/        # 👤 User profile and order history
│       │── DiscoverFeed/       # 📱 Instagram-style product feed
│       │── StyleMatcher/       # 🎨 AI style recommendation tool
│       │── OutfitBuilder/      # 👔 Mix & match outfit creator
│       │
│       │── VirtualTryOn/       # 👗 Virtual try-on for clothing
│       │── SizeVisualizer/     # 📏 Interactive size guide
│       │── OfferNegotiator/    # 💰 "Make an Offer" price negotiation
│       │── BundleSuggestion/   # 📦 "Frequently Bought Together" bundles
│       │── ReviewSection/      # ⭐ Product reviews and ratings
│       │── RecentlyViewedCarousel/ # 🔄 Recently viewed products
│       │
│       │── SpinToWinModal/     # 🎰 Discount spin wheel
│       │── ScratchCard/        # 🎫 Scratch-to-reveal discount card
│       │── MiniGame/           # 🎮 Interactive mini-game
│       │
│       │── ChatbotWidget/      # 🤖 Floating AI chatbot
│       │── NewsletterModal/    # 💌 Email subscription popup
│       │── SocialProofNotifier/ # 📢 Real-time purchase notifications
│       │── PromoBanner/        # 📣 Scrolling promo announcement bar
│       │
│       │── Toast/              # 🔔 Toast notification system
│       │── ScrollToTop/        # ⬆️ Scroll-to-top button
│       │── LiveCursors/        # 🖱️ Simulated collaborative cursors
│       │── ParallaxImage/      # 🖼️ Parallax scrolling images
│       │── NotFound/           # 404 page
│       └──
│
├── .eslintrc                   # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── .gitignore                  # Git ignored files (node_modules, build, etc.)
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** — v10.13 or higher (recommended: v14+)
- **npm** — v6 or higher
- **Git** — for cloning the repository

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Appireddy-Hemanth/Nxt-Trendz-ECommerce.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd Nxt-Trendz-ECommerce
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Starts the development server on `http://localhost:3000` |
| `npm run build` | Creates optimized production build in `/build` folder |
| `npm test` | Runs the test suite |
| `npm run lint` | Runs ESLint to check for code quality issues |
| `npm run lint:fix` | Auto-fixes ESLint issues |
| `npm run format` | Formats all source files with Prettier |

---

## 🔐 Authentication

### Login Credentials

| Field | Value |
|-------|-------|
| **Username** | `Hemanth` |
| **Password** | `123456` |

### How Authentication Works

1. User enters credentials on the `/login` page
2. Credentials are sent to `https://apis.ccbp.in/login` via `POST` request
3. On success, the API returns a **JWT token**
4. The JWT token is stored in a browser cookie (`jwt_token`) with a **30-day expiry**
5. All subsequent API calls include the JWT token in the `Authorization: Bearer <token>` header
6. The `ProtectedRoute` component checks for the cookie on every route change — if missing, it redirects to `/login`
7. On logout, the cookie is removed and the user is redirected to `/login`

---

## 🔗 API Reference

### 1. Login API
```
POST https://apis.ccbp.in/login
Body: { "username": "rahul", "password": "rahul@2021" }
Response: { "jwt_token": "eyJhbG..." }
```

### 2. Products API
```
GET https://apis.ccbp.in/products
Query Params:
  - sort_by       → PRICE_HIGH, PRICE_LOW, RATING (optional)
  - category      → 1 (Clothing), 2 (Electronics), 3 (Appliances), 4 (Grocery), 5 (Toys)
  - title_search  → Search keyword (optional)
  - rating        → 4, 3, 2, 1 (minimum rating filter)
Headers: Authorization: Bearer <jwt_token>
```

### 3. Product Details API
```
GET https://apis.ccbp.in/products/:id
Headers: Authorization: Bearer <jwt_token>
Response: { id, title, price, brand, description, image_url, rating, total_reviews, availability, similar_products[] }
```

### 4. Prime Deals API
```
GET https://apis.ccbp.in/prime-deals
Headers: Authorization: Bearer <jwt_token>
Response: { prime_deals: [{ id, title, price, brand, image_url, rating }] }
```

---

## 🧩 Component Documentation

### Core Components

#### `App.js` — Root Component
The main application component that:
- Wraps everything in `CartContext.Provider` for global state
- Defines all routes using `React Router Switch`
- Renders global overlays (Newsletter, Chatbot, Social Proof) — only on non-login pages
- Manages state for: cart, wishlist, orders, reviews, theme, discounts, recently viewed, toasts

#### `LoginForm` — Authentication
- Animated login page with cyberpunk lightning bolt SVGs, floating orbs, and particle effects
- Username/password fields with show/hide password toggle
- Form validation with error messages
- Loading spinner on submit button
- Redirects to Home on successful login

#### `Header` — Navigation
- Responsive navigation bar (desktop & mobile layouts)
- Logo, navigation links (Home, Products, Cart, Wishlist, Discover, Style Matcher, Outfit Builder)
- Cart badge showing item count
- Wishlist badge showing saved items count
- Dark/light theme toggle button
- Profile and Logout buttons
- Active link highlighting based on current route

#### `AllProductsSection` — Product Listing
- Fetches products from API with loading, success, and failure states
- Integrates `FiltersGroup` for filtering and `ProductsHeader` for sorting
- Client-side max price filtering after API response
- Quick view modal for product preview
- Product comparison bar (up to 3 items)

#### `ProductItemDetails` — Product Detail Page
- Full product information display
- Quantity selector (increment/decrement)
- Add to Cart with fly-to-cart animation
- Add to Wishlist toggle
- Similar products section
- Conditional rendering of clothing-specific features:
  - `VirtualTryOn` — only for clothing items
  - `SizeVisualizer` — only for clothing items
  - `OfferNegotiator` — only for clothing items
- Bundle suggestions
- Customer review section
- Recently viewed tracking
- Live cursors (simulated collaborative browsing)

#### `Cart` — Shopping Cart
- Cart item listing with quantity controls
- Remove individual items or clear all
- Spin-to-Win modal (appears once per session)
- Cart summary with promo code input and total calculation
- Empty cart view with illustration

### Feature Components

#### `ChatbotWidget` — AI Chatbot
- Floating toggle button (bottom-left corner)
- Expandable chat window with message history
- Quick reply buttons for common questions
- Simulated AI responses
- Smooth open/close animations

#### `SpinToWinModal` — Discount Wheel
- 6-segment spinning wheel with CSS conic-gradient
- Prizes: 5% OFF, 10% OFF, 15% OFF, 20% OFF, Free Shipping, Mystery Gift
- Physics-based spin animation with cubic-bezier easing
- Confetti explosion on winning
- Claim discount button

#### `ScratchCard` — Scratch-to-Reveal
- Canvas-based scratch card with touch/mouse support
- Reveals hidden discount code underneath
- Animated reveal effect

#### `VirtualTryOn` — Virtual Try-On
- Photo upload interface
- Overlay clothing item on user's photo
- Only available for clothing category products

#### `SizeVisualizer` — Interactive Size Guide
- Visual body measurement diagram
- Drag-to-measure interactive elements
- Size chart with measurements
- Only available for clothing category products

#### `OfferNegotiator` — Price Negotiation
- "Make an Offer" interface
- Counter-offer logic with multiple rounds
- Accept/reject negotiation flow
- Only available for clothing category products

#### `FiltersGroup` — Search & Filters
- Text search input with keyboard (Enter key) and click trigger
- Voice search using Web Speech API
- Auto-suggest dropdown with debounced API calls (300ms)
- Category filter buttons (Clothing, Electronics, Appliances, Grocery, Toys)
- Price range slider (₹0 – ₹100,000)
- Star rating filter (1★ to 4★ & up)
- Clear all filters button

#### `NewsletterModal` — Email Capture
- Full-screen overlay modal
- Email input with validation
- Subscribe for 15% off
- "No thanks" dismiss option
- Auto-close after subscription
- Shows only once per session (localStorage flag)
- Only appears on non-login pages

#### `SocialProofNotifier` — Purchase Notifications
- Random "Someone just bought..." toast notifications
- Rotating cities, items, and action types
- Appears every 15-35 seconds
- Auto-dismisses after display

---

## 🗃 State Management

### React Context API

The app uses **React Context** (`CartContext`) for global state management instead of Redux, keeping the architecture lightweight.

#### Context Shape:
```javascript
{
  // Shopping Cart
  cartList: [],                    // Array of cart items { id, title, price, imageUrl, quantity, ... }
  addCartItem: (product) => {},    // Add item or increment quantity if exists
  removeCartItem: (id) => {},      // Remove item from cart
  incrementCartItemQuantity: (id) => {},
  decrementCartItemQuantity: (id) => {},
  removeAllCartItems: () => {},

  // Theme
  isDarkTheme: true,               // Dark/light theme toggle
  toggleTheme: () => {},

  // Wishlist
  wishlist: [],                    // Array of wishlisted products
  toggleWishlistItem: (product) => {},

  // Orders
  orders: [],                     // Array of completed orders
  placeOrder: () => {},

  // Reviews
  reviews: {},                    // { productId: [{ id, rating, text, date }] }
  addReview: (productId, review) => {},

  // Promotions
  discount: 0,                   // Current discount percentage
  applyPromoCode: (code) => {},

  // Recently Viewed
  recentlyViewed: [],             // Last 10 viewed products
  addRecentlyViewed: (product) => {},
}
```

### Promo Codes
| Code | Discount |
|------|----------|
| `WELCOME15` | 15% off |
| `FLAT20` | 20% off |
| `NXT50` | 50% off |

---

## 🗺 Routing

| Path | Component | Auth Required | Description |
|------|-----------|:---:|-------------|
| `/login` | `LoginForm` | ❌ | Login page |
| `/` | `Home` | ✅ | Homepage with hero, scratch card, recently viewed |
| `/products` | `Products` | ✅ | Product listing with filters |
| `/products/:id` | `ProductItemDetails` | ✅ | Individual product detail page |
| `/cart` | `Cart` | ✅ | Shopping cart |
| `/checkout` | `CheckoutView` | ✅ | Checkout form |
| `/order-success` | `OrderSuccessView` | ✅ | Order confirmation |
| `/wishlist` | `WishlistView` | ✅ | Saved products |
| `/profile` | `ProfileView` | ✅ | User profile & order history |
| `/discover` | `DiscoverFeed` | ✅ | Instagram-style feed |
| `/style-matcher` | `StyleMatcher` | ✅ | Style recommendations |
| `/outfit-builder` | `OutfitBuilder` | ✅ | Mix & match outfits |
| `/not-found` | `NotFound` | ❌ | 404 page |

---

## 🎨 Design System

### CSS Custom Properties (Variables)

```css
/* Colors */
--bg-primary: #0a0a1a          /* Deep dark background */
--bg-secondary: #12122a        /* Card/section backgrounds */
--bg-card: #1a1a3e             /* Elevated card surfaces */
--accent-primary: #00f0ff      /* Neon cyan — primary accent */
--accent-secondary: #a855f7    /* Purple — secondary accent */
--accent-blue: #0967d2         /* Blue — buttons & links */
--text-primary: #e8e8ff        /* Main text color */
--text-secondary: #8888aa      /* Muted text */

/* Typography */
--font-primary: 'Inter', sans-serif
--font-secondary: 'Outfit', sans-serif
--font-heading: 'Outfit', sans-serif

/* Spacing & Borders */
--radius-sm / --radius-md / --radius-lg / --radius-xl / --radius-full
--shadow-sm / --shadow-md / --shadow-lg / --shadow-xl / --shadow-glow

/* Transitions */
--transition-fast: 0.15s ease
--transition-base: 0.3s ease
```

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| 🔵 Neon Cyan | `#00f0ff` | Primary accent, buttons, highlights, links |
| 🟣 Purple | `#a855f7` | Secondary accent, gradients, hover states |
| 🔷 Blue | `#0967d2` | CTA buttons, login button |
| 🟡 Amber | `#fbbf24` | Ratings, stars, warnings |
| 🔴 Red | `#ef4444` | Errors, destructive actions |
| ⬛ Dark BG | `#0a0a1a` | Page background |
| 🟪 Card BG | `#1a1a3e` | Card surfaces |

---

## 🎬 Animations & Micro-interactions

### Keyframe Animations Used
| Animation | Description | Used In |
|-----------|-------------|---------|
| `fadeIn` | Opacity 0→1 | Page transitions, modals |
| `fadeInUp` | Slide up + fade in | Product cards, content sections |
| `slideInLeft` | Slide from left | Login illustration |
| `slideUp` | Modal entrance | Newsletter, modals |
| `scaleIn` | Scale 0.9→1 + fade | Success states |
| `float` | Gentle vertical bobbing | Particles, lightning icon |
| `gradientShift` | Background gradient animation | Login button |
| `lightningFlash` | Flash in/out | Lightning bolt SVGs |
| `boltDraw` | SVG stroke draw | Lightning bolt paths |
| `shake` | Horizontal shake | Error messages |
| `spin` | 360° rotation | Loading spinners |
| `pulse` | Scale pulse | Notifications, badges |
| `confettiFall` | Falling + rotating | Spin wheel confetti |

### Hover Effects
- **Product Cards**: Lift (`translateY(-8px)`) + enhanced shadow + image zoom
- **Buttons**: Lift + glow shadow + gradient shift
- **Links**: Color transition + underline animation
- **Navigation**: Active link gradient border-bottom

### Special Effects
- **Glassmorphism**: `backdrop-filter: blur()` with semi-transparent backgrounds
- **Parallax Scrolling**: Mouse-position-based depth effect on images
- **Fly-to-Cart**: Product image animates from card to cart icon
- **Conic Gradient Wheel**: CSS `conic-gradient` for the spin wheel segments
- **Canvas Scratch**: HTML5 Canvas with `globalCompositeOperation: 'destination-out'` for scratch card

---

## 🎮 Gamification Features

### 1. Spin-to-Win Wheel (`SpinToWinModal`)
- Appears once when visiting the Cart page (tracked via `localStorage`)
- 6 prize segments rendered with CSS `conic-gradient`
- Physics-based spin with `cubic-bezier(0.1, 0.7, 0.1, 1)` easing
- Random prize selection with rotation calculation
- Confetti explosion on win (50 dynamically created DOM elements)

### 2. Scratch Card (`ScratchCard`)
- HTML5 Canvas overlay on the Home page
- Mouse/touch-based scratching with `globalCompositeOperation`
- Auto-reveals when 50%+ is scratched
- Hidden discount code underneath

### 3. Mini-Game (`MiniGame`)
- Interactive browser game for earning rewards
- Engages users during idle time

### 4. Social Proof (`SocialProofNotifier`)
- Random notifications every 15-35 seconds
- Rotates through 8 cities, 6 items, and 2 action types
- Creates urgency and social validation

---

## 🔧 Utility Functions

### `flyToCart.js`
Animates a product image from its position to the cart icon using `position: fixed` and CSS transitions. Creates a visual connection between "Add to Cart" action and the navigation cart icon.

### `haptics.js`
Provides haptic feedback on mobile devices using the Vibration API. Used on button clicks and interactions for a tactile feel.

---

## 🌐 Deployment

### Build for Production
```bash
npm run build
```
This creates an optimized production build in the `/build` directory with:
- Minified JavaScript bundles
- Optimized CSS
- Asset hashing for cache busting

### Deploy Options
- **Vercel**: `npx vercel --prod`
- **Netlify**: Drag & drop the `/build` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload `/build` to an S3 bucket with static hosting

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Appireddy Hemanth**

- GitHub: [@Appireddy-Hemanth](https://github.com/Appireddy-Hemanth)

---

<div align="center">

**⚡ Built with React.js | Styled with ❤️ and CSS | Powered by CCBP APIs ⚡**

</div>
