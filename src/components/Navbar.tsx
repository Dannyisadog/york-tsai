"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./style/navbar.module.css";
import { usePathname } from "next/navigation";
import { Button, Drawer, ListItem, List, Stack, Typography, ListItemText, IconButton } from "@mui/material";
import { CreateVideoModal } from "./CreateVideoModal";
import useDisclosure from "@/hooks/useDisclosure";
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Stack justifyContent="center" spacing={4} className={styles.navbar}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/">
          <span className={styles.navbar_title}>
            YORK TSAI
          </span>
        </Link>
        <div className={styles.navbar_menu}>
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
        <div className={styles.navbar_menu_icon}>
          <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <MenuIcon sx={{ color: 'white', fontSize: 24 }} />
          </IconButton>
        </div>
        <Drawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} anchor="top">
          <List sx={{
            backgroundColor: "black",
          }}
          >
            {items.map((item, index) => (
              <Link key={index} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                <ListItem sx={{
                  backgroundColor: "black",
                  color: "white",
                  mt: 1
                }}>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
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
