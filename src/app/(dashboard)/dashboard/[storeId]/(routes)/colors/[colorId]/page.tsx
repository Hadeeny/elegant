import { db } from "@/lib/db";
import React, { Suspense } from "react";
import ColorForm from "./components/color-form";
import { getCurrentUser } from "@/lib/utils";
import { unstable_noStore } from "next/cache";
import Spinner from "@/components/ui/spinner";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  unstable_noStore();
  const color = await db.color.findUnique({
    where: {
      id: params.colorId,
    },
  });
  const { userId } = await getCurrentUser();
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Suspense fallback={<Spinner />}>
          <ColorForm userId={userId} initialData={color} />
        </Suspense>
      </div>
    </div>
  );
};

export default ColorPage;
