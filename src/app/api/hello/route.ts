type Data = {
  name: string;
};

export async function GET() {
  const data: Data = { name: "John Doe" };
  return Response.json(data);
}
