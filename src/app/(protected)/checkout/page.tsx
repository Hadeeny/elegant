import { auth, signOut } from "@/auth";
import React from "react";

const CheckoutPage = async () => {
  const session = await auth();
  return (
    <div>
      <h2>Check out page</h2>
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">sign out</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
