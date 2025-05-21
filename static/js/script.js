// =========================
// WISHLIST FUNCTIONALITY
// =========================

// Function to load the wishlist from localStorage
function loadWishlist() {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
}

// Function to save the wishlist to localStorage
function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Update the "Add to Wishlist" button to show if an item is already in the wishlist
function updateWishlistButtons() {
    const wishlist = loadWishlist();
    const buttons = document.querySelectorAll('.add-to-wishlist');

    buttons.forEach(button => {
        const laptopId = button.getAttribute('data-id');
        // Check if the laptop is already in the wishlist
        if (wishlist.includes(parseInt(laptopId))) {
            button.textContent = 'Added to Wishlist';
            button.disabled = true; // Disable button if the laptop is already in the wishlist
        } else {
            button.textContent = 'Add to Wishlist';
            button.disabled = false;
        }
    });
}

// Handle adding laptops to wishlist
document.querySelectorAll('.add-to-wishlist').forEach(button => {
    button.addEventListener('click', () => {
        const laptopId = button.getAttribute('data-id');
        let wishlist = loadWishlist();

        // If the laptop is not already in the wishlist, add it
        if (!wishlist.includes(parseInt(laptopId))) {
            wishlist.push(parseInt(laptopId));
            saveWishlist(wishlist);
            button.textContent = 'Added to Wishlist';
            button.disabled = true;
        }
    });
});

// Handle removing laptops from wishlist
document.querySelectorAll('.remove-from-wishlist').forEach(button => {
    button.addEventListener('click', () => {
        const laptopId = button.getAttribute('data-id');
        let wishlist = loadWishlist();

        // Remove the laptop from the wishlist
        wishlist = wishlist.filter(id => id !== parseInt(laptopId));
        saveWishlist(wishlist);

        // Remove the laptop from the page
        button.closest('li').remove();
    });
});

// Load the wishlist buttons when the page loads
document.addEventListener('DOMContentLoaded', updateWishlistButtons);

// =========================
// DARK MODE FUNCTIONALITY
// =========================

const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeText = document.getElementById('darkModeText'); // span inside the button

// Function to update the button text based on dark mode status
function updateDarkModeText() {
    const isDark = document.body.classList.contains('dark-mode');
    if (darkModeText) {
        darkModeText.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
}

// Check and apply dark mode on page load based on localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

updateDarkModeText(); // Update button text according to the current mode

// Toggle dark mode on button click
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        
        updateDarkModeText(); // Update the button text
    });
}

