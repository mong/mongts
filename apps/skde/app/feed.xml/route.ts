import RSS from "rss";
import { Description, RegisterName } from "types";

export async function GET() {
  const siteUrl =
    process.env.NODE_ENV === "production"
      ? "https://apps.skde.no"
      : "http://localhost:3000";

  const feedOptions = {
    title: "RSS Behandlingskvalitet",
    description: "Beskrivelse av kvalitetsindikatorer",
    site_url: siteUrl,
    feed_url: siteUrl + "/rss.xml",
    ttl: 60,
  };

  const namesUrl = "https://prod-mong-api.skde.org/info/names";

  const namesQuery = await fetch(namesUrl);
  const namesResponse = await namesQuery.json();
  const names = namesResponse.map((row: RegisterName) => row.rname);

  const dataUrls = names.map(
    (name: string) =>
      "https://prod-mong-api.skde.org/data/" + name + "/descriptions",
  );

  const feed = new RSS(feedOptions);

  async function getData(url: string) {
    const response = await fetch(url);
    const data = await response.json();

    data.map((row: Description) =>
      feed.item({
        title: row.title,
        description: row.short_description + row.long_description,
        url:
          siteUrl +
          "/behandlingskvalitet/" +
          row.rname +
          "/?selected_row=" +
          row.id,
        date: new Date(),
      }),
    );
  }

  await Promise.all(dataUrls.map(getData));

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
