/**
 * Tracking Utilities
 * UTM parameter handling, event tracking, and analytics
 */

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  uid?: string; // User ID from email/WA campaigns
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    openVoiceWidget?: (character: string) => void;
  }
}

/**
 * Get UTM parameters from current URL
 */
export function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};
  
  const keys: (keyof UTMParams)[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'uid'];
  
  keys.forEach(key => {
    const value = params.get(key);
    if (value) utm[key] = value;
  });
  
  // Store in sessionStorage for form submission
  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(utm));
  }
  
  return utm;
}

/**
 * Get stored UTM parameters from sessionStorage
 */
export function getStoredUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  const stored = sessionStorage.getItem('utm_params');
  return stored ? JSON.parse(stored) : {};
}

/**
 * Track custom events across GA4, Facebook Pixel, and GTM
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  // GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
  
  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
  
  // DataLayer for GTM
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
  
  // Console log in development
  if (import.meta.env.DEV) {
    console.log(`[Track] ${eventName}`, params);
  }
}

// ============================================
// Predefined Event Tracking Functions
// ============================================

export const trackFormView = () => trackEvent('form_view', { form_name: 'quote_form' });

export const trackFormStart = () => trackEvent('form_start', { form_name: 'quote_form' });

export const trackFormSubmit = (data: Record<string, unknown>) => 
  trackEvent('form_submit', { form_name: 'quote_form', ...data });

export const trackDemoClick = (character: string) => 
  trackEvent('demo_click', { character });

export const trackBubbleClick = (action: string) => 
  trackEvent('bubble_click', { action });

export const trackSectionView = (section: string) => 
  trackEvent('section_view', { section });

export const trackCalculatorUse = (values: Record<string, unknown>) => 
  trackEvent('calculator_use', values);

export const trackPricingView = (tier: string) => 
  trackEvent('pricing_view', { tier });

export const trackWhatsAppClick = (character: string, source: string) => 
  trackEvent('whatsapp_click', { character, source });

export const trackVoiceStart = (character: string) => 
  trackEvent('voice_start', { character });

export const trackCTAClick = (cta: string, location: string) => 
  trackEvent('cta_click', { cta, location });

/**
 * Initialize UTM tracking on page load
 * Call this in your App component or main entry point
 */
export function initializeTracking() {
  if (typeof window === 'undefined') return;
  
  // Capture UTM params from URL
  const utmParams = getUTMParams();
  
  // Track page view with UTM data
  if (Object.keys(utmParams).length > 0) {
    trackEvent('page_view_with_utm', utmParams as Record<string, unknown>);
  }
  
  return utmParams;
}

