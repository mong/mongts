import Layout from "../../components/layout";
import IframeResizer from "iframe-resizer-react"

const Pasient = () => {
  return (
    <Layout page="Pasientstrømmer">
<IframeResizer
  log
   src="http://qa-tabellverk.eu-west-1.elasticbeanstalk.com/"
  style={{ width: '1px', minWidth: '100%', border: "none"}}
/>
    </Layout>
  );
};
export default Pasient;
