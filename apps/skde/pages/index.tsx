import { HeroBanner, PageContent, ProductCard } from "@mong/material-ui";

export default function Home() {
  return (
    <>
      <HeroBanner
        description="Her får du oversikt over kvalitet, resultater og variasjon i helsetjenesten"
        image="/hero-bg-5.jpg"
        title="Utforsk våre analyseverktøy"
      />
      <PageContent color="gray">
        <div className="flex w-full flex-wrap justify-center p-10 gap-10">
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
    </>
  );
}
