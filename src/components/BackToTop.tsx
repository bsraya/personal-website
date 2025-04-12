import scrollToTop from '../utils/scroll-to-top';
import { BsTriangleFill } from 'solid-icons/bs';


export default function BackToTop() {
  const scrollToTopFn = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      use:scrollToTop={50}
      onClick={scrollToTopFn}
      class="fixed bottom-5 right-5 z-10 p-2 border-2 rounded cursor-pointer"
    >
      <BsTriangleFill />
    </button>
  )
}