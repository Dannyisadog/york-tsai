"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";

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
  isActive?: boolean;
}

const NavbarItem = (props: NavbarItemProps) => {
  const { title, href, style, isActive } = props;
  return (
    <li
      key={title}
      className={styles.navbar_item}
      style={{
        color: isActive ? "white" : "#acacac",
        fontWeight: isActive ? "bold" : "normal",
        fontSize: isActive ? "18px" : "16px",
        ...style,
      }}
    >
      <Link href={href}>{title}</Link>
    </li>
  );
};

export const Navbar = () => {
  const { data: session } = useSession();

  const pathname = usePathname();

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
          style={{
            display: "flex",
            alignItems: "center",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {items.map((item, index) => (
            <NavbarItem
              key={index}
              title={item.title}
              href={item.href}
              style={{ margin: index !== items.length - 1 ? "0 12px" : "0" }}
              isActive={pathname === item.href}
            />
          ))}
          {session && (
            <li
              className={styles.navbar_item}
              onClick={() => {
                signOut();
              }}
            >
              <span>Logout</span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
