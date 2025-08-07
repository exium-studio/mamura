export default function scrollToView(
  id: string,
  options?: {
    offsetY?: number;
    offsetX?: number;
    onAfterScroll?: () => void;
    threshold?: number; // optional: how much of the element must be visible
  }
) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with ID '${id}' not found.`);
    return;
  }

  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  const top = rect.top + scrollTop + (options?.offsetY ?? 0);
  const left = rect.left + scrollLeft + (options?.offsetX ?? 0);

  // Start observing before scroll
  if (options?.onAfterScroll) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          observerInstance.disconnect();
          options.onAfterScroll?.();
        }
      },
      {
        root: null,
        threshold: options.threshold ?? 0.8, // default 80% visible
      }
    );
    observer.observe(element);
  }

  // Perform smooth scroll
  window.scrollTo({
    top,
    left,
    behavior: "smooth",
  });
}
