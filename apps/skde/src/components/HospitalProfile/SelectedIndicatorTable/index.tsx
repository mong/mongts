import { ItemBox } from "../HospitalProfileStyles";
import { indicatorsPerHospital } from "./indicators";

export type SelectedIndicatorTableProps = {
  unitName: string
}

export const SelectedIndicatorTable = (props: SelectedIndicatorTableProps) => {
  const {unitName} = props;

  const selectedIndicators = indicatorsPerHospital.filter((row) => row.unit === unitName)
console.log(selectedIndicators[0])
  return(
    <ItemBox height={400}>

    </ItemBox>
  )
}