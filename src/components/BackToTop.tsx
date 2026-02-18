import scrollToTop from '@util/scroll-to-top';
import { BsTriangleFill } from 'solid-icons/bs';

// This import is necessary for the directive to work
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _scrollToTop = scrollToTop;

export default function BackToTop() {
  const scrollToTopFn = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      use:scrollToTop={50}
      onClick={scrollToTopFn}
      aria-label="Back to top"
      class="fixed bottom-5 right-5 z-10 p-2 bg-white border-2 rounded cursor-pointer hidden"
    >
      <BsTriangleFill color="#000000" fill="#000000" size={16} />
    </button>
  )
}