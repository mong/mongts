export async function GET() {
  return new Response("RSS feed is disabled for now", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
