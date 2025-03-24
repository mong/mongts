export async function GET() {
  return new Response("RSS feed is disabled", {
    status: 404,
  });
}
