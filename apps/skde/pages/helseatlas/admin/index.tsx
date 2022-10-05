import dynamic from "next/dynamic";

const InitializeCMS = dynamic(() => import("../../../src/components/CMS"), {
  ssr: false,
  loading: () => <p>Loading Admin...</p>,
});

export default InitializeCMS;
