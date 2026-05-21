// Reusable scroll-reveal utility using IntersectionObserver.
// Components can call initScrollReveal() once to activate reveal animations
// without attaching a scroll event listener.

export function initScrollReveal(rootMarginPx = 150): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: `0px 0px -${rootMarginPx}px 0px` }
  );

  document
    .querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children')
    .forEach((el) => observer.observe(el));

  return observer;
}
