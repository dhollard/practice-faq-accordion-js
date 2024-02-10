/*
    --- Get relevant elements and craft reusable function ---
*/

// Get every accordion tab header
const accordionTabHeaders = document.querySelectorAll(".acc-tab-header");
const accordionTabHeadersArray = Array.from(accordionTabHeaders);
const accordionTabs = document.querySelectorAll(".accordion-tab");

// Reusable function to look at triggered accordion tab and act accordingly
function triggerAccordion(tab) {
    // Close all other accordion tabs
    accordionTabs.forEach(function(accordionTab) {
        if (accordionTab !== tab.closest(".accordion-tab")) {
            accordionTab.classList.remove("acc-opened-tab");
        }
    });

    // Open/close clicked tab
    const parentTab = tab.closest(".accordion-tab");
    parentTab.classList.toggle("acc-opened-tab");
}

/*
    --- Opening and closing via click behavior ---
*/

// Add a click event listener on each tab header
accordionTabHeaders.forEach(function(tab) {
    tab.addEventListener("click", function() {
        // Use function declared earlier to change accordion
        triggerAccordion(tab);
    });
});

/*
    --- Navigating and toggling through keyboard (tab, arrows, enter key) ---
*/

// When pressing keys, check if an accordion header is in focus and act accordingly
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        // Get currently focused element in document
        const focusedElement = document.activeElement;

        // Block default arrow scroll if focus is currently on an accordion header
        if (accordionTabHeadersArray.includes(focusedElement)) {
            event.preventDefault();
        }
        
        // Find current focused accordion tab header
        let focusedIndex = accordionTabHeadersArray.findIndex(tab => tab === focusedElement);

        // Check if current element is part of accordion headers and is focusable
        if (focusedIndex !== -1 && accordionTabHeaders[focusedIndex].tabIndex !== -1) {
            // Move focus to previous element if up arrow is pressed
            if (event.key === "ArrowUp") {
                focusedIndex = Math.max(focusedIndex - 1, 0);
            }
            // Move focus to next element if down arrow is pressed
            else if (event.key === "ArrowDown") {
                focusedIndex = Math.min(focusedIndex + 1, accordionTabHeaders.length - 1);
            }
            
            // Put focus on relevant element
            accordionTabHeaders[focusedIndex].focus();
        }
    } else if (event.key === "Enter") {
        event.preventDefault();
        const focusedElement = document.activeElement;
        if (accordionTabHeadersArray.includes(focusedElement)) {
            // Toggle focused accordion tab
            triggerAccordion(focusedElement);
        }
    }
});