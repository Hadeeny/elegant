"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge, BadgeProps, Chip, ChipProps } from "@nextui-org/react";
import { Copy, Server } from "lucide-react";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], ChipProps["variant"]> = {
  public: "flat",
  admin: "solid",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  description,
  title,
  variant,
}) => {
  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("Copied");
  };
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Chip variant={variantMap[variant]}>{textMap[variant]}</Chip>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative overflow-scroll sm:overflow-auto rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="sm" onClick={() => onCopy(description)}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
