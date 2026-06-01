import { Frame, HeroBanner } from "@mong/material-ui";
import Link from "next/link";

export default function Home() {
  return (
    <Link href="https://www.skde.no/">
      <Frame>
        <div style={{ textAlign: "center", paddingTop: 50, paddingBottom: 50 }}>
          <h3>Siden er flyttet til www.skde.no</h3>
        </div>
      </Frame>
    </Link>
  );
}
