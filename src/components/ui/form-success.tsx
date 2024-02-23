import { CheckCircle2Icon } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emarald-500">
      <CheckCircle2Icon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
