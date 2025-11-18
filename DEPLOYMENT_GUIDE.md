# MEAL Portfolio Website - Deployment Guide

## Project Overview

This is a complete, production-ready MEAL (Monitoring, Evaluation, Accountability & Learning) Portfolio Website for Ronald Obal. The site is built with React, TypeScript, Tailwind CSS, and integrates with Supabase for blog management and contact form submissions.

## Project Structure

```
src/
├── components/
│   ├── Navigation.tsx       # Sticky navigation with mobile menu
│   ├── Footer.tsx           # Footer with contact links
│   └── Layout.tsx           # Main layout wrapper
├── pages/
│   ├── Home.tsx            # Hero and introduction
│   ├── About.tsx           # Bio, education, skills
│   ├── Services.tsx        # 11 comprehensive services
│   ├── Portfolio.tsx       # Experience and achievements
│   ├── Blog.tsx            # Blog listing with filters
│   ├── BlogPost.tsx        # Individual blog post view
│   └── Contact.tsx         # Contact form
├── lib/
│   └── supabase.ts         # Supabase client config
├── types/
│   └── index.ts            # TypeScript interfaces
├── App.tsx                 # Main app with routes
├── index.css               # Tailwind & custom styles
└── main.tsx                # Entry point
```

## Features Implemented

### Pages
- **Home**: Hero section, statistics, core expertise highlights, CTA
- **About**: Professional bio, values, education, current positions, technical skills
- **Services**: 11 comprehensive MEAL services with detailed descriptions
- **Portfolio**: 3 current/recent positions with achievements and impact highlights
- **Blog**: Dynamic blog listing with category filtering (Supabase-backed)
- **Blog Post**: Individual post view with related articles
- **Contact**: Contact form with Supabase integration, email/phone/LinkedIn links

### Design Features
- **Color Scheme**: Navy (#0A2A43), White, Gold (#C9A227)
- **Responsive**: Mobile-first, fully responsive design
- **Navigation**: Sticky navigation with mobile hamburger menu
- **Animations**: Smooth scrolling, hover effects, subtle transitions
- **Typography**: Clean, professional font hierarchy
- **Accessibility**: Semantic HTML, proper contrast ratios

### Backend Integration
- **Supabase**: Blog posts table + Contact submissions table
- **RLS Policies**: Public read for blog posts, insert-only for contact forms
- **Dynamic Content**: Blog posts fetched from database with category filtering

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (for blog & contact functionality)

### Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Environment variables** (.env):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Run development server:**
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for production:
```bash
npm run build
```

Output will be in the `dist/` directory.

## Database Setup (Supabase)

### Blog Posts Table
```sql
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text DEFAULT '',
  content text NOT NULL,
  category text DEFAULT 'MEAL',
  author text DEFAULT 'Ronald Obal',
  published_date date DEFAULT CURRENT_DATE,
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blog posts"
  ON blog_posts FOR SELECT USING (true);
```

### Contact Submissions Table
```sql
CREATE TABLE contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT WITH CHECK (true);
```

## Deployment Options

### Netlify (Recommended)

1. **Connect GitHub repository**
2. **Set build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Add environment variables:**
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
4. **Deploy** - Netlify automatically builds and deploys on push

[Netlify Setup Guide](https://netlify.com)

### Vercel

1. **Import project from Git**
2. **Framework**: Vite
3. **Build & Output**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Environment**: Add Supabase environment variables
5. **Deploy**

[Vercel Setup Guide](https://vercel.com)

### GitHub Pages

1. **Update vite.config.ts:**
```typescript
export default defineConfig({
  base: '/repository-name/',
  // ... rest of config
});
```

2. **Build:**
```bash
npm run build
```

3. **Deploy dist folder to GitHub Pages**

[GitHub Pages Guide](https://pages.github.com)

## SEO Optimization

The site includes:
- Semantic HTML structure
- Responsive meta tags in index.html
- Clean URL structure with React Router
- Social sharing friendly

Add metadata to `index.html`:
```html
<meta property="og:title" content="Ronald Obal - MEAL Manager">
<meta property="og:description" content="MEAL systems and social impact consulting">
<meta property="og:image" content="your-image-url">
```

## Performance

- Optimized images using Pexels (external CDN)
- Lazy loading for blog images
- Minimized CSS with Tailwind
- Code splitting with React Router
- No unused JavaScript

## Blog Management

Add blog posts via Supabase dashboard:
1. Navigate to `blog_posts` table
2. Insert new row with:
   - title
   - slug (URL-friendly version of title)
   - excerpt
   - content (supports markdown-like formatting)
   - category (Mental Health, Technology, MEAL, Evaluation, Capacity Building)
   - published_date
   - image_url (Pexels image link)

Sample blog posts are pre-populated for reference.

## Contact Form

Submitted contacts are stored in `contact_submissions` table in Supabase. View submissions in the dashboard to respond to inquiries.

## Customization

### Colors
Update color codes in components (currently #0A2A43, #C9A227):
```bash
grep -r "#0A2A43" src/
grep -r "#C9A227" src/
```

### Content
Edit page content directly in `.tsx` files:
- `src/pages/Home.tsx`
- `src/pages/About.tsx`
- `src/pages/Services.tsx`
- etc.

### Services List
Edit `src/pages/Services.tsx` - `services` array

### Portfolio Experiences
Edit `src/pages/Portfolio.tsx` - `experiences` array

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Professional portfolio website for Ronald Obal.

---

For questions or updates, contact: ronaldobal20@gmail.com
