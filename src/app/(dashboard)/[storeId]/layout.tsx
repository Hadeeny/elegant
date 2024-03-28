import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  // TODO: IMPLEMENT ROLE GATE:  Only admins should be able to access this page
  const session = await auth();
  const user = session?.user;

  const getStore = async () => {
    try {
      const store = await db.store.findFirst({
        where: {
          id: params.storeId,
          userId: user?.id,
        },
      });
      return store;
    } catch (error: any) {
      if (error.code === "P1001") {
        console.error(
          "can not connect to the database, please check your connection"
        );
      } else {
        console.error("an error occurred while fetching data");
      }
      return null;
    }
  };

  const store = await getStore();

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
