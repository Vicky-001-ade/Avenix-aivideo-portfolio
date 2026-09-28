# AVENIX

### AI Visual & Video Director

A premium AI-powered creative portfolio specializing in cinematic AI visuals, luxury product advertising, AI-generated video production, creative direction, and high-end visual storytelling.

---

## Overview

AVENIX is a futuristic creative platform showcasing premium AI-generated visuals and cinematic content for brands, businesses, products, and creators.

The platform combines:

- **AI Visual Design:** Photorealistic concept design, luxury branding stills, and generative architectural visualization.
- **AI Video Production:** High-frame-rate commercial motion, fluid simulation, and generative physical realism.
- **Product Commercials:** Specular jewelry, horology, cosmetics, and hardware campaigns.
- **Luxury Brand Advertising:** High-end aesthetic curation, custom color palettes, and cinematic lighting.
- **Creative Direction:** Complete narrative arcs from prompt engineering to post-production color grading.
- **Motion Reel Presentation:** Seamless zero-buffering video showcases with synchronized audio.
- **Cinematic Storytelling:** Sci-fi, editorial fashion, and futuristic world-building narratives.

---

## Features

- **Fully Responsive Design:** Fluid typography and adaptive layouts engineered across 4K displays, ultrawides, laptops, tablets, and smartphones.
- **Mobile & Tablet Optimized:** Touch gesture support, swipeable carousels, and adaptive video rendering.
- **Premium Hero Section:** Volumetric particle canvas, 3D tilt interaction, and cinematic video portal.
- **AI Visual Showcase:** Multi-aspect masonry grid with ultra-HD lightbox inspection.
- **Motion Reel Section:** Interactive cinema-grade video player with custom transport controls.
- **Selected Work Portfolio:** 3D perspective layered carousel with scroll-lock navigation and permanent hero showcase.
- **Social Proof Carousel:** Verified client testimonials, metrics, and global partner badges.
- **About The Founder Section:** Vision statement, creative philosophy, and director bio.
- **Interactive Pricing Packages:** Transparent tiered commercial production packages.
- **Contact Section:** Direct inquiry pipeline with WhatsApp, Behance, and email integration.
- **Futuristic UI/UX:** Dark obsidian titanium aesthetics with electric cyan accents and neon glowing seams.
- **Smooth Scroll Animations:** GPU-accelerated motion sequences powered by the Motion library.
- **Lazy Loading Optimization:** Dynamic asset loading preventing bandwidth throttling.
- **Optimized Video Playback:** Intelligent viewport playback pauses inactive videos to maintain steady 60 FPS.
- **Glassmorphism Effects:** Multi-layered backdrop-blur panels with holographic border highlights.
- **Neon Border Effects:** Animated cybernetic HUD corner brackets and laser horizon lines.
- **Performance Optimization:** Sub-second First Contentful Paint (FCP) and optimal Core Web Vitals.

---

## Technology Stack

The AVENIX platform is built with modern, production-grade web technologies:

- **React 19** (`react`, `react-dom`) — Concurrent rendering engine and component architecture.
- **TypeScript** (`typescript`) — End-to-end static typing, interface contracts, and strict compile safety.
- **Vite 8** (`vite`, `@vitejs/plugin-react`) — Next-generation ESM bundler and ultra-fast build pipeline.
- **Tailwind CSS v4** (`tailwindcss`, `@tailwindcss/vite`) — Modern utility-first styling with native CSS variables and modern color spaces.
- **Motion** (`motion`) — Production-grade hardware-accelerated fluid UI physics and transitions.
- **Express** (`express`) — Backend server routing and proxy middleware.
- **Google GenAI SDK** (`@google/genai`) — Server-side Gemini model integration capabilities.
- **Lucide React** (`lucide-react`) — Ultra-clean SVG iconography.
- **Cloudinary** — Global CDN delivery for 4K cinematic commercial videos and dynamic streaming optimization.
- **Node.js & tsx** (`tsx`) — Modern TypeScript execution runtime.

---

## Installation

Clone the repository and install all dependencies:

```bash
# Clone the repository
git clone https://github.com/ogunleyegoodluck/avenix-portfolio.git

# Navigate to the project directory
cd avenix-portfolio

# Install dependencies
npm install
```

Start the local development server:

```bash
npm run dev
```

The application will be live at `http://localhost:3000`.

---

## Build

Compile the production-ready distribution bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Deployment

### Cloud Run / Docker

The project contains a standalone Node/Express and Vite configuration ready for containerized deployment:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

### Vercel / Netlify

1. Connect your Git repository to **Vercel** or **Netlify**.
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Set install command: `npm install`
5. Deploy.

---

## Project Structure

```
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore patterns
├── index.html                # Entry HTML with complete favicon and SEO metadata
├── metadata.json             # AI Studio applet capabilities and configuration
├── package.json              # Project dependencies and build scripts
├── public/                   # Public static assets & favicon suite
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-48x48.png
│   ├── favicon.ico
│   └── site.webmanifest
├── src/
│   ├── App.tsx               # Main application container
│   ├── main.tsx              # React 19 root bootstrap
│   ├── index.css             # Tailwind v4 theme tokens and global styles
│   ├── assets/
│   │   └── images/           # High-resolution visual stills & SVG logos
│   ├── components/
│   │   ├── AboutSection.tsx            # Founder story & vision
│   │   ├── AIVisualsGallery.tsx        # High-res image gallery with lightbox
│   │   ├── AvenixSplashScreen.tsx      # Cinematic initial loader
│   │   ├── CinematicTextController.tsx # Ambient typography controller
│   │   ├── CinematicVideoShowcase.tsx  # Video reels & player modal
│   │   ├── ContactSection.tsx          # Direct inquiry form & channels
│   │   ├── CustomCursor.tsx            # Interactive desktop magnetic cursor
│   │   ├── DarkThemeAmbientBackground.tsx  # Interactive particle grid (dark)
│   │   ├── FeaturedWork.tsx            # 3D perspective layered card carousel
│   │   ├── FinalCTA.tsx                # High-impact closing call-to-action
│   │   ├── Footer.tsx                  # Brand credits, links & copyright
│   │   ├── HeroSection.tsx             # 3D tilt video portal hero
│   │   ├── LightThemeAmbientBackground.tsx # Ambient lighting (light)
│   │   ├── MarqueeStatement.tsx        # Infinite scrolling ticker
│   │   ├── Navbar.tsx                  # Sticky glass navigation & theme switch
│   │   ├── ProcessSection.tsx          # 3-step creative pipeline
│   │   ├── ProjectDetailModal.tsx      # Full-screen project case study modal
│   │   ├── ServicesSection.tsx         # Commercial service offerings
│   │   ├── TestimonialsSection.tsx     # Client reviews & metrics
│   │   ├── ToolsTechnology.tsx         # AI model stack & software suite
│   │   └── VisualLightboxModal.tsx     # Fullscreen visual inspection
│   ├── context/
│   │   └── ThemeContext.tsx            # Theme provider (dark/light toggle)
│   ├── data/
│   │   └── portfolioData.ts            # Project details, videos & specs
│   └── types/
│       └── index.ts                    # TypeScript definitions
├── tsconfig.json             # TypeScript compiler settings
└── vite.config.ts            # Vite configuration & path aliases
```

---

## Performance Optimizations

- **Lazy Loading:** All project visual stills and secondary media elements utilize progressive lazy-loading to optimize initial payload.
- **Responsive Images:** Assets are served with intrinsic aspect ratios, eliminating Layout Shifts (CLS = 0).
- **Optimized Video Delivery:** Video assets are delivered via Cloudinary CDN with H.264/AAC encoding, chunked streaming, and fast start byte serving.
- **Intelligent Playback Lifecycle:** Only the active focused video plays in memory; inactive background cards pause automatically, drastically reducing CPU/GPU overhead.
- **Cloudinary Media Optimization:** Cloud-hosted video streams dynamically scale based on client connection speed and viewport dimensions.
- **Code Splitting & Tree Shaking:** Vite 8 and Rollup automatically isolate dependencies into optimized chunks for faster initial evaluation.
- **Asset Optimization:** Comprehensive suite of pre-compressed multi-resolution favicons (`.ico`, `.png`, `.webmanifest`) for instant browser tab caching.
- **Mobile Performance Enhancements:** Touch gesture listeners use passive event handling; computationally heavy 3D transforms are reduced on smaller screens.

---

## Contact

**GOODLUCK**  
*AI Visual & Video Director*

- **Email:** [ogunleyegoodluck244@gmail.com](mailto:ogunleyegoodluck244@gmail.com)
- **Behance:** [behance.net/basiratbello](https://www.behance.net/basiratbello)
- **Instagram:** [@ogunleyegoodluck244](https://www.instagram.com/ogunleyegoodluck244/)
- **WhatsApp:** [Chat on WhatsApp](https://wa.me/message/6UEJD7UEULJJM1)

---

## License

© AVENIX. All Rights Reserved.
