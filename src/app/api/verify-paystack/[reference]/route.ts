import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { reference } }: { params: { reference: string } }
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
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("[PAYSTACK_VERIFY]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
