"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import React from "react";

export const Header = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    { label: "ホーム", href: "/home" },
    { label: "アカウント", href: "/settings/account" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
        />
        <NavbarBrand>
          <Link href={"/"}>やったログ</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden md:flex">
        {children}
      </NavbarContent>

      <NavbarMenu className="container max-w-5xl">
        {menuItems.map((item) => (
          <NavbarMenuItem key={`${item.href}`}>
            <Link className="w-full" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
