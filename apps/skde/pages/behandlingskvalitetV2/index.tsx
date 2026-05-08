import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import {
	Box,
	Button,
	CssBaseline,
	FormControl,
	InputLabel,
	Link,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	ThemeProvider,
	Typography,
} from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import {
	defaultYear,
	mainQueryParamsConfig,
	skdeTheme,
	useRegisterNamesQuery,
	useUnitNamesQuery,
} from "qmongjs";
import { useState } from "react";
import { useQueryParam } from "use-query-params";
import { MedicalFieldPopup } from "../../src/components/DialogBox/MedicalFieldPopup";
import { TreatmentUnitPopup } from "../../src/components/DialogBox/TreatmentunitPopup";
import { Footer } from "../../src/components/Footer";
import { IndicatorTable } from "../../src/components/IndicatorTable/Indicatortable";
import { LayoutHead } from "../../src/components/LayoutHead";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";
import TreatmentQualityAppBar from "../../src/components/TreatmentQuality/TreatmentQualityAppBar";
import {
	ColourMap,
	getSortedList,
	updateColourMap,
} from "../../src/helpers/functions/chartColours";
import { defaultTableContext } from "../../src/utils/valueOrDefault";

export default function TreatmentQualityPage() {
	const numberOfYearOptions = 5;

	const defaultTreatmentUnits = ["Nasjonalt"];

	// Used by indicator table
	const [selectedYear = defaultYear, setSelectedYear] = useQueryParam<
		number | undefined
	>("year", mainQueryParamsConfig.year);

	// biome-ignore lint: no-unused-vars -- reason: global replace, please state reason here
	const [selectedTableContext, setSelectedTableContext] =
		useState(defaultTableContext);

	// biome-ignore lint: no-unused-vars -- global replace, please state reason here
	const [selectedLevel, setSelectedLevel] = useState<string | undefined>();

	const [selectedMedicalFields = [], setSelectedMedicalFields] = useQueryParam<
		string[] | undefined
	>("registries", mainQueryParamsConfig.registries);

	// biome-ignore lint: no-unused-vars -- global replace, please state reason here
	const [
		selectedTreatmentUnits = defaultTreatmentUnits,
		setSelectedTreatmentUnits,
	] = useQueryParam<string[] | undefined>("units", mainQueryParamsConfig.units);

	// biome-ignore lint: no-unused-vars -- global replace, please state reason here
	const [dataQualitySelected, setDataQualitySelected] =
		useState<boolean>(false);

	const [medicalFieldPopupOpen, setMedicalFieldPopupOpen] = useState(false);
	const [treatmentUnitPopupOpen, setTreatmentUnitPopupOpen] = useState(false);

	const [colourMap, setColourMap] = useState<ColourMap[]>([]);

	// State for the copy url button.
	// When the button is pressed it should change for a duration of time to show the user that the action is done.
	const [urlCopied, setUrlCopied] = useState<boolean>(false);
	const urlCopiedTimeout = 3000;

	// biome-ignore lint: no-explicit-any -- reason: global replace, please state reason here
	const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
		selectedMedicalFields[0] ? selectedMedicalFields[0] : "all",
		selectedTableContext,
		dataQualitySelected ? "dg" : "ind",
	);

	// Load register names and medical fields
	// biome-ignore lint: no-explicit-any -- reason: global replace, please state reason here
	const registryNameQuery: UseQueryResult<any, unknown> =
		useRegisterNamesQuery();

	updateColourMap(colourMap, setColourMap, selectedTreatmentUnits);

	const handleYearChange = (event: SelectChangeEvent) => {
		setSelectedYear(Number(event.target.value));
	};

	const handleMedicalFieldButtonClick = () => {
		setMedicalFieldPopupOpen(true);
	};
	const handleTreatmentUnitButtonClick = () => {
		setTreatmentUnitPopupOpen(true);
	};

	return (
		<ThemeProvider theme={skdeTheme}>
			<CssBaseline />
			<PageWrapper>
				<Box
					sx={{
						background: "#F5F5F5",
					}}
				>
					<LayoutHead
						title="Behandlingskvalitet"
						content="This page shows the quality indicators from national health registries in the Norwegian specialist healthcare service."
						href="/favicon.ico"
					/>
					<TreatmentQualityAppBar openDrawer={() => false}>
						Resultater fra nasjonale medisinske kvalitetsregistre. Se{" "}
						<Link
							href="https://www.kvalitetsregistre.no/"
							target="_blank"
							rel="noopener"
						>
							kvalitetsregistre.no
						</Link>{" "}
						for mer informasjon.
					</TreatmentQualityAppBar>
					<Box padding={4}>
						<Stack
							direction="row"
							justifyContent="space-between"
							sx={{ paddingBottom: 2 }}
						>
							<Stack direction="row" spacing={1}>
								<Button
									variant="outlined"
									onClick={handleMedicalFieldButtonClick}
								>
									Velg fagområde
								</Button>
								<MedicalFieldPopup
									open={medicalFieldPopupOpen}
									updateRegistries={setSelectedMedicalFields}
									setOpen={setMedicalFieldPopupOpen}
									onSubmit={setSelectedMedicalFields}
								/>
								<Button
									variant="outlined"
									onClick={handleTreatmentUnitButtonClick}
								>
									Velg behandlingsenheter
								</Button>
								<TreatmentUnitPopup
									open={treatmentUnitPopupOpen}
									setOpen={setTreatmentUnitPopupOpen}
									onSubmit={setSelectedTreatmentUnits}
									context={selectedTableContext}
									type={"ind"}
								/>
								<FormControl>
									<InputLabel>År</InputLabel>
									<Select
										value={selectedYear.toString()}
										label="År"
										onChange={handleYearChange}
									>
										{[
											...Array(numberOfYearOptions)
												.keys()
												.map((i: number) => {
													const year = defaultYear - i;
													return (
														<MenuItem key={year} value={year}>
															{year}
														</MenuItem>
													);
												}),
										]}
									</Select>
								</FormControl>
							</Stack>
							<Button
								variant="outlined"
								startIcon={urlCopied ? <DoneIcon /> : <ContentCopyIcon />}
								onClick={() => {
									navigator.clipboard.writeText(window.location.href);
									setUrlCopied(true);
									setTimeout(() => {
										setUrlCopied(false);
									}, urlCopiedTimeout);
								}}
							>
								{urlCopied ? "URL kopiert" : "Kopier URL"}
							</Button>
						</Stack>
						{selectedMedicalFields.length > 0 ? (
							<IndicatorTable
								key={"indicator-table2"}
								context={selectedTableContext}
								unitNames={getSortedList(
									colourMap,
									selectedTreatmentUnits,
									"units",
								)}
								year={selectedYear}
								type={dataQualitySelected ? "dg" : "ind"}
								levels={selectedLevel}
								medfields={selectedMedicalFields}
								chartColours={getSortedList(
									colourMap,
									selectedTreatmentUnits,
									"colours",
								)}
							/>
						) : (
							<Stack
								height="484px"
								spacing={6}
								justifyContent="center"
								alignItems="center"
								sx={{
									background: "#FFFFFF",
									border: "1px solid #2354AE",
									borderRadius: "16px",
								}}
							>
								<Typography variant="h3" color="#0D244E">
									Velg et fagområde du vil se resultater fra
								</Typography>
								<Button
									variant="contained"
									onClick={handleMedicalFieldButtonClick}
									sx={{
										width: "200px",
										background: "#2354AE",
										color: "#FFFFFF",
										height: "48px",
										fontSize: "14px",
									}}
								>
									Velg fagområde
								</Button>
							</Stack>
						)}
					</Box>
				</Box>
				<Footer />
			</PageWrapper>
		</ThemeProvider>
	);
}
