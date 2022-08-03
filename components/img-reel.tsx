import React, { useEffect, useRef, useState } from "react";
export default function ImgReel({ children }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="imgReel" ref={ref}>
      {children}
    </div>
  );
}
