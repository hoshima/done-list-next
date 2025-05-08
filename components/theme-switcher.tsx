"use client";

import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/16/solid";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly aria-label="テーマを切り替え" variant="light">
          {theme === "light" ? (
            <SunIcon key="light" className="size-4 text-muted-foreground" />
          ) : theme === "dark" ? (
            <MoonIcon key="dark" className="size-4 text-muted-foreground" />
          ) : (
            <ComputerDesktopIcon
              key="system"
              className="size-4 text-muted-foreground"
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
          startContent={<SunIcon className="size-4 text-muted-foreground" />}
        >
          <span>Light</span>
        </DropdownItem>
        <DropdownItem
          key="dark"
          aria-label="ダーク"
          startContent={<MoonIcon className="size-4 text-muted-foreground" />}
        >
          <span>Dark</span>
        </DropdownItem>
        <DropdownItem
          key="system"
          aria-label="システムに合わせる"
          startContent={
            <ComputerDesktopIcon className="size-4 text-muted-foreground" />
          }
        >
          <span>System</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export { ThemeSwitcher };
