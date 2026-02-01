<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 356 - Web Development Fundamentals</strong>
</p>

---

# Lab 2: HTML Forms and Multimedia

# Interactive Finance Portal - Budget Tracker, Goal Planner & Account Application

**Duration:** 120 minutes

---

## Overview

This lab teaches **HTML Forms and Multimedia** - essential components for creating interactive web applications. You'll learn to build accessible forms with modern input types, validation, and ARIA attributes. You'll also integrate video and audio content into web pages.

To apply these concepts practically, you'll build three finance-related forms (Budget Tracker, Goal Planner, and Account Application) and add multimedia educational content to your MyFinance Dashboard from Lab 1.

This lab completes your HTML foundation, preparing your platform for visual styling with CSS in the next labs.

### What You'll Build

Three complete forms + multimedia enhancements:

1. **Budget Tracker Form** - Log income and expenses
2. **Goal Planner Form** - Create and track financial goals
3. **Account Application Form** - Apply for new financial accounts
4. **Multimedia Section** - Educational videos and audio tips

### Lab Structure

**Part A: Interactive Forms & Multimedia Basics (60 minutes)**
Instructor demonstrates each concept → You practice immediately → Repeat

**Part B: Apply Forms & Multimedia Skills (60 minutes)**
Build three complete forms and integrate multimedia content

---

## Learning Objectives

By the end of this lab, you will be able to:

- Create accessible HTML forms with proper structure
- Use modern input types (email, tel, number, date, range)
- Implement form validation (required, pattern, min, max)
- Group form controls with fieldsets and legends
- Add ARIA attributes for enhanced accessibility
- Integrate video and audio elements with controls
- Provide fallback content for multimedia
- Build complex multi-section forms

---

## Prerequisites

- Lab 1 completed (MyFinance Dashboard)
- Understanding of HTML basics
- Text editor and browser ready

---

## Getting Started

1. Copy the lab folder from `Lab-Abdulahi/Practice/Lab 2` to your own repo under `/Practice/`
2. Download multimedia samples from starter-code/media
3. Open your text editor and browser side-by-side

---

# Part A: Interactive Forms & Multimedia (60 minutes)

**Expected Results:** Refer to `screenshots/1-form-practice.png` and `screenshots/2-multimedia-practice.png` to see what your completed exercises should look like.

## Module 1: Basic Form Structure (10 minutes)

### Instructor Led (5 minutes)

Demonstrate creating a basic HTML form:

```html
<form action="/submit" method="POST">
    <!-- Text input with label -->
    <label for="username">Username</label>
    <input type="text"
           id="username"
           name="username"
           required>

    <!-- Email input -->
    <label for="email">Email Address</label>
    <input type="email"
           id="email"
           name="email"
           required>

    <!-- Submit and reset buttons -->
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
</form>
```

**Key Concepts Explained:**

- `<form>` - Container for all form controls
- `action` - Where form data is sent (server endpoint)
- `method` - HTTP method (GET or POST)
- `<label>` - Describes input field
- `for` attribute - Links label to input via matching `id`
- `<input>` - User input field
- `type` - Input type (text, email, password, etc.)
- `id` - Unique identifier (for label association)
- `name` - Field name sent to server
- `required` - Makes field mandatory
- `<button type="submit">` - Submits form
- `<button type="reset">` - Clears form fields

### Your Practice Exercise (5 minutes)

**Task:** Create a simple contact form

Open `starter-code/Part-A/1-form-practice.html` and add:

1. A form with proper action and method attributes
2. Name field (text input with label)
3. Email field (email input with label)
4. Phone field (tel input with label)
5. All fields required
6. Submit and Reset buttons

**Expected Result:** Form displays with labels and inputs properly associated

**Self-Check:**

- [ ] Clicking labels focuses corresponding inputs
- [ ] Email field shows email keyboard on mobile (if testing)
- [ ] Required fields show validation on submit
- [ ] Reset button clears all fields

---

## Module 2: Modern Input Types (12 minutes)

### Instructor Led (6 minutes)

Demonstrate HTML5 input types:

```html
<form>
    <!-- Number input with constraints -->
    <label for="amount">Amount (QAR)</label>
    <input type="number"
           id="amount"
           name="amount"
           min="0"
           max="10000"
           step="0.01"
           required>

    <!-- Date picker -->
    <label for="transaction-date">Transaction Date</label>
    <input type="date"
           id="transaction-date"
           name="transaction-date"
           min="2026-01-01"
           max="2026-12-31"
           required>

    <!-- Time input -->
    <label for="time">Appointment Time</label>
    <input type="time"
           id="time"
           name="time">

    <!-- Range slider -->
    <label for="priority">Priority Level (1-5)</label>
    <input type="range"
           id="priority"
           name="priority"
           min="1"
           max="5"
           value="3">
    <output for="priority">3</output>

    <!-- Color picker -->
    <label for="tag-color">Tag Color</label>
    <input type="color"
           id="tag-color"
           name="tag-color"
           value="#4CAF50">

    <!-- Select dropdown -->
    <label for="category">Category</label>
    <select id="category" name="category" required>
        <option value="">-- Choose Category --</option>
        <option value="food">Food & Dining</option>
        <option value="transport">Transportation</option>
        <option value="entertainment">Entertainment</option>
    </select>
</form>
```

**Key Concepts Explained:**

- **type="number"** - Numeric input with +/- controls

  - `min` - Minimum value
  - `max` - Maximum value
  - `step` - Increment amount (0.01 for decimals)
- **type="date"** - Date picker calendar widget

  - `min` - Earliest selectable date
  - `max` - Latest selectable date
- **type="time"** - Time picker
- **type="range"** - Slider control

  - `value` - Default position
  - Pair with `<output>` to show current value
- **type="color"** - Color picker palette
- **`<select>`** - Dropdown menu

  - First option usually empty (prompt)
  - `value=""` in first option for validation

### Your Practice Exercise (6 minutes)

**Task:** Add advanced inputs to your practice form

Add the following fields:

1. **Age** - number input (min=18, max=100)
2. **Birth Date** - date input (max=today's date)
3. **Satisfaction Rating** - range slider (1-10, default 5)
4. **Country** - select dropdown with 5 countries
5. **Favorite Color** - color picker

**Expected Result:** Form with variety of modern input types

**Self-Check:**

- [ ] Number input doesn't accept letters
- [ ] Date picker shows calendar widget
- [ ] Range slider displays and moves smoothly
- [ ] Dropdown shows all options
- [ ] Color picker opens color palette

---

## Module 3: Radio Buttons and Checkboxes (10 minutes)

### Instructor Led (5 minutes)

Demonstrate radio buttons and checkboxes:

```html
<form>
    <!-- Radio buttons (single choice) -->
    <fieldset>
        <legend>Gender</legend>

        <input type="radio"
               id="male"
               name="gender"
               value="male"
               required>
        <label for="male">Male</label>

        <input type="radio"
               id="female"
               name="gender"
               value="female">
        <label for="female">Female</label>

        <input type="radio"
               id="other"
               name="gender"
               value="other">
        <label for="other">Other</label>
    </fieldset>

    <!-- Checkboxes (multiple choices) -->
    <fieldset>
        <legend>Interests (select all that apply)</legend>

        <input type="checkbox"
               id="coding"
               name="interests"
               value="coding">
        <label for="coding">Coding</label>

        <input type="checkbox"
               id="sports"
               name="interests"
               value="sports">
        <label for="sports">Sports</label>

        <input type="checkbox"
               id="music"
               name="interests"
               value="music">
        <label for="music">Music</label>

        <input type="checkbox"
               id="reading"
               name="interests"
               value="reading">
        <label for="reading">Reading</label>
    </fieldset>
</form>
```

**Key Concepts Explained:**

- **Radio buttons** - Single selection from group

  - Same `name` attribute groups them together
  - Only one can be selected at a time
  - Different `id` and `value` for each option
- **Checkboxes** - Multiple selections allowed

  - Same `name` for related options
  - Each can be independently checked
- **`<fieldset>`** - Groups related form controls
- **`<legend>`** - Title for the fieldset
- **Accessibility:** Fieldset + legend help screen readers understand grouping

### Your Practice Exercise (5 minutes)

**Task:** Add radio buttons and checkboxes

Add to your form:

1. **Employment Status** (radio buttons):

   - Employed
   - Student
   - Self-employed
   - Unemployed
2. **Preferred Contact Methods** (checkboxes):

   - Email
   - Phone
   - SMS
   - WhatsApp
3. Wrap each group in a `<fieldset>` with `<legend>`

**Expected Result:** Radio buttons allow single selection, checkboxes allow multiple

**Self-Check:**

- [ ] Only one radio button can be selected at a time
- [ ] Multiple checkboxes can be selected
- [ ] Clicking legend or anywhere in fieldset doesn't break functionality
- [ ] Fieldsets have visible borders

---

## Module 4: Form Accessibility (10 minutes)

### Instructor Led (5 minutes)

Demonstrate accessible form patterns:

```html
<form>
    <div class="form-group">
        <label for="email">
            Email Address
            <span aria-label="required">*</span>
        </label>
        <input type="email"
               id="email"
               name="email"
               required
               aria-required="true"
               aria-describedby="email-help">
        <small id="email-help">
            We'll never share your email with anyone
        </small>
    </div>

    <div class="form-group">
        <label for="password">Password</label>
        <input type="password"
               id="password"
               name="password"
               pattern=".{8,}"
               title="Must be at least 8 characters"
               aria-describedby="password-help">
        <small id="password-help">
            Minimum 8 characters
        </small>
    </div>

    <div class="form-group">
        <label for="phone">Phone Number</label>
        <input type="tel"
               id="phone"
               name="phone"
               pattern="[0-9]{8}"
               title="8-digit Qatar phone number"
               placeholder="12345678"
               aria-describedby="phone-help">
        <small id="phone-help">
            Format: 12345678 (8 digits)
        </small>
    </div>
</form>
```

**Key Concepts Explained:**

- **`aria-required="true"`** - Announces required status to screen readers
- **`aria-describedby`** - Links input to help text

  - Help text `id` matches aria-describedby value
  - Screen readers read help text when input is focused
- **`aria-label`** - Provides accessible label for icon/symbol

  - Used for the `*` (asterisk) to say "required"
- **`pattern`** - Regular expression for validation

  - `.{8,}` means "any character, 8 or more times"
  - `[0-9]{8}` means "digits, exactly 8"
- **`title`** - Tooltip with validation requirements

  - Shows on hover
  - Announces to screen readers
- **`placeholder`** - Example value (not a replacement for label!)

### Your Practice Exercise (5 minutes)

**Task:** Make your form more accessible

Enhance your existing form:

1. Add `aria-required="true"` to all required fields
2. Add help text for at least 3 fields using `<small>` and `aria-describedby`
3. Add pattern validation to phone number field
4. Add visual required indicators (`*`) with `aria-label`
5. Add meaningful placeholder text (not as replacement for labels!)

**Expected Result:** Form with enhanced accessibility

**Self-Check:**

- [ ] Help text appears below each enhanced field
- [ ] Pattern validation triggers on incorrect format
- [ ] Required indicators are accessible
- [ ] Placeholders provide helpful examples

---

## Module 5: Video and Audio (10 minutes)

### Instructor Led (5 minutes)

Demonstrate multimedia elements:

```html
<!-- Video element with multiple sources -->
<figure>
    <video controls width="100%" poster="poster.jpg">
        <source src="tutorial.mp4" type="video/mp4">
        <source src="tutorial.webm" type="video/webm">
        <track kind="subtitles"
               src="subtitles-en.vtt"
               srclang="en"
               label="English">
        <p>Your browser doesn't support HTML5 video.
           <a href="tutorial.mp4">Download the video</a> instead.
        </p>
    </video>
    <figcaption>Tutorial: Understanding Your Budget</figcaption>
</figure>

<!-- Audio element -->
<figure>
    <audio controls>
        <source src="financial-tip.mp3" type="audio/mpeg">
        <source src="financial-tip.ogg" type="audio/ogg">
        <p>Your browser doesn't support HTML5 audio.
           <a href="financial-tip.mp3">Download the audio</a> instead.
        </p>
    </audio>
    <figcaption>Daily Financial Tip #15: Emergency Funds</figcaption>
</figure>

<!-- Embedded YouTube video (alternative) -->
<figure>
    <iframe width="560"
            height="315"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="Financial Planning Basics"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
    </iframe>
    <figcaption>External: Financial Planning Basics</figcaption>
</figure>
```

**Key Concepts Explained:**

- **`<video>`** - Embeds video content

  - `controls` - Shows play/pause, volume, progress bar
  - `width="100%"` - Responsive sizing
  - `poster` - Image shown before video plays
- **`<audio>`** - Embeds audio content

  - `controls` - Shows audio player controls
- **`<source>`** - Multiple format support

  - Browsers use first supported format
  - Provides fallback for compatibility
- **`<track>`** - Subtitles/captions for video

  - `kind` - Type (subtitles, captions, descriptions)
  - `srclang` - Language code
  - `label` - Display name
- **Fallback content** - Text/links for unsupported browsers
- **`<iframe>`** - Embeds external content (YouTube, Vimeo)

### Your Practice Exercise (5 minutes)

**Task:** Add multimedia to a new page

Open `starter-code/Part-A/2-multimedia-practice.html` and add:

1. One video element with:

   - Controls
   - Poster image
   - At least one source
   - Fallback content
   - Wrapped in `<figure>` with caption
2. One audio element with:

   - Controls
   - At least one source
   - Fallback content
   - Caption
3. (Optional) Embed a YouTube video about personal finance

**Tip:** Use sample files from starter-code/media or online sources

**Expected Result:** Page with playable video and audio

**Self-Check:**

- [ ] Video displays with controls
- [ ] Poster shows before play (if provided)
- [ ] Audio player appears with controls
- [ ] Fallback content is in HTML (even if not visible)

---

## Module 6: Textarea and Advanced Form Elements (8 minutes)

### Instructor Led (4 minutes)

Demonstrate textarea and advanced select:

```html
<form>
    <!-- Textarea for long text -->
    <label for="comments">Additional Comments</label>
    <textarea id="comments"
              name="comments"
              rows="5"
              cols="50"
              maxlength="500"
              placeholder="Enter your comments here..."
              aria-describedby="comments-help"></textarea>
    <small id="comments-help">Maximum 500 characters</small>

    <!-- Select with optgroups -->
    <label for="university">University</label>
    <select id="university" name="university" required>
        <option value="">-- Select University --</option>
        <optgroup label="Qatar">
            <option value="qu">Qatar University</option>
            <option value="cmuq">Carnegie Mellon Qatar</option>
            <option value="nwu">Northwestern Qatar</option>
        </optgroup>
        <optgroup label="UAE">
            <option value="abudh">UAE University</option>
            <option value="aus">American University Sharjah</option>
        </optgroup>
    </select>

    <!-- Multiple select -->
    <label for="languages">Languages (hold Ctrl/Cmd to select multiple)</label>
    <select id="languages" name="languages" multiple size="5">
        <option value="en">English</option>
        <option value="ar">Arabic</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="zh">Chinese</option>
    </select>

    <!-- Datalist for autocomplete -->
    <label for="bank">Bank Name</label>
    <input type="text"
           id="bank"
           name="bank"
           list="banks">
    <datalist id="banks">
        <option value="Qatar National Bank">
        <option value="Commercial Bank of Qatar">
        <option value="Doha Bank">
        <option value="Qatar Islamic Bank">
    </datalist>
</form>
```

**Key Concepts Explained:**

- **`<textarea>`** - Multi-line text input

  - `rows` - Visible lines (height)
  - `cols` - Visible characters per line (width)
  - `maxlength` - Character limit
- **`<optgroup>`** - Groups related options in select

  - `label` - Group heading (not selectable)
- **`multiple`** - Allows selecting multiple options

  - `size` - How many options visible at once
- **`<datalist>`** - Autocomplete suggestions

  - Links to input via `list` attribute
  - Provides suggestions but allows custom input

### Your Practice Exercise (4 minutes)

**Task:** Add advanced form elements

Add to your `form-practice.html`:

1. **Message field** - textarea (5 rows, max 300 characters)
2. **University field** - select with optgroups (at least 2 groups)
3. **Skills field** - multiple select (at least 5 options)
4. **City field** - input with datalist (at least 4 cities)

**Expected Result:** Form with advanced input methods

**Self-Check:**

- [ ] Textarea expands properly
- [ ] Character count works (can't exceed max)
- [ ] Optgroups show as headers
- [ ] Multiple select allows Ctrl/Cmd+Click
- [ ] Datalist shows suggestions when typing

---

## Part A Summary

Excellent work! You've practiced all form and multimedia concepts:

- [X] Basic form structure (labels, inputs, buttons)
- [X] Modern input types (number, date, range, color)
- [X] Radio buttons and checkboxes
- [X] Form accessibility (ARIA, validation, help text)
- [X] Video and audio elements
- [X] Textarea and advanced selects

**Save all your practice files** - reference them while building the final forms!

---

# Part B: Build Three Forms (60 minutes)

Open the starter files in `starter-code/Part-B/`. Each file contains the form structure and field requirements as comments. Your task is to write the HTML.

**Expected Results:** Refer to screenshots folder to see the completed forms.

## Form 1: Budget Tracker (20 minutes)

**File:** `starter-code/Part-B/budget-tracker.html`
**Purpose:** Log income and expense transactions

Refer to `screenshots/budget-tracker.png` for expected result.

**Requirements:**

- Radio buttons for transaction type (income/expense)
- Select with optgroups for categories
- Number input for amount
- Date input for transaction date
- All required fields use `aria-required="true"`
- Submit and Reset buttons

---

## Form 2: Goal Planner (15 minutes)

**File:** `starter-code/Part-B/goal-planner.html`
**Purpose:** Create financial savings goals

Refer to `screenshots/goal-planner.png` for expected result.

**Requirements:**

- Text and number inputs for goal details
- Range slider for priority level with output element
- Date input for target date
- Textarea for description
- Checkbox for auto-transfer option

---

## Form 3: Account Application (25 minutes)

**File:** `starter-code/Part-B/account-application.html`
**Purpose:** Multi-section account application

Refer to `screenshots/account-application.png` for expected result.

**Requirements:**

- 6 fieldsets with legends (Personal, Address, Account, Employment, Preferences, Terms)
- Various input types: text, email, tel, date, number, range
- Radio buttons and checkboxes
- Pattern validation for phone number
- All required fields properly marked

---

## Accessibility Validation

Before finishing, check ALL forms against the accessibility checklist:

### Form Accessibility Checklist

- [ ] **All inputs have labels**

  - Every input has a `<label>` with matching `for` attribute
- [ ] **Required fields are marked**

  - Visual indicator (`*`)
  - `required` attribute
  - `aria-required="true"`
- [ ] **Help text is connected**

  - `<small>` or `<p>` with unique `id`
  - Input has `aria-describedby` matching help text `id`
- [ ] **Fieldsets group related inputs**

  - Radio buttons in `<fieldset>`
  - Checkboxes in `<fieldset>`
  - Each fieldset has `<legend>`
- [ ] **Validation is accessible**

  - `pattern` attribute with `title` explanation
  - Constraints (`min`, `max`) are reasonable
- [ ] **Forms can be completed with keyboard**

  - Tab through entire form
  - All inputs reachable
  - Logical tab order
- [ ] **Submit buttons are clearly labeled**

  - "Submit", "Add Transaction", "Apply Now" (not "Click here")

---

## Testing Your Forms

### 1. Validation Testing

- Try submitting without filling required fields
- Enter invalid data (wrong format, out of range)
- Verify error messages are clear

### 2. Keyboard Testing

- Tab through entire form
- Use Enter to submit
- Use Space for checkboxes/radio buttons
- Verify focus indicators are visible

### 3. Screen Reader Testing (if possible)

- Use VoiceOver (Mac) or Narrator (Windows)
- Verify labels are announced
- Verify help text is read
- Verify fieldset legends provide context

### 4. Mobile Testing (if possible)

- Verify correct keyboards appear (email, number, tel)
- Date/time pickers work on mobile
- Forms are readable without zooming

---

## Submission Guidelines

**Note:** This is a practice lab (ungraded) for skill building.

### What to Submit

**Part A:** Your completed practice files

- `1-form-practice.html`
- `2-multimedia-practice.html`

**Part B:** Your completed form files

- `budget-tracker.html`
- `goal-planner.html`
- `account-application.html`

---

## Tips for Success

### During Part A (Practice)

- Type all code yourself
- Experiment with different input types
- Ask questions immediately
- Test as you go

### During Part B (Forms)

- Reference your practice files
- Build one form at a time
- Validate HTML frequently
- Test accessibility with keyboard
- Use meaningful field names
- Don't skip help text

### Common Mistakes to Avoid

- Missing `for` attribute on labels
- Forgetting `name` attribute (needed for form submission)
- Not grouping radio buttons with same `name`
- Missing required indicators
- Skipping ARIA attributes
- No fallback content for multimedia

---

## Resources

### Form Resources

- [MDN Forms Guide](https://developer.mozilla.org/en-US/docs/Learn/Forms)
- [WebAIM Form Accessibility](https://webaim.org/techniques/forms/)
- [HTML5 Input Types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

### Multimedia Resources

- [MDN Video Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
- [MDN Audio Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
- [WebVTT Captions Guide](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)

### Validation Tools

- [W3C HTML Validator](https://validator.w3.org/)
- [WAVE Accessibility Tool](https://wave.webaim.org/)

---

## What's Next?

**Lab 3: Dashboard Styling**
You'll transform your plain HTML forms and dashboard into a beautiful, professional-looking interface using CSS. Learn color schemes, typography, card layouts, and button styles.

**Lab 4: Responsive Design**
Make your entire platform mobile-friendly with Flexbox, CSS Grid, and media queries.

**Lab 5-7: JavaScript**
Add interactivity - calculate budgets in real-time, validate forms client-side, and create interactive charts.

---

**Congratulations on completing Lab 2!**

You've mastered HTML forms and multimedia integration. You can now create accessible forms with modern input types, validation, and ARIA attributes, and integrate video and audio content into web pages. Your Personal Finance Platform is becoming more interactive!

---

**Author:** Abdulahi Hassen
