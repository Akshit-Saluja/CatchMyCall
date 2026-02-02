/* rotating  cards */
document.addEventListener('DOMContentLoaded', function () {
  const cards = Array.from(document.querySelectorAll('.rotating-card'));
  const indicators = document.querySelectorAll('.indicator-dot');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const backgroundOverlay = document.getElementById('heroBackgroundOverlay');

  let currentIndex = 0;
  const rotationInterval = 3700;

  /* 🔹 Background classes mapped to card type */
  const cardBackgrounds = {
    "not-reachable": "bg-not-reachable",
    "all-calls": "bg-all-calls",
    "busy": "bg-busy",
    "no-answer": "bg-no-answer"
  };

  /* 🔹 Subtitle text mapped to card type */
 const cardSubtitles = {
  "not-reachable": `
    AI-powered call handling for <strong style="font-weight: 500;">Busy professionals</strong>, <strong style="font-weight: 500;">Small <br>businesses</strong>, and <strong style="font-weight: 500;">Individuals</strong>.
  `,
  "all-calls": `
    Personalize the message your AI assistant uses when <br>replying to callers with <strong style="font-weight: 500;">CatchMyCall</strong>.
  `,
  "busy": `
    Never miss an important call during meetings—<strong style="font-weight: 500;">CatchMyCall</strong><br> will handle all your calls.
  `,
  "no-answer": `
    <strong style="font-weight: 500;">CatchMyCall</strong> ensures every call is handled, summarized,<br> and delivered to you.
  `
};

  function updateSubtitle(activeCard) {
    const type = activeCard.dataset.card;
    if (!cardSubtitles[type]) return;

    heroSubtitle.classList.add('fade-out');

    setTimeout(() => {
      heroSubtitle.innerHTML = cardSubtitles[type];
      heroSubtitle.classList.remove('fade-out');
    }, 200);
  }

  function updateBackground(activeCard) {
    if (!backgroundOverlay) return;

    const type = activeCard.dataset.card;
    backgroundOverlay.className =
      'hero-background-overlay ' + (cardBackgrounds[type] || '');
  }

  function updateCardPositions() {
    const total = cards.length;

    cards.forEach((card, i) => {
      card.classList.remove('active', 'prev', 'next', 'hidden');

      const diff = (i - currentIndex + total) % total;

      if (diff === 0) {
        card.classList.add('active');
        updateSubtitle(card);
        updateBackground(card);
      } else if (diff === 1) {
        card.classList.add('next');
      } else if (diff === total - 1) {
        card.classList.add('prev');
      } else {
        card.classList.add('hidden');
      }
    });

    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function rotateCards() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCardPositions();
  }

  /* 🔁 Auto rotation */
  let rotationTimer = setInterval(rotateCards, rotationInterval);

  /* 🚀 Init */
  updateCardPositions();
});




/* Smart Call Routing Animation - Add to your responsive.js */

document.addEventListener('DOMContentLoaded', function () {
  // Existing rotating cards code...
  // (Keep your existing code above)

  // Smart Call Routing Animation
  const featureCards = document.querySelectorAll('.feature-card');
  const demoStates = document.querySelectorAll('.demo-state');
  const toggleSwitch = document.querySelector('.toggle-switch');
  
  let currentFeatureIndex = 0;
  const featureInterval = 4000; // 4 seconds per feature
  let featureTimer;

  function activateFeature(index) {
    // Reset all cards and states
    featureCards.forEach(card => card.classList.remove('active'));
    demoStates.forEach(state => {
      state.classList.remove('active');
      // Reset animations by removing and re-adding children
      const clone = state.cloneNode(true);
      state.parentNode.replaceChild(clone, state);
    });

    // Update references after cloning
    const updatedDemoStates = document.querySelectorAll('.demo-state');
    const updatedToggleSwitch = document.querySelector('.toggle-switch');

    // Activate current feature
    if (featureCards[index]) {
      featureCards[index].classList.add('active');
    }

    if (updatedDemoStates[index]) {
      updatedDemoStates[index].classList.add('active');
    }

    // Special handling for toggle switch animation (3rd state)
    if (index === 2 && updatedToggleSwitch) {
      setTimeout(() => {
        updatedToggleSwitch.classList.add('active');
      }, 1600); // Trigger after hand pointer animation
    }
  }

  function startFeatureRotation() {
    activateFeature(currentFeatureIndex);
    
    featureTimer = setInterval(() => {
      currentFeatureIndex = (currentFeatureIndex + 1) % featureCards.length;
      activateFeature(currentFeatureIndex);
    }, featureInterval);
  }

  // Initialize when section is visible
  function initSmartRouting() {
    const section = document.querySelector('.smart-call-routing');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start animation when section comes into view
          if (!featureTimer) {
            startFeatureRotation();
          }
        } else {
          // Stop animation when section is out of view
          if (featureTimer) {
            clearInterval(featureTimer);
            featureTimer = null;
          }
        }
      });
    }, { threshold: 0.3 });

    observer.observe(section);
  }

  // Optional: Manual control - click on feature cards
  featureCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      clearInterval(featureTimer);
      currentFeatureIndex = index;
      activateFeature(currentFeatureIndex);
      
      // Restart automatic rotation after manual selection
      setTimeout(() => {
        startFeatureRotation();
      }, featureInterval);
    });
  });

  // Initialize
  initSmartRouting();

  // Pause animations when page is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (featureTimer) {
        clearInterval(featureTimer);
        featureTimer = null;
      }
    } else {
      const section = document.querySelector('.smart-call-routing');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible && !featureTimer) {
          startFeatureRotation();
        }
      }
    }
  });
});




    // Contact Form JavaScript
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    
    // Form fields
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const profession = document.getElementById('profession');
    const message = document.getElementById('message');

    // Error messages
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const professionError = document.getElementById('professionError');
    const messageError = document.getElementById('messageError');

    // Validation functions
    function validateName() {
        if (fullName.value.trim().length < 2) {
            fullName.classList.add('error');
            nameError.classList.add('show');
            return false;
        }
        fullName.classList.remove('error');
        nameError.classList.remove('show');
        return true;
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.classList.add('error');
            emailError.classList.add('show');
            return false;
        }
        email.classList.remove('error');
        emailError.classList.remove('show');
        return true;
    }

    function validateProfession() {
        if (profession.value === '') {
            profession.classList.add('error');
            professionError.classList.add('show');
            return false;
        }
        profession.classList.remove('error');
        professionError.classList.remove('show');
        return true;
    }

    function validateMessage() {
        if (message.value.trim().length < 10) {
            message.classList.add('error');
            messageError.textContent = 'Message should be at least 10 characters';
            messageError.classList.add('show');
            return false;
        }
        message.classList.remove('error');
        messageError.classList.remove('show');
        return true;
    }

    // Real-time validation
    fullName.addEventListener('blur', validateName);
    email.addEventListener('blur', validateEmail);
    profession.addEventListener('change', validateProfession);
    message.addEventListener('blur', validateMessage);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isProfessionValid = validateProfession();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isProfessionValid && isMessageValid) {
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            // Get form data
            const formData = {
                fullName: fullName.value.trim(),
                email: email.value.trim(),
                profession: profession.value,
                message: message.value.trim(),
                timestamp: new Date().toISOString()
            };

            // TODO: Replace this with your actual API endpoint
            // Example: fetch('https://your-api.com/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })

            // Simulate form submission
            setTimeout(() => {
                console.log('Form submitted:', formData);

                // Show success message
                successMessage.classList.add('show');

                // Reset form
                form.reset();

                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Details';

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }, 1500);
        }
    });

    // Remove error styling when user starts typing
    fullName.addEventListener('input', () => {
        if (fullName.classList.contains('error')) {
            fullName.classList.remove('error');
            nameError.classList.remove('show');
        }
    });

    email.addEventListener('input', () => {
        if (email.classList.contains('error')) {
            email.classList.remove('error');
            emailError.classList.remove('show');
        }
    });

    message.addEventListener('input', () => {
        if (message.classList.contains('error')) {
            message.classList.remove('error');
            messageError.classList.remove('show');
        }
    });



// Mobile Navigation Menu Toggle
document.addEventListener("DOMContentLoaded", function () {

  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const hamburgerIcon = hamburgerMenu.querySelector("i"); // FontAwesome icon

  if (!hamburgerMenu || !mobileNavOverlay) return;

  // Toggle menu
  hamburgerMenu.addEventListener("click", function () {
    mobileNavOverlay.classList.toggle("active");

    // Switch icon ☰ ↔ ✕
    if (mobileNavOverlay.classList.contains("active")) {
      hamburgerIcon.classList.remove("fa-bars");
      hamburgerIcon.classList.add("fa-xmark");
      document.body.style.overflow = "hidden";
    } else {
      hamburgerIcon.classList.remove("fa-xmark");
      hamburgerIcon.classList.add("fa-bars");
      document.body.style.overflow = "";
    }
  });

  // Close menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", function () {
      mobileNavOverlay.classList.remove("active");
      hamburgerIcon.classList.remove("fa-xmark");
      hamburgerIcon.classList.add("fa-bars");
      document.body.style.overflow = "";

      // Active state
      mobileNavLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Close when clicking outside content
  mobileNavOverlay.addEventListener("click", function (e) {
    if (e.target === mobileNavOverlay) {
      mobileNavOverlay.classList.remove("active");
      hamburgerIcon.classList.remove("fa-xmark");
      hamburgerIcon.classList.add("fa-bars");
      document.body.style.overflow = "";
    }
  });

});


// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});