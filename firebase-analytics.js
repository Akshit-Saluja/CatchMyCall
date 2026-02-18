// Firebase Analytics Integration for CatchMyCall Website
// Import Firebase modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics, logEvent, setUserId } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCServ3OfFvndrTKyhoxy7GYJaRpcfk5io",
  authDomain: "catchmycall-1fbf8.firebaseapp.com",
  projectId: "catchmycall-1fbf8",
  storageBucket: "catchmycall-1fbf8.firebasestorage.app",
  messagingSenderId: "253367173733",
  appId: "1:253367173733:web:e2a0702a1107b0c6fa3c8c",
  measurementId: "G-YFHMDHP3H4"
};

// Initialize Firebase
let app = null;
let analytics = null;

try {
  app = initializeApp(firebaseConfig);
  console.log("✅ Firebase App initialized successfully");
} catch (error) {
  console.warn("❌ Firebase app initialization failed:", error.message);
}

// Initialize Analytics
if (typeof window !== "undefined" && app) {
  try {
    analytics = getAnalytics(app);
    console.log("✅ Firebase Analytics initialized successfully");
  } catch (error) {
    console.warn("❌ Firebase analytics initialization failed:", error.message);
    analytics = null;
  }
}

// ========================================
// ANALYTICS UTILITY FUNCTIONS
// ========================================

/**
 * Set Analytics User ID
 * @param {string} userId - Unique user identifier
 */
export const setAnalyticsUserId = (userId) => {
  if (analytics && userId) {
    setUserId(analytics, userId);
    console.log("✅ Analytics User ID set:", userId);
  }
};

/**
 * Track Page/Section Visit
 * @param {string} eventName - Name of the event (e.g., "view_home_section")
 * @param {string} pageUrl - URL or section identifier
 * @param {object} additionalParams - Optional additional parameters
 */
export const pageVisitEvent = (eventName, pageUrl, additionalParams = {}) => {
  if (analytics) {
    logEvent(analytics, eventName, {
      event_category: "PAGE_VISIT",
      page_url: pageUrl,
      timestamp: new Date().toISOString(),
      ...additionalParams
    });
    console.log(`✅ Page visit event logged: ${eventName} - ${pageUrl}`);
  } else {
    console.error("❌ Analytics not available for pageVisitEvent");
  }
};

/**
 * Track Button Clicks
 * @param {string} eventName - Name of the event (e.g., "click_download_app")
 * @param {object} additionalParams - Optional additional parameters
 */
export const buttonClickEvent = (eventName, additionalParams = {}) => {
  if (analytics) {
    logEvent(analytics, eventName, {
      event_category: "BUTTON_CLICK",
      timestamp: new Date().toISOString(),
      ...additionalParams
    });
    console.log(`✅ Button click event logged: ${eventName}`);
  } else {
    console.error("❌ Analytics not available for buttonClickEvent");
  }
};

/**
 * Track Function Calls / Custom Events
 * @param {string} eventName - Name of the event
 * @param {object} additionalParams - Optional additional parameters
 */
export const functionCallEvent = (eventName, additionalParams = {}) => {
  if (analytics) {
    logEvent(analytics, eventName, {
      event_category: "FUNCTION_CALL_EVENT",
      timestamp: new Date().toISOString(),
      ...additionalParams
    });
    console.log(`✅ Function call event logged: ${eventName}`);
  } else {
    console.error("❌ Analytics not available for functionCallEvent");
  }
};

/**
 * Track Form Submissions
 * @param {string} formName - Name of the form (e.g., "contact_form")
 * @param {object} additionalParams - Optional additional parameters
 */
export const formSubmissionEvent = (formName, additionalParams = {}) => {
  if (analytics) {
    logEvent(analytics, "form_submission", {
      event_category: "FORM_INTERACTION",
      form_name: formName,
      timestamp: new Date().toISOString(),
      ...additionalParams
    });
    console.log(`✅ Form submission event logged: ${formName}`);
  } else {
    console.error("❌ Analytics not available for formSubmissionEvent");
  }
};

/**
 * Track Card/Animation Interactions
 * @param {string} cardType - Type of card (e.g., "rotating_card", "pricing_card")
 * @param {string} cardName - Name/identifier of the card
 * @param {object} additionalParams - Optional additional parameters
 */
export const cardInteractionEvent = (cardType, cardName, additionalParams = {}) => {
  if (analytics) {
    logEvent(analytics, "card_interaction", {
      event_category: "USER_INTERACTION",
      card_type: cardType,
      card_name: cardName,
      timestamp: new Date().toISOString(),
      ...additionalParams
    });
    console.log(`✅ Card interaction event logged: ${cardType} - ${cardName}`);
  } else {
    console.error("❌ Analytics not available for cardInteractionEvent");
  }
};

/**
 * Track Navigation Menu Interactions
 * @param {string} menuItem - Menu item clicked
 * @param {string} menuType - Type of menu (desktop/mobile)
 */
export const navigationEvent = (menuItem, menuType = "desktop") => {
  if (analytics) {
    logEvent(analytics, "navigation_click", {
      event_category: "NAVIGATION",
      menu_item: menuItem,
      menu_type: menuType,
      timestamp: new Date().toISOString()
    });
    console.log(`✅ Navigation event logged: ${menuItem} (${menuType})`);
  } else {
    console.error("❌ Analytics not available for navigationEvent");
  }
};

/**
 * Track Scroll Depth
 * @param {number} scrollPercentage - Percentage of page scrolled
 * @param {string} sectionName - Name of section reached
 */
export const scrollDepthEvent = (scrollPercentage, sectionName = "") => {
  if (analytics) {
    logEvent(analytics, "scroll_depth", {
      event_category: "USER_ENGAGEMENT",
      scroll_percentage: scrollPercentage,
      section_name: sectionName,
      timestamp: new Date().toISOString()
    });
    console.log(`✅ Scroll depth event logged: ${scrollPercentage}% - ${sectionName}`);
  } else {
    console.error("❌ Analytics not available for scrollDepthEvent");
  }
};

/**
 * Track App Store Button Clicks
 * @param {string} platform - Platform (app_store/play_store)
 * @param {string} location - Location of button (hero/footer/download_section)
 */
export const appStoreClickEvent = (platform, location) => {
  if (analytics) {
    logEvent(analytics, "app_store_click", {
      event_category: "CONVERSION",
      platform: platform,
      button_location: location,
      timestamp: new Date().toISOString()
    });
    console.log(`✅ App store click event logged: ${platform} - ${location}`);
  } else {
    console.error("❌ Analytics not available for appStoreClickEvent");
  }
};

export { analytics };
export default app;