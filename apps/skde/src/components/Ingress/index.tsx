import styles from "./Ingress.module.css";
import { Markdown } from "../Markdown";

type IngressProp = {
  children: string;
};

export const Ingress = ({ children }: IngressProp) => {
  return (
    <div className={styles.ingress}>
      <Markdown>{children}</Markdown>
    </div>
  );
};
