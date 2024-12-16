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

  const dataUrls = ["https://prod-mong-api.skde.org/data/hjerneslag/descriptions", "https://prod-mong-api.skde.org/data/hjerteinfarkt/descriptions", "https://prod-mong-api.skde.org/data/ms/descriptions"]

  const feed = new RSS(feedOptions);

  function getData(url: string) {
    return fetch(url)
      .then(response=>{
        return response.json()
      })
      .then(data => {
        const indInfo = data.map(row => {return {title: row.title, shortDescription: row.short_description, longDescription: row.long_description, url: url}}); 
        return Promise.resolve(indInfo);
      })
  }
  
  Promise.all(
    dataUrls.map(getData)
  )
  .then(
    data => data.flat().map(ind => {
      feed.item({
        title: ind.title,
        description: ind.shortDescription,
        url: ind.url,
        date: "16.12.2024"
      })
      console.log(feed)
    }))


  return new Response(feed.xml({ indent: true }), {
    headers: {
        'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}