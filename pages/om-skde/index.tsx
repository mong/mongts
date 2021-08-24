import Layout from "../../components/layout";
import style from "./index.module.css";
import newsStyles from "../../styles/News.module.css";

const About = () => {
  return (
    <Layout page="Om SKDE">
      <div className={newsStyles.container}>
        <div className={newsStyles.article}>
          <h2>Om SKDE</h2>
          <div className={newsStyles.article__ingress}>
            Senter for klinisk dokumentasjon og evaluering (SKDE) jobber med å
            synliggjøre geografiske ulikheter i spesialisthelsetjenesten. Målet
            er å bidra til likeverdige helsetjenester av god kvalitet uansett
            hvor pasientene bor.
          </div>
          <div className={newsStyles.article__content}>
            <p>
              Senter for klinisk dokumentasjon og evaluering (SKDE) er en
              selvstendig enhet i Helse Nord RHF. <br></br>
              <br></br>
              SKDEs oppdrag er å bidra til kvalitetsforbedring i helsetjenesten
              gjennom å gi økt kunnskap om behandlingskvalitet og forbruk i
              spesialisthelsetjenesten. <br></br>
              <br></br>
              SKDE er et unikt sammensatt kompetansemiljø som blant annet består
              av spesialrådgivere, klinikere, analytikere og forskere. Våre
              ansatte utfører analyser på ulike nivåer i
              spesialisthelsetjenesten både tilknyttet Helse Nord RHF og
              nasjonalt. Vi har funksjon som rådgivende organ for nasjonale
              medisinske kvalitetsregistre, og lager Helseatlas som gir
              nasjonale oversikter over geografiske forskjeller i bruk av
              spesialisthelsetjenester. Vi har også flere pågående
              forskningsprosjekter.<br></br>
              <br></br>
              SKDE er en tverrfaglig organisasjon med 27 ansatte, og har våre
              kontorer i 3.etasje i SIVA-bygget i Forskningsparken i Tromsø.{" "}
              <br></br>
              <br></br>
              SKDE består av stab, forskere og to seksjoner med litt ulike
              arbeidsområder:<br></br>
              <br></br>
              <h3>Analyseseksjonen</h3>
              Gjennom analyser bidrar analyseseksjonen med relevant
              styringsinformasjon om ulike nivåer av spesialisthelsetjenesten i
              Helse Nord. I tillegg har seksjonen ansvar for nasjonalt
              helseatlas som gir oversikt over forbruk av ulike helsetjenester i
              Norge.<br></br>
              <br></br>
              <a
                href="https://helse-nord.no/skde/medarbeidere-i-skde#analyseseksjonen"
                target="_blank"
              >
                Ansatte ved analyseseksjonen
              </a>
              <br></br>
              <h3>Nasjonalt servicemiljø for medisinske kvalitetsregistre</h3>
              Nasjonalt servicemiljø for medisinske kvalitetsregistre tilbyr
              bistand ved opprettelse og drift av medisinske kvalitetsregistre.
              <br></br>
              <br></br>
              <a
                href="https://helse-nord.no/skde/medarbeidere-i-skde#nasjonalt-servicemiljo-for-medisinske-kvalitetsregistre"
                target="_blank"
              >
                Medarbeidere ved nasjonalt servicemiljø for kvalitetsregistre
              </a>
              <br></br>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default About;
