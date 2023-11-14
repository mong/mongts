import React from "react";

export const Skde = (): JSX.Element => {
  return (
    <div className="SKDE">
      <div className="div">
        <div className="overlap">
          <img
            className="figure"
            alt="Figure"
            src="/img/forsideny/figure.svg"
          />
          <img
            className="div-promobox-content"
            alt="Div promobox content"
            src="/img/forsideny/div-promobox-content.svg"
          />
        </div>
        <div className="item-link">
          <div className="div-2">
            <div className="heading">
              <div className="text-wrapper">Pasientstrømmer</div>
            </div>
            <p className="p">
              Oversikt over antall kontakter for pasienter bosatt i
              opptaktsområdet for Helse Nord RHF, behandlet ved ulike
              helseforetak fordelt på år.
            </p>
          </div>
          <div className="div-content-card">
            <div className="text-wrapper-2">Se oversikt</div>
            <div className="text-wrapper-3">→</div>
          </div>
        </div>
        <div className="item-link-2">
          <div className="div-2">
            <div className="div-wrapper">
              <div className="text-wrapper">Helseatlas</div>
            </div>
            <p className="p">
              Sammenlikning av befolkningens bruk av helsetjenester i
              forskjellige geografiske områder, uavhengig av hvilket sted
              pasientene behandles.
            </p>
          </div>
          <div className="div-content-card">
            <div className="text-wrapper-2">Se oversikt</div>
            <div className="text-wrapper-3">→</div>
          </div>
        </div>
        <div className="item-link-3">
          <div className="div-2">
            <div className="heading-2">
              <div className="text-wrapper">Kvalitetsregister</div>
            </div>
            <p className="p">
              Medisinske kvalitetsregistre har informasjon om
              behandlingskvalitet som skal bidra til å forbedre helsetjenesten.
            </p>
          </div>
          <div className="div-content-card">
            <div className="text-wrapper-2">Se oversikt</div>
            <div className="text-wrapper-3">→</div>
          </div>
        </div>
        <img
          className="figure-mask"
          alt="Figure mask"
          src="/img/forsideny/figure-mask.png"
        />
        <img className="footer" alt="Footer" src="/img/forsideny/footer.svg" />
        <div className="overlap-group">
          <img
            className="ellipse"
            alt="Ellipse"
            src="/img/forsideny/ellipse-2.png"
          />
          <img className="group" alt="Group" src="/img/forsideny/group-2.png" />
        </div>
        <img className="nav" alt="Nav" src="/img/forsideny/nav.svg" />
        <img className="g" alt="G" src="/img/forsideny/g-10.png" />
      </div>
    </div>
  );
};

export default Skde;
