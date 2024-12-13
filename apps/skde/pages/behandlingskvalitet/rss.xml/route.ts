import RSS from "rss";


export async function GET() {

  const siteUrl = "http://localhost:3000";

  const feedOptions = {
    title: "RSS Behandlingskvalitet",
    description: "Beskrivelse av kvalitetsindikatorer",
    site_url: siteUrl,
    feed_url: siteUrl + "/rss.xml",
    ttl: 60,
  };


  const data = [
    {title: "title1",
      description: "test1",
      url: "www.vg.no",
      date: "13.12.2024"
    },
    {title: "title2",
      description: "test2",
      url: "www.vg.no",
      date: "14.12.2024"
    }
  ];

  const feed = new RSS(feedOptions);

  data.map((row) => {
    feed.item({
      title: row.title,
      description: row.description,
      url: row.url,
      date: row.date,
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
        'Content-Type': 'application/xml; charset=utf-8',
    },
});
}
