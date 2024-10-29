import { useRouter } from "next/router";

const Stadiumfigur = () => {
  const router = useRouter();
  const { registry } = router.query;

  return (
    <div>
      <h1>{registry}</h1>
    </div>
  );
};

export default Stadiumfigur;
