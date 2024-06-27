import { Markdown } from "../Markdown";
import { Ingress } from "../Ingress";
import { AtlasLayout } from "../Layout";
import styles from "./Static.module.css";

export interface PageContentProps {
  content: string;
  frontMatter: {
    title: string;
    lang: "nb" | "en" | "nn";
    ingress?: string;
  };
}

const PageContent = ({ content, frontMatter }: PageContentProps) => {
  return (
    <>
      <AtlasLayout lang={frontMatter.lang === "en" ? "en" : "no"}>
        <div className={styles.container}>
          <div className={styles.article__title}>
            <h1>{frontMatter.title}</h1>
          </div>
          <div className={styles.article}>
            <div className={styles.article__content}>
              {frontMatter.ingress && <Ingress>{frontMatter.ingress}</Ingress>}
              <Markdown lang={frontMatter.lang}>{content}</Markdown>
            </div>
          </div>
        </div>
      </AtlasLayout>
    </>
  );
};

export default PageContent;
