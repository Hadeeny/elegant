import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { query: string } }
) {
  try {
    const data = await db.product.findMany({
      where: {
        name: {
          contains: params.query.toLowerCase(),
          mode: 'insensitive'
        },
      }
    })
    return Response.json({data });
  } catch (error) {
    console.log("something went wrong");
  }
}
