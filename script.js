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
