/*
    --- Get relevant elements and toggle accordion with a reusable function ---
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
            accordionTab.querySelector(".acc-tab-header").setAttribute("aria-expanded", "false");
        }
    });

    // Open/close clicked tab

    // Add class to parent
    const parentTab = tab.closest(".accordion-tab");
    parentTab.classList.toggle("acc-opened-tab");
    
    // Toggle aria-expanded attribute (for accessibility purposes)
    const tabAriaExpanded = tab.getAttribute("aria-expanded");
    const tabAriaValue = tabAriaExpanded === "true" ? "false" : "true";
    tab.setAttribute("aria-expanded", tabAriaValue);
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
    --- Navigating and toggling through keyboard (tab, arrows, enter, home, end keys) ---
*/

// When pressing keys, check if an accordion header is in focus and act accordingly
document.addEventListener("keydown", function(event) {

    // Ability to navigate up and down the accordion tabs with up/down arrows
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
    }

    // Ability to toggle tabs with "enter" key
    else if (event.key === "Enter") {
        event.preventDefault();
        const focusedElement = document.activeElement;
        if (accordionTabHeadersArray.includes(focusedElement)) {
            // Toggle focused accordion tab
            triggerAccordion(focusedElement);
        }
    }
    
    // Ability to go to first or last accordion tab via home/end keys
    else if (event.key === "Home" || event.key === "End"){
        
        // Get currently focused element in document
        const focusedElement = document.activeElement;

        // Block default home/end scroll if focus is currently on an accordion header
        if (accordionTabHeadersArray.includes(focusedElement)) {
            event.preventDefault();
        }

        // Find current focused accordion tab header
        let focusedIndex = accordionTabHeadersArray.findIndex(tab => tab === focusedElement);

        // Move focus to first element if "home" is pressed
        if (event.key === "Home") {
            focusedIndex = 0;
        }
        // Move focus to next element if down arrow is pressed
        else if (event.key === "End") {
            focusedIndex = accordionTabHeaders.length - 1;
        }

        // Put focus on relevant element
        accordionTabHeaders[focusedIndex].focus();

    }
});