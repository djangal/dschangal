import React, { useEffect, useRef, useState } from "react";
import { Parallax, parallaxFx } from "./parallax";

export default function DjungleEule() {
  return (
    <div className="djungle-wrapper">
      <Parallax config={parallaxFx.eule}>
        <img className="eule" src="img/eule-cutout.png?nf_resize=fit&w=220" />
      </Parallax>
    </div>
  );
}
