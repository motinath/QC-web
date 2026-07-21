/**
 * Centralized Analytics Service
 * Multi-platform support for Google Analytics 4, GTM, and Microsoft Clarity.
 */

interface TrackEventParams {
  category: string;
  action: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

// Window declaration for analytics scripts
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    clarity?: (...args: unknown[]) => void;
  }
}

export const analytics = {
  /**
   * Track page views across route changes
   */
  pageview(url: string, title?: string) {
    if (typeof window === "undefined") return;

    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_location: url,
        page_title: title || document.title,
      });
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: "page_view",
        page_url: url,
        page_title: title || document.title,
      });
    }
  },

  /**
   * Track custom interaction events (CTAs, form submissions, external clicks)
   */
  event({ category, action, label, value, ...extraParams }: TrackEventParams) {
    if (typeof window === "undefined") return;

    if (window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
        ...extraParams,
      });
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: action,
        event_category: category,
        event_label: label,
        event_value: value,
        ...extraParams,
      });
    }
  },
};
