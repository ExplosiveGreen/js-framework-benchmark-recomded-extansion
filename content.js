
// Wait for the DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runUserCode);
} else {
  runUserCode();
}

function runUserCode() {
  try {
    // ===========================================
    // JS FRAMEWORK BENCHMARK RECOMMENDED BUTTON
    // ===========================================

    // Check if we're on the js-framework-benchmark page
    if (window.location.href.includes('krausest.github.io/js-framework-benchmark')) {
      addRecommendedFrameworkButton();
    }

    // ===========================================
    // END OF USER CODE SECTION
    // ===========================================

  } catch (error) {
    console.error('Chrome Extension Error:', error);
  }
}

async function loadRecommendedFrameworks() {
  try {
    const jsonUrl = chrome.runtime.getURL('recommended-frameworks.json');
    const response = await fetch(jsonUrl);
    const data = await response.json();
    return data.frameworks;
  } catch (error) {
    console.error('Error loading recommended frameworks:', error);
    // Fallback list if JSON loading fails
    return [
      'angular-cf-v20.0.1',
      'angular-cf-nozone-v20.0.1',
      'angular-cf-signals-v20.0.1',
      'angular-cf-signals-nozone-v20.0.1',
      'react-compiler-hooks-v19.0.0',
      'react-hooks-v19.0.0',
      'react-hooks-use-transition-v19.0.0',
      'solid-v1.9.3',
      'solid-store-v1.9.3',
      'svelte-v5.13.0',
      'lit-v3.2.0',
      'lit-html-v3.2.0',
      'vanillajs',
      'vanillajs-3',
      'vanillajs-lite',
      'vue-v3.6.0-alpha.2',
      'vue-jsx-v3.6.0-alpha.2',
      'vue-jsx-vapor-v3.6.0-alpha.2',
      'vue-pinia-v3.5.13 + 2.3.0',
      'vue-vapor-v3.6.0-alpha.2'
    ];
  }
}

function addRecommendedFrameworkButton() {
  try {
    // Find the specific container for buttons
    const filterContainer = document.getElementsByClassName('selector-content-container__actions')[0];

    if (!filterContainer) {
      console.error('Filter container not found yet...');
      return;
    }

    // Check if button already exists (double check)
    if (document.getElementById('recommended-framework-btn') ||
      filterContainer.querySelector('#recommended-framework-btn')) {
      return;
    }

    // Load the recommended frameworks list and create button
    loadRecommendedFrameworks().then(checkList => {
      // Triple check before creating the button
      if (document.getElementById('recommended-framework-btn')) {
        return;
      }

      // Create the recommended framework button with the same styling as other buttons
      const recommendedBtn = document.createElement('button');
      recommendedBtn.id = 'recommended-framework-btn';
      recommendedBtn.setAttribute('aria-label', 'Select recommended frameworks');
      recommendedBtn.setAttribute('type', 'button');
      recommendedBtn.className = 'ant-btn css-1k979oh ant-btn-text';

      const span = document.createElement('span');
      span.textContent = 'Recommended';
      recommendedBtn.appendChild(span);

      // Add click functionality
      recommendedBtn.addEventListener('click', () => {
        selectRecommendedFrameworks(checkList);
      });

      // Add the button to the container
      filterContainer.appendChild(recommendedBtn);

    });

  } catch (error) {
    console.error('Error adding recommended framework button:', error);
  }
}

function selectRecommendedFrameworks(checkList) {
  try {
    // First, click the "None" button to clear all selections
    const noneButton = Array.from(document.querySelectorAll('button')).find(btn =>
      btn.querySelector('span') && btn.querySelector('span').textContent === 'None'
    );

    if (noneButton) {
      noneButton.click();
    }
    setTimeout(() => {
      selectOnlyRecommended(checkList);
    }, 50);
  } catch (error) {
    console.error('Error selecting recommended frameworks:', error);
  }
}

function selectOnlyRecommended(checkList) {
  try {
    const container = document.getElementsByClassName('selector-content-container__content-wrapper')[0];

    if (!container) {
      console.error('Content wrapper container not found');
      return;
    }

    // Select only the recommended frameworks
    for (const checkbox of container.children) {
      const input = checkbox.querySelector('input');
      if (input && checkList.includes(checkbox.textContent.trim())) {
        if (!input.checked) {
          input.click();
        }
      }
    }


  } catch (error) {
    console.error('Error selecting only recommended frameworks:', error);
  }
}

// Listen for dynamic content changes
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      // Only try to add button if it doesn't already exist
      if (!document.getElementById('recommended-framework-btn')) {
        addRecommendedFrameworkButton();
      }
    }
  });
});

// Start observing immediately
if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
} else {
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}