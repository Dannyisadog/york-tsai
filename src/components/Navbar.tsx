"use client";

import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";

import AddIcon from "@mui/icons-material/Add";
import { CreateVideoModal } from "./CreateVideoModal";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./style/navbar.module.css";
import useDisclosure from "@/hooks/useDisclosure";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Commercial",
    href: "/",
  },
  {
    title: "Music",
    href: "/music-video",
  },
  {
    title: "Live",
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
    title: "Shorts",
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
        color: isActive ? "white" : "#8f8f8f",
        fontWeight: "bold",
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

  const isActive = (path: string) => {
    if (path === "/") {
      if (pathname.startsWith("/commercial")) {
        return true;
      }
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

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
          <span className={styles.navbar_title}>YORK TSAI</span>
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
                isActive={isActive(item.href)}
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
            <MenuIcon sx={{ color: "white", fontSize: 24 }} />
          </IconButton>
        </div>
        <Drawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          anchor="top"
        >
          <List
            sx={{
              backgroundColor: "black",
            }}
          >
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ListItem
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    mt: 1,
                  }}
                >
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            ))}
            {session && (
              <ListItem
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  mt: 1,
                }}
                onClick={() => {
                  signOut();
                }}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Drawer>
      </nav>
      {session && (
        <>
          <Button
            variant="contained"
            sx={{
              width: 120,
              backgroundColor: "black",
              boxShadow: "0 0 10px 0 rgba(173, 173, 173, 0.5)",
              borderRadius: 100,
            }}
            onClick={onOpen}
          >
            <Typography variant="body2" color="white">
              新增影片
            </Typography>
            <AddIcon sx={{ color: "white", fontSize: 18 }} />
          </Button>
          <CreateVideoModal open={isOpen} onClose={onClose} />
        </>
      )}
    </Stack>
  );
};
