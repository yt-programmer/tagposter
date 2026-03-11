# Tag Poster Frontend

A modern React-based frontend for Tag Poster - a premium e-commerce platform for high-end framed car artworks designed for automotive enthusiasts.

## 🚗 About

Tag Poster creates high-end framed car artworks designed for enthusiasts who appreciate details. Every poster is printed with precision and framed using premium materials.

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Library**: Material UI (MUI) v7
- **Animations**: Framer Motion
- **Routing**: React Router DOM v7
- **Icons**: Lucide React, MUI Icons
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
frontend/
├── public/
│   ├── logo.jpg
│   └── logo.png
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Error.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Loading.jsx
│   │   ├── Products.jsx
│   │   ├── admin/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── ProductModal.jsx
│   │   │   └── ProductsTable.jsx
│   │   └── protect/
│   │       └── AdminRoute.jsx
│   ├── hooks/
│   │   └── useGetProducts.js
│   ├── pages/
│   │   ├── AdminPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── MainLayout.jsx
│   │   ├── PageNotFound.jsx
│   │   └── ProductsPage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── eslint.config.js
├── package.json
└── vite.config.js
```

## 🧩 Features

### Public Pages

- **Home Page**: Hero section, featured content
- **Products Page**: Browse all car poster products
- **Login Page**: Admin authentication

### Admin Dashboard

- **Product Management**: Add, edit, delete products
- **Product Table**: View all products with actions
- **Product Modal**: Form for creating/editing products

### Core Functionality

- **Routing**: React Router with nested routes
- **Protected Routes**: Admin-only dashboard access
- **Responsive Design**: Mobile-friendly layout
- **Animations**: Smooth page transitions
- **Toast Notifications**: User feedback

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Create production build
npm run build
```

### Preview Production Build

```bash
# Preview the built app
npm run preview
```

## 🔗 API Connection

The frontend communicates with a backend API. Ensure the backend server is running (typically on `http://localhost:3000` or configured port).

### Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_API=api

VITE_CLOUDINARY = api_for_cloudinary


```

## 📝 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run lint`    | Run ESLint               |
| `npm run preview` | Preview production build |

## 🎨 Design System

### Colors

- Primary: Theme-based (configured in Tailwind)
- Accent: MUI theme colors

### Typography

- Font family: System defaults + custom fonts
- Scale: MUI typography scale

## 🔐 Authentication

- Admin login required for dashboard access
- JWT-based authentication (handled by backend)
- Protected routes using `AdminRoute` component

## 📄 License

ISC License

## 👤 Author

Developed for Tag Poster - Premium Car Art E-commerce
