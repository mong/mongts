import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

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
  const rehypePlugins = [rehypeRaw, rehypeSlug];
  const remarkPlugins = [remarkGfm];
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
            alt={alt ? alt : title ? title : ""}
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
            borderTop: "0.125rem solid black",
            borderBottom: "0.125rem solid black",
          }}
        >
          {children}
        </table>
      );
    },
    th({ children, style }) {
      return (
        <th
          style={{
            borderBottom: "0.0625rem solid black",
            margin: 0,
            padding: "0.125rem 0.625rem",
            textAlign: "left",
            ...style,
          }}
        >
          {children}
        </th>
      );
    },
    td({ children, style }) {
      return (
        <td style={{ padding: "0.125rem 0.625rem", ...style }}>{children}</td>
      );
    },
    a({ href, children }) {
      return (
        <a href={href} rel="noreferrer" target="_blank">
          {children}
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
