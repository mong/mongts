export async function GET() {
  return new Response("RSS feed is temporarly disabled", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
