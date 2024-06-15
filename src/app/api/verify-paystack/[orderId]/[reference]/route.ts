import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params: { reference, orderId },
  }: { params: { orderId: string; reference: string } }
) {
  const endpoint = `https://api.paystack.co/transaction/verify/${reference}`;
  try {
    const result = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("[PAYSTACK_VERIFY]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
