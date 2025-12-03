# insocialwise - Social Media Management Platform

## Overview

insocialwise is a frontend-only social media management landing page application. The application serves as a pre-booking system for early users, offering them free 1-year access to the platform. This is a pure frontend application designed to connect to an external backend API.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth transitions and interactions
- **Build Tool**: Vite for development and production builds

### Project Structure
```
/
├── src/                    # Frontend source code
│   ├── components/         # Reusable UI components
│   │   └── ui/            # shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   │   ├── landing.tsx    # Main landing page
│   │   ├── checkout.tsx   # Checkout page
│   │   ├── success.tsx    # Success page
│   │   ├── onboarding.tsx # Onboarding flow
│   │   └── not-found.tsx  # 404 page
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── shared/                 # Shared schemas
│   └── schema.ts          # Zod validation schemas
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind configuration
└── package.json           # Dependencies
```

### API Integration
The frontend is designed to connect to an external backend. API calls use TanStack Query with the following endpoints expected:
- `GET /api/spots-remaining`: Returns available registration spots
- `POST /api/prebookings`: Creates new pre-booking registrations

### Key Pages
- **Landing Page** (`/`): Main marketing page with hero, features, pricing, FAQ, and registration form
- **Checkout Page** (`/checkout`): Stripe-integrated payment page (requires `VITE_STRIPE_PUBLIC_KEY`)
- **Success Page** (`/success`): Post-registration confirmation
- **Onboarding Page** (`/onboarding`): User onboarding flow

## Data Models

### PreBooking Schema
```typescript
{
  email: string,           // Valid email address
  firstName: string,       // Required
  lastName: string,        // Required
  company?: string,        // Optional
  platforms?: string[],    // Social media platforms
  termsAccepted: boolean   // Must be true
}
```

## Development

### Running the Application
```bash
npm run dev
```
The application runs on port 5000 (HTTP) for Replit compatibility.

### Environment Variables
- `VITE_STRIPE_PUBLIC_KEY`: Stripe publishable key for checkout functionality

## Pricing Structure

The pricing is defined in `src/components/pricing-section.tsx`. When creating plans in Stripe, match these settings:

| Plan | Price | Billing | Stripe Configuration |
|------|-------|---------|---------------------|
| Free Trial | FREE for 1 day, then $10/day | Daily | 1-day trial period + $10/day recurring |
| Standard | $45/month | Monthly | Standard monthly subscription |
| Premium | $99/month | Monthly | Standard monthly subscription |
| Enterprise | Custom | Custom | Contact sales flow |

**To update pricing:**
1. Create new products/prices in your Stripe Dashboard
2. Copy the new `price_xxx` IDs
3. Update the `id` fields in `src/components/pricing-section.tsx`

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React bundle to `dist/`
- Run `npm run build` for production build

### Configuration
- Development: `npm run dev` with hot reloading on port 5000
- Production: Static hosting of built files

## Changelog

```
- December 2025: Migrated to frontend-only architecture
  - Removed all dashboard pages (analytics, reports, campaigns, etc.)
  - Removed A/B testing functionality
  - Moved frontend from client/ subfolder to root directory
  - Updated Vite to run on HTTP port 5000
  - Simplified schema to pure Zod validation (removed Drizzle ORM)
  - Kept essential pages: landing, checkout, success, onboarding
- August 2025: Added navigation layout switcher
- July 2025: Enhanced A/B testing to support 3 variants
- July 2025: Initial setup with full-stack architecture
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
