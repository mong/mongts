import { useState } from "react";
import { useEventListener } from "../../helpers/hooks";

import style from "./index.module.css";
import { RegisterName } from "types";
import Link from "next/link";

interface selectedRegisterProps {
  regNames: RegisterName[];
  selection_bar_height: number | null;
  activeTab: string;
}

const SelectRegister = (props: selectedRegisterProps) => {
  const [value, setValue] = useState("");
  const { regNames, selection_bar_height, activeTab } = props;
  const [btnToggle, updateBtnToggle] = useState(false);
  const btnStyle = btnToggle ? { border: "2px solid #00263d" } : {};
  const linkWrapperStyle = btnToggle ? {} : { display: "none" };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!btnToggle) {
      return;
    }
    switch (event.key) {
      case "Esc":
      case "Escape":
        updateBtnToggle(!btnToggle);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  useEventListener("keydown", handleKeyDown);

  const handleInputChange = (e: any) => {
    setValue(e.target.value);
  };

  const filteredReg =
    value.length > 0
      ? [
          ...regNames
            .filter(
              (reg) =>
                reg.rname?.toLowerCase().includes(value.toLocaleLowerCase()) ||
                reg.full_name?.toLowerCase().includes(value.toLocaleLowerCase())
            )
            .filter(
              (reg) =>
                (reg.caregiver_data || reg.dg_data || reg.resident_data) &&
                reg.rname !== "dummy"
            ),
        ]
      : regNames.filter(
          (reg) =>
            (reg.caregiver_data || reg.dg_data || reg.resident_data) &&
            reg.rname !== "dummy"
        );

  return (
    <>
      <div
        style={{ position: "sticky", top: selection_bar_height! }}
        data-testid="select_registry_button"
      >
        <button
          className={style.registerBtn}
          style={btnStyle}
          onClick={() => updateBtnToggle(!btnToggle)}
        >
          Velg register
        </button>
      </div>
      <div className={style.linkWrapper} style={linkWrapperStyle}>
        <div className={style.searchInputWrapper}>
          <input
            onChange={handleInputChange}
            value={value}
            className={style.searchInput}
            type="text"
            placeholder="Søk etter register"
            data-testid="registry_search_input"
          />
        </div>
        <ul>
          <li>
            <Link
              href={`/kvalitetsregistre/alle/${activeTab}`}
              passHref
              data-testid="pick_registry_all"
            >
              <b onClick={() => updateBtnToggle(!btnToggle)}>Alle registre</b>
            </Link>
          </li>
          {filteredReg.map((reg: RegisterName) => {
            const tabName =
              activeTab === "sykehus" && reg.caregiver_data
                ? "sykehus"
                : activeTab === "opptaksomraade" && reg.resident_data
                ? "opptaksomraade"
                : activeTab === "datakvalitet" && reg.dg_data
                ? "datakvalitet"
                : "sykehus";

            return (
              <li key={reg.rname} data-testid={`pick_registry_${reg.rname}`}>
                <Link
                  href={`/kvalitetsregistre/${reg.rname}/${tabName}`}
                  passHref
                  onClick={() => updateBtnToggle(!btnToggle)}
                >
                  {reg.full_name}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => updateBtnToggle(!btnToggle)}
          className={style.select_reg_close}
          data-testid="pick_registry_close_button"
        >
          <i className="far fa-times-circle" />
        </button>
      </div>
    </>
  );
};

export default SelectRegister;
