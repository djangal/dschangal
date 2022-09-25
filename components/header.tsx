import React, { useEffect, useRef, useState } from "react";
import { Parallax, parallaxFx } from "./parallax";

function Logo() {
  return <img className="logo" src="img/logo.svg"></img>;
}

export interface MenuItemModel {
  label: string;
  href: string;
}

export default function HeaderMenu(props: { menuItems: MenuItemModel[] }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  console.log("headerrender", headerRef, anchorRef);

  return (
    <>
      <Parallax config={parallaxFx.header}>
        <div className={"header-menu"} ref={headerRef}>
          <div className="menu-left">
            <Logo />
          </div>
          <div className="menu-right">
            {props.menuItems?.map((item) => (
              <a href={item.href} className="menu-item" key={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Parallax>
    </>
  );
}
