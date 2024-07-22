export type NorwegianOrEnglishText = {
  no: string;
  en?: string;
};

export type AnalyseData = {
  tags: string[];
  name: string;
  published: number;
  description: NorwegianOrEnglishText;
  variables: string[];
  data: {
    sykehus: {
      [sykehus_num: string]: {
        [year: string]: number[];
      };
    };
    region: {
      [region_num: string]: {
        [year: string]: number[];
      };
    };
  };
};

export type Tag = {
  name: string;
  fullname: string;
  introduction?: string;
};
