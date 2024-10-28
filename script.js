// Function to handle visibility changes for watch of choice and new arrival
const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add animation classes when entering the viewport
      if (entry.target.classList.contains("choice-one")) {
        entry.target.classList.add(
          "animate__animated",
          "animate__fadeInLeft",
          "animate__slow"
        );
      } else if (entry.target.classList.contains("choice-two")) {
        entry.target.classList.add(
          "animate__animated",
          "animate__fadeInRight",
          "animate__slow"
        );
      } else if (entry.target.classList.contains("new-arrival")) {
        entry.target.classList.add(
          "animate__animated",
          "animate__bounceInDown",
          "animate__slow"
        );
      } else if (entry.target.classList.contains("popular-items-shop")) {
        entry.target.classList.add(
          "animate__animated",
          "animate__bounceInDown",
          "animate__slow"
        );
      } else if (entry.target.classList.contains("new-arrivals-shop")) {
        entry.target.classList.add(
          "animate__animated",
          "animate__bounceInUp",
          "animate__slow"
        );
      }
    } else {
      // Remove animation classes after a short delay
      setTimeout(() => {
        entry.target.classList.remove(
          "animate__animated",
          "animate__fadeInLeft",
          "animate__bounceInDown",
          "animate__bounceInUp",
          "animate__slow",
          "animate__fadeInRight",
          "animate__bounceInDown"
        );
      }, 3500); // Adjust the delay as needed
    }
  });
};

// Options for the observer
const options = {
  root: null, // Use the viewport as the root
  rootMargin: "0px",
  threshold: 0.1, // Trigger when 10% of the element is visible
};

// Create an intersection observer
const observer = new IntersectionObserver(handleIntersection, options);

// Select the elements to observe
const choice1 = document.querySelector(".choice-one");
const choice2 = document.querySelector(".choice-two");
const newArrival = document.querySelector(".new-arrival");
const newArrivalShop = document.querySelector(".new-arrivals-shop");
const popularItemsShop = document.querySelector(".popular-items-shop");

// Start observing the elements
if (choice1) observer.observe(choice1);
if (choice2) observer.observe(choice2);
if (newArrival) observer.observe(newArrival);
if (newArrivalShop) observer.observe(newArrivalShop);
if (popularItemsShop) observer.observe(popularItemsShop);

// add to cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count badge
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0); // Calculate total quantity
  cartCountElement.textContent = totalCount; // Update badge with total quantity

  // Show or hide the badge based on total count
  cartCountElement.style.display = totalCount > 0 ? "inline" : "none"; // Show/hide badge
}

// Calculate total cost of items in the cart
function calculateTotalCost() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0); // Calculate total cost
}

// Update total cost display
function updateTotalCost() {
  const totalCostElement = document.getElementById("total-cost");
  const totalCost = calculateTotalCost().toFixed(2); // Format to two decimal places
  totalCostElement.textContent = `$${totalCost}`; // Update total cost display
}

// Render cart items in the cart
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; // Clear existing items

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>"; // Show empty cart message
    updateTotalCost(); // Update total cost when cart is empty
    return;
  }

  // Create a flex container for the cart items
  const itemsRow = document.createElement("div");
  itemsRow.className = "d-flex flex-wrap justify-content-start"; // Bootstrap classes for layout

  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item mb-3 me-3"; // Assign a class for styling with margin-bottom and right
    itemDiv.style.width = "calc(33.33% - 1rem)"; // Set width to a third of the row minus margin

    itemDiv.innerHTML = `
      <div class="card">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">$${item.price.toFixed(2)}</p>
              <span>Quantity: ${item.quantity}</span>
              <button class="increase btn btn-secondary" data-name="${item.name}">+</button>
              <button class="decrease btn btn-secondary" data-name="${item.name}">-</button>
            </div>
          </div>
        </div>
      </div>
    `;

    itemsRow.appendChild(itemDiv); // Add item div to the row
  });

  cartItemsContainer.appendChild(itemsRow); // Append the row of items to the cart container
  updateTotalCost(); // Update total cost after rendering items
}

// Update quantity of an item
function updateItemQuantity(itemName, change) {
  const existingItem = cart.find((i) => i.name === itemName);
  if (existingItem) {
    existingItem.quantity += change;
    if (existingItem.quantity <= 0) {
      cart = cart.filter((i) => i.name !== itemName); // Remove item if quantity is 0
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartItems(); // Re-render cart items
  }
}

// Add item to cart with quantity tracking
function addToCart(item) {
  const existingItem = cart.find((i) => i.name === item.name);
  if (existingItem) {
    existingItem.quantity += 1; // Increment the quantity if the item exists
  } else {
    cart.push({ ...item, quantity: 1 }); // Add item with quantity 1
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems(); // Render cart items
  alert(
    `${item.name} has been added to your cart! Total quantity: ${
      existingItem ? existingItem.quantity : 1
    }`
  ); // User feedback
}

// Clear cart
function clearCart() {
  cart = []; // Reset the cart array
  localStorage.removeItem("cart"); // Remove cart from local storage
  updateCartCount(); // Update the cart count badge
  renderCartItems(); // Re-render items to reflect the empty cart
  updateTotalCost(); // Reset total cost when cart is cleared
}

// Attach event listener to the "Empty Cart" button
const emptyCartButton = document.getElementById("empty-cart");
if (emptyCartButton) {
  emptyCartButton.addEventListener("click", function () {
    if (confirm("Are you sure you want to empty the cart?")) {
      clearCart();
    }
  });
} else {
  console.error("Empty cart button not found!");
}

// Attach event listeners for increase and decrease buttons
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("increase")) {
    const itemName = event.target.dataset.name;
    updateItemQuantity(itemName, 1); // Increase quantity
  }
  if (event.target.classList.contains("decrease")) {
    const itemName = event.target.dataset.name;
    updateItemQuantity(itemName, -1); // Decrease quantity
  }
});

// Attach event listeners to add-to-cart buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const item = {
      name: this.dataset.itemName,
      price: parseFloat(this.dataset.itemPrice),
      image: this.dataset.itemImage,
    };
    addToCart(item);
  });
});

// Attach event listener to the "Check Out" button
const checkoutButton = document.getElementById("checkout-button");
if (checkoutButton) {
  checkoutButton.addEventListener("click", function () {
    alert("Proceeding to checkout!"); // Placeholder for checkout functionality
    // Here, you can add code to handle the checkout process
  });
} else {
  console.error("Checkout button not found!");
}

// Update cart count and render items on page load
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  renderCartItems(); // Render cart items on page load
});
