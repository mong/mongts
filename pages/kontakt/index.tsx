import Layout from "../../components/layout";
import newsStyles from "../../styles/News.module.css";

const Contact = () => {
  return (
    <Layout page="Kontaktinformasjon">
      <div className={newsStyles.container}>
        <div className={newsStyles.article}>
          <div className={newsStyles.title}>
            <div>
              <h2>Kontakt SKDE</h2>
            </div>
          </div>
          <div className={newsStyles.article}>
            <div>
              <p className={newsStyles.ingress}>
                Senter for klinisk dokumentasjon og evaluering (SKDE) holder i
                3.etasje i SIVA-bygget i Forskningsparken i Tromsø.
              </p>
            </div>
            <div className={newsStyles.content}>
              <p>
                <strong>Telefon</strong>
                <br></br>
                77 75 58 00<br></br>
                <br></br>
                <strong>E-post</strong>
                <br></br>
                postmottak@helse-nord.no<br></br>
                <br></br>
                <strong>Postadresse</strong>
                <br></br>
                Helse Nord RHF, SKDE<br></br>
                Postboks 1445<br></br>
                8083 Bodø <br></br>
                <br></br>
                <strong>Besøksadresse</strong>
                <br></br>
                SKDE Senter for klinisk evaluering og dokumentasjon<br></br>
                Helse Nord RHF<br></br>
                Sykehusveien 23, 3. etasje<br></br>
                9019 Tromsø<br></br>
                <br></br>
                <strong>Fakturaadresse</strong>
                <br></br>
                Helse Nord RHF<br></br>
                Fakturamottak<br></br>
                Postboks 3230<br></br>
                7439 Trondheim eller elektronisk: invoice.3230@kollektor.no
                <br></br>
                Referanse som må angis ved fakturering er: 3200<br></br>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Contact;
