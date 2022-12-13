import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";

export const getMDInfo = (dirPath: string) => {
  const files = fs.readdirSync(dirPath, "utf-8");
  const info = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => {
      const filePath = path.join(dirPath, fn);
      const rawContent = fs.readFileSync(filePath, {
        encoding: "utf-8",
      });

      const { data } = matter(rawContent, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        },
      });
      const article = "v1/" + fn.replace(/\.md$/, "");
      return {
        article,
        frontMatter: data,
      };
    })
    .map((article) => {
      return {
        ...article,
        frontMatter: {
          ...article.frontMatter,
        },
      };
    });

  return info;
};
