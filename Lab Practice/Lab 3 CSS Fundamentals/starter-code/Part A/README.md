# Lab 3 Starter Code

## Project Structure

Lab 3 uses a **flat structure** - perfect for learning CSS fundamentals:

```
your-project/
├── index.html          # Main entry point
├── styles.css          # Your stylesheet
└── images/             # All image files
```

> **Why flat?** When starting with CSS, keeping files simple helps you focus on learning styles without worrying about complex folder navigation.

## Files Included

1. **practice.html** - HTML file for Part A practice exercises
2. **practice.css** - CSS file for Part A (add your practice styles here)
3. **styles-template.css** - Template for Part B dashboard styling

## Instructions

### Part A: CSS Practice

1. Open `practice.html` in your browser
2. Edit `practice.css` to add styles as you work through each module
3. Add HTML elements to `practice.html` as needed for each module

### Part B: Dashboard Styling

1. Copy your `index.html` (and other HTML pages) from Lab 2 to this folder
2. Create an `images/` folder for any images you use
3. Copy `styles-template.css` and rename it to `styles.css`
4. Link the CSS file in your HTML: `<link rel="stylesheet" href="styles.css">`
5. Fill in the TODO sections with your CSS rules

**Your final structure should look like:**
```
Lab3-CSS-Fundamentals/
├── index.html
├── budget-tracker.html
├── goal-planner.html
├── account-application.html
├── styles.css
└── images/
    └── (your image files)
```

## Color Scheme Reference

| Color | Variable | Hex Code |
|-------|----------|----------|
| Primary | `--primary-color` | #2c3e50 |
| Secondary | `--secondary-color` | #3498db |
| Success | `--accent-success` | #27ae60 |
| Warning | `--accent-warning` | #f39c12 |
| Danger | `--accent-danger` | #e74c3c |

## Tips

- Use CSS variables for consistent colors
- Test your styles in the browser as you go
- Use browser DevTools to debug CSS issues
- Remember to add transitions for interactive states
