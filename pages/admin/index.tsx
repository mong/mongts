import dynamic from "next/dynamic";

const Admin = dynamic(() => import("./cms"), {
  ssr: false,
});

export default Admin;
