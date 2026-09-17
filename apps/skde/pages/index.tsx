import { PageContent, ProductCard } from "@mong/material-ui";
import "./index.css";

export default function Home() {
  return (
    <PageContent color="gray">
      <div
        className="bg-landing-gradient h-42 md:h-150 rounded-b-lg flex flex-col w-full items-start justify-center text-neutral-0"
        style={
          {
            "--landing-page-image": `url("/hero-bg-5.jpg")`,
          } as React.CSSProperties
        }
      >
        <div className="flex flex-col gap-(--spacing-2) md:w-1/2 pl-8 md:pl-30">
          <h2>
            Her får du oversikt over kvalitet, resultater og variasjon i
            helsetjenesten
          </h2>
          <div className="flex text-xs md:text-small font-semibold uppercase text-light items-center">
            <div className="flex text-4xl pr-2.5 material-symbols-outlined">
              arrow_circle_down
            </div>
            Utforsk våre analyseverktøy
          </div>
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-center  px-6 md:px-10 gap-5 md:gap-10 relative z-1 mt-5 md:-mt-28">
        <ProductCard
          description="Hvordan varierer behandlingskvaliteten mellom fagområder på tvers av sykehus og helseforetak?"
          iconName="behandlingskvalitet"
          targetUrl="/behandlingskvalitet/"
          title="Behandlingskvalitet"
        />
        <ProductCard
          description="Hvordan er behandlingskvaliteten for ditt sykehus eller helseforetak, og hvordan har den utviklet seg over tid?"
          iconName="sykehusprofil"
          targetUrl="/sykehusprofil/"
          title="Sykehusprofil"
        />
        <ProductCard
          description="Får pasienter lik behandling uansett hvor de bor? Se våre grundige analyser for opptaksområder over hele landet"
          iconName="helseatlas"
          targetUrl="https://analyser.skde.no/"
          title="Helseatlas"
        />
      </div>
      <div className="hidden md:flex w-full flex-wrap justify-center p-0 pt-5 md:pt-10">
        <h6 className="font-regular text-small tracking-normal">
          FLERE VERKTØY
        </h6>
      </div>
      <div className="flex w-full flex-wrap justify-center px-6 md:px-10 pt-5 md:pt-10 gap-5 md:gap-10">
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
