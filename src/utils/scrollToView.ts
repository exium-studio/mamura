export default function scrollToView(
  id: string,
  options?: {
    offsetY?: number;
    offsetX?: number;
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

  window.scrollTo({
    top,
    left,
    behavior: "smooth",
  });
}
