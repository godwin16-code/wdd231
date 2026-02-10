# Testing & Validation Guide

## Local Testing Setup

### Prerequisites
- Web server (Python, Node.js, or VS Code Live Server)
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Running Locally

**Option 1: Python (Built-in)**
```bash
cd final/
python -m http.server 8000
# Then visit http://localhost:8000
```

**Option 2: Node.js http-server**
```bash
npm install -g http-server
cd final/
http-server
```

**Option 3: VS Code Live Server**
1. Install Live Server extension
2. Right-click index.html
3. Select "Open with Live Server"

## Functional Testing

### Navigation Testing
- [ ] Hamburger menu appears on mobile (< 768px)
- [ ] Hamburger menu toggles navigation on click
- [ ] Navigation menu disappears on larger screens
- [ ] All navigation links work and go to correct pages
- [ ] Current page is distinguishable in nav

### Menu Functionality
- [ ] Menu items load from JSON file
- [ ] All 16 items display
- [ ] Filters work correctly:
  - [ ] All Items shows everything
  - [ ] Appetizers filter works
  - [ ] Entrees filter works
  - [ ] Desserts filter works
  - [ ] Vegetarian filter works
  - [ ] Seasonal filter works
- [ ] Sorting works:
  - [ ] By name (alphabetical)
  - [ ] By price (low to high)
  - [ ] By price (high to low)

### Modal Interaction
- [ ] Click "Details" on menu item opens modal
- [ ] Modal displays all item information
- [ ] "Add to Favorites" button works
- [ ] Close button (×) closes modal
- [ ] Clicking outside modal closes it

### Local Storage
- [ ] Add item to favorites
- [ ] Refresh page - favorites persist
- [ ] Open different browser tab - data accessible
- [ ] Clear favorites clears local storage
- [ ] Preferences saved and restored

### Form Submissions
- [ ] Contact form validates required fields
- [ ] Reservation form validates required fields
- [ ] Forms submit (check console for POST)
- [ ] Form-action page displays submission data
- [ ] Email and phone links work

### Responsive Design
- [ ] Test at 320px width (mobile)
- [ ] Test at 768px width (tablet)
- [ ] Test at 1024px width (desktop)
- [ ] No horizontal scrolling at any width
- [ ] Text readable on all sizes
- [ ] Images scale appropriately
- [ ] Forms are usable on mobile

## Browser Compatibility Testing

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)  
- [ ] Edge (latest)

### Mobile Browsers
- [ ] iOS Safari
- [ ] Chrome Mobile
- [ ] Firefox Mobile

### Known Issues to Check
- [ ] CSS Grid support (IE 11 won't work, but that's OK)
- [ ] ES Modules support (IE 11 won't work, but that's OK)
- [ ] Fetch API support

## Developer Tools Testing

### Console Errors
```bash
# Check for JavaScript errors
1. Open DevTools (F12)
2. Go to Console tab
3. Should see no red errors
4. Menu data should load successfully
```

### Network Performance
```bash
1. DevTools → Network tab
2. Hard refresh (Ctrl+Shift+R)
3. Check file sizes:
   - index.html: < 20KB
   - main.css: < 30KB
   - Each .mjs file: < 5KB
   - menu.json: < 5KB
4. Total: < 100KB (excluding images)
```

### Lighthouse Audit
```bash
1. DevTools → Lighthouse
2. Run audit for both Mobile and Desktop
3. Check scores:
   - Performance: > 80
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90
4. Note any warnings or opportunities
```

### CSS Overview (Color Contrast)
```bash
1. DevTools → More Tools → CSS Overview
2. Check color contrast issues
3. Fix any "Fail AA" or "Fail AAA" items
4. Verify all text meets WCAG AA standards
```

## Accessibility Testing

### Manual Accessibility Checks
- [ ] Can navigate entirely with keyboard (Tab, Enter)
- [ ] All buttons and links are clickable
- [ ] Form labels associated with inputs
- [ ] Images have alt text (if added)
- [ ] Color contrast sufficient (test with Lighthouse)
- [ ] Focus indicator visible on interactive elements

### Screen Reader Testing (Optional)
```bash
# Windows: Narrator (built-in)
# Mac: VoiceOver (built-in)
# NVDA (free): https://www.nvaccess.org

- [ ] Page structure makes sense when read aloud
- [ ] Buttons and links are announced correctly
- [ ] Form labels are read with inputs
```

## SEO Testing

### Meta Tags
```bash
1. View page source (Ctrl+U)
2. Check each page has:
   - [ ] Unique <title>
   - [ ] Unique meta description
   - [ ] meta author
   - [ ] meta charset
   - [ ] viewport meta tag
   - [ ] Open Graph tags (og:title, og:description)
```

### Structured Data
```bash
# Optional: Test with Google's Structured Data Testing Tool
# https://search.google.com/structured-data/testing-tool
```

## JavaScript Module Testing

### Module Loading
```javascript
// Open Console and verify:
1. No module path errors
2. All imports resolve correctly
3. Menu data fetches successfully
4. Local storage operations work
```

### Try/Catch Testing
```javascript
// Verify error handling works:
1. Rename data/menu.json temporarily
2. Refresh page
3. Should show error message, not break
4. Restore file
5. Page should work again
```

### Console Tests
```javascript
// Run these in browser console:

// Test 1: Check menu module
import('./scripts/menuService.mjs').then(m => {
  console.log('Menu module loaded:', m);
});

// Test 2: Check storage
localStorage.setItem('test', 'value');
console.log(localStorage.getItem('test')); // Should print "value"

// Test 3: Check DOM
console.log(document.querySelectorAll('.menu-card').length); 
// Should print 16
```

## Performance Optimization Checklist

- [ ] CSS minified (optional but recommended)
- [ ] JavaScript modules organized
- [ ] No large images (use web-optimized versions)
- [ ] Favicon loads quickly
- [ ] Minimal render-blocking resources
- [ ] Efficient DOM queries

## Known Limitations & Notes

1. **Form Submission**: Currently POSTs to form-action.html (displays GET params)
   - Real implementation needs backend server
   - Works for demo purposes

2. **Images**: Placeholder system ready
   - Add actual images to /images folder
   - Update src in HTML to point to images
   - Use responsive image techniques

3. **Map Integration**: Links to Google Maps
   - Can integrate Google Maps SDK if needed
   - Currently just links to Google Maps directions

4. **API Integration**: Uses local JSON file
   - Can replace with real API call
   - Maintains same fetch/error handling pattern

## Deployment Checklist

### Before Going Live
- [ ] All testing complete
- [ ] No console errors
- [ ] Lighthouse scores acceptable
- [ ] Accessibility issues resolved
- [ ] Mobile layout verified
- [ ] Forms tested thoroughly
- [ ] Video link added and verified
- [ ] All attributions in place

### File Upload
- [ ] Upload entire /final folder to hosting
- [ ] Ensure folder structure maintained
- [ ] Test on server (different from local)
- [ ] Check for 404 errors
- [ ] Verify all URLs work

### Server Configuration
- [ ] Set up HTTPS (recommended)
- [ ] Configure proper mime types
- [ ] Set cache headers appropriately
- [ ] Enable gzip compression
- [ ] Configure redirects if needed

## Video Demonstration Setup

### Recording Requirements
1. Screen recording software:
   - Loom (free, simple)
   - OBS Studio (free, powerful)
   - ScreenFlow (Mac)
   - Camtasia (all platforms)

2. Content to demonstrate (3-5 minutes):
   - [ ] Menu loading from JSON with error handling
   - [ ] Filter functionality using array methods
   - [ ] Modal dialog interaction
   - [ ] Local storage persistence
   - [ ] Form submission

3. Upload to:
   - YouTube
   - Loom
   - Other public video service

4. Add link to footer HTML:
```html
<a href="[YOUR_VIDEO_URL]" target="_blank" rel="noopener">📹 Demo Video</a>
```

## Troubleshooting Common Issues

### Menu not loading
- [ ] Check browser console for fetch errors
- [ ] Verify data/menu.json exists
- [ ] Check file paths are relative correctly
- [ ] Try with web server instead of file://

### Styles not applying
- [ ] Check styles/main.css path
- [ ] Verify normalize.css loads first
- [ ] Check for CSS syntax errors in console
- [ ] Clear browser cache (Ctrl+Shift+Delete)

### JavaScript errors
- [ ] Check console for error messages
- [ ] Verify all .mjs files exist
- [ ] Check module import paths
- [ ] Verify menu.json is valid JSON

### Hamburger menu not working
- [ ] Check Javascript loads correctly
- [ ] Verify event listeners attached
- [ ] Test in different viewport size
- [ ] Check z-index of mobile menu

### Form not submitting
- [ ] Verify form method is correct
- [ ] Check action attribute
- [ ] Verify all required fields filled
- [ ] Check browser allows form submission

---

## Quick Test Shortcuts

```javascript
// Open Console and run:

// Test 1: Verify all modules load
Promise.all([
  import('./scripts/app.mjs'),
  import('./scripts/menuService.mjs'),
  import('./scripts/domUtils.mjs'),
  import('./scripts/storageManager.mjs')
]).then(() => console.log('All modules loaded successfully!'));

// Test 2: Check menu data
fetch('./data/menu.json')
  .then(r => r.json())
  .then(d => console.log(`Loaded ${d.menu.length} items`));

// Test 3: Verify local storage works
try {
  localStorage.setItem('test', 'works');
  console.log('Local storage:', localStorage.getItem('test'));
  localStorage.removeItem('test');
} catch(e) {
  console.error('Local storage error:', e);
}
```

---

**Last Updated:** February 2024  
**Testing Guide for:** Harvest & Hearth Restaurant Project
