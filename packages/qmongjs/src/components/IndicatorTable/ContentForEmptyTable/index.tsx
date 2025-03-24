import { useIsFetching } from "@tanstack/react-query";
import { TableBody, TableRow, TableCell, Box, Stack } from "@mui/material";

interface NoDataAvailableProps {
  colspan: number;
}

export const NoDataAvailable = ({ colspan }: NoDataAvailableProps) => {
  const isFetching = useIsFetching();

  if (isFetching === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={colspan} sx={{ padding: 0 }}>
            <Box margin="0.5rem">
              <Stack spacing={"0.5rem"}>
                <div style={{ fontSize: "1.2rem", fontWeight: "normal" }}>
                  Det finnes ikke data for disse filtervalgene.
                </div>
                <div style={{ fontSize: "0.9rem", color: "#7d8588" }}>
                  Det er dessverre ingen tilgjengelige data for disse
                  filtervalgene. Det kan skyldes manglende innrapportering eller
                  at det ikke leveres data fra de valgte behandlingsenhetene.
                </div>
              </Stack>
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  return null;
};
