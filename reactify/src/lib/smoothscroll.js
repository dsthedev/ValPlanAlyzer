// src/smoothScroll.js
const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1); // Get the target ID from href (e.g., 'first')
      const targetElement = document.getElementById(targetId);
      
      // Scroll to the element with smooth behavior
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        // Update the URL with the target hash without reloading the page
        window.history.pushState(null, null, "#" + targetId);
      }
    });
  });
};

export default smoothScroll;
