import Image from "next/image";
import { imgLoader } from "../../helpers/functions";

interface Props {
  caption?: string;
  alt: string;
  source: string;
  width: number;
  height: number;
  title?: string;
  layout?: "responsive" | "fixed" | "fill" | "intrinsic";
}

export const ImageBox: React.FC<Props> = ({
  caption,
  alt,
  source,
  width,
  height,
  title,
  layout = "responsive",
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
        layout={layout}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};
