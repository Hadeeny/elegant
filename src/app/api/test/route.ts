export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    return Response.json({ msg: "hello segun" });
  } catch (error) {
    console.log("something went wrong");
  }
}
