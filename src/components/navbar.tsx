import React from "react";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { db } from "@/lib/db";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;
  const stores = await db.store.findMany({
    where: {
      userId: user?.id,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher className="" items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex-items-center space-x-3">user btn</div>
      </div>
    </div>
  );
};

export default Navbar;
