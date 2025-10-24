# OwlEye Aerial Intelligence Website

A professional, high-end website for a commercial drone services company specializing in precision aerial intelligence and cinematography.

## Features

### 🎬 Full-Screen Video Hero
- Immersive full-viewport video background
- Smooth overlay with professional typography
- Responsive video scaling across all devices
- Fallback support for video loading issues

### 🎨 Design Elements
- **Dark Theme**: Sophisticated charcoal/navy base with electric blue accents
- **Minimalist Layout**: Clean, geometric design with ample negative space
- **Professional Typography**: Inter font family with precise spacing
- **Smooth Animations**: Scroll-based reveals and hover effects

### 📱 Responsive Design
- Mobile-first approach with hamburger navigation
- Optimized layouts for desktop, tablet, and mobile
- Touch-friendly interactions and button sizing
- Accessible keyboard navigation support

### 🚁 Service Sections
1. **LiDAR & Geospatial Mapping**
   - Millimeter-level accuracy specifications
   - 3D modeling and volume calculations
   - Terrain mapping capabilities

2. **Industrial Inspection**
   - Thermal imaging analysis
   - Structural health monitoring
   - Predictive maintenance solutions

3. **Aerial Cinematography**
   - 8K video production
   - Professional photography services
   - Real-time streaming capabilities

### 🔧 Technical Features
- **Performance Optimized**: Lazy loading and resource preloading
- **SEO Ready**: Semantic HTML structure and meta tags
- **Accessibility**: WCAG compliant with keyboard navigation
- **Cross-browser Compatible**: Modern browser support

## File Structure

```
owleye3/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
└── README.md          # Project documentation
```

## Setup Instructions

1. **Clone or Download** the project files to your local directory
2. **Open** `index.html` in a modern web browser
3. **For Development**: Use a local server (Live Server, Python's http.server, etc.)

### Local Server Setup (Recommended)

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Customization Guide

### Colors
Update the CSS custom properties in `styles.css`:
```css
:root {
    --primary-dark: #1a1a1a;        /* Main background */
    --secondary-dark: #2a2a2a;      /* Section backgrounds */
    --accent-electric: #00d4ff;     /* Accent color */
    --text-primary: #ffffff;        /* Main text */
    --text-secondary: #b0b0b0;      /* Secondary text */
}
```

### Video Background
Replace the video source in `index.html`:
```html
<source src="your-video-file.mp4" type="video/mp4">
```

### Content
- Update company name, services, and contact information in `index.html`
- Modify service descriptions and statistics
- Replace placeholder contact details

### Branding
- Update the logo text in the navigation
- Modify the hero title and subtitle
- Customize service icons and descriptions

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Features

- **Optimized Assets**: Compressed and minified resources
- **Lazy Loading**: Images and non-critical content load on demand
- **Smooth Scrolling**: Hardware-accelerated animations
- **Video Optimization**: Efficient video loading with fallbacks

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast color scheme
- Focus indicators for interactive elements

## Mobile Optimization

- Touch-friendly navigation
- Optimized video playback for mobile devices
- Responsive typography scaling
- Mobile-specific interaction patterns

## Contact Form

The contact form includes client-side validation and a notification system. For production use, you'll need to:

1. Add server-side form processing
2. Implement spam protection (reCAPTCHA)
3. Set up email delivery system
4. Add form data validation and sanitization

## License

This project is created for commercial use. Customize and deploy as needed for your drone services business.

## Support

For technical questions or customization requests, refer to the code comments or create an issue in your project repository.

---

**Built with modern web technologies for optimal performance and user experience.**
