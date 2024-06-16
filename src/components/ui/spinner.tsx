import { Loader2 } from "lucide-react";
import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center">
      <Loader2 size={30} className="animate-spin" />
    </div>
  );
};

export default Spinner;
