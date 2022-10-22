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
    to: "bottom-bottom",
    props: {
      "--bgpos": {
        from: "60%",
        to: "00%",
      },
    },
  },
  header: {
    from: "20px",
    to: "60px",
    direct: false,
    props: {
      "--headerScale": {
        from: 0.99,
        to: 0.01,
      },
    },
  },

  eule: {
    from: "150px",
    to: "200px",
    props: {
      "--x": {
        from: "-240px",
        to: "-100px",
      },
      "--deg": {
        from: "-10deg",
        to: "0deg",
        timing: "circInOut",
      },
    },
  },
};

export const Parallax = (opt) => {
  const children = opt?.children;
  const config = opt?.config;

  const ref = useRef<HTMLDivElement | null>(null);
  const [basicScrollInst, setBasicScrollInst] = useState<any>(null);
  useEffect(() => {
    if (ref.current && !basicScrollInst && config) {
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
