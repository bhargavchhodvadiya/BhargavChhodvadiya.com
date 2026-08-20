# Bhargav Chhodvadiya — Portfolio Website

A modern, dynamic, and fully responsive portfolio website for **Bhargav Chhodvadiya** — System Administrator & IT Infrastructure Specialist with 3+ years of professional experience.

## Features

| Feature | Description |
|---------|-------------|
| Contact Form | Working contact form with EmailJS - visitors submit message, you receive email |
| Dark/Light Theme | Toggle between dark and light mode with persistence |
| Preloader | Smooth loading animation on page load |
| Custom Cursor | Animated cursor dot + ring on desktop |
| Typing Animation | Auto-cycling role titles with typewriter effect |
| Animated Skill Bars | Progress bars fill with glow effects on scroll |
| Counter Animation | Stats count up with smooth easing |
| Floating Particles | Subtle amber particles in hero section |
| Scroll Reveal | Sections fade in with staggered animations |
| 3D Tilt Cards | Experience & contact cards tilt on hover |
| Active Nav Tracking | Navbar highlights current section |
| Mobile Responsive | Fully responsive across all devices |
| Back to Top | Floating button appears after scrolling |
| Resume Download | Direct PDF download on button click |
| Print Friendly | Clean print styles included |

## Project Structure

```
portfolio/
├── index.html          # Main HTML structure
├── style.css           # Styling, animations, themes & responsive
├── script.js           # Interactions, animations, contact form
├── *.pdf               # Resume file
└── README.md           # Documentation
```

## Contact Form Setup (EmailJS)

The contact form uses **EmailJS** (free tier: 200 emails/month) to send messages directly to your email without a backend.

### Setup Steps:

1. **Create account** at [emailjs.com](https://www.emailjs.com/) (free)

2. **Add email service:**
   - Go to Email Services > Add New Service
   - Connect your Gmail/Outlook/etc.
   - Note the **Service ID** (e.g. `service_xxxxxxx`)

3. **Create email template:**
   - Go to Email Templates > Create New Template
   - Subject: `New message from {{name}}`
   - Body: Use the HTML template with variables `{{name}}`, `{{time}}`, `{{message}}`
   - Note the **Template ID** (e.g. `template_xxxxxxx`)

4. **Get API key:**
   - Go to Account > API Keys
   - Note the **Public Key**

5. **Update `script.js`:**
   ```javascript
   const EMAILJS_SERVICE_ID = 'service_xxxxxxx';     // Your Service ID
   const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx';   // Your Template ID
   const EMAILJS_PUBLIC_KEY = 'your_public_key';      // Your Public Key
   ```

6. **Deploy** - that's it! Messages will arrive in your email inbox.

## Deployment

This is a **static website** — no build step required. Deploy anywhere:

### GitHub Pages
1. Push to a GitHub repo
2. Settings > Pages > Source > Deploy from branch
3. Select `main` branch

### Netlify
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag & drop the folder

### Vercel
```bash
npx vercel
```

## Tech Stack

- **HTML5** — Semantic markup with SEO meta tags
- **CSS3** — Custom properties, Grid, Flexbox, animations, dark/light themes
- **JavaScript** — Intersection Observer, typed effect, counters, tilt, EmailJS
- **EmailJS** — Serverless email sending from contact form
- **Google Fonts** — Inter + JetBrains Mono
- **Zero build tools** — Pure vanilla, no frameworks

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | Full |
| Firefox | Full |
| Safari | Full |
| Edge | Full |
| Mobile Browsers | Full |

## Contact

- **Phone:** +91 7573852073
- **Email:** Bhargav.chhodvadiya@outlook.com
- **LinkedIn:** [linkedin.com/in/bhargavchhodvadiya](https://www.linkedin.com/in/bhargavchhodvadiya)

## License

(c) 2024 Bhargav Chhodvadiya. All rights reserved.
