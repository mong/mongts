import Image from "next/image";
import { imgLoader } from "../../helpers/functions";

interface Props {
  caption?: string;
  alt: string;
  source: string;
  width?: number;
  height?: number;
  title?: string;
}

export const ImageBox: React.FC<Props> = ({
  caption,
  alt,
  source,
  width,
  height,
  title,
}) => {
  return (
    <figure style={{ display: "flex", flexDirection: "column" }}>
      <Image
        loader={imgLoader}
        title={title}
        src={source}
        alt={alt}
        width={width}
        height={height}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};
