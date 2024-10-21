import { useSearchParams } from "next/navigation";

export default function IframeTester() {
  const searchParams = useSearchParams();
  const domainParam = searchParams.get("domain");
  const domain = domainParam ? domainParam : "https://localhost:3000";

  return (
    <>
      <h1>IframeTester</h1>
      <div>
        <iframe
          id="iframe-child-3"
          src={
            new URL("/helseatlas/kulelinje/?atlas=lab&amp;data=b12_rb1", domain)
              .href
          }
          title="iframe-child-3"
          width="500"
          height="200"
        />
      </div>
      <div>
        <iframe
          id="iframe-child-1"
          src={
            new URL(
              "/helseatlas/resultatboks/?atlas=lab&amp;data=b12_rb1",
              domain,
            ).href
          }
          title="iframe-child-1"
          width="500"
          height="600"
        />
      </div>
      <div>
        <iframe
          id="iframe-child-2"
          src={
            new URL(
              "/helseatlas/resultatboks/?atlas=lab&amp;data=b12_rb1",
              domain,
            ).href
          }
          title="iframe-child-2"
          width="500"
          height="600"
        />
      </div>
      <div>
        <iframe
          id="iframe-child-vg"
          src="https://vg.no"
          title="iframe-child-vg"
          width="500"
          height="600"
        />
      </div>
    </>
  );
}
