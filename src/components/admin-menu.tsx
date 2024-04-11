"use client";
import { Check, ChevronsUpDown, MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { useRouter } from "next/navigation";
import { useOrigin } from "@/hooks/use-origin";

interface Route {
  href: string;
  label: string;
  active: boolean;
}

interface AdminRouteProps {
  routes: Route[];
}

export const AdminMenu: React.FC<AdminRouteProps> = ({ routes }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const origin = useOrigin();

  const onStoreSelect = (route: Route) => {
    setOpen(false);
    router.push(`${origin}/${route.href}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a route"
          className={cn("justify-between")}
        >
          <MenuIcon className="size-7" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup heading="Routes">
              {routes.map((route) => (
                <CommandItem
                  key={route.href}
                  onSelect={() => onStoreSelect(route)}
                  className="text-sm"
                >
                  {route.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
