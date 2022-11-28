import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import { rehypeWrapWithDiv } from "../../../helpers/functions/rehypeplugins";
import remarkGfm from "remark-gfm";

import Layout from "../../Layout";
import { TopBanner } from "../../topBanner";
import { TableOfContents } from "../../toc";
import { OrderedList } from "../../toc/orderedlist";
import { ListItem } from "../../toc/listitem";
import styles from "./classic.module.css";
import { PluggableList } from "react-markdown/lib/react-markdown";

export interface AtlasContentProps {
  content: string;
  frontMatter: {
    num: string;
    mainTitle: string;
    shortTitle: string;
    pdfUrl: string;
    ia: boolean;
    lang: "nb" | "en" | "nn";
    toc: boolean;
  };
}

export const AtlasContent: React.FC<AtlasContentProps> = ({
  content,
  frontMatter,
}) => {
  const rehypePlugins: PluggableList = [
    rehypeWrapWithDiv,
    rehypeRaw,
    rehypeSlug,
    frontMatter.toc
      ? [
          rehypeToc,
          {
            headings: ["h2"],
          },
        ]
      : () => (arnfinn) => arnfinn,
  ];

  const remarkPlugins: PluggableList = [remarkGfm];

  const components: Components = {
    nav({ children, className }) {
      if (className === "toc") {
        return (
          <TableOfContents lang={frontMatter.lang}> {children}</TableOfContents>
        );
      }
      return <nav>{children}</nav>;
    },
    ol({ children, className }) {
      if ((className ?? "").includes("toc")) {
        return (
          <OrderedList>
            {" "}
            {React.Children.map(children, (child, i) => {
              if (React.isValidElement(child)) {
                return child;
              }
            })}
          </OrderedList>
        );
      }
      return <ol>{children}</ol>;
    },
    li(node) {
      if ((node.className ?? "").includes("toc")) {
        return (
          <ListItem
            expanded={
              Object.hasOwn(node, "expanded") ? node["expanded"] : undefined
            }
            i={Object.hasOwn(node, "i") ? node["i"] : undefined}
            setExpanded={
              Object.hasOwn(node, "setExpanded")
                ? node["setExpanded"]
                : undefined
            }
          >
            {" "}
            {node.children}
          </ListItem>
        );
      }
      return <li>{node.children}</li>;
    },
    p({ children, node }) {
      if (
        node.children[0].type === "element" &&
        ["img", "a"].includes(node.children[0].tagName)
      ) {
        return <>{children}</>;
      }
      return <p>{children}</p>;
    },
    img({ src, alt, title }) {
      return (
        <figure>
          <img src={src} alt={alt} title={alt} />
          <figcaption>
            <strong>{frontMatter.lang === "en" ? "Figure:" : "Figur:"}</strong>{" "}
            {title}
          </figcaption>
        </figure>
      );
    },
    table({ children }) {
      return (
        <table
          style={{
            borderCollapse: "collapse",
            margin: "auto",
            borderTop: "2px solid black",
            borderBottom: "2px solid black",
          }}
        >
          {children}
        </table>
      );
    },
    th({ children }) {
      return (
        <th
          style={{
            borderBottom: "1px solid black",
            margin: 0,
            padding: "2px 10px",
            textAlign: "left",
          }}
        >
          {children}
        </th>
      );
    },
    td({ children }) {
      return <td style={{ padding: "2px 10px" }}>{children}</td>;
    },
  };

  const text = `
  <h1>${frontMatter.mainTitle}</h1>
  ${content}
  `;
  return (
    <>
      <Layout lang={frontMatter.lang === "en" ? "en" : "no"}>
        <main data-testid="v1atlas">
          <TopBanner {...frontMatter} />
          <div className={`${styles.atlasContent}`} style={{ display: "flex" }}>
            <ReactMarkdown
              rehypePlugins={rehypePlugins}
              remarkPlugins={remarkPlugins}
              components={components}
            >
              {text}
            </ReactMarkdown>
          </div>
        </main>
      </Layout>
    </>
  );
};
