import { createSignal, onMount, onCleanup } from 'solid-js';

export default function BackToTop() {
  const [visible, setVisible] = createSignal(false);

  const scrollToTopFn = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  onMount(() => {
    let lastScrollY = window.scrollY;
    // Accumulated downward scroll since last direction change.
    // The button hides only after the user has scrolled down a meaningful
    // distance, which prevents flickering on trackpad micro-bounces.
    let downwardDelta = 0;
    const HIDE_THRESHOLD = 80;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;

      if (currentY <= 100) {
        downwardDelta = 0;
        setVisible(false);
      } else if (delta > 0) {
        // Scrolling down — accumulate; hide once threshold is crossed
        downwardDelta += delta;
        if (downwardDelta >= HIDE_THRESHOLD) {
          setVisible(false);
        }
      } else {
        // Scrolling up — reset accumulator and show
        downwardDelta = 0;
        setVisible(true);
      }

      lastScrollY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onCleanup(() => window.removeEventListener("scroll", onScroll));
  });

  return (
    <div class="fixed bottom-10 left-1/2 -translate-x-1/2 z-20">
      <button
        type='button'
        onClick={scrollToTopFn}
        aria-label="Back to top"
        class={`flex items-center gap-2 p-4 rounded-full border border-slate-200 backdrop-blur-xs hover:bg-slate-50 transition-transform duration-400 ease-in-out cursor-pointer ${visible() ? "translate-y-0" : "translate-y-[calc(100%+2.5rem)]"}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500 block"><path d="m18 15-6-6-6 6" /></svg>
      </button>
    </div>
  );
}