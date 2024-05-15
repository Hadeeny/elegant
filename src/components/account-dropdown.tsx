"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function AccountDropdown({ items }: { items: string[] }) {
  const [selectedKeys, setSelectedKeys] = React.useState<any>(
    new Set([items[0]])
  );

  const selectedValue = React.useMemo<string>(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const logout = () => {
    signOut();
  };

  return (
    <Dropdown
      classNames={{
        content: "",
      }}
    >
      <DropdownTrigger>
        <Button className="capitalize text-black hover:bg-white hover:text-black focus:bg-white active:bg-white items-center justify-between w-full bg-white">
          {selectedValue}
          <ChevronDown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        classNames={{
          base: ["w-full"],
          list: ["w-full"],
        }}
      >
        {items.map((item) =>
          item !== "Logout" ? (
            <DropdownItem key={item}>{item}</DropdownItem>
          ) : (
            <DropdownItem onClick={logout} key={item}>
              {item}
            </DropdownItem>
          )
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
