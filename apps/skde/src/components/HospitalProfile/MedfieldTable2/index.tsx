import { SubjectAreaResultCard } from "@mong/material-ui";

type MedfieldTable2Props = {
  unitName: string;
  year: number;
};

export const MedfieldTable2 = (props: MedfieldTable2Props) => {
  const { unitName, year } = props;

  return (
    <div className="flex flex-col w-full gap-2 pb-14">
      <h4 className="pb-8 pt-14 text-brand-primary-600">
        {`Måloppnåelse sortert på fagområde for ${unitName} i ${year}`}
      </h4>
      <SubjectAreaResultCard
        headers={{
          first: "Fagområde",
          second: "Målnivå",
        }}
        buttonHref="#"
        high="Høy 92%"
        low="Lavt 50%"
        middle="Middels 75%"
        title="Dagkirurgi"
      />
      <SubjectAreaResultCard
        buttonHref="#"
        high="Høy 92%"
        low="Lavt 50%"
        middle="Middels 75%"
        title="Dagkirurgi"
      />
      <SubjectAreaResultCard
        buttonHref="#"
        high="Høy 92%"
        low="Lavt 50%"
        middle="Middels 75%"
        title="Andel trombolyse"
      />
      <SubjectAreaResultCard
        buttonHref="#"
        high="Høy 92%"
        low="Lavt 50%"
        middle="Middels 75%"
        title="Dagkirurgi"
      />
      <SubjectAreaResultCard
        buttonHref="#"
        high="Høy 92%"
        low="Lavt 50%"
        middle="Middels 75%"
        title="Dagkirurgi"
      />
    </div>
  );
};
