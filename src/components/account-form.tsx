"use client";
import { Avatar, Button, Input } from "@nextui-org/react";
import AccountDropdown from "./account-dropdown";
import MaxWidthWrapper from "./max-width-wrapper";
import { useForm } from "react-hook-form";
import { signOut, useSession } from "next-auth/react";
import { TRegisterSchema } from "@/lib/validators/account-credentials-validators";
import { User } from "@prisma/client";

interface TUser {
  user: User;
}

export const AccountForm: React.FC<TUser> = ({ user }) => {
  const logout = () => {
    signOut();
  };

  const defaultValues: TRegisterSchema = user
    ? {
        name: user.name || "", // Providing an empty string if name is null
        email: user.email || "", // Providing an empty string if name is null
        username: user.username || "", // Providing an empty string if name is null
        password: user.password || "", // Providing an empty string if name is null
      }
    : {
        name: "",
        email: "",
        username: "",
        password: "",
        // Default empty string if initialData is null
      };
  const { register } = useForm<TRegisterSchema>({
    defaultValues: defaultValues,
  });
  const accountOptions = ["Account", "Address", "Orders", "Wishlist", "Logout"];
  //   const { name, image } = session?.data?.user;
  const { name, image } = user;
  return (
    <MaxWidthWrapper>
      <h2 className="font-semibold text-2xl text-center my-4">Account page</h2>
      <div className="flex flex-col sm:flex-row items-start gap-y-6 gap-x-12">
        <div className="bg-slate-300 space-y-8 p-4 w-full sm:w-auto rounded-md">
          <Avatar src={image || undefined} size="lg" className="mx-auto" />
          <div className="text-center">{name}</div>
          <div className="sm:hidden">
            <AccountDropdown items={accountOptions} />
          </div>
          <ul className="w-[12rem] sm:block hidden">
            {accountOptions.map((option, i) =>
              option !== "Logout" ? (
                <li
                  className="cursor-pointer p-2 hover:bg-slate-400 rounded-sm"
                  key={i}
                >
                  {option}
                </li>
              ) : (
                <button
                  key={i}
                  className="p-2 hover:bg-slate-400 rounded-sm w-full justify-start text-left"
                  type="submit"
                  onClick={logout}
                >
                  sign out
                </button>
              )
            )}
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="mb-12">Account Details</h3>
          <form className="space-y-12">
            <Input
              variant="bordered"
              type="text"
              label="FIRST NAME"
              labelPlacement={"outside"}
              placeholder="First Name"
              {...register("name")}
              classNames={{
                inputWrapper: ["rounded-md"],
              }}
              // description={"null"}
            />
            <Input
              classNames={{
                inputWrapper: ["rounded-md"],
              }}
              type="text"
              variant="bordered"
              label="LAST NAME"
              labelPlacement={"outside"}
              placeholder="Last Name"
              // description={"null"}
            />
            <Input
              classNames={{
                inputWrapper: ["rounded-md"],
              }}
              type="text"
              variant="bordered"
              label="DISPLAY NAME"
              {...register("username")}
              labelPlacement={"outside"}
              placeholder="Display Name"
              description={
                "This will be how your name will be displayed in the account section and in reviews"
              }
            />
            <Input
              classNames={{
                inputWrapper: ["rounded-md"],
              }}
              type="email"
              required
              variant="bordered"
              label="EMAIL *"
              {...register("email")}
              labelPlacement={"outside"}
              placeholder="Email"
              // description={"null"}
            />
            <br />
            <p className="font-normal text-lg tracking-[2px]">Password</p>
            <Input
              classNames={{
                inputWrapper: ["rounded-md"],
              }}
              type="password"
              required
              variant="bordered"
              label="OLD PASSWORD"
              labelPlacement={"outside"}
              {...register("password")}
              placeholder="Old Password"
              // description={"null"}
            />
            <Input
              classNames={{
                inputWrapper: ["rounded-md"],
              }}
              type="password"
              required
              variant="bordered"
              label="NEW PASSWORD"
              labelPlacement={"outside"}
              placeholder="New Password"
              // description={"null"}
            />
            <Input
              classNames={{
                inputWrapper: ["rounded-md"],
              }}
              type="password"
              required
              variant="bordered"
              label="REPEAT NEW PASSWORD"
              labelPlacement={"outside"}
              placeholder="Repeat New Password"
              // description={"null"}
            />
            <Button type="submit">Save Changes</Button>
          </form>
          <br />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
