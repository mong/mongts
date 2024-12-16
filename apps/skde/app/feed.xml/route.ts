import RSS from "rss";
import { Description } from "types";


export async function GET() {

  const siteUrl = "http://localhost:3000";

  const feedOptions = {
    title: "RSS Behandlingskvalitet",
    description: "Beskrivelse av kvalitetsindikatorer",
    site_url: siteUrl,
    feed_url: siteUrl + "/rss.xml",
    ttl: 60,
  };

  const dataUrls = ["https://prod-mong-api.skde.org/data/hjerneslag/descriptions", "https://prod-mong-api.skde.org/data/hjerteinfarkt/descriptions", "https://prod-mong-api.skde.org/data/ms/descriptions"]

  const feed = new RSS(feedOptions);

  async function getData(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    data.map((row: Description) => feed.item({
      title: row.title,
      description: row.short_description + row.long_description,
      url: "www.vg.no",
      date: "16.12.2024"
    }));
  }
  
  await Promise.all(
    dataUrls.map(getData)
  )

  return new Response(feed.xml({ indent: true }), {
    headers: {
        'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}