# Chamber of Commerce - Home Page (W03)

## Files Created/Modified

### New Files:
1. **chamber/index.html** - Home page with hero image, events, weather, and spotlights sections
2. **chamber/styles/home.css** - Home page specific styling
3. **chamber/scripts/index.js** - JavaScript for weather API, spotlights, and navigation
4. **chamber/images/hero-image.jpg** - SVG hero image placeholder

### Modified Files:
1. **chamber/directory.html** - Updated navigation to link to home page (index.html)

## Features Implemented

### Required Components:
✅ **Hero Image** - Large banner image with call-to-action button
✅ **Call to Action** - "Join the Chamber" button linking to future join page
✅ **Current Events Section** - Displays upcoming chamber events
✅ **Weather Section** - Real-time weather using OpenWeatherMap API
  - Current temperature
  - Weather description
  - 3-day temperature forecast
✅ **Company Spotlights** - Randomly selected Gold/Silver members
  - Company name, logo, phone, address
  - Website link and membership level
  - Responsive layout (2-3 members)

### Technical Implementation:
- **API Integration**: OpenWeatherMap API for real-time weather data
- **Async/Await**: Used for fetching weather and member data
- **JSON Fetching**: Member data pulled from data/members.json
- **Responsive Design**: Mobile-first approach with breakpoints at 768px
- **Consistent Design**: Shared header, navigation, and footer with directory page

## Testing Instructions

1. Open the chamber folder in VS Code
2. Use "Live Server" extension to launch the local development server
3. Navigate to `http://localhost:5500/chamber/` to view the home page
4. Test responsiveness by resizing browser or using DevTools device emulation
5. Verify links between index.html and directory.html work correctly

### Browser DevTools Checks:
- **Console**: Check for JavaScript errors
- **CSS Overview**: Verify color contrast meets WCAG standards
- **Lighthouse**: Run audits for:
  - Accessibility
  - Best Practices
  - SEO
  - Performance

## Weather API Setup

The page uses OpenWeatherMap's free API with a test key included. To use your own:
1. Sign up at https://openweathermap.org/api
2. Replace the `WEATHER_API_KEY` constant in `scripts/index.js`

## Notes for Future Development

- The "Join the Chamber" CTA link needs to be updated to point to a join page (once created)
- Event data is currently hardcoded; can be replaced with a data source
- Hero image is an SVG placeholder and should be replaced with actual photography
