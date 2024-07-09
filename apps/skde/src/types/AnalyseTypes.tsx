export type NorwegianOrEnglishText = {
  no: string;
  en?: string;
};

export type AnalyseData = {
  tags: string[];
  published: number;
  graphs: {
    type: string;
    category: string;
    description: NorwegianOrEnglishText;
    variables: string[];
    data_id: string;
  }[];
  data: {
    [dsname: string]: {
      [varname: string]: string | number;
    }[];
  };
};

export type Tag = {
  name: string;
  fullname: string;
  introduction?: string;
};
