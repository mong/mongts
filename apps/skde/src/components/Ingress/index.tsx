import styles from "./Ingress.module.css";
import { Markdown } from "../Markdown";

export const Ingress = (props: { children: string }) => {
  return (
    <div className={styles.ingress}>
      <Markdown>{props.children}</Markdown>
    </div>
  );
};
