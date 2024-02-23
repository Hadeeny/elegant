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
// import {AcmeLogo} from "./AcmeLogo.jsx";

const Header = () => {
  return (
    <>
      <MobileMenu />
    </>
  );
};

export default Header;
