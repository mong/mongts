import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { PluggableList } from "react-markdown/lib/react-markdown";

/**
 * ## Wrapper for markdown content
 *
 *- Make it safe
 *- Put captions on images
 *- Use GitHub Flavored Markdown (gfm)
 */

type MarkdownProp = {
  children: string;
  lang?: string;
};

export const Markdown = ({ children, lang }: MarkdownProp) => {
  const rehypePlugins: PluggableList = [rehypeRaw, rehypeSlug];
  const remarkPlugins: PluggableList = [remarkGfm];
  const components: Components = {
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
        <figure
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={src}
            alt={alt}
            title={alt}
            style={{
              display: "block",
              margin: "auto",
            }}
          />
          {title && (
            <figcaption>
              <strong>{lang === "en" ? "Figure:" : "Figur:"}</strong> {title}
            </figcaption>
          )}
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
    a({ href, children }) {
      return (
        <a href={href} target="_blank" rel="noreferrer">
          {" "}
          {children}{" "}
        </a>
      );
    },
  };
  return (
    <>
      <ReactMarkdown
        rehypePlugins={rehypePlugins}
        remarkPlugins={remarkPlugins}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </>
  );
};
