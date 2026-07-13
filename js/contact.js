// ==========================
// CONTACT FORM
// ==========================

// Form
const contactForm = document.getElementById("contactForm");

// Notification Elements
const notification = document.getElementById("contactNotification");
const notificationIcon = document.getElementById("notificationIcon");
const notificationTitle = document.getElementById("notificationTitle");
const notificationMessage = document.getElementById("notificationMessage");

// Show Notification
function showNotification(icon, title, message) {
  
  notificationIcon.textContent = icon;
  notificationTitle.textContent = title;
  notificationMessage.textContent = message;
  
  notification.classList.add("show");
  
  setTimeout(function() {
    notification.classList.remove("show");
  }, 3000);
  
}

// Form Submit
if (contactForm) {
  
  contactForm.addEventListener("submit", function(event) {
    
    event.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    
    // Empty fields
    if (!name || !email || !subject || !message) {
      
      showNotification(
        "⚠️",
        "Incomplete Form",
        "Please fill in all the fields."
      );
      
      return;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(email)) {
      
      showNotification(
        "❌",
        "Invalid Email",
        "Please enter a valid email address."
      );
      
      return;
    }
    
    // Name validation
    if (name.length < 3) {
      
      showNotification(
        "❌",
        "Invalid Name",
        "Your name must be at least 3 characters long."
      );
      
      return;
    }
    
    // Subject validation
    if (subject.length < 5) {
      
      showNotification(
        "❌",
        "Subject Too Short",
        "Subject must be at least 5 characters long."
      );
      
      return;
    }
    
    // Message validation
    if (message.length < 20) {
      
      showNotification(
        "❌",
        "Message Too Short",
        "Please provide a more detailed message."
      );
      
      return;
    }
    
    // Success
    showNotification(
  "✅",
  "Message Submitted!",
  "Thanks for reaching out. I'll get back to you as soon as possible."
);
    
    console.log({
      name,
      email,
      subject,
      message
    });
    
    contactForm.reset();
    
  });
  
}