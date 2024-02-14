import { createMedfieldTableData } from "..";
import { medfieldTableData } from "../../../../test/test_data/data";

test("Levels counts are correct", () => {
  const data = createMedfieldTableData(medfieldTableData);

  const expectedData = [
    undefined, // Medfield id 0
    {
      // Medfield id 1
      name: "Hjerte- og karsykdommer",
      green: 1,
      yellow: 0,
      red: 1,
      registers: [
        undefined, // Registry id 0
        {
          // Registry id 1
          name: "Hjerteregister nummer 1",
          green: 1,
          yellow: 0,
          red: 0,
        },
        {
          // Registry id 2
          name: "Hjerteregister nummer 2",
          green: 0,
          yellow: 0,
          red: 1,
        },
      ],
    },
    undefined, // Medfield id 2
    {
      // Medfield id 3
      name: "Diabetes",
      green: 1,
      yellow: 1,
      red: 0,
      registers: [
        undefined, // Registry id 0
        undefined, // Registry id 1
        undefined, // Registry id 2
        {
          // Registry id 3
          name: "Diabetesregister nummer 1",
          green: 1,
          yellow: 1,
          red: 0,
        },
      ],
    },
    undefined, // Medfield id 4
    {
      // Medfield id 5
      name: "Barn",
      green: 3,
      yellow: 0,
      red: 0,
      registers: [
        undefined, // Registry id 0
        undefined, // Registry id 1
        undefined, // Registry id 2
        undefined, // Registry id 3
        {
          // Registry id 4
          name: "Barneregister nummer 1",
          green: 1,
          yellow: 0,
          red: 0,
        },
        {
          // Registry id 5
          name: "Barneregister nummer 2",
          green: 2,
          yellow: 0,
          red: 0,
        },
      ],
    },
  ];

  expect(data).toEqual(expectedData);
});
