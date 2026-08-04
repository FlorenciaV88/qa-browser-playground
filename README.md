# QA Browser Playground

A lightweight browser validation playground created to manually test TestRigor browser execution settings.

This application provides visual indicators and test elements to validate browser-related features such as headless execution, incognito mode, click processing, screenshots, geolocation, and element visibility.

---

## Purpose

The goal of this playground is to provide a controlled environment where QA engineers can validate TestRigor browser settings and observe the resulting browser behavior directly from the UI.

---

# Features

## 1. Headless Mode Detection

Validates browser characteristics that can indicate whether the browser is running in headless mode.

Checks:

- Navigator webdriver status
- Browser plugins
- Browser dimensions
- User agent information

Expected usage:

1. Run test with Headless Mode enabled.
2. Open the playground.
3. Review the detection result.
4. Disable Headless Mode and compare results.

---

## 2. Incognito Mode Detection

Provides a browser context indicator based on storage availability.

Expected usage:

1. Run test with Incognito enabled.
2. Open the playground.
3. Review the browser mode result.
4. Disable Incognito Mode and compare behavior.

---

## 3. Click Processing Validation

Used to validate TestRigor click processing options:

- Using JavaScript
- Using OS Mouse

The playground captures:

- Click event received
- Event type
- Event trust status
- Mouse coordinates

This helps identify differences between browser-generated and JavaScript-triggered interactions.

---

## 4. Screenshot Validation

Provides a long page layout with clear markers:

===== TOP MARKER =====

(content)

===== BOTTOM MARKER =====


Used to validate:

- Full page screenshot enabled
- Full page screenshot disabled

Expected behavior:

- Full page screenshots should include the bottom marker.
- Regular screenshots should only capture the visible viewport.

---

## 5. Geolocation Validation

Tests browser geolocation permissions:

Supported states:

- Allow
- Block
- Ask

Displays:

- Permission result
- Latitude
- Longitude

---

## 6. Opacity Visibility Validation

Provides elements with different opacity values:

| Element | Opacity |
|---|---|
| Element 1 | 1 |
| Element 2 | 0.5 |
| Element 3 | 0 |

Used to validate:

**Use opacity to determine visibility of web elements**

---

# Deployment

This project can be hosted using GitHub Pages.

Steps:

1. Push files to GitHub repository.
2. Go to: Settings --> Pages
3. Select: Deploy from branch
4. Choose: /root folder
5. Open the generated GitHub Pages URL.

---

# Files
qa-browser-playground/

├── index.html

├── styles.css

├── script.js

└── README.md


---

# TestRigor Validation Flow

Example:

1. Login to TestRigor.
2. Create a Runtime Suite.
3. Open Advanced Settings.
4. Enable/disable the desired browser option.
5. Execute a test case opening this playground.
6. Validate the displayed browser behavior.

---

## Technologies

- HTML
- CSS
- JavaScript
- GitHub Pages

---

## Notes

This playground is intended for QA validation purposes and provides browser-side indicators. Some browser capabilities cannot be detected with 100% certainty due to browser security restrictions.
