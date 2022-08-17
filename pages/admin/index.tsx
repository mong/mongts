import dynamic from "next/dynamic";

const Admin = dynamic(() => import("./cms"), {
  ssr: false,
  loading: () => <p>Loading Admin...</p>,
});

export default Admin;
