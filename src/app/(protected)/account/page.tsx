import { auth } from "@/auth";
import { signOut } from "next-auth/react";

import AccountDropdown from "@/components/account-dropdown";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { use, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { TRegisterSchema } from "@/lib/validators/account-credentials-validators";
import { AccountForm } from "@/components/account-form";
import { getCurrentUser } from "@/lib/utils";

const AccountPage = async () => {
  const session = await auth();
  const user = session!.user;

  return <AccountForm user={user} />;
};

export default AccountPage;
