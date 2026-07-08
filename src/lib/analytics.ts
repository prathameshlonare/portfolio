const GA_MEASUREMENT_ID = "G-0656ELB9JD";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

export function trackPageView(url: string) {
  gtag("config", GA_MEASUREMENT_ID, { page_path: url });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  gtag("event", eventName, params);
}

export function trackResumeDownload() {
  trackEvent("resume_download", {
    file_name: "prathamesh_lonare_resume.pdf",
  });
}

export function trackCtaClick(label: string, url: string) {
  trackEvent("cta_click", {
    button_label: label,
    destination_url: url,
  });
}

export function trackProjectClick(projectName: string, url: string) {
  trackEvent("project_github_click", {
    project_name: projectName,
    destination_url: url,
  });
}

export function trackSectionView(sectionId: string) {
  trackEvent("section_view", {
    section_id: sectionId,
  });
}

export function trackScrollDepth(percent: number) {
  trackEvent("scroll_depth", {
    percent_scrolled: percent,
  });
}
