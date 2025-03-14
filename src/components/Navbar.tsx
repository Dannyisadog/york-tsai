"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import { Button, Stack, Typography } from "@mui/material";
import { CreateVideoModal } from "./CreateVideoModal";
import useDisclosure from "@/hooks/useDisclosure";
import AddIcon from '@mui/icons-material/Add';
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const pathname = usePathname();

  return (
    <Stack justifyContent="center" spacing={4} style={{
      marginTop: "64px",
    }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
      {
        session && <>
          <Button variant="contained" sx={{
            width: 120,
            backgroundColor: "black",
            boxShadow: "0 0 10px 0 rgba(173, 173, 173, 0.5)",
            borderRadius: 100,
          }}
            onClick={onOpen}
          >
            <Typography variant="body2" color="white">新增影片</Typography>
            <AddIcon sx={{ color: 'white', fontSize: 18 }} />
          </Button>
          <CreateVideoModal open={isOpen} onClose={onClose} />
        </>
      }
    </Stack>
  );
};
