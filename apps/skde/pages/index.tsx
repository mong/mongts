import Link from "next/link";
// import { ThemeProvider, styled, Toolbar } from "@mui/material";
// import { skdeTheme } from "qmongjs";
// import { PageWrapper } from "../src/components/StyledComponents/PageWrapper";
import { styled, Toolbar } from "@mui/material";
import Image from "next/image";
import { imgLoader } from "qmongjs";
import { PageContent } from "@mong/material-ui";
import { Accordion, AccordionBody, AccordionHeading } from "@mong/material-ui";
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
}));

export default function Home() {
  return (
    <PageContent>
      <div className="flex flex-col gap-4 w-full py-10">
        <h2 className="">Vi tester Accordion</h2>
        <div className="flex flex-col justify-between">
          <Accordion type="collapseOthers" gap="2">
            <AccordionHeading keyId={"1"}>
              Data og datakvalitet
            </AccordionHeading>
            <AccordionBody keyId="1">
              Accordion Body Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Quisquam excepturi ab labore soluta sed libero. Ad ab
              repellat repudiandae nisi officia molestiae, facere recusandae
              veniam blanditiis aspernatur. Eaque, sunt cumque. Accordion Body
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              <br />
              <br /> Quisquam excepturi ab labore soluta sed libero. Ad ab
              repellat repudiandae nisi officia molestiae, facere recusandae
              veniam blanditiis aspernatur. Eaque, sunt cumque. Accordion Body
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
              excepturi ab labore soluta sed libero. Ad ab repellat repudiandae
              nisi officia molestiae, facere recusandae veniam blanditiis
              aspernatur. Eaque, sunt cumque.
            </AccordionBody>
            <AccordionHeading keyId="2">
              Quisquam excepturi ab labore{" "}
            </AccordionHeading>
            <AccordionBody keyId="2">
              Accordion Body Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Quisquam excepturi ab labore soluta sed libero.
            </AccordionBody>
            <AccordionHeading keyId="3">Metode og beregninger</AccordionHeading>
            <AccordionBody keyId="3">
              Accordion Body Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Quisquam excepturi ab labore soluta sed libero. Ad ab
              repellat repudiandae nisi officia molestiae, facere recusandae
              veniam blanditiis aspernatur. Eaque, sunt cumque.
            </AccordionBody>
          </Accordion>
        </div>
      </div>

      <StyledToolbar className="header-top" />

      <div>
        <Image
          loader={imgLoader}
          src="/img/logos/logo-skde.svg"
          alt="SKDE logo"
          width={1.5 * 96}
          height={1.5 * 39}
        />
      </div>
      {/* </StyledToolbar> */}
      <div style={{ textAlign: "center", paddingTop: 50, paddingBottom: 50 }}>
        <h1>
          Siden er flyttet til{" "}
          <Link href="https://www.skde.no/">www.skde.no</Link>{" "}
        </h1>
      </div>
    </PageContent>
  );
}
