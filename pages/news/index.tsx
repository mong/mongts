import Link from "next/link";
import Layout from "../../components/layout";
import styles from "../../styles/Home.module.css";

export default function News() {
  return (
    <Layout page="Flere nyheter">
      <div className={styles.news_section}>
        <div className={styles.news_section_title}>
          <h2>Aktuelt</h2>
        </div>
        {/* latest article  */}
        <div className={styles.news_section_article}>
          <h3>tittel</h3>
          <p>ingress</p>

          <Link href={`/news/`}>
            <a>Les mer</a>
          </Link>
          <h3>tittel</h3>
          <p>ingress</p>

          <Link href={`/news/`}>
            <a>Les mer</a>
          </Link>
          <h3>tittel</h3>
          <p>ingress</p>

          <Link href={`/news/`}>
            <a>Les mer</a>
          </Link>
        </div>
        <div className={styles.news_article__image}>
          {/* <Image
            src={`/${latestNews.thumbnail}`}
            height="300"
            width="500"
            alt={latestNews.title}
          /> */}
        </div>
      </div>
    </Layout>
  );
}
