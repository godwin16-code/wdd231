# Harvest & Hearth Restaurant Website

A modern, responsive farm-to-table restaurant website built with semantic HTML5, vanilla CSS, and ES6 JavaScript modules.

## Project Overview

**Harvest & Hearth** is a fine dining restaurant concept showcasing locally-sourced ingredients from regional farm partners. This website provides a complete dining reservation system, dynamic menu display, and information architecture for customers to explore and interact with the restaurant's offerings.

## Project Structure

```
final/
├── index.html              # Home page with featured items
├── menu.html              # Full menu browser with filters
├── about-contact.html     # About restaurant & contact form
├── reservation.html       # Reservation booking form
├── form-action.html       # Form submission confirmation page
├── attributions.html      # Credits and sources
├── data/
│   └── menu.json         # 16+ menu items with 4+ properties each
├── scripts/
│   ├── app.mjs           # Main application module
│   ├── menuService.mjs   # Menu data fetching & processing
│   ├── domUtils.mjs      # DOM manipulation utilities
│   ├── storageManager.mjs # Local storage operations
│   └── formHandler.js    # Form handling utilities
├── styles/
│   ├── normalize.css     # CSS reset
│   └── main.css          # Main stylesheet (responsive design)
└── images/               # Image directory for optimization
```

## Features

### JavaScript Requirements Met

✓ **Data Fetching**: Asynchronous menu data retrieval from JSON file using Fetch API
✓ **Error Handling**: Try/catch blocks implemented for robust error handling
✓ **Dynamic Content**: Generates 16 menu items with 4+ properties (name, price, description, category, etc.)
✓ **Local Storage**: Persists user favorites and preferences
✓ **Modal Dialogs**: Interactive modal for viewing menu item details
✓ **DOM Manipulation**: Queryselector methods with element property modifications
✓ **Event Listeners**: Click, submit, and change event handlers throughout
✓ **Array Methods**: Filter, map, and sort for processing menu data
✓ **Template Literals**: Used for dynamic HTML content generation
✓ **ES Modules**: Organized code structure across multiple modules

### Web Standards

✓ **Semantic HTML**: Proper use of header, nav, main, footer, and section elements
✓ **Responsive Design**: Mobile-first approach (320px+), hamburger navigation
✓ **Accessibility**: ARIA labels, semantic markup, sufficient color contrast
✓ **SEO Optimization**: Meta descriptions, Open Graph tags, semantic titles
✓ **Performance**: Lazy loading ready, optimized for page weight < 500KB
✓ **Cross-browser**: Tested for compatibility

## Color Scheme

- **Primary**: Forest Green (#2D5016)
- **Secondary**: Warm Gold (#D4A574)
- **Accent**: Cream/Off-white (#F5F1E8)
- **Text**: Charcoal Gray (#2C2C2C)

## Typography

- **Headings**: Merriweather (serif, 400/700)
- **Body**: Lato (sans-serif, 400/700)

## Key Pages

### 1. **index.html** (Home)
- Featured menu preview
- Favorites display (using local storage)
- Location and farm partner information
- Call-to-action buttons

### 2. **menu.html** (Full Menu)
- Browse all 16+ menu items
- Filter by category (appetizers, entrees, desserts)
- Filter by dietary type (vegetarian, seasonal)
- Sort by price or name
- Interactive modal details view

### 3. **about-contact.html** (Information)
- Restaurant philosophy and story
- Four-pillar mission (local sourcing, seasonal menus, sustainability, community)
- Quick contact form
- Location and hours information
- Google Maps link

### 4. **reservation.html** (Booking)
- Comprehensive reservation form
- Date/time selection
- Party size configuration
- Dietary restrictions and special occasions
- Cancellation policy information

### 5. **form-action.html** (Confirmation)
- Displays submitted form data
- Confirmation message
- Next steps guidance
- Links back to main site

## How to Use

### Local Development

1. Open `index.html` in a web browser
2. Navigate between pages using the navigation menu
3. Try the following features:
   - Filter menu items by category and dietary type
   - Click "Details" on menu items to open modal
   - Add items to favorites (persists with local storage)
   - Fill out and submit forms
   - Test responsive design by resizing browser

### Menu Filtering

**By Category:**
- All Items
- Appetizers
- Entrees
- Desserts

**By Dietary:**
- All Items
- Vegetarian only
- Seasonal only

**Sorting Options:**
- Name (A-Z)
- Price: Low to High
- Price: High to Low

### Local Storage Features

- **Favorites**: Saved menu items persist across browser sessions
- **User Preferences**: Dietary restrictions and sort preferences
- **Visit Counter**: Tracks return visits

## Technical Implementation Details

### Fetch API with Error Handling

```javascript
// menuService.mjs - Demonstrates error handling
export async function getMenuData() {
  try {
    const response = await fetch('../data/menu.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.menu;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    throw error;
  }
}
```

### Module Organization

Four main modules handle different concerns:
- **app.mjs**: Application initialization and orchestration
- **menuService.mjs**: Data operations and filtering
- **domUtils.mjs**: DOM rendering and manipulation
- **storageManager.mjs**: Local storage persistence

### Responsive Navigation

Desktop displays horizontal nav; mobile shows hamburger menu that expands when clicked.

## File Size & Optimization

- Main CSS: Optimized with no unused declarations
- JSON data: Minimal and efficient structure
- JavaScript: Modular for better performance
- Images: Ready for optimization with lazy loading
- Total page weight: Under 500KB target

## Browser Compatibility

Tested and compatible with:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- Semantic HTML5 markup
- ARIA labels on interactive elements
- Sufficient color contrast ratios
- Keyboard navigation support
- Form validation and error messages

## Future Enhancements

- Payment integration for online reservations
- User accounts and booking history
- Real-time availability calendar
- Integration with third-party reservation system
- Chef's blog or news section
- Photo gallery of dishes and restaurant

## Credits & Attribution

See [attributions.html](attributions.html) for complete sources and credits.

**Project by:** Godwin Iwajomo  
**Course:** BYU-I WDD 231  
**Date:** February 2024

---

*This project demonstrates modern web development practices using HTML5, CSS3, and vanilla JavaScript with ES Modules for a professional, responsive dining website.*
