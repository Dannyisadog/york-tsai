import Link from "next/link";
import React from "react";

const items = [
  {
    title: "Commercial",
    href: "/",
  },
  {
    title: "Music Video",
    href: "/music-video",
  },
  {
    title: "Live Session",
    href: "/live-session",
  },
  {
    title: "Concert",
    href: "/concert",
  },
  {
    title: "Highlight",
    href: "/highlight",
  },
  {
    title: "Reels & Shorts",
    href: "/reels-shorts",
  },
];

interface NavbarItemProps {
  title: string;
  href: string;
  style: React.CSSProperties;
}

const NavbarItem = (props: NavbarItemProps) => {
  const { title, href, style } = props;
  return (
    <li
      key={title}
      style={{
        color: "white",
        ...style,
      }}
    >
      <Link href={href}>{title}</Link>
    </li>
  );
};

export const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "180px",
      }}
    >
      <Link href="/">
        <span style={{ fontWeight: "bold", fontSize: "48px", color: "white" }}>
          YORK TSAI
        </span>
      </Link>
      <div>
        <ul
          style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}
        >
          {items.map((item, index) => (
            <NavbarItem
              key={index}
              title={item.title}
              href={item.href}
              style={{ margin: index !== items.length - 1 ? "0 12px" : "0" }}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};
