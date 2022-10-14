{
  "version": "1.3",
  "geographies": [
    {
      "id": "HF-områder",
      "name": "HF-områder",
      "type": "polygon",
      "features": [
        { "id": "1", "name": "Finnmark" },
        { "id": "2", "name": "UNN" },
        { "id": "3", "name": "Nordland" },
        { "id": "4", "name": "Helgeland" },
        { "id": "5", "name": "Nord-Trøndelag" },
        { "id": "6", "name": "St. Olavs" },
        { "id": "7", "name": "Møre og Romsdal" },
        { "id": "8", "name": "Førde" },
        { "id": "9", "name": "Bergen" },
        { "id": "10", "name": "Fonna" },
        { "id": "11", "name": "Stavanger" },
        { "id": "12", "name": "Østfold" },
        { "id": "13", "name": "Akershus" },
        { "id": "14", "name": "OUS" },
        { "id": "15", "name": "Lovisenberg" },
        { "id": "16", "name": "Diakonhjemmet" },
        { "id": "17", "name": "Innlandet" },
        { "id": "18", "name": "Vestre Viken" },
        { "id": "19", "name": "Vestfold" },
        { "id": "20", "name": "Telemark" },
        { "id": "21", "name": "Sørlandet" }
      ],
      "comparisonFeatures": [{ "id": "1", "name": "Norway" }],
      "filters": [{ "id": "filter4", "name": "Fylke" }],
      "themes": [
        {
          "id": "t0",
          "name": "Population",
          "indicators": [
            {
              "id": "i0",
              "name": "Proportion 39 years or older",
              "type": "numeric",
              "precision": "1",
              "values": [
                5.74, 4.86, 5.27, 3.32, 3.81, 4.57, 4.48, 4.69, 5.43, 3.47,
                4.49, 5.03, 6.78, 8.27, 7.37, 8.74, 5.13, 6.72, 5.05, 4.7, 4.21
              ],
              "comparisonValues": [5.57],
              "properties": [
                { "name": "precision", "value": 1 },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Proportion" },
                { "name": "column_antall", "value": "Number 39+" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Population, Proportion 39 years or older"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    43, 95, 72, 24, 52, 164, 121, 51, 296, 69, 215, 142, 365,
                    334, 194, 150, 178, 323, 110, 73, 134
                  ],
                  "comparisonValues": [3206]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    749, 1953, 1373, 732, 1372, 3597, 2711, 1087, 5443, 1977,
                    4781, 2832, 5381, 4041, 2629, 1716, 3477, 4803, 2178, 1553,
                    3188
                  ],
                  "comparisonValues": [57572]
                }
              ]
            },
            {
              "id": "i1",
              "name": "Age when giving birth for the first time",
              "type": "numeric",
              "precision": "0",
              "values": [
                27.37, 28.0, 27.5, 26.73, 26.83, 28.7, 28.1, 28.0, 28.9, 27.4,
                28.7, 28.07, 29.4, 30.87, 31.53, 31.87, 28.1, 29.6, 28.57, 27.9,
                27.93
              ],
              "comparisonValues": [28.57],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Population, Age when giving birth for the first time"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    305, 818, 541, 290, 512, 1564, 1049, 389, 2296, 739, 1917,
                    1176, 2176, 2008, 1594, 905, 1435, 1958, 889, 643, 1246
                  ],
                  "comparisonValues": [24452]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    749, 1953, 1373, 732, 1372, 3597, 2711, 1087, 5443, 1977,
                    4781, 2832, 5381, 4041, 2629, 1716, 3477, 4803, 2178, 1553,
                    3188
                  ],
                  "comparisonValues": [57572]
                }
              ]
            },
            {
              "id": "i2",
              "name": "Overweight mothers, primiparous",
              "type": "numeric",
              "precision": "0",
              "values": [
                13.16, 11.39, 13.23, 16.15, 14.08, 11.57, 10.47, 10.87, 9.48,
                12.1, 9.13, 13.36, 10.76, 5.12, 5.14, 3.12, 15.61, 10.48, 12.39,
                13.7, 10.66
              ],
              "comparisonValues": [10.28],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Population, Overweight mothers, primiparous"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    38, 75, 56, 32, 38, 85, 93, 35, 186, 79, 174, 140, 204, 78,
                    63, 21, 194, 180, 101, 77, 125
                  ],
                  "comparisonValues": [2076]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    283, 647, 413, 192, 258, 731, 873, 319, 1960, 638, 1900,
                    1033, 1909, 1570, 1281, 707, 1223, 1740, 810, 555, 1150
                  ],
                  "comparisonValues": [20192]
                }
              ]
            },
            {
              "id": "i3",
              "name": "Overweight mothers, multiparous",
              "type": "numeric",
              "precision": "0",
              "values": [
                14.27, 16.45, 16.85, 18.11, 19.95, 16.52, 13.6, 14.58, 13.05,
                13.36, 10.64, 15.05, 12.54, 8.83, 8.74, 2.86, 18.19, 12.02,
                14.25, 16.19, 11.7
              ],
              "comparisonValues": [13.11],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Population, Overweight mothers, multiparous"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    59, 141, 102, 51, 81, 125, 179, 79, 324, 141, 296, 217, 337,
                    131, 65, 17, 309, 285, 165, 123, 207
                  ],
                  "comparisonValues": [3435]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    408, 849, 599, 274, 402, 756, 1315, 540, 2483, 1051, 2784,
                    1438, 2699, 1503, 755, 591, 1691, 2391, 1154, 756, 1766
                  ],
                  "comparisonValues": [26208]
                }
              ]
            },
            {
              "id": "i4",
              "name": "Primiparous women, Robson group 1",
              "type": "numeric",
              "precision": "1",
              "values": [
                68.25, 67.72, 69.93, 65.6, 60.86, 66.16, 63.12, 67.38, 68.17,
                63.7, 62.1, 61.74, 63.77, 65.81, 67.26, 66.74, 62.58, 62.49,
                66.46, 62.7, 63.25
              ],
              "comparisonValues": [64.8],
              "properties": [
                { "name": "precision", "value": 1 },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Proportion" },
                { "name": "column_antall", "value": "Number Robson 1" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Population, Primiparous women, Robson group 1"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    211, 560, 383, 195, 320, 1039, 670, 265, 1568, 481, 1196,
                    736, 1383, 1290, 1039, 581, 910, 1215, 593, 409, 800
                  ],
                  "comparisonValues": [15846]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    305, 818, 541, 290, 512, 1564, 1049, 389, 2296, 739, 1917,
                    1176, 2176, 2008, 1594, 905, 1435, 1958, 889, 643, 1246
                  ],
                  "comparisonValues": [24452]
                }
              ]
            },
            {
              "id": "i5",
              "name": "Primiparous women, Robson group 3",
              "type": "numeric",
              "precision": "1",
              "values": [
                58.17, 61.2, 61.29, 63.68, 55.18, 61.86, 59.41, 59.17, 64.71,
                60.21, 60.55, 56.88, 60.51, 61.13, 63.67, 61.59, 57.19, 59.17,
                60.87, 58.16, 60.56
              ],
              "comparisonValues": [60.43],
              "properties": [
                { "name": "precision", "value": 1 },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Proportion" },
                { "name": "column_antall", "value": "Number Robson 3" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Population, Primiparous women, Robson group 3"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    261, 698, 516, 288, 487, 1264, 996, 415, 2037, 758, 1745,
                    949, 1921, 1209, 641, 477, 1180, 1658, 790, 538, 1188
                  ],
                  "comparisonValues": [20015]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    444, 1135, 832, 442, 861, 2033, 1662, 698, 3146, 1237, 2864,
                    1656, 3205, 2033, 1035, 810, 2043, 2845, 1289, 910, 1942
                  ],
                  "comparisonValues": [33120]
                }
              ]
            }
          ]
        },
        {
          "id": "t1",
          "name": "Antenatal care",
          "indicators": [
            {
              "id": "i6",
              "name": "Contacts with midwives",
              "type": "numeric",
              "precision": "0",
              "values": [
                5.56, 4.39, 5.32, 5.23, 5.33, 3.69, 5.22, 5.84, 4.59, 4.58, 3.7,
                4.86, 4.8, 3.38, 3.96, 3.51, 5.01, 3.6, 4.08, 4.79, 5.11
              ],
              "comparisonValues": [4.42],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Antenatal care, Contacts with midwives"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    4384, 8669, 7271, 3933, 7268, 13333, 14221, 6172, 24703,
                    9133, 17505, 13619, 25740, 12420, 10403, 5809, 17533, 16970,
                    8881, 7536, 16801
                  ],
                  "comparisonValues": [252305]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    769, 1949, 1340, 723, 1321, 3585, 2696, 1050, 5381, 1943,
                    4713, 2760, 5423, 3804, 2722, 1750, 3441, 4805, 2162, 1540,
                    3242
                  ],
                  "comparisonValues": [57120]
                }
              ]
            },
            {
              "id": "i7",
              "name": "Contacts with GPs",
              "type": "numeric",
              "precision": "0",
              "values": [
                1.32, 2.43, 1.67, 2.23, 1.96, 3.04, 2.25, 1.46, 3.38, 2.97,
                3.99, 3.32, 3.39, 3.94, 3.86, 4.08, 2.89, 3.57, 3.42, 2.8, 3.43
              ],
              "comparisonValues": [3.21],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Antenatal care, Contacts with GPs"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    1012, 4732, 2233, 1608, 2590, 10915, 6054, 1530, 18202,
                    5756, 18782, 9158, 18371, 15006, 10520, 7169, 9951, 17159,
                    7402, 4303, 11113
                  ],
                  "comparisonValues": [183564]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    769, 1949, 1340, 723, 1321, 3585, 2696, 1050, 5381, 1943,
                    4713, 2760, 5423, 3804, 2722, 1750, 3441, 4805, 2162, 1540,
                    3242
                  ],
                  "comparisonValues": [57120]
                }
              ]
            },
            {
              "id": "i8",
              "name": "Contacts with specialist health services",
              "type": "numeric",
              "precision": "0",
              "values": [
                4.42, 4.62, 4.54, 5.93, 5.1, 4.4, 4.55, 4.61, 3.94, 4.67, 4.65,
                4.28, 4.06, 4.3, 4.4, 4.48, 5.25, 5.6, 4.87, 5.44, 5.47
              ],
              "comparisonValues": [4.66],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Antenatal care, Contacts with specialist health services"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    3400, 8998, 6090, 4270, 6717, 15739, 12236, 4833, 21199,
                    9026, 21871, 11790, 22054, 16436, 12009, 7905, 18024, 26985,
                    10520, 8341, 17683
                  ],
                  "comparisonValues": [266126]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    769, 1949, 1339, 723, 1321, 3586, 2698, 1050, 5381, 1944,
                    4714, 2760, 5423, 3799, 2719, 1750, 3441, 4803, 2162, 1540,
                    3241
                  ],
                  "comparisonValues": [57113]
                }
              ]
            },
            {
              "id": "i9",
              "name": "Gestational diabetes, primiparous",
              "type": "numeric",
              "precision": "0",
              "values": [
                40.33, 25.74, 48.43, 52.3, 35.05, 29.83, 54.27, 111.2, 65.42,
                47.94, 33.26, 59.4, 43.19, 39.43, 34.5, 31.14, 40.77, 55.79,
                37.93, 35.82, 58.45
              ],
              "comparisonValues": [45.19],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Antenatal care, Gestational diabetes, primiparous"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    11, 20, 24, 13, 16, 46, 54, 41, 149, 32, 62, 66, 95, 88, 64,
                    34, 55, 113, 33, 21, 68
                  ],
                  "comparisonValues": [1105]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    305, 818, 541, 290, 512, 1564, 1049, 389, 2296, 739, 1917,
                    1176, 2176, 2008, 1594, 905, 1435, 1958, 889, 643, 1246
                  ],
                  "comparisonValues": [24452]
                }
              ]
            },
            {
              "id": "i10",
              "name": "Gestational diabetes, multiparous",
              "type": "numeric",
              "precision": "0",
              "values": [
                54.76, 31.99, 54.69, 50.34, 36.29, 39.18, 47.63, 115.13, 70.99,
                48.14, 34.38, 69.3, 47.48, 47.76, 53.09, 34.08, 46.41, 57.15,
                46.86, 55.91, 68.93
              ],
              "comparisonValues": [52.15],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Antenatal care, Gestational diabetes, multiparous"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    23, 36, 44, 20, 29, 78, 76, 79, 223, 55, 96, 112, 158, 107,
                    61, 32, 91, 172, 59, 48, 129
                  ],
                  "comparisonValues": [1727]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    444, 1135, 832, 442, 861, 2033, 1662, 698, 3146, 1237, 2864,
                    1656, 3205, 2033, 1035, 810, 2043, 2845, 1289, 910, 1942
                  ],
                  "comparisonValues": [33120]
                }
              ]
            }
          ]
        },
        {
          "id": "t2",
          "name": "Primiparous",
          "indicators": [
            {
              "id": "i11",
              "name": "Uncomplicated births",
              "type": "numeric",
              "precision": "0",
              "values": [
                607.58, 621.13, 612.95, 593.95, 559.96, 598.27, 589.55, 630.91,
                591.79, 606.56, 550.52, 589.69, 596.86, 608.22, 620.26, 628.13,
                567.83, 578.3, 675.97, 604.74, 596.18
              ],
              "comparisonValues": [596.74],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Primiparous, Uncomplicated births"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    192, 520, 342, 182, 301, 942, 632, 251, 1362, 466, 1064,
                    710, 1290, 1165, 926, 526, 835, 1117, 606, 399, 763
                  ],
                  "comparisonValues": [14591]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    305, 818, 541, 290, 512, 1564, 1049, 389, 2296, 739, 1917,
                    1176, 2176, 2008, 1594, 905, 1435, 1958, 889, 643, 1246
                  ],
                  "comparisonValues": [24452]
                }
              ]
            },
            {
              "id": "i12",
              "name": "Induction",
              "type": "numeric",
              "precision": "0",
              "values": [
                198.85, 206.53, 192.26, 215.01, 265.63, 228.72, 270.51, 223.41,
                224.94, 256.43, 283.27, 265.39, 244.2, 224.84, 227.02, 218.04,
                231.63, 251.99, 221.47, 257.72, 251.95
              ],
              "comparisonValues": [239.75],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                { "name": "metatext", "value": "Primiparous, Induction" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    59, 167, 102, 60, 131, 355, 279, 86, 515, 184, 539, 307,
                    533, 467, 379, 209, 327, 498, 196, 162, 308
                  ],
                  "comparisonValues": [5862]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    305, 818, 541, 290, 512, 1564, 1049, 389, 2296, 739, 1917,
                    1176, 2176, 2008, 1594, 905, 1435, 1958, 889, 643, 1246
                  ],
                  "comparisonValues": [24452]
                }
              ]
            },
            {
              "id": "i13",
              "name": "Epidural",
              "type": "numeric",
              "precision": "0",
              "values": [
                350.45, 339.19, 492.07, 444.03, 506.18, 521.04, 523.46, 572.09,
                625.8, 522.41, 532.12, 412.7, 574.9, 613.39, 598.89, 636.61,
                448.23, 541.95, 488.8, 532.02, 392.83
              ],
              "comparisonValues": [530.62],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                { "name": "metatext", "value": "Primiparous, Epidural" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    83, 219, 218, 105, 199, 652, 442, 183, 1240, 331, 855, 384,
                    1010, 1012, 797, 491, 500, 859, 363, 278, 401
                  ],
                  "comparisonValues": [10623]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    240, 652, 448, 240, 400, 1255, 851, 323, 1983, 642, 1611,
                    939, 1753, 1625, 1302, 752, 1125, 1579, 746, 527, 1029
                  ],
                  "comparisonValues": [20020]
                }
              ]
            },
            {
              "id": "i14",
              "name": "Episiotomy",
              "type": "numeric",
              "precision": "0",
              "values": [
                237.11, 288.2, 322.4, 292.05, 348.42, 230.65, 411.77, 224.5,
                428.89, 362.74, 407.27, 350.18, 346.91, 417.64, 410.67, 420.13,
                380.38, 383.49, 260.76, 431.56, 319.31
              ],
              "comparisonValues": [365.65],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                { "name": "metatext", "value": "Primiparous, Episiotomy" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    54, 182, 138, 65, 130, 287, 341, 71, 850, 222, 651, 319,
                    613, 715, 574, 344, 415, 616, 192, 221, 318
                  ],
                  "comparisonValues": [7320]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    240, 652, 448, 240, 400, 1255, 851, 323, 1983, 642, 1611,
                    939, 1753, 1625, 1302, 752, 1125, 1579, 746, 527, 1029
                  ],
                  "comparisonValues": [20020]
                }
              ]
            },
            {
              "id": "i15",
              "name": "Operative vaginal delivery",
              "type": "numeric",
              "precision": "0",
              "values": [
                139.83, 156.63, 195.06, 203.79, 200.11, 211.29, 222.48, 187.63,
                271.19, 249.95, 300.25, 199.57, 222.56, 227.08, 227.86, 231.25,
                228.13, 244.1, 134.05, 196.8, 226.02
              ],
              "comparisonValues": [227.41],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Primiparous, Operative vaginal delivery"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    31, 98, 82, 44, 72, 262, 182, 58, 537, 150, 478, 179, 394,
                    399, 330, 197, 245, 395, 98, 99, 222
                  ],
                  "comparisonValues": [4553]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    240, 652, 448, 240, 400, 1255, 851, 323, 1983, 642, 1611,
                    939, 1753, 1625, 1302, 752, 1125, 1579, 746, 527, 1029
                  ],
                  "comparisonValues": [20020]
                }
              ]
            },
            {
              "id": "i16",
              "name": "Operative vaginal delivery, Robson group 1",
              "type": "numeric",
              "precision": "0",
              "values": [
                132.41, 125.94, 169.44, 177.98, 158.08, 172.85, 176.51, 150.24,
                230.09, 216.15, 253.39, 155.35, 194.26, 195.05, 194.44, 197.49,
                186.79, 213.65, 112.62, 181.27, 182.44
              ],
              "comparisonValues": [191.16],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Primiparous, Operative vaginal delivery, Robson group 1"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    26, 68, 61, 32, 46, 179, 114, 39, 361, 98, 299, 110, 271,
                    270, 222, 128, 163, 266, 66, 71, 139
                  ],
                  "comparisonValues": [3029]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    211, 560, 383, 195, 320, 1039, 670, 265, 1568, 481, 1196,
                    736, 1383, 1290, 1039, 581, 910, 1215, 593, 409, 800
                  ],
                  "comparisonValues": [15846]
                }
              ]
            },
            {
              "id": "i17",
              "name": "Emergency caesarean sections",
              "type": "numeric",
              "precision": "0",
              "values": [
                178.97, 176.69, 155.41, 155.65, 201.69, 162.18, 167.64, 142.53,
                115.35, 115.03, 135.18, 175.06, 156.72, 138.11, 128.03, 106.19,
                176.16, 147.64, 130.98, 149.21, 141.91
              ],
              "comparisonValues": [145.81],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Primiparous, Emergency caesarean sections"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    51, 139, 79, 41, 94, 250, 169, 53, 263, 79, 255, 197, 345,
                    300, 228, 109, 242, 296, 115, 91, 168
                  ],
                  "comparisonValues": [3565]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    305, 818, 541, 290, 512, 1564, 1049, 389, 2296, 739, 1917,
                    1176, 2176, 2008, 1594, 905, 1435, 1958, 889, 643, 1246
                  ],
                  "comparisonValues": [24452]
                }
              ]
            },
            {
              "id": "i18",
              "name": "Emergency caesarean sections, Robson group 1",
              "type": "numeric",
              "precision": "0",
              "values": [
                106.87, 123.42, 78.94, 83.87, 119.58, 104.36, 100.59, 100.42,
                63.46, 64.84, 76.62, 93.96, 91.76, 74.87, 73.79, 58.85, 102.84,
                83.29, 69.59, 80.2, 76.75
              ],
              "comparisonValues": [83.79],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Primiparous, Emergency caesarean sections, Robson group 1"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    21, 66, 28, 15, 34, 107, 64, 26, 99, 29, 90, 66, 128, 105,
                    86, 39, 89, 104, 41, 31, 58
                  ],
                  "comparisonValues": [1328]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    211, 560, 383, 195, 320, 1039, 670, 265, 1568, 481, 1196,
                    736, 1383, 1290, 1039, 581, 910, 1215, 593, 409, 800
                  ],
                  "comparisonValues": [15846]
                }
              ]
            },
            {
              "id": "i19",
              "name": "Planned caesarean sections",
              "type": "numeric",
              "precision": "0",
              "values": [
                51.0, 36.16, 27.9, 38.07, 42.36, 37.24, 28.98, 36.62, 21.83,
                28.65, 27.44, 36.33, 34.85, 35.88, 34.04, 39.58, 50.88, 40.92,
                33.09, 41.92, 42.46
              ],
              "comparisonValues": [35.25],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Primiparous, Planned caesarean sections"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    14, 28, 14, 9, 18, 57, 28, 13, 50, 19, 51, 40, 77, 82, 65,
                    44, 68, 83, 29, 25, 49
                  ],
                  "comparisonValues": [862]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    305, 818, 541, 290, 512, 1564, 1049, 389, 2296, 739, 1917,
                    1176, 2176, 2008, 1594, 905, 1435, 1958, 889, 643, 1246
                  ],
                  "comparisonValues": [24452]
                }
              ]
            }
          ]
        },
        {
          "id": "t3",
          "name": "Multiparous",
          "indicators": [
            {
              "id": "i20",
              "name": "Uncomplicated births",
              "type": "numeric",
              "precision": "0",
              "values": [
                761.6, 768.4, 793.04, 789.29, 718.83, 781.14, 778.87, 808.69,
                825.47, 812.15, 795.12, 744.32, 785.82, 791.77, 805.88, 794.17,
                751.89, 781.31, 803.49, 775.56, 789.26
              ],
              "comparisonValues": [785.98],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Multiparous, Uncomplicated births"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    340, 875, 665, 355, 627, 1593, 1302, 566, 2598, 1017, 2286,
                    1238, 2503, 1581, 819, 625, 1545, 2202, 1040, 713, 1542
                  ],
                  "comparisonValues": [26032]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    444, 1135, 832, 442, 861, 2033, 1662, 698, 3146, 1237, 2864,
                    1656, 3205, 2033, 1035, 810, 2043, 2845, 1289, 910, 1942
                  ],
                  "comparisonValues": [33120]
                }
              ]
            },
            {
              "id": "i21",
              "name": "Induction",
              "type": "numeric",
              "precision": "0",
              "values": [
                191.18, 174.93, 184.45, 175.08, 211.47, 187.54, 211.97, 228.36,
                191.66, 239.13, 226.47, 209.88, 193.62, 187.18, 174.69, 176.71,
                197.12, 200.29, 180.86, 211.69, 197.64
              ],
              "comparisonValues": [198.88],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                { "name": "metatext", "value": "Multiparous, Induction" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    84, 198, 152, 75, 178, 379, 349, 158, 603, 290, 644, 345,
                    627, 392, 186, 150, 399, 578, 232, 190, 380
                  ],
                  "comparisonValues": [6587]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    444, 1135, 832, 442, 861, 2033, 1662, 698, 3146, 1237, 2864,
                    1656, 3205, 2033, 1035, 810, 2043, 2845, 1289, 910, 1942
                  ],
                  "comparisonValues": [33120]
                }
              ]
            },
            {
              "id": "i22",
              "name": "Epidural",
              "type": "numeric",
              "precision": "0",
              "values": [
                162.79, 129.72, 256.17, 187.0, 254.74, 252.78, 232.49, 313.27,
                341.06, 279.7, 304.7, 176.92, 266.05, 300.37, 275.15, 368.13,
                193.49, 254.57, 242.3, 224.45, 159.75
              ],
              "comparisonValues": [255.66],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                { "name": "metatext", "value": "Multiparous, Epidural" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    60, 122, 185, 71, 172, 434, 327, 189, 964, 307, 770, 240,
                    729, 524, 247, 255, 325, 614, 268, 172, 265
                  ],
                  "comparisonValues": [7239]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    371, 941, 723, 381, 678, 1719, 1411, 605, 2826, 1101, 2532,
                    1358, 2734, 1733, 892, 685, 1683, 2407, 1106, 769, 1660
                  ],
                  "comparisonValues": [28315]
                }
              ]
            },
            {
              "id": "i23",
              "name": "Episiotomy",
              "type": "numeric",
              "precision": "0",
              "values": [
                51.32, 58.61, 72.87, 62.87, 85.57, 46.29, 122.58, 55.92, 95.18,
                74.84, 88.52, 78.44, 75.85, 103.67, 113.74, 113.73, 96.39,
                82.55, 59.05, 99.96, 65.33
              ],
              "comparisonValues": [83.34],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                { "name": "metatext", "value": "Multiparous, Episiotomy" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    19, 55, 52, 23, 56, 79, 171, 34, 269, 80, 223, 105, 210,
                    186, 105, 83, 160, 203, 65, 75, 107
                  ],
                  "comparisonValues": [2360]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    371, 941, 723, 381, 678, 1719, 1411, 605, 2826, 1101, 2532,
                    1358, 2734, 1733, 892, 685, 1683, 2407, 1106, 769, 1660
                  ],
                  "comparisonValues": [28315]
                }
              ]
            },
            {
              "id": "i24",
              "name": "Operative vaginal delivery",
              "type": "numeric",
              "precision": "0",
              "values": [
                37.19, 37.03, 41.5, 32.98, 44.62, 47.36, 47.8, 41.76, 51.08,
                52.75, 68.03, 48.32, 51.37, 51.83, 46.06, 58.63, 51.19, 52.36,
                30.4, 36.44, 46.73
              ],
              "comparisonValues": [49.49],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Multiparous, Operative vaginal delivery"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    13, 34, 29, 12, 28, 80, 66, 25, 145, 55, 170, 64, 144, 96,
                    44, 45, 84, 131, 33, 27, 76
                  ],
                  "comparisonValues": [1401]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    371, 941, 723, 381, 678, 1719, 1411, 605, 2826, 1101, 2532,
                    1358, 2734, 1733, 892, 685, 1683, 2407, 1106, 769, 1660
                  ],
                  "comparisonValues": [28315]
                }
              ]
            },
            {
              "id": "i25",
              "name": "Emergency caesarean sections",
              "type": "numeric",
              "precision": "0",
              "values": [
                81.32, 98.72, 77.75, 73.24, 116.92, 83.7, 85.22, 69.54, 52.91,
                59.86, 65.09, 93.51, 70.65, 71.21, 70.39, 51.76, 93.32, 68.2,
                72.76, 76.97, 65.87
              ],
              "comparisonValues": [73.82],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Multiparous, Emergency caesarean sections"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    35, 111, 63, 31, 96, 168, 139, 48, 166, 71, 184, 153, 231,
                    153, 77, 46, 187, 200, 93, 68, 125
                  ],
                  "comparisonValues": [2445]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    444, 1135, 832, 442, 861, 2033, 1662, 698, 3146, 1237, 2864,
                    1656, 3205, 2033, 1035, 810, 2043, 2845, 1289, 910, 1942
                  ],
                  "comparisonValues": [33120]
                }
              ]
            },
            {
              "id": "i26",
              "name": "Planned caesarean sections",
              "type": "numeric",
              "precision": "0",
              "values": [
                87.84, 74.54, 57.78, 75.57, 108.73, 72.88, 69.51, 64.73, 49.1,
                56.05, 52.84, 89.97, 72.15, 65.41, 57.44, 84.15, 87.66, 79.51,
                71.67, 85.57, 83.62
              ],
              "comparisonValues": [71.2],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Multiparous, Planned caesarean sections"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    37, 83, 46, 30, 86, 145, 112, 44, 154, 65, 148, 145, 239,
                    146, 66, 79, 173, 239, 90, 74, 156
                  ],
                  "comparisonValues": [2358]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    444, 1135, 832, 442, 861, 2033, 1662, 698, 3146, 1237, 2864,
                    1656, 3205, 2033, 1035, 810, 2043, 2845, 1289, 910, 1942
                  ],
                  "comparisonValues": [33120]
                }
              ]
            }
          ]
        },
        {
          "id": "t4",
          "name": "Postnatal period",
          "indicators": [
            {
              "id": "i27",
              "name": "Bed days, primiparous (vaginal)",
              "type": "numeric",
              "precision": "0",
              "values": [
                3.16, 2.92, 3.06, 2.99, 3.49, 3.18, 3.03, 3.35, 2.44, 2.93,
                3.25, 2.61, 2.73, 3.05, 3.03, 3.04, 3.37, 3.2, 3.01, 3.57, 3.18
              ],
              "comparisonValues": [3.02],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Postnatal period, Bed days, primiparous (vaginal)"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    749, 1887, 1352, 706, 1371, 3972, 2558, 1074, 4836, 1860,
                    5223, 2426, 4794, 5017, 4010, 2330, 3755, 5060, 2235, 1860,
                    3249
                  ],
                  "comparisonValues": [60323]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    239, 650, 446, 239, 399, 1254, 849, 322, 1982, 641, 1610,
                    937, 1751, 1624, 1301, 751, 1124, 1576, 745, 525, 1029
                  ],
                  "comparisonValues": [19993]
                }
              ]
            },
            {
              "id": "i28",
              "name": "Bed days, multiparous (vaginal)",
              "type": "numeric",
              "precision": "0",
              "values": [
                2.34, 2.14, 2.19, 2.35, 2.79, 2.31, 2.17, 2.44, 1.58, 2.17, 2.7,
                2.04, 2.06, 2.11, 2.18, 2.04, 2.45, 2.2, 1.84, 2.65, 2.19
              ],
              "comparisonValues": [2.19],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Postnatal period, Bed days, multiparous (vaginal)"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    863, 1987, 1560, 889, 1874, 3960, 3041, 1472, 4438, 2341,
                    6804, 2738, 5604, 3674, 1953, 1409, 4094, 5257, 2023, 2021,
                    3617
                  ],
                  "comparisonValues": [61619]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    369, 930, 715, 381, 676, 1715, 1405, 604, 2817, 1086, 2528,
                    1345, 2721, 1730, 889, 684, 1673, 2382, 1100, 766, 1653
                  ],
                  "comparisonValues": [28168]
                }
              ]
            },
            {
              "id": "i29",
              "name": "Bed days, primiparous (caesarean)",
              "type": "numeric",
              "precision": "0",
              "values": [
                4.67, 4.32, 4.39, 4.09, 5.19, 4.31, 4.25, 4.71, 4.11, 4.58,
                4.27, 3.62, 3.7, 3.87, 3.81, 3.79, 4.51, 4.59, 4.14, 5.0, 4.66
              ],
              "comparisonValues": [4.21],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Postnatal period, Bed days, primiparous (caesarean)"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    305, 720, 408, 206, 578, 1332, 838, 312, 1283, 447, 1309,
                    855, 1564, 1486, 1117, 585, 1394, 1741, 593, 578, 1011
                  ],
                  "comparisonValues": [18662]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    65, 167, 93, 50, 112, 309, 197, 66, 313, 98, 307, 237, 423,
                    383, 292, 154, 309, 379, 143, 116, 217
                  ],
                  "comparisonValues": [4429]
                }
              ]
            },
            {
              "id": "i30",
              "name": "Bed days, multiparous (caesarean)",
              "type": "numeric",
              "precision": "0",
              "values": [
                3.81, 3.76, 3.8, 3.65, 4.39, 3.65, 3.51, 3.63, 3.35, 4.1, 3.51,
                3.22, 3.23, 3.45, 3.47, 3.22, 3.71, 3.77, 3.53, 4.44, 3.82
              ],
              "comparisonValues": [3.61],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Postnatal period, Bed days, multiparous (caesarean)"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    276, 728, 415, 220, 795, 1143, 873, 335, 1073, 558, 1164,
                    956, 1523, 1039, 498, 406, 1331, 1655, 646, 626, 1073
                  ],
                  "comparisonValues": [17334]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    73, 194, 109, 61, 182, 314, 250, 92, 321, 136, 332, 298,
                    471, 300, 143, 125, 360, 438, 183, 142, 282
                  ],
                  "comparisonValues": [4803]
                }
              ]
            },
            {
              "id": "i31",
              "name": "Outpatient contacts for postpartum women",
              "type": "numeric",
              "precision": "0",
              "values": [
                99.56, 253.01, 186.22, 214.77, 149.88, 242.85, 153.2, 131.75,
                632.61, 186.87, 85.42, 456.13, 205.6, 246.09, 251.45, 282.42,
                213.16, 377.21, 370.26, 352.69, 171.31
              ],
              "comparisonValues": [274.95],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Postnatal period, Outpatient contacts for postpartum women"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    76, 491, 248, 153, 196, 869, 412, 138, 3403, 360, 402, 1253,
                    1119, 945, 692, 503, 730, 1823, 799, 539, 553
                  ],
                  "comparisonValues": [15703]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    769, 1949, 1339, 723, 1321, 3586, 2698, 1050, 5381, 1944,
                    4714, 2760, 5423, 3799, 2719, 1750, 3441, 4803, 2162, 1540,
                    3241
                  ],
                  "comparisonValues": [57111]
                }
              ]
            },
            {
              "id": "i32",
              "name": "Outpatient contacts for newborns",
              "type": "numeric",
              "precision": "0",
              "values": [
                119.66, 286.56, 280.44, 397.75, 211.14, 425.97, 335.77, 336.82,
                653.93, 430.13, 382.87, 488.68, 401.77, 315.79, 286.87, 348.65,
                212.14, 444.02, 768.29, 414.43, 455.63
              ],
              "comparisonValues": [407.7],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Postnatal period, Outpatient contacts for newborns"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    94, 581, 395, 306, 291, 1590, 933, 375, 3657, 866, 1880,
                    1424, 2314, 1274, 812, 645, 778, 2351, 1730, 676, 1547
                  ],
                  "comparisonValues": [24518]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    788, 2026, 1407, 769, 1377, 3733, 2778, 1114, 5592, 2013,
                    4910, 2915, 5759, 4035, 2832, 1850, 3667, 5294, 2251, 1630,
                    3395
                  ],
                  "comparisonValues": [60137]
                }
              ]
            },
            {
              "id": "i33",
              "name": "Readmissions of postpartum women",
              "type": "numeric",
              "precision": "0",
              "values": [
                31.11, 29.03, 28.46, 39.54, 32.14, 33.24, 26.89, 31.34, 47.28,
                31.57, 23.78, 22.53, 25.18, 25.39, 26.48, 28.41, 30.42, 39.65,
                23.2, 21.61, 22.94
              ],
              "comparisonValues": [29.97],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Postnatal period, Readmissions of postpartum women"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    24, 57, 39, 29, 43, 120, 73, 33, 254, 62, 112, 63, 136, 94,
                    70, 48, 106, 188, 50, 34, 75
                  ],
                  "comparisonValues": [1711]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    769, 1947, 1339, 723, 1321, 3585, 2696, 1049, 5380, 1944,
                    4713, 2758, 5423, 3798, 2718, 1750, 3439, 4802, 2161, 1539,
                    3239
                  ],
                  "comparisonValues": [57093]
                }
              ]
            },
            {
              "id": "i34",
              "name": "Readmissions of newborns",
              "type": "numeric",
              "precision": "0",
              "values": [
                36.79, 27.14, 43.11, 58.49, 48.43, 60.55, 45.36, 60.72, 69.8,
                58.61, 52.47, 66.9, 45.67, 31.06, 30.02, 31.53, 58.08, 53.27,
                63.22, 54.59, 53.11
              ],
              "comparisonValues": [51.14],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Postnatal period, Readmissions of newborns"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    29, 55, 61, 45, 67, 226, 126, 68, 390, 118, 258, 195, 263,
                    125, 85, 58, 213, 282, 142, 89, 180
                  ],
                  "comparisonValues": [3075]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    788, 2026, 1407, 769, 1377, 3733, 2778, 1114, 5592, 2013,
                    4910, 2915, 5759, 4035, 2832, 1850, 3667, 5294, 2251, 1630,
                    3395
                  ],
                  "comparisonValues": [60137]
                }
              ]
            },
            {
              "id": "i35",
              "name": "Home visits by municipal midwives",
              "type": "numeric",
              "precision": "0",
              "values": [
                221.77, 130.08, 284.24, 147.54, 266.24, 182.22, 445.24, 611.89,
                220.92, 317.95, 120.62, 275.49, 460.09, 230.68, 230.68, 230.68,
                343.9, 304.12, 246.62, 219.17, 458.87
              ],
              "comparisonValues": [280.82],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Postnatal period, Home visits by municipal midwives"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    162, 245, 372, 104, 357, 634, 1185, 654, 1135, 586, 554,
                    738, 1902, 1001, 718, 457, 1161, 1466, 520, 332, 1414
                  ],
                  "comparisonValues": [15692]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    731, 1884, 1307, 702, 1339, 3477, 2662, 1068, 5138, 1842,
                    4593, 2677, 4134, 4337, 3111, 1980, 3375, 4821, 2109, 1513,
                    3082
                  ],
                  "comparisonValues": [55877]
                }
              ]
            },
            {
              "id": "i36",
              "name": "Home visit by health visitor",
              "type": "numeric",
              "precision": "0",
              "values": [
                734.04, 901.22, 840.35, 964.46, 902.04, 920.57, 934.17, 943.27,
                945.65, 862.59, 850.18, 928.1, 802.87, 645.93, 661.62, 636.95,
                842.6, 934.86, 918.49, 961.97, 968.34
              ],
              "comparisonValues": [861.37],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Births" },
                {
                  "name": "metatext",
                  "value": "Postnatal period, Home visit by health visitor"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    575, 1770, 1151, 706, 1225, 3384, 2545, 1025, 5220, 1712,
                    4099, 2577, 4446, 2544, 1792, 1129, 2964, 4578, 2006, 1509,
                    3171
                  ],
                  "comparisonValues": [50126]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    783, 1964, 1370, 732, 1358, 3676, 2724, 1087, 5520, 1984,
                    4821, 2777, 5538, 3938, 2708, 1772, 3518, 4897, 2184, 1569,
                    3275
                  ],
                  "comparisonValues": [58194]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
