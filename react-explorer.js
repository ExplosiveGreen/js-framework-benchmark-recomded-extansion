// React exploration script that runs in page context
console.log('=== REACT STATE EXPLORATION ===');

// Cache for React functions to avoid re-exploring
let cachedReactFunctions = {
  selectNone: null,
  selectAll: null,
  selectUnflagged: null,
  explored: false
};

// Function to find React fiber node
function findReactFiber(element) {
  for (let key in element) {
    if (key.startsWith('__reactFiber') || key.startsWith('__reactInternalInstance')) {
      return element[key];
    }
  }
  return null;
}

// Function to find React props
function findReactProps(element) {
  for (let key in element) {
    if (key.startsWith('__reactProps')) {
      return element[key];
    }
  }
  return null;
}

// Function to explore and cache React functions
function exploreAndCacheReactFunctions() {
  if (cachedReactFunctions.explored) {
    console.log('Using cached React functions');
    return cachedReactFunctions;
  }
  
  console.log('--- Exploring React Components ---');
  
  const container = document.getElementsByClassName('selector-content-container__content-wrapper')[0];
  if (!container) {
    console.log('Container not found');
    return null;
  }
  
  const containerFiber = findReactFiber(container);
  if (!containerFiber) {
    console.log('Container fiber not found');
    return null;
  }
  
  // Look for parent component with state management functions
  let currentFiber = containerFiber;
  let fiberLevel = 0;
  while (currentFiber && fiberLevel < 20) {
    if (currentFiber.memoizedProps) {
      const props = currentFiber.memoizedProps;
      
      // Cache the selector functions
      if (props.selectNone && typeof props.selectNone === 'function') {
        console.log('*** FOUND and CACHED selectNone function ***');
        cachedReactFunctions.selectNone = props.selectNone;
      }
      
      if (props.selectAll && typeof props.selectAll === 'function') {
        console.log('*** FOUND and CACHED selectAll function ***');
        cachedReactFunctions.selectAll = props.selectAll;
      }
      
      if (props.selectUnflagged && typeof props.selectUnflagged === 'function') {
        console.log('*** FOUND and CACHED selectUnflagged function ***');
        cachedReactFunctions.selectUnflagged = props.selectUnflagged;
      }
    }
    
    currentFiber = currentFiber.return;
    fiberLevel++;
  }
  
  cachedReactFunctions.explored = true;
  return cachedReactFunctions;
}

// Function to select frameworks using React state management
function selectFrameworksViaReact() {
  const targetFrameworks = JSON.parse(sessionStorage.getItem('targetFrameworks') || '[]');
  console.log('--- SELECTING FRAMEWORKS VIA REACT ---');
  console.log('Target frameworks:', targetFrameworks);
  
  const reactFunctions = exploreAndCacheReactFunctions();
  
  if (reactFunctions && reactFunctions.selectNone) {
    console.log('=== USING CACHED REACT STATE MANAGEMENT ===');
    
    try {
      // Call the selectNone function directly
      console.log('Calling selectNone function...');
      reactFunctions.selectNone();
      
      // Wait a moment for React to update, then select our frameworks
      setTimeout(() => {
        console.log('Now selecting target frameworks via React...');
        
        const container = document.getElementsByClassName('selector-content-container__content-wrapper')[0];
        if (!container) return;
        
        // Get all checkboxes and their onChange functions
        const checkboxElements = container.querySelectorAll('input[type="checkbox"]');
        checkboxElements.forEach((checkbox, idx) => {
          const checkboxFiber = findReactFiber(checkbox);
          if (checkboxFiber && checkboxFiber.memoizedProps) {
            const checkboxLabel = checkbox.closest('.ant-checkbox-wrapper')?.textContent?.trim();
            
            if (checkboxLabel && targetFrameworks.includes(checkboxLabel)) {
              console.log('Selecting framework via React onChange:', checkboxLabel);
              
              // Try to call the onChange function directly
              if (checkboxFiber.memoizedProps.onChange) {
                const fakeEvent = {
                  target: { checked: true },
                  preventDefault: () => {},
                  stopPropagation: () => {}
                };
                checkboxFiber.memoizedProps.onChange(fakeEvent);
              }
            }
          }
        });
        
        console.log('React-based framework selection completed!');
        sessionStorage.removeItem('targetFrameworks');
      }, 100);
      
    } catch (reactError) {
      console.error('React state management failed:', reactError);
      console.log('Falling back to click method...');
      fallbackToClickMethod(targetFrameworks);
    }
    
  } else {
    console.log('React state functions not found, using click method');
    fallbackToClickMethod(targetFrameworks);
  }
}

function fallbackToClickMethod(targetFrameworks) {
  // Original click-based method
  const noneButton = Array.from(document.querySelectorAll('button')).find(btn => 
    btn.querySelector('span') && btn.querySelector('span').textContent === 'None'
  );
  
  if (noneButton) {
    console.log('Clicking None button:', noneButton);
    noneButton.click();
    
    setTimeout(() => {
      console.log('Selecting target frameworks via clicks...');
      const container = document.getElementsByClassName('selector-content-container__content-wrapper')[0];
      if (container) {
        for (const checkbox of container.children) {
          const input = checkbox.querySelector('input');
          if (input && targetFrameworks.includes(checkbox.textContent.trim())) {
            console.log('Clicking checkbox for:', checkbox.textContent.trim());
            if (!input.checked) {
              input.click();
            }
          }
        }
      }
      console.log('Click-based framework selection completed');
      sessionStorage.removeItem('targetFrameworks');
    }, 100);
  }
}

// Listen for messages from content script to trigger selection
window.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SELECT_FRAMEWORKS') {
    selectFrameworksViaReact();
  }
});

// Run initial exploration and selection if target frameworks are already set
const initialFrameworks = sessionStorage.getItem('targetFrameworks');
if (initialFrameworks) {
  selectFrameworksViaReact();
}