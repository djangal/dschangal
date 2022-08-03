import { Component, createRef, useEffect, useRef, useState } from "react";

import * as basicScroll from "basicscroll";

export const parallaxFx = {
  topBottomOpacity: {
    from: "top-bottom",
    to: "top-middle",
    props: {
      "--opacity": {
        from: 0.1,
        to: 0.99,
      },
    },
  },
  topBottomCoverImg: {
    from: "middle-bottom",
    to: "top-top",
    props: {
      "--bgpos": {
        from: "60%",
        to: "00%",
      },
    },
  },
};

export const Parallax = (opt) => {
  const children = opt?.children;
  const config = opt?.config ?? parallaxFx.topBottomOpacity;
  const ref = useRef<HTMLElement>(null);
  const [basicScrollInst, setBasicScrollInst] = useState<any>(null);
  useEffect(() => {
    if (ref.current && !basicScrollInst) {
      const inst = basicScroll.create({
        elem: ref.current,
        direct: true,
        ...config,
      });
      setBasicScrollInst(inst);

      inst.start();
    }
  });
  return (
    <div className="parallax" ref={ref}>
      {children}
    </div>
  );
};
