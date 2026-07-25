import { useEffect, useState } from "react";

const read = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

/**
 * Maximised windows need pixel dimensions rather than `100vw` / calc strings,
 * so Motion can interpolate the zoom instead of snapping to it.
 */
export const useViewport = () => {
  const [size, setSize] = useState(read);

  useEffect(() => {
    const onResize = () => setSize(read());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
};
