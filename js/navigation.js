const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  
  menuToggle.addEventListener("click", () => {
    
    menuToggle.classList.toggle("active");
    
    navLinks.classList.toggle("show");
    
  });
  
  document.querySelectorAll(".nav-links a").forEach(link => {
    
    link.addEventListener("click", () => {
      
      menuToggle.classList.remove("active");
      
      navLinks.classList.remove("show");
      
    });
    
  });
  
}