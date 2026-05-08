# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**スタイリッシュ企画書メーカー** - A stylish proposal maker web application built with vanilla JavaScript. No build process required.

This is a **static web application** designed for beginners. All functionality is implemented in plain HTML, CSS, and JavaScript with CDN-hosted libraries.

## Development Environment

### Running the Application

```bash
# Method 1: Direct file open
# Simply open index.html in a web browser

# Method 2: Local HTTP server (recommended for testing)
python3 -m http.server 8000
# Then access: http://localhost:8000
```

### File Structure

```
my-first-app/
├── index.html        # Main HTML - includes all UI elements and modals
├── css/
│   └── style.css     # All styles organized by phase (Phase 1, 2, 3)
├── js/
│   └── app.js        # All JavaScript functionality
└── README.md
```

## Architecture

### Three-Phase Implementation

The application was built incrementally in three phases:

**Phase 1 (Core):**
- Two-column layout (editor panel + preview panel)
- Real-time preview system
- Template switching (Modern, Professional, Creative)

**Phase 2 (Enhanced):**
- Image upload (FileReader API)
- Color customization
- PDF export (html2canvas + jsPDF)
- LocalStorage persistence with auto-save (5-second interval)

**Phase 3 (Advanced):**
- Font selection (Google Fonts integration)
- Dynamic section management (add/remove sections)
- Chart insertion (Chart.js v4.4.0)
- SVG illustration generation (6 types)

### Key Architecture Patterns

**1. Initialization Flow**
```javascript
DOMContentLoaded → initializeApp() → setup*() functions
```
All features are initialized in `initializeApp()` which calls individual setup functions.

**2. Real-time Preview System**
- Left panel: Input fields (`#proposal-*` IDs)
- Right panel: Preview elements (`.doc-*` classes)
- Event listeners update preview on every input change
- Animation effects on updates

**3. Data Persistence**
```javascript
getProposalData() → localStorage.setItem()
loadSavedData() → restore all inputs and preview
```
Saves: text inputs, images (Base64), template selection, custom colors

**4. Modal System**
Two modals for advanced features:
- `#chart-modal`: Chart creation with data input
- `#illustration-modal`: SVG illustration selection

**5. Dynamic Elements**
Elements can be added/removed at runtime:
- Sections (contenteditable)
- Charts (Chart.js instances)
- Illustrations (SVG)

### External Dependencies (CDN)

All loaded via `<script>` tags in index.html:
- **html2canvas** (1.4.1): HTML to image conversion
- **jsPDF** (2.5.1): PDF generation
- **Chart.js** (4.4.0): Chart rendering
- **Google Fonts**: 5 font families

### CSS Organization

Organized with clear section comments:
```css
/* Phase 1: Basic layout */
/* Phase 2: New features (image upload, colors, actions) */
/* Phase 3: Advanced features (fonts, sections, charts, modals) */
```

Each template (modern/professional/creative) has dedicated CSS rules.

### JavaScript Organization

Functions are grouped by feature:
- Setup functions: `setup*()` - Initialize event listeners
- Data functions: `getProposalData()`, `saveProposalData()`, `loadSavedData()`
- Action functions: `exportToPDF()`, `createChart()`, `insertIllustration()`
- Helper functions: `animateElement()`, `generateIllustrationSVG()`

Global functions exposed via `window.*` for HTML onclick handlers:
- `removeChart(chartId)`
- `removeIllustration(illustrationId)`

## Adding New Features

### Adding a New Input Field

1. Add HTML input in `.editor-panel`
2. Add preview element in `.proposal-document`
3. Add event listener in `setupRealtimePreview()` or create new setup function
4. Update `getProposalData()` to include in saved data
5. Update `loadSavedData()` to restore from localStorage

### Adding a New Template

1. Add button in `.template-buttons` with `data-template="name"`
2. Add CSS rules for `.proposal-document.name`
3. Update color defaults in `setupColorCustomizer()`

### Adding a New Modal Feature

1. Create modal HTML structure with `.modal` class
2. Add CSS in Phase 3 section
3. Create setup function with open/close handlers
4. Implement the feature logic

## Testing

No automated tests. Manual testing checklist:

**Phase 1:**
- [ ] Input text appears in preview
- [ ] Template switching works
- [ ] Responsive layout (mobile/tablet/desktop)

**Phase 2:**
- [ ] Image upload and preview
- [ ] Color picker updates preview
- [ ] Save/load from localStorage
- [ ] PDF export downloads
- [ ] Auto-save triggers every 5 seconds

**Phase 3:**
- [ ] Font selector changes preview font
- [ ] Section add/remove works
- [ ] Chart creation with valid data
- [ ] Illustration insertion
- [ ] Modal open/close behavior

## Common Issues

**PDF Export:**
- Uses html2canvas which may have issues with external images
- Set `useCORS: true` for cross-origin images

**LocalStorage:**
- Images stored as Base64 can hit 5-10MB storage limits
- Check browser console for QuotaExceededError

**Chart.js:**
- Chart instances are not cleaned up when removed (potential memory leak)
- Charts need unique canvas IDs (uses counter: `chart-${chartCounter}`)

## Code Style

**For Beginners:**
- Extensive Japanese comments explaining each section
- ES5-style functions (not arrow functions) for clarity
- Descriptive variable names
- Console.log statements for debugging

**Conventions:**
- Use `function() {}` callbacks (not arrow functions)
- CSS organized by phase with comment headers
- IDs for unique elements, classes for repeated elements
- BEM-like naming for CSS (e.g., `.doc-section`, `.section-title`)

## GitHub Pages Deployment

Set source to the branch: `claude/stylish-proposal-app-011CUpXEwtVkEV1oUnLNADB7`
No build step needed - deploys as static site.
