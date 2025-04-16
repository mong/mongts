import { ImageLoader } from "next/legacy/image";

export const imgLoader: ImageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
