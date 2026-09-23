import { Box, PageContent } from "@mong/material-ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <PageContent>
      <Box border className="w-full h-fit my-10">
        <div className="flex flex-col items-center w-full">
          <h2>Siden finnes ikke</h2>
          <div className="flex flex-col items-center pt-10">
            <h4 className="pb-4">
              <p>Vi fant ikke siden du leter etter.</p>
            </h4>
            <Link href="/" className="text-blue-500 underline">
              Gå tilbake til hovedsiden
            </Link>
          </div>
        </div>
      </Box>
    </PageContent>
  );
}
