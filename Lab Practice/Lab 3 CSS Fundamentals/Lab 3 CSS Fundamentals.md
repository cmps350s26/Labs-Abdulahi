<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 356 - Web Development Fundamentals</strong>
</p>

---

# Lab 3: CSS Fundamentals

# Dashboard Styling - Transform Your Finance Dashboard

**Duration:** 120 minutes
**Theme:** Personal Finance Platform - Part 3 of 11
**Prerequisites:** Labs 1 and 2 completed

---

## Overview

This lab introduces **CSS Fundamentals** - the styling language that transforms plain HTML into visually appealing web pages. You'll learn to apply colors, typography, spacing, and visual effects to create a professional-looking interface.

To apply these concepts practically, you'll style your **MyFinance Dashboard** from Labs 1 and 2, giving it a polished, professional appearance with a consistent color scheme, modern typography, and well-designed components.

This lab focuses on CSS basics. Lab 4 will cover responsive layouts with Flexbox and Grid.

### What You'll Build

A professionally styled MyFinance Dashboard featuring:

- Consistent color scheme with primary, secondary, and accent colors
- Modern typography with font families, sizes, and weights
- Styled cards for financial metrics
- Beautiful tables with zebra striping and hover effects
- Attractive buttons with hover states
- Styled sidebar and navigation
- Box shadows and rounded corners for depth

### Lab Structure

**Part A: Interactive CSS Basics (60 minutes)**
Instructor demonstrates each concept → You practice immediately → Repeat

**Part B: Style Your Dashboard (60 minutes)**
Apply all learned concepts to transform your MyFinance Dashboard

---

## Learning Objectives

By the end of this lab, you will be able to:

- Link CSS files to HTML documents
- Use CSS selectors (element, class, id, descendant)
- Apply the CSS box model (margin, padding, border)
- Work with colors (hex, RGB, HSL)
- Style typography (font-family, font-size, font-weight, line-height)
- Add backgrounds, borders, and shadows
- Use pseudo-classes (:hover, :active, :focus)
- Understand CSS specificity and the cascade

---

## Prerequisites

- Labs 1 and 2 completed (MyFinance Dashboard with forms)
- Understanding of HTML structure
- Text editor and browser ready

---

## Getting Started

1. Copy your Lab 2 files to a new folder: `Lab3-Dashboard-Styling`
2. Create a new file: `styles.css` in your working folder
3. Link the CSS file to your `index.html`
4. Open your text editor and browser side-by-side

---

# Part A: Interactive CSS Basics (60 minutes)

## Module 1: CSS Syntax and Linking (10 minutes)

### Instructor Led (5 minutes)

Demonstrate CSS syntax and how to link stylesheets:

<fieldset>
<legend><strong>CSS Syntax</strong></legend>

```css
/* CSS Rule Structure */
selector {
    property: value;
    property: value;
}

/* Example */
h1 {
    color: blue;
    font-size: 24px;
}
```

</fieldset>

Three ways to add CSS:

**1. External Stylesheet (Recommended):**

```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

**2. Internal Style Block:**

```html
<head>
    <style>
        h1 { color: blue; }
    </style>
</head>
```

**3. Inline Styles (Avoid):**

```html
<h1 style="color: blue;">Title</h1>
```

---

**Key Concepts Explained:**

- **Selector** - What to style (element, class, id)
- **Property** - What aspect to change (color, size, etc.)
- **Value** - The setting to apply (blue, 24px, etc.)
- **Declaration** - A property:value pair
- **Rule** - Selector + all declarations
- External stylesheets are preferred for maintainability

### Your Practice Exercise (5 minutes)

**Task:** Create and link a stylesheet

1. Create a new file named `practice.html` with basic HTML structure
2. Create a new file named `practice.css` in the same folder
3. Link the CSS file using `<link>` in the head
4. Add these styles to your CSS file:

```css
body {
    background-color: #f5f5f5;
}

h1 {
    color: #333;
}

p {
    color: #666;
}
```

**Expected Result:**

<img src="screenshots/module1-linking.png" alt="Module 1 - CSS Linking" width="500">

**Self-Check:**

- [X] CSS file is linked in the HTML head
- [X] Background color changes to light gray
- [X] Heading and paragraph colors change
- [X] No errors in browser console

---

## Module 2: CSS Selectors (10 minutes)

### Instructor Led (5 minutes)

Demonstrate different CSS selectors:

<fieldset>
<legend><strong>Selector Types</strong></legend>

```css
/* Element Selector - targets all elements of that type */
p {
    color: #333;
}

/* Class Selector - targets elements with that class */
.highlight {
    background-color: yellow;
}

/* ID Selector - targets ONE element with that id */
#main-title {
    font-size: 32px;
}

/* Descendant Selector - targets elements inside others */
nav a {
    text-decoration: none;
}

/* Multiple Selectors - same styles for multiple elements */
h1, h2, h3 {
    font-family: Arial, sans-serif;
}
```

</fieldset>

**HTML to match:**

```html
<h1 id="main-title">Title</h1>
<p class="highlight">Highlighted text</p>
<nav>
    <a href="#">Link</a>
</nav>
```

---

**Key Concepts Explained:**

- **Element selector** (`p`) - Selects all elements of that type
- **Class selector** (`.className`) - Selects elements with that class (can be reused)
- **ID selector** (`#idName`) - Selects ONE element with that id (unique per page)
- **Descendant selector** (`parent child`) - Selects child elements inside parent
- **Group selector** (`a, b, c`) - Applies same styles to multiple selectors

**Specificity Order (lowest to highest):**

1. Element selectors (`p`, `div`)
2. Class selectors (`.class`)
3. ID selectors (`#id`)
4. Inline styles (`style=""`)

### Your Practice Exercise (5 minutes)

**Task:** Use different selector types

Add to your `practice.html`:

1. Add `id="page-title"` to your h1
2. Add `class="intro"` to your first paragraph
3. Add a `<nav>` with 3 links

Add to your `practice.css`:

```css
/* ID selector */
#page-title {
    color: #2c3e50;
    font-size: 28px;
}

/* Class selector */
.intro {
    font-style: italic;
    color: #7f8c8d;
}

/* Descendant selector */
nav a {
    color: #3498db;
    text-decoration: none;
    margin-right: 15px;
}
```

**Expected Result:**

<img src="screenshots/module2-selectors.png" alt="Module 2 - CSS Selectors" width="500">

**Self-Check:**

- [X] Title has specific color and size from ID selector
- [X] Introduction paragraph is italic from class selector
- [X] Navigation links are blue without underlines

---

## Module 3: The Box Model (12 minutes)

### Instructor Led (6 minutes)

Demonstrate the CSS box model:

<fieldset>
<legend><strong>Box Model Diagram</strong></legend>

```
+------------------------------------------+
|              MARGIN                       |
|   +----------------------------------+   |
|   |           BORDER                 |   |
|   |   +--------------------------+   |   |
|   |   |        PADDING           |   |   |
|   |   |   +------------------+   |   |   |
|   |   |   |     CONTENT      |   |   |   |
|   |   |   |                  |   |   |   |
|   |   |   +------------------+   |   |   |
|   |   +--------------------------+   |   |
|   +----------------------------------+   |
+------------------------------------------+
```

</fieldset>

```css
.box {
    /* Content dimensions */
    width: 300px;
    height: 200px;

    /* Padding - space INSIDE the border */
    padding: 20px;              /* all sides */
    padding: 10px 20px;         /* vertical | horizontal */
    padding: 10px 20px 15px 25px; /* top | right | bottom | left */

    /* Border */
    border: 2px solid #333;
    border-radius: 8px;         /* rounded corners */

    /* Margin - space OUTSIDE the border */
    margin: 20px;
    margin: 0 auto;             /* center horizontally */

    /* Box sizing (recommended) */
    box-sizing: border-box;     /* width includes padding + border */
}
```

---

**Key Concepts Explained:**

- **Content** - The actual content (text, images)
- **Padding** - Space between content and border (inside)
- **Border** - The visible edge of the box
- **Margin** - Space between this box and others (outside)
- **box-sizing: border-box** - Width/height includes padding and border (easier math!)

**Shorthand Order:** Top, Right, Bottom, Left (clockwise from top)

### Your Practice Exercise (6 minutes)

**Task:** Apply box model properties

Add a card element to your HTML:

```html
<div class="card">
    <h2>Card Title</h2>
    <p>This is a card with box model styling.</p>
</div>
```

Style it in CSS:

```css
.card {
    width: 300px;
    padding: 20px;
    margin: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: white;
    box-sizing: border-box;
}
```

**Expected Result:**

<img src="screenshots/module3-box-model.png" alt="Module 3 - Box Model" width="500">

**Self-Check:**

- [X] Card has visible padding (space inside)
- [X] Card has visible margin (space outside)
- [X] Card has rounded corners
- [X] Card width is exactly 300px (due to box-sizing)

---

## Module 4: Colors and Typography (10 minutes)

### Instructor Led (5 minutes)

Demonstrate colors and fonts:

<fieldset>
<legend><strong>Color Formats</strong></legend>

```css
/* Named Colors */
color: red;
color: darkblue;

/* Hexadecimal (most common) */
color: #ff0000;        /* red */
color: #3498db;        /* blue */
color: #333;           /* short form for #333333 */

/* RGB */
color: rgb(52, 152, 219);

/* RGBA (with transparency) */
color: rgba(52, 152, 219, 0.5);  /* 50% transparent */

/* HSL (Hue, Saturation, Lightness) */
color: hsl(204, 70%, 53%);
```

</fieldset>

```css
/* Typography */
body {
    font-family: 'Segoe UI', Tahoma, sans-serif;
    font-size: 16px;           /* base size */
    line-height: 1.6;          /* spacing between lines */
    color: #333;
}

h1 {
    font-family: Georgia, serif;
    font-size: 2.5rem;         /* relative to root font size */
    font-weight: 700;          /* bold */
    letter-spacing: -0.5px;    /* tighten letters */
}

.muted {
    color: #999;
    font-size: 0.875rem;       /* smaller than base */
}
```

---

**Key Concepts Explained:**

- **Hex colors** - 6-digit codes (#RRGGBB) or 3-digit shorthand (#RGB)
- **Font stacks** - List fonts in order of preference with fallback
- **rem/em units** - Relative sizes (rem = root, em = parent)
- **line-height** - Vertical spacing between lines (1.5-1.8 is readable)
- **font-weight** - 100-900 or keywords (normal=400, bold=700)

### Your Practice Exercise (5 minutes)

**Task:** Create a color scheme and typography

Define CSS variables (optional but helpful):

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #27ae60;
    --text-color: #333;
    --text-muted: #7f8c8d;
    --bg-color: #f8f9fa;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--bg-color);
}

h1, h2, h3 {
    color: var(--primary-color);
    font-weight: 600;
}

a {
    color: var(--secondary-color);
}
```

**Expected Result:**

<img src="screenshots/module4-colors-typography.png" alt="Module 4 - Colors and Typography" width="500">

**Self-Check:**

- [X] Body text uses custom font family
- [X] Headings use primary color
- [X] Links use secondary color
- [X] Background uses background color variable

---

## Module 5: Backgrounds and Borders (8 minutes)

### Instructor Led (4 minutes)

Demonstrate backgrounds and borders:

<fieldset>
<legend><strong>Background Properties</strong></legend>

```css
.hero {
    /* Solid color */
    background-color: #3498db;

    /* Gradient */
    background: linear-gradient(135deg, #3498db, #2c3e50);

    /* Image */
    background-image: url('hero-bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.bordered {
    /* Border shorthand */
    border: 2px solid #ddd;

    /* Individual sides */
    border-top: 3px solid #3498db;
    border-bottom: 1px solid #eee;

    /* Rounded corners */
    border-radius: 8px;
    border-radius: 50%;          /* circle */
    border-radius: 8px 0 8px 0;  /* custom corners */
}
```

</fieldset>

---

**Key Concepts Explained:**

- **background-color** - Solid fill color
- **linear-gradient** - Smooth color transition
- **background-size: cover** - Fill container, crop if needed
- **border-radius** - Round corners (50% makes circles)
- **Border shorthand** - width, style, color in one line

### Your Practice Exercise (4 minutes)

**Task:** Add backgrounds and borders

Add these elements and styles:

```html
<div class="hero-section">
    <h1>Welcome to MyFinance</h1>
</div>

<div class="feature-card">
    <h3>Track Expenses</h3>
    <p>Monitor your spending habits</p>
</div>
```

```css
.hero-section {
    background: linear-gradient(135deg, #3498db, #2c3e50);
    color: white;
    padding: 60px 20px;
    text-align: center;
    border-radius: 0 0 20px 20px;
}

.feature-card {
    background-color: white;
    border: 1px solid #e0e0e0;
    border-left: 4px solid #27ae60;
    border-radius: 8px;
    padding: 20px;
    margin: 15px 0;
}
```

**Expected Result:**

<img src="screenshots/module5-backgrounds-borders.png" alt="Module 5 - Backgrounds and Borders" width="500">

**Self-Check:**

- [X] Hero section has gradient background
- [X] Feature card has accent border on left
- [X] Both have rounded corners
- [X] Colors are visually appealing

---

## Module 6: Pseudo-classes and Shadows (10 minutes)

### Instructor Led (5 minutes)

Demonstrate interactive states and depth:

<fieldset>
<legend><strong>Pseudo-classes</strong></legend>

```css
/* Link states */
a:link { color: #3498db; }       /* unvisited */
a:visited { color: #9b59b6; }    /* visited */
a:hover { color: #2980b9; }      /* mouse over */
a:active { color: #1a5276; }     /* being clicked */
a:focus { outline: 2px solid #3498db; }  /* keyboard focus */

/* Button states */
.btn:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
}

.btn:active {
    transform: translateY(0);
}

/* Form states */
input:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}
```

</fieldset>

```css
/* Box Shadows */
.card {
    /* offset-x | offset-y | blur | spread | color */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Text Shadow */
h1 {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Transitions for smooth effects */
.card {
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}
```

---

**Key Concepts Explained:**

- **:hover** - When mouse is over element
- **:active** - When element is being clicked
- **:focus** - When element has keyboard focus
- **box-shadow** - Creates depth effect
- **transition** - Smooth animation between states

### Your Practice Exercise (5 minutes)

**Task:** Add interactive states

Create a button with hover effects:

```html
<button class="btn btn-primary">Click Me</button>
<button class="btn btn-secondary">Cancel</button>
```

```css
.btn {
    padding: 12px 24px;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: #3498db;
    color: white;
}

.btn-primary:hover {
    background-color: #2980b9;
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
    transform: translateY(-2px);
}

.btn-secondary {
    background-color: #ecf0f1;
    color: #333;
}

.btn-secondary:hover {
    background-color: #bdc3c7;
}

.btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.4);
}
```

**Expected Result:**

<img src="screenshots/module6-pseudo-classes.png" alt="Module 6 - Pseudo-classes and Shadows" width="500">

**Self-Check:**

- [X] Buttons change color on hover
- [X] Primary button lifts up slightly on hover
- [X] Transitions are smooth (not instant)
- [X] Focus state is visible when tabbing

---

## Part A Summary

Congratulations! You've now practiced all the fundamental CSS concepts:

- [X] CSS syntax and linking stylesheets
- [X] Selectors (element, class, id, descendant)
- [X] Box model (margin, padding, border)
- [X] Colors and typography
- [X] Backgrounds and borders
- [X] Pseudo-classes and shadows

**Save your `practice.css` file** - reference it while styling your dashboard!

---

# Part B: Style Your MyFinance Dashboard (60 minutes)

## Project Overview

Now you'll apply everything you've learned to transform your plain HTML dashboard into a beautifully styled, professional-looking interface.

### Important: Focus on CSS Styling

**You will focus on:** Writing CSS rules to style your existing HTML
**We provide:** Color schemes, typography choices, and design specifications

This lets you concentrate on learning CSS properties and techniques without worrying about design decisions.

### Visual Mockup

Your finished pages should look like these full-page screenshots:

| Page                   | Screenshot                            |
| ---------------------- | ------------------------------------- |
| Dashboard (index.html) | `screenshots/dashboard.png`         |
| Budget Tracker         | `screenshots/budget-tracker.png`    |
| Goal Planner           | `screenshots/goal-planner.png`      |
| Account Application    | `screenshots/apply-for-account.png` |

<img src="screenshots/dashboard.png" alt="Styled Dashboard - Full Page" width="400">

### Project Requirements

Your styled dashboard must include:

1. **Color Scheme** - Consistent primary, secondary, and accent colors
2. **Typography** - Professional font stack and hierarchy
3. **Navigation Styling** - Horizontal menu with hover effects
4. **Card Components** - Styled overview metrics
5. **Table Styling** - Zebra striping and hover effects
6. **Form Styling** - Consistent input and button styles
7. **Sidebar Styling** - Visually distinct aside
8. **Footer Styling** - Subtle background and links

---

## CSS File Structure

Create your `styles.css` with these sections:

```css
/* =================================
   CSS VARIABLES (Color Scheme)
   ================================= */

/* =================================
   RESET & BASE STYLES
   ================================= */

/* =================================
   TYPOGRAPHY
   ================================= */

/* =================================
   LAYOUT
   ================================= */

/* =================================
   HEADER & NAVIGATION
   ================================= */

/* =================================
   MAIN CONTENT
   ================================= */

/* =================================
   CARDS & METRICS
   ================================= */

/* =================================
   TABLES
   ================================= */

/* =================================
   FORMS
   ================================= */

/* =================================
   SIDEBAR
   ================================= */

/* =================================
   FOOTER
   ================================= */
```

---

## Detailed Styling Requirements

### 1. CSS Variables (Color Scheme)

**What to style:**
Define your color palette using CSS custom properties for consistency.

**Must include:**

```css
:root {
    /* Primary Colors */
    --primary-color: #2c3e50;      /* Dark blue - headers, important text */
    --primary-light: #34495e;      /* Lighter blue - hover states */

    /* Secondary Colors */
    --secondary-color: #3498db;    /* Blue - links, buttons */
    --secondary-light: #5dade2;    /* Light blue - hover states */

    /* Accent Colors */
    --accent-success: #27ae60;     /* Green - positive values, success */
    --accent-warning: #f39c12;     /* Orange - warnings, caution */
    --accent-danger: #e74c3c;      /* Red - negative values, errors */

    /* Neutral Colors */
    --text-primary: #2c3e50;       /* Main text */
    --text-secondary: #7f8c8d;     /* Muted text */
    --bg-primary: #ffffff;         /* White background */
    --bg-secondary: #f8f9fa;       /* Light gray background */
    --border-color: #e0e0e0;       /* Borders */

    /* Shadows */
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);

    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

    /* Border Radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
}
```

---

### 2. Reset & Base Styles

**What to style:**
Normalize browser defaults and set base styles.

**Must include:**

```css
/* Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Base */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: var(--text-primary);
    background-color: var(--bg-secondary);
}

img {
    max-width: 100%;
    height: auto;
}

a {
    color: var(--secondary-color);
    text-decoration: none;
    transition: color 0.3s ease;
}

a:hover {
    color: var(--secondary-light);
}
```

---

### 3. Typography

**What to style:**
Create consistent heading hierarchy and text styles.

**Must include:**

- h1: 2rem, font-weight 700, primary color
- h2: 1.5rem, font-weight 600, primary color
- h3: 1.25rem, font-weight 600, primary color
- Paragraph: 1rem, text-secondary for muted text
- Strong amounts in cards: larger font size, bold

**See screenshot:** `screenshots/dashboard.png` — observe the heading hierarchy (h1 in the header, h2 section titles, h3 card labels) and body text throughout the page

---

### 4. Header Styling

**What to style:**
Create a professional header with logo and branding.

**Must include:**

- Background: White or gradient
- Padding: Comfortable spacing
- Box shadow: Subtle depth
- Logo image styling: Fixed width, vertical alignment
- Title: Primary color, appropriate size
- Tagline: Muted text, smaller size

**See screenshot:** `screenshots/dashboard.png` — look at the top of the page: the white header area with the title and tagline

---

### 5. Navigation Styling

**What to style:**
Create a horizontal navigation bar with interactive states.

**Must include:**

- Background: Primary or secondary color
- Links: White or contrasting color
- Padding: Comfortable clickable area
- Hover effect: Background color change or underline
- Active state: Distinct styling
- No underlines on links
- Spacing between links

**See screenshot:** `screenshots/dashboard.png` — look at the dark navigation bar just below the header with Dashboard, Budget Tracker, Goal Planner, and Apply for Account links

---

### 6. Overview Cards

**What to style:**
Create card components for the financial metrics.

**Must include:**

- Background: White
- Border: Subtle or left accent
- Border-radius: Rounded corners (8px)
- Box-shadow: Subtle depth
- Padding: Comfortable spacing
- Hover effect: Lift or shadow increase
- Amount text: Large, bold, colored based on type (green for positive)
- Label text: Smaller, muted

**See screenshot:** `screenshots/dashboard.png` — look at the "Financial Overview" section with the four metric cards (Total Balance, Monthly Income, Monthly Expenses, Savings Rate)

---

### 7. Table Styling

**What to style:**
Create professional, readable data tables.

**Must include:**

- Full width (100%)
- Border-collapse: collapse
- Header row: Background color, bold text
- Zebra striping: Alternate row colors
- Cell padding: 12-16px
- Border-bottom on rows
- Hover effect on rows
- Caption styling: Left-aligned, muted
- Status column: Colored badges (green for active, etc.)

**See screenshot:** `screenshots/dashboard.png` — look at the "My Accounts" and "Recent Transactions" tables with dark headers, zebra striping, and colored status text

---

### 8. Form Styling

**What to style:**
Create consistent form controls across all form pages.

**Must include:**

- Input fields: Consistent border, padding, border-radius
- Focus state: Border color change, subtle shadow
- Labels: Block display, margin-bottom
- Fieldset: Remove default border or style nicely
- Legend: Bold, margin-bottom
- Buttons: Primary and secondary styles with hover
- Help text: Small, muted color

**See screenshot:** `screenshots/budget-tracker.png` — look at the "Add New Transaction" form with styled inputs, select dropdown, radio buttons, and submit/reset buttons

---

### 9. Sidebar Styling

**What to style:**
Create a visually distinct aside section.

**Must include:**

- Background: Slightly different from main content
- Border or shadow: Visual separation
- Padding: Comfortable spacing
- Lists: Custom styling or icons
- Links: Consistent with site theme
- Subsection headings: Clear hierarchy

**See screenshot:** `screenshots/dashboard.png` — look at the "Quick Tips" aside section near the bottom with the green top border, tip lists, and resource links

---

### 10. Footer Styling

**What to style:**
Create a professional footer.

**Must include:**

- Background: Darker color (primary or dark gray)
- Text: White or light color
- Padding: Generous vertical spacing
- Links: Lighter color, hover effect
- Copyright: Smaller, muted
- Center alignment or justified

**See screenshot:** `screenshots/dashboard.png` — look at the dark footer at the very bottom with white text, links, and the copyright notice

---

## Complete CSS Template

Here's a starting template with all sections:

```css
/* =================================
   CSS VARIABLES (Color Scheme)
   ================================= */
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-success: #27ae60;
    --text-primary: #2c3e50;
    --text-secondary: #7f8c8d;
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --border-color: #e0e0e0;
    --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
    --radius-md: 8px;
}

/* =================================
   RESET & BASE STYLES
   ================================= */
/* Add your reset styles here */

/* =================================
   TYPOGRAPHY
   ================================= */
/* Add your typography styles here */

/* =================================
   HEADER & NAVIGATION
   ================================= */
/* Add your header and nav styles here */

/* =================================
   CARDS & METRICS
   ================================= */
/* Add your card styles here */

/* =================================
   TABLES
   ================================= */
/* Add your table styles here */

/* =================================
   FORMS
   ================================= */
/* Add your form styles here */

/* =================================
   SIDEBAR
   ================================= */
/* Add your sidebar styles here */

/* =================================
   FOOTER
   ================================= */
/* Add your footer styles here */
```

---

## Styling Checklist

Before finishing, verify your styles meet these requirements:

### Color & Typography

- [ ] CSS variables defined for all colors
- [ ] Consistent font family across site
- [ ] Clear heading hierarchy (h1 > h2 > h3)
- [ ] Readable body text (16px, line-height 1.6)
- [ ] Muted text for secondary information

### Components

- [ ] Header has professional appearance
- [ ] Navigation is horizontal with hover effects
- [ ] Cards have shadows and rounded corners
- [ ] Tables have zebra striping and hover
- [ ] Forms have consistent styling
- [ ] Buttons have clear primary/secondary styles
- [ ] Sidebar is visually distinct
- [ ] Footer contrasts with main content

### Interactive States

- [ ] Links change color on hover
- [ ] Buttons have hover and active states
- [ ] Table rows highlight on hover
- [ ] Form inputs have focus states
- [ ] Transitions are smooth (0.3s)

### Best Practices

- [ ] No inline styles in HTML
- [ ] CSS is organized in sections
- [ ] CSS variables used for colors
- [ ] Box-sizing: border-box applied
- [ ] Images have max-width: 100%

---

## Testing Your Styles

### 1. Visual Testing

- Open in browser and compare to mockups
- Check all pages (index, forms)
- Verify consistency across pages

### 2. Interactive Testing

- Hover over all links and buttons
- Tab through forms (check focus states)
- Click table rows (check hover)

### 3. Browser Testing

- Test in Chrome, Firefox, Safari (if available)
- Check for any visual differences

---

## Submission Guidelines

**Note:** This is a practice lab (ungraded) for skill building.

### What to Submit

1. `styles.css` - Your complete stylesheet
2. Updated HTML files linked to CSS
3. All original HTML files from Labs 1 and 2

### File Organization

```
Lab3-Dashboard-Styling/
├── index.html
├── budget-tracker.html
├── goal-planner.html
├── account-application.html
├── styles.css
├── images/
│   └── (your images)
└── media/
    └── (if applicable)
```

---

## Tips for Success

### During Part A (Practice)

- Experiment with values to see effects
- Use browser DevTools to test CSS live
- Reference MDN for property details
- Save frequently

### During Part B (Dashboard)

- Style one section at a time
- Use DevTools to inspect and adjust
- Keep your CSS organized
- Test hover states as you go
- Use consistent spacing values

### Common Mistakes to Avoid

❌ Forgetting to link CSS file
❌ Using IDs when classes would be better
❌ Inconsistent spacing values
❌ Forgetting hover/focus states
❌ No transitions on interactive elements
❌ Not testing in browser frequently

---

## Resources

### CSS Documentation

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS-Tricks](https://css-tricks.com/)
- [W3Schools CSS Tutorial](https://www.w3schools.com/css/)

### Color Tools

- [Coolors](https://coolors.co/) - Color palette generator
- [Adobe Color](https://color.adobe.com/) - Color wheel
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - Accessibility

### Font Resources

- [Google Fonts](https://fonts.google.com/)
- [Font Pair](https://www.fontpair.co/) - Font combinations

### CSS Validation

- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)

---

## What's Next?

**Lab 4: Responsive Finance Dashboard**
You'll make your dashboard mobile-friendly using Flexbox, CSS Grid, and media queries. Learn to create layouts that adapt to any screen size.

**Lab 5-7: JavaScript**
Add interactivity - calculate budgets in real-time, validate forms client-side, and create interactive charts.

---

## Need Help?

- **During lab:** Ask your instructor for assistance
- **Office hours (Tuesdays):**
  - **Female students:** 11:00 AM - 12:00 PM | Office H07-C393
  - **Male students:** 1:00 PM - 2:00 PM | Success Oasis Room, H07
- **MS Teams:** Ask questions anytime, access recorded tutorial sessions, and participate in Q&A discussions
- **Instructor:** Abdulahi Hassen

---

**Congratulations on completing Lab 3!**

You've transformed your plain HTML dashboard into a professionally styled interface. You now understand CSS fundamentals including selectors, the box model, colors, typography, and interactive states. Your Personal Finance Platform is looking great!

**Author:** Abdulahi Hassen
