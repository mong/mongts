import { PageContent, ProductCard } from "@mong/material-ui";
import Head from "next/head";
import "./index.css";
export default function Home() {
  return (
    <PageContent color="gray">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap&icon_names=arrow_circle_down"
        />
      </Head>
      <div
        className="bg-landing-gradient h-150 rounded-b-lg flex flex-col w-full items-start justify-center text-neutral-0"
        style={
          {
            "--landing-page-image": `url("/hero-bg-5.jpg")`,
          } as React.CSSProperties
        }
      >
        <div className="flex flex-col gap-(--spacing-2) w-1/2 pl-30">
          <h2>
            Her får du oversikt over kvalitet, resultater og variasjon i
            helsetjenesten
          </h2>
          <div className="text-small font-semibold uppercase hidden md:flex text-light items-center">
            <div className="flex text-4xl pr-2.5 material-symbols-outlined">
              arrow_circle_down
            </div>
            Utforsk våre analyseverktøy
          </div>
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-center p-10 gap-10 relative z-1 -mt-38">
        <ProductCard
          description="Hvordan varierer behandlingskvaliteten mellom fagområder på tvers av sykehus og helseforetak?"
          iconName="behandlingskvalitet"
          targetUrl="https://apps.skde.no/behandlingskvalitet/"
          title="Behandlingskvalitet"
        />
        <ProductCard
          description="Hvordan er behandlingskvaliteten for ditt sykehus eller helseforetak, og hvordan har den utviklet seg over tid?"
          iconName="sykehusprofil"
          targetUrl="https://apps.skde.no/sykehusprofil/"
          title="Sykehusprofil"
        />
        <ProductCard
          description="Får pasienter lik behandling uansett hvor de bor? Se våre grundige analyser for opptaksområder over hele landet"
          iconName="helseatlas"
          targetUrl="https://analyser.skde.no/"
          title="Helseatlas"
        />
      </div>
      <div className="flex w-full flex-wrap justify-center p-0">
        <h6 className="font-regular text-small tracking-normal">
          FLERE VERKTØY
        </h6>
      </div>
      <div className="flex w-full flex-wrap justify-center p-10 gap-10">
        <ProductCard
          description="Standardiserte metodebøker og prosedyrer, som gjør innholdet enklere tilgjengelig for helsepersonell."
          iconName="metodebok"
          targetUrl="https://metodebok.no/"
          title="Metodebok"
        />
        <ProductCard
          description="Verktøy som gir oversikt over kliniske data og støtter bedre beslutninger i helsetjenesten."
          iconName="klinisk_dashbord"
          targetUrl="https://analyser.skde.no/no/klinisk-dashbord"
          title="Klinisk dashbord"
        />
      </div>
    </PageContent>
  );
}
