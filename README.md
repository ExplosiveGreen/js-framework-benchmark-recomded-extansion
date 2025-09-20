# JS Framework Benchmark - Recommended Filter Extension

A Chrome extension that adds a "Recommended Frameworks" filter button to the [JS Framework Benchmark](https://krausest.github.io/js-framework-benchmark/current.html) website.

## Features

- **🎯 Recommended Button**: Adds a "Recommended" button that matches the site's native button styling
- **✅ Smart Selection**: Automatically selects only the recommended framework checkboxes
- **🔄 Clean Toggle**: First unchecks all, then checks only recommended frameworks
- **📋 External Config**: Framework list stored in separate JSON file for easy updates
- **🎨 Native Styling**: Uses the same CSS classes as existing buttons (ant-btn css-1k979oh ant-btn-text)

## Recommended Frameworks Included

The extension selects these specific framework versions:
- Angular variants (CF, NoZone, Signals)
- React variants (Compiler, Hooks, Use-Transition)
- Solid and Solid Store
- Svelte v5.13.0
- Lit and Lit-HTML
- VanillaJS variants
- Vue variants (JSX, Vapor, Pinia)

## Installation Instructions

### Method 1: Load as Unpacked Extension (Developer Mode)

1. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/` in your Chrome browser
   - Or click the three dots menu → More tools → Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to this folder and select it
   - The extension should now appear in your extensions list

4. **Test the Extension**
   - Visit [JS Framework Benchmark](https://krausest.github.io/js-framework-benchmark/current.html)
   - Look for the "⭐ Recommended Frameworks" button
   - Click it to filter the results!

### Method 2: Pack as .crx File (Optional)

1. In the Chrome extensions page, click "Pack extension"
2. Select this folder as the extension root directory
3. Click "Pack Extension" to create a .crx file
4. You can then install the .crx file by dragging it to the extensions page

## How It Works

The extension:
1. Detects when you visit the JS Framework Benchmark website
2. Waits for the page to load completely
3. Finds the `selector-content-container__actions` container
4. Adds a "Recommended" button with native styling
5. When clicked, unchecks all frameworks then selects only recommended ones
6. Uses the framework list from `recommended-frameworks.json`

## Customization

You can modify the recommended frameworks by editing `recommended-frameworks.json`:

```json
{
  "frameworks": [
    "angular-cf-v20.0.1",
    "react-hooks-v19.0.0",
    "solid-v1.9.3",
    "svelte-v5.13.0",
    "lit-v3.2.0",
    "vanillajs",
    "vue-v3.6.0-alpha.2"
  ]
}
```

## Files Structure

```
js-framework-benchmark-recommended-extension/
├── manifest.json                 # Extension configuration
├── content.js                   # Main functionality script
├── recommended-frameworks.json  # List of recommended frameworks
└── README.md                    # This file
```

## Troubleshooting

**Button doesn't appear:**
- Make sure you're on the correct website URL
- Check the browser console for any error messages
- Try refreshing the page

**Button appears in wrong location:**
- The extension tries to find the best location automatically
- If the website structure changes, the button will create its own container

**Extension not loading:**
- Ensure Developer mode is enabled
- Check that all files are in the same folder
- Look for error messages in the Chrome extensions page

## Support

If you encounter any issues:
1. Check the browser console (F12) for error messages
2. Try disabling and re-enabling the extension
3. Make sure you're using a recent version of Chrome

## License

This extension is provided as-is for educational and personal use.