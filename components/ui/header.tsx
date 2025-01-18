import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";

export const Header = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href={"/"}>やったログ</Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
