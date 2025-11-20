# insocialwise - Social Media Management Platform

## Overview

insocialwise is a comprehensive social media management platform built as a full-stack web application. The application serves as a landing page with pre-booking functionality for early users, offering them a free 1-year access to the platform. The system is designed to handle user registrations, track available spots (limited to 100), and provide an engaging marketing experience.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth transitions and interactions
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: PostgreSQL-based session store using connect-pg-simple
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API endpoints
- **Development**: Hot Module Replacement (HMR) with Vite integration

### Component Architecture
- **UI Components**: Radix UI primitives with custom styling
- **Design System**: shadcn/ui component library with consistent theming
- **Layout**: Responsive design with mobile-first approach
- **Typography**: Inter font family for modern aesthetics

## Key Components

### Data Models
- **Users**: Basic user authentication schema (prepared for future features)
- **PreBookings**: Registration system for early access users
  - Personal information (name, email, company)
  - Platform preferences
  - Terms acceptance tracking
  - Timestamps for registration tracking

### API Endpoints
- `GET /api/spots-remaining`: Returns available spots out of 100
- `POST /api/prebookings`: Creates new pre-booking registrations with validation
- `POST /api/ab-test/view`: Records a page view for A/B testing
- `GET /api/ab-test/results`: Returns aggregated A/B test performance data

### Core Features
- **Landing Page**: Multi-section marketing page with hero, features, pricing, FAQ
- **A/B Testing**: Two landing page variants for conversion optimization
- **Registration System**: Form-based pre-booking with real-time spot tracking
- **Responsive Design**: Mobile-optimized interface
- **Form Validation**: Client and server-side validation using Zod schemas
- **Toast Notifications**: User feedback system for actions
- **Social Proof**: Testimonials and trust indicators
- **Admin Dashboard**: A/B test performance analytics and insights

## Data Flow

1. **User Registration Flow**:
   - User fills registration form on landing page
   - Client-side validation using React Hook Form + Zod
   - Form submission triggers API call to `/api/prebookings`
   - Server validates data, checks email uniqueness and spot availability
   - Database insertion with automatic timestamp
   - Success/error response with toast notification

2. **Spot Tracking Flow**:
   - Real-time spot counter updates every 30 seconds
   - Progress bar visualization of taken vs. remaining spots
   - Automatic form disabling when limit reached

3. **Data Persistence**:
   - PostgreSQL database with Drizzle ORM
   - Schema migrations managed through Drizzle Kit
   - Connection pooling through Neon serverless database

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL provider
- **Connection**: Environment variable `DATABASE_URL` required
- **ORM**: Drizzle with TypeScript schema definitions

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Framer Motion**: Animation library

### Development Tools
- **TypeScript**: Type safety across the stack
- **ESBuild**: Fast bundling for production
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Assets**: Static assets served from build directory

### Environment Configuration
- **Development**: `NODE_ENV=development` with hot reloading
- **Production**: `NODE_ENV=production` with optimized builds
- **Database**: Requires `DATABASE_URL` environment variable

### Scripts
- `npm run dev`: Development server with HMR
- `npm run build`: Production build for both client and server
- `npm run start`: Production server startup
- `npm run db:push`: Database schema deployment

## Changelog

```
Changelog:
- July 02, 2025. Initial setup
- July 02, 2025. Added A/B testing functionality with two landing page variants
- July 17, 2025. Enhanced A/B testing to support 3 variants (A/B/C testing)
- July 17, 2025. Created Variant C with modern UI/UX design patterns
- July 17, 2025. Modernized "Everything You Need to Dominate Social Media" section with:
  * Glassmorphism effects and backdrop blur
  * Animated floating geometric shapes
  * Contemporary gradient typography
  * Enhanced micro-interactions and hover effects
  * Modern stats section with real-time metrics
  * Advanced card designs with floating particles
- July 17, 2025. Completely redesigned "Connect All Your Social Platforms" section with:
  * Central hub visualization with pulsing rings
  * Animated SVG connection lines between platforms
  * Circular platform arrangement with glassmorphism cards
  * Dynamic floating background elements
  * Modern stats display with gradient text
  * Contemporary call-to-action buttons
- July 17, 2025. Completely modernized "Get Full Access - Completely Free" pricing section with:
  * Advanced glassmorphism effects and backdrop blur
  * Animated floating crown and star icons
  * Dynamic gradient backgrounds with color transitions
  * Enhanced feature lists with interactive hover effects
  * Modern trust indicators with animated status dots
  * Contemporary security badges with hover animations
  * Urgency indicators with pulsing effects
  * Rounded corners and elevated shadow design
- July 17, 2025. Completely modernized "Secure Your Free Access Now" registration form with:
  * Advanced glassmorphism form card with backdrop blur
  * Floating animated sparkles and check icons
  * Contemporary input fields with hover and focus effects
  * Modern platform selection with glassmorphism cards
  * Enhanced terms section with gradient background
  * Dynamic submit button with animated gradient background
  * Modern security indicators with animated shield icon
  * Trust badges with status dots and smooth animations
- July 17, 2025. Completely modernized "Trusted by Ambitious Entrepreneurs" testimonials section with:
  * Advanced glassmorphism testimonial cards with backdrop blur effects
  * Floating background elements with continuous animations
  * Gradient orbs and animated sparkles throughout the section
  * Enhanced testimonial metrics with branded icons and gradients
  * Modern avatar system with online status indicators
  * Contemporary trust badges with glassmorphism design
  * Sophisticated typography with gradient text effects
  * Interactive hover animations and 3D transformations
- July 17, 2025. Added interactive carousel functionality to testimonials section:
  * Auto-playing testimonial slider with 6-second intervals
  * Glassmorphism navigation buttons with hover effects
  * Smooth slide transitions with 3D rotation effects
  * Interactive dot indicators for direct slide navigation
  * Auto-play pause on hover for user control
  * Visual auto-play status indicator
  * Enhanced 3-testimonials-per-slide grid layout for better showcase
  * Expanded testimonials collection to 9 diverse customer stories with unique metrics
  * Added testimonials from various roles: Content Creators, Agency Directors, CMOs, Brand Managers
- July 17, 2025. Completely modernized "Frequently Asked Questions" section with:
  * Advanced glassmorphism FAQ cards with backdrop blur and gradient overlays
  * Interactive category filtering system (All, Pricing, Features, Support, Security)
  * Each FAQ enhanced with branded icons and gradient color schemes
  * Popular FAQ badge system with animated indicators
  * Modern accordion design with smooth expand/collapse animations
  * Floating background elements and gradient orbs for visual depth
  * Contact support card with glassmorphism styling
  * Contemporary typography with gradient text effects
- July 17, 2025. Streamlined "Don't Miss This Moment" section with:
  * Compact design with reduced vertical padding and simplified layout
  * Clean dark background with subtle floating geometric elements
  * Minimalist badge with refined glow effects
  * Concise typography maintaining gradient text and modern styling
  * Streamlined CTA button with reduced complexity but maintained visual impact
  * Simplified urgency indicator focusing on key message
  * Removed feature grid to reduce section length and improve focus
- August 05, 2025. Enhanced navigation with layout variant switcher:
  * Added dropdown menu in navigation bar to switch between A/B/C variants
  * Included direct links to each layout variant with descriptions
  * Added current variant indicator showing active layout (A, B, or C)
  * Integrated admin dashboard access through navigation menu
  * Enhanced mobile menu with layout variant options
  * Improved user experience for testing different design versions
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```