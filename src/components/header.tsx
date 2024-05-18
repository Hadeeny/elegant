import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import MobileMenu from "./mobile-menu";
import { db } from "../lib/db";
// import {AcmeLogo} from "./AcmeLogo.jsx";

const Header = async () => {
  // const stores = await db.store.findMany();

  return (
    <>
      <MobileMenu />
    </>
  );
};

export default Header;
