import { AnimationControls } from "framer-motion";

const framerUtils = {
  hide: async (control: AnimationControls) => {
    await control.start({
      opacity: 0,
    });
    control.set({
      display: "none",
    });
  },
  show: async (control: AnimationControls, displayValue?: string) => {
    control.set({
      display: displayValue ? displayValue : "block",
      opacity: 0,
    });
    await control.start({
      opacity: 1,
    });
  },

  swapPresence: async (
    present: AnimationControls,
    hidden: AnimationControls,
    hiddenDisplayValue?: string
  ) => {
    await framerUtils.hide(present);
    await framerUtils.show(hidden, hiddenDisplayValue);
  },

  staggerShow: async (arr: AnimationControls[], duration: number) => {
    arr.forEach((x) => {
      x.set({ opacity: 0, display: "block" });
    });
    await Promise.all([
      ...arr.map((x, i) => {
        return x.start({
          opacity: 1,
          transition: {
            delay: duration * i,
          },
        });
      }),
    ]);
  },
  staggerHide: async (arr: AnimationControls[], duration: number) => {
    await Promise.all([
      ...arr.map((x, i) => {
        return x.start({
          opacity: 0,
          transition: {
            delay: duration * i,
          },
        });
      }),
    ]);
    arr.forEach((x) => {
      x.set({ display: "block" });
    });
  },
};

export default framerUtils;
