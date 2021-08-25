import Layout from "../../components/layout";
import IframeResizer from "iframe-resizer-react"

const Pasient = () => {
  return (
    <Layout page="Pasientstrømmer">
<IframeResizer
  log
   src="https://prod-tabellverk.skde.org/"
  style={{ width: '1px', minWidth: '100%', border: "none"}}
/>
    </Layout>
  );
};
export default Pasient;
