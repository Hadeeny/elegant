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
import { getStores } from "@/lib/utils";
// import {AcmeLogo} from "./AcmeLogo.jsx";

const Header = async () => {
  const stores = (await getStores()).map(store=>({
    name: store.name,
    id: store.id
  }));
 
  return (
    <>
      <MobileMenu stores= {stores}/>
    </>
  );
};

export default Header;
