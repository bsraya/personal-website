import "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      clickOutside: () => void;
      scrollToTop: number;
    }
  }
}
