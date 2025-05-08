"use client";

import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const ICON_SIZE = 16;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly aria-label="テーマを切り替え" variant="light">
          {theme === "light" ? (
            <Sun
              key="light"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : theme === "dark" ? (
            <Moon
              key="dark"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : (
            <Laptop
              key="system"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="テーマを選択"
        selectedKeys={theme}
        selectionMode="single"
        variant="light"
        onAction={(key) => setTheme(key as string)}
      >
        <DropdownItem
          key="light"
          aria-label="ライト"
          startContent={
            <Sun size={ICON_SIZE} className="text-muted-foreground" />
          }
        >
          <span>Light</span>
        </DropdownItem>
        <DropdownItem
          key="dark"
          aria-label="ダーク"
          startContent={
            <Moon size={ICON_SIZE} className="text-muted-foreground" />
          }
        >
          <span>Dark</span>
        </DropdownItem>
        <DropdownItem
          key="system"
          aria-label="システムに合わせる"
          startContent={
            <Laptop size={ICON_SIZE} className="text-muted-foreground" />
          }
        >
          <span>System</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export { ThemeSwitcher };
