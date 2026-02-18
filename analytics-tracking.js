// Analytics Tracking Script for CatchMyCall Website
// This script tracks all user interactions, page visits, and button clicks

import { 
  pageVisitEvent, 
  buttonClickEvent, 
  navigationEvent,
  scrollDepthEvent,
  appStoreClickEvent,
  cardInteractionEvent,
  formSubmissionEvent,
  functionCallEvent
} from './firebase-analytics.js';

console.log("✅ Analytics tracking script loaded");

// ========================================
// SECTION VISIBILITY TRACKING
// ========================================

/**
 * Track when user views different sections of the page
 */
function initSectionTracking() {
  // Define all sections to track
  const sections = [
    { id: 'home', name: 'Home Section' },
    { id: 'product-features', name: 'Product Features Section' },
    { id: 'how-it-works', name: 'How It Works Section' },
    { id: 'pricing', name: 'Pricing Section' },
    { id: 'small-business', name: 'Small Business Section' },
    { id: 'testimonials', name: 'Testimonials Section' },
    { id: 'faqs', name: 'FAQs Section' }
  ];

  // Track which sections have been viewed
  const viewedSections = new Set();

  // Create Intersection Observer for section tracking
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        
        // Only track once per session per section
        if (!viewedSections.has(sectionId)) {
          viewedSections.add(sectionId);
          
          const sectionName = sections.find(s => s.id === sectionId)?.name || sectionId;
          pageVisitEvent(
            `view_${sectionId}_section`,
            `#${sectionId}`,
            { section_name: sectionName }
          );
        }
      }
    });
  }, {
    threshold: 0.5, // Section is considered "viewed" when 50% visible
    rootMargin: '0px'
  });

  // Observe all sections
  sections.forEach(section => {
    const element = document.getElementById(section.id);
    if (element) {
      sectionObserver.observe(element);
    }
  });

  console.log("✅ Section tracking initialized");
}

// ========================================
// SCROLL DEPTH TRACKING
// ========================================

/**
 * Track how far users scroll down the page
 */
function initScrollDepthTracking() {
  const scrollMilestones = [25, 50, 75, 100];
  const reachedMilestones = new Set();

  window.addEventListener('scroll', () => {
    const scrollPercentage = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    scrollMilestones.forEach(milestone => {
      if (scrollPercentage >= milestone && !reachedMilestones.has(milestone)) {
        reachedMilestones.add(milestone);
        scrollDepthEvent(milestone);
      }
    });
  });

  console.log("✅ Scroll depth tracking initialized");
}

// ========================================
// NAVIGATION TRACKING
// ========================================

/**
 * Track all navigation link clicks
 */
function initNavigationTracking() {
  // Desktop navigation links
  const desktopNavLinks = document.querySelectorAll('.navigation a, .logo');
  desktopNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const linkText = link.textContent.trim() || link.getAttribute('href') || 'Logo';
      navigationEvent(linkText, 'desktop');
    });
  });

  // Mobile navigation links
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const linkText = link.textContent.trim();
      navigationEvent(linkText, 'mobile');
    });
  });

  // Hamburger menu tracking
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
      buttonClickEvent('hamburger_menu_toggle', {
        button_name: 'Hamburger Menu',
        button_location: 'mobile_nav'
      });
    });
  }

  console.log("✅ Navigation tracking initialized");
}

// ========================================
// APP STORE BUTTON TRACKING
// ========================================

/**
 * Track all App Store and Play Store button clicks
 */
function initAppStoreTracking() {
  // Mobile nav app store buttons
  const mobileAppStoreBtn = document.getElementById('appStoreButton');
  const mobilePlayStoreBtn = document.getElementById('playStoreButton');

  if (mobileAppStoreBtn) {
    mobileAppStoreBtn.addEventListener('click', () => {
      appStoreClickEvent('app_store', 'mobile_nav');
    });
  }

  if (mobilePlayStoreBtn) {
    mobilePlayStoreBtn.addEventListener('click', () => {
      appStoreClickEvent('play_store', 'mobile_nav');
    });
  }

  // Download section app store buttons
  const downloadAppStoreBtn = document.getElementById('downloadAppStoreButton');
  const downloadPlayStoreBtn = document.getElementById('downloadPlayStoreButton');

  if (downloadAppStoreBtn) {
    downloadAppStoreBtn.addEventListener('click', () => {
      appStoreClickEvent('app_store', 'download_section');
    });
  }

  if (downloadPlayStoreBtn) {
    downloadPlayStoreBtn.addEventListener('click', () => {
      appStoreClickEvent('play_store', 'download_section');
    });
  }

  // Find all other app store links in the page
  const allAppStoreLinks = document.querySelectorAll('a[href*="apps.apple.com"]');
  const allPlayStoreLinks = document.querySelectorAll('a[href*="play.google.com"]');

  allAppStoreLinks.forEach(link => {
    if (link.id !== 'appStoreButton' && link.id !== 'downloadAppStoreButton') {
      link.addEventListener('click', () => {
        const location = link.closest('section')?.id || 'unknown';
        appStoreClickEvent('app_store', location);
      });
    }
  });

  allPlayStoreLinks.forEach(link => {
    if (link.id !== 'playStoreButton' && link.id !== 'downloadPlayStoreButton') {
      link.addEventListener('click', () => {
        const location = link.closest('section')?.id || 'unknown';
        appStoreClickEvent('play_store', location);
      });
    }
  });

  console.log("✅ App store button tracking initialized");
}

// ========================================
// ROTATING CARDS TRACKING
// ========================================

/**
 * Track interactions with rotating hero cards
 */
function initRotatingCardsTracking() {
  const cards = document.querySelectorAll('.rotating-card');
  
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const cardType = card.dataset.card || 'unknown';
      cardInteractionEvent('rotating_card', cardType, {
        interaction_type: 'click',
        section: 'hero'
      });
    });
  });

  // Track indicator dot clicks
  const indicators = document.querySelectorAll('.indicator-dot');
  indicators.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      buttonClickEvent('hero_indicator_dot', {
        button_name: `Indicator ${index + 1}`,
        button_location: 'hero_section'
      });
    });
  });

  console.log("✅ Rotating cards tracking initialized");
}

// ========================================
// PRICING CARDS TRACKING
// ========================================

/**
 * Track interactions with pricing cards
 */
function initPricingCardsTracking() {
  const pricingCards = document.querySelectorAll('.pricing-card');
  
  pricingCards.forEach(card => {
    // Track card clicks
    card.addEventListener('click', () => {
      const planName = card.querySelector('.pricing-title')?.textContent.trim() || 'Unknown Plan';
      cardInteractionEvent('pricing_card', planName, {
        interaction_type: 'click',
        section: 'pricing'
      });
    });

    // Track CTA button clicks within pricing cards
    const ctaButton = card.querySelector('.pricing-cta-button, .pricing-button');
    if (ctaButton) {
      ctaButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent double tracking
        const planName = card.querySelector('.pricing-title')?.textContent.trim() || 'Unknown Plan';
        buttonClickEvent('pricing_cta_click', {
          button_name: 'Choose Plan',
          plan_name: planName,
          button_location: 'pricing_section'
        });
      });
    }
  });

  console.log("✅ Pricing cards tracking initialized");
}

// ========================================
// SMART CALL ROUTING / FEATURE CARDS TRACKING
// ========================================

/**
 * Track interactions with feature cards
 */
function initFeatureCardsTracking() {
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('click', () => {
      const featureTitle = card.querySelector('h3, .feature-title')?.textContent.trim() || 'Unknown Feature';
      cardInteractionEvent('feature_card', featureTitle, {
        interaction_type: 'click',
        section: 'product_features'
      });
    });
  });

  console.log("✅ Feature cards tracking initialized");
}

// ========================================
// FAQ ACCORDION TRACKING
// ========================================

/**
 * Track FAQ accordion interactions
 */
function initFAQTracking() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        const questionText = question.textContent.trim();
        const isOpening = !item.classList.contains('active');
        
        buttonClickEvent('faq_accordion_toggle', {
          button_name: 'FAQ Question',
          question_text: questionText.substring(0, 100), // Limit length
          action: isOpening ? 'open' : 'close',
          button_location: 'faq_section'
        });
      });
    }
  });

  console.log("✅ FAQ tracking initialized");
}

// ========================================
// FORM SUBMISSION TRACKING
// ========================================

/**
 * Track form submissions (contact form, etc.)
 */
function initFormTracking() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const formId = form.id || form.className || 'unknown_form';
      formSubmissionEvent(formId, {
        form_type: 'contact',
        form_location: form.closest('section')?.id || 'unknown'
      });
    });
  });

  console.log("✅ Form tracking initialized");
}

// ========================================
// FOOTER LINKS TRACKING
// ========================================

/**
 * Track footer link clicks
 */
function initFooterTracking() {
  const footerLinks = document.querySelectorAll('.footer a');
  
  footerLinks.forEach(link => {
    link.addEventListener('click', () => {
      const linkText = link.textContent.trim();
      const linkHref = link.getAttribute('href');
      
      buttonClickEvent('footer_link_click', {
        button_name: linkText,
        link_url: linkHref,
        button_location: 'footer'
      });
    });
  });

  // Social media links
  const socialLinks = document.querySelectorAll('.social-icon');
  socialLinks.forEach(link => {
    link.addEventListener('click', () => {
      const platform = link.getAttribute('aria-label') || 'Unknown';
      buttonClickEvent('social_media_click', {
        button_name: `Social - ${platform}`,
        platform: platform,
        button_location: 'footer'
      });
    });
  });

  console.log("✅ Footer tracking initialized");
}

// ========================================
// SECTION 2 ANIMATION TRACKING (from script.js)
// ========================================

/**
 * Track Section 2 card animations
 */
function initSection2Tracking() {
  const section2Cards = {
    card1: document.getElementById('card1'),
    card2: document.getElementById('card2'),
    card3: document.getElementById('card3')
  };

  Object.entries(section2Cards).forEach(([cardId, card]) => {
    if (card) {
      card.addEventListener('click', () => {
        cardInteractionEvent('section2_card', cardId, {
          interaction_type: 'click',
          section: 'section2'
        });
      });
    }
  });

  console.log("✅ Section 2 tracking initialized");
}

// ========================================
// INITIALIZE ALL TRACKING
// ========================================

/**
 * Initialize all analytics tracking when DOM is ready
 */
function initAllTracking() {
  console.log("🚀 Initializing all analytics tracking...");
  
  try {
    initSectionTracking();
    initScrollDepthTracking();
    initNavigationTracking();
    initAppStoreTracking();
    initRotatingCardsTracking();
    initPricingCardsTracking();
    initFeatureCardsTracking();
    initFAQTracking();
    initFormTracking();
    initFooterTracking();
    initSection2Tracking();
    
    // Track initial page load
    pageVisitEvent('page_load', window.location.pathname, {
      page_title: document.title,
      referrer: document.referrer
    });
    
    console.log("✅ All analytics tracking initialized successfully!");
  } catch (error) {
    console.error("❌ Error initializing analytics tracking:", error);
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllTracking);
} else {
  initAllTracking();
}

// Export for manual tracking if needed
export { 
  pageVisitEvent, 
  buttonClickEvent, 
  navigationEvent,
  scrollDepthEvent,
  appStoreClickEvent,
  cardInteractionEvent,
  formSubmissionEvent,
  functionCallEvent
};