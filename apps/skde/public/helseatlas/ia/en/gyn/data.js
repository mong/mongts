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
          "name": "Diagnosis and assessment",
          "indicators": [
            {
              "id": "i0",
              "name": "Postmenopausal bleeding",
              "href": "/helseatlas/files/gyneng_postmenbleeding.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                98.26, 114.92, 87.85, 109.89, 92.75, 77.62, 84.24, 73.64, 94.95,
                108.77, 101.89, 99.99, 93.74, 92.69, 84.51, 92.06, 90.23,
                107.48, 107.48, 107.58, 107.89
              ],
              "comparisonValues": [96.86],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Inhabitants" },
                {
                  "name": "metatext",
                  "value": "Bleeding that occurs more than one year after the last spontaneous menstruation is called postmenopausal bleeding and must be investigated, since it could be caused by cancer or cervical neoplasia.<br><br>Rate: Number of outpatient contacts for postmenopausal bleeding per 10,000 women aged 50 years or older. Adjusted for age. Average per year 2015 - 2017.<br><br>Ratio (highest/lowest rate) = 1,6<br><br>Source: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    137, 413, 239, 174, 245, 431, 420, 156, 714, 350, 575, 578,
                    819, 377, 119, 225, 764, 984, 500, 381, 588
                  ],
                  "comparisonValues": [9191]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    13818, 36027, 27320, 15997, 26846, 55561, 50391, 21462,
                    75263, 32368, 55954, 58034, 86884, 40513, 13700, 24517,
                    85637, 91536, 46631, 35845, 54515
                  ],
                  "comparisonValues": [948819]
                }
              ]
            },
            {
              "id": "i1",
              "name": "Endometrial diagnosis",
              "href": "/helseatlas/files/gyneng_endodiag.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                120.24, 115.06, 151.02, 145.46, 87.08, 89.81, 75.36, 77.26,
                72.63, 80.34, 111.73, 95.2, 80.66, 100.37, 81.8, 90.57, 130.17,
                113.41, 111.98, 117.71, 98.16
              ],
              "comparisonValues": [99.64],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Inhabitants" },
                {
                  "name": "metatext",
                  "value": "Most women who develop endometrial cancer (cancer of the lining of the womb) have experienced abnormal vaginal bleeding. If cancer is suspected, a biopsy is taken of the lining of the womb (endometrial biopsy).<br><br>Rate: Number of endometrial biopsies or curettages (including outpatient contacts with the specialist health service and contacts with RGPs or the emergency primary healthcare services) per 10,000 women. Adjusted for age. Average per year 2015 - 2017.<br><br>Ratio (highest/lowest rate) = 2,1 <br><br>Source: NPR/KUHR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    365, 895, 876, 471, 486, 1145, 793, 344, 1273, 568, 1555,
                    1166, 1642, 1052, 397, 516, 2191, 2264, 1096, 863, 1182
                  ],
                  "comparisonValues": [21139]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    30108, 77413, 56144, 31821, 54518, 128837, 104957, 43540,
                    178531, 70749, 140197, 119927, 201911, 109435, 62639, 59811,
                    166569, 196644, 95564, 71665, 120307
                  ],
                  "comparisonValues": [2121287]
                }
              ]
            },
            {
              "id": "i2",
              "name": "Proportion curettages",
              "href": "/helseatlas/files/gyneng_endodiag.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                37.79, 18.21, 12.28, 23.09, 19.38, 3.92, 24.18, 27.35, 17.87,
                18.53, 23.74, 12.97, 13.78, 8.55, 11.78, 9.66, 19.57, 16.45,
                16.88, 23.61, 16.97
              ],
              "comparisonValues": [16.93],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Percentage" },
                { "name": "column_antall", "value": "Number curettages" },
                {
                  "name": "column_innbyggere",
                  "value": "Number endometrial biopsy and curettages"
                },
                {
                  "name": "metatext",
                  "value": "Should endometrial cancer be suspected, a biopsy is taken of the lining of the womb (endometrial biopsy), usually a small biopsy that can be taken without the need for anaesthesia. If the result is inconclusive or if more information is needed, for example about which type of cancer a patient has, a bigger biopsy is taken by uterine curettage. This procedure requires anaesthesia, usually a general anaesthesia. <br><br>Percentage: Contacts with curettage as a percentage of contacts with the specialist health service with endometrial biopsy or curettage. Adjusted for age. Average per year 2015 - 2017.<br><br>Ratio (highest/lowest proportion) = 9,7 <br><br>Source: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    129, 162, 102, 105, 81, 44, 174, 78, 208, 104, 348, 152,
                    208, 81, 37, 49, 411, 348, 184, 184, 199
                  ],
                  "comparisonValues": [3388]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    342, 881, 850, 446, 409, 1119, 709, 280, 1174, 556, 1507,
                    1139, 1552, 1018, 380, 509, 2019, 2109, 1073, 772, 1167
                  ],
                  "comparisonValues": [20012]
                }
              ]
            },
            {
              "id": "i3",
              "name": "Colposcopy and/or cervical biopsy",
              "href": "/helseatlas/files/gyneng_colposcopy.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                237.84, 214.2, 1299.3, 236.5, 112.75, 156.83, 75.27, 127.93,
                466.09, 472.85, 406.49, 500.86, 427.57, 629.77, 639.69, 667.79,
                417.36, 565.07, 1216.07, 947.65, 241.67
              ],
              "comparisonValues": [475.26],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Inhabitants" },
                {
                  "name": "metatext",
                  "value": "If cancer or cervical neoplasia is suspected, usually based on a Pap smear or a HPV test, there is reason to examine the cervix by means of colposcopy. A colposcope is a sort of microscope that magnifies and provides good lighting, and it helps to identify areas of abnormal cervical cells from which a biopsy can be taken. It is therefore important to examine patients who had previously received treatments for abnormal cells.<br><br>Rate: Number of outpatient contacts with colposcopy and/or cervical biopsy per 10,000 women. Adjusted for age. Average per year 2015-2017. <br><br>Ratio (highest/lowest rate) = 17,3 <br><br>Source: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    710, 1633, 7205, 723, 592, 2050, 757, 535, 8307, 3333, 5867,
                    5921, 8722, 6957, 4296, 3978, 6934, 11178, 11562, 6656, 2899
                  ],
                  "comparisonValues": [100815]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    30108, 77413, 56144, 31821, 54518, 128837, 104957, 43540,
                    178531, 70749, 140197, 119927, 201911, 109435, 62639, 59811,
                    166569, 196644, 95564, 71665, 120307
                  ],
                  "comparisonValues": [2121287]
                }
              ]
            },
            {
              "id": "i4",
              "name": "Cervical biopsy",
              "href": "/helseatlas/files/gyneng_colposcopy.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                136.11, 161.35, 323.22, 151.6, 87.57, 93.19, 45.01, 94.29,
                84.27, 76.83, 91.5, 73.08, 56.53, 65.67, 79.07, 67.43, 63.28,
                48.78, 84.8, 61.29, 57.72
              ],
              "comparisonValues": [82.49],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Inhabitants" },
                {
                  "name": "metatext",
                  "value": "If cancer or cervical neoplasia is suspected, usually based on a Pap smear or a HPV test, there is reason to perform a cervix biopsy.<br><br>Rate: Number of outpatient contacts with cervix biopsy per 10,000 women. Adjusted for age. Average per year 2015 - 2017.<br><br>Ratio (highest/lowest rate) = 7,2<br><br>Source: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    403, 1231, 1793, 454, 456, 1212, 455, 394, 1545, 539, 1335,
                    846, 1155, 768, 645, 426, 992, 947, 789, 421, 692
                  ],
                  "comparisonValues": [17498]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    30108, 77413, 56144, 31821, 54518, 128837, 104957, 43540,
                    178531, 70749, 140197, 119927, 201911, 109435, 62639, 59811,
                    166569, 196644, 95564, 71665, 120307
                  ],
                  "comparisonValues": [2121287]
                }
              ]
            }
          ]
        },
        {
          "id": "t1",
          "name": "Reproductive health",
          "indicators": [
            {
              "id": "i5",
              "name": "Sterilisation",
              "href": "/helseatlas/files/gyneng_sterilisation.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                13.56, 11.88, 15.27, 25.0, 17.27, 8.86, 11.91, 6.32, 7.31, 10.6,
                7.95, 12.84, 8.79, 5.57, 4.23, 2.79, 10.55, 9.16, 10.63, 12.85,
                15.22
              ],
              "comparisonValues": [9.65],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Inhabitants" },
                {
                  "name": "metatext",
                  "value": "Sterilisation is a highly effective contraception method. Female sterilisation is carried out by cutting and blocking the fallopian tubes. This prevents sperm from coming into contact with the eggs released from the ovaries, making fertilisation impossible. The procedure is usually carried out under general anaesthesia using a keyhole technique (laparoscopy). It is also possible to be sterilised in connection with a planned caesarean section.<br><br>Rate: Number of sterilisation procedures per 10,000 women between 25-55 years old. Adjusted for age. Average per year 2015 - 2017.<br><br>Ratio (highest/lowest rate) = 5,9 <br><br>Source: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    20, 44, 39, 35, 42, 59, 58, 12, 68, 37, 63, 71, 95, 36, 15,
                    9, 74, 90, 47, 41, 89
                  ],
                  "comparisonValues": [1045]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    14951, 37938, 26557, 14705, 25144, 65740, 49654, 19856,
                    92671, 34555, 76854, 58482, 109012, 64500, 43585, 32820,
                    76211, 100152, 46293, 33561, 59607
                  ],
                  "comparisonValues": [1082848]
                }
              ]
            },
            {
              "id": "i6",
              "name": "Surgical treatment in connection with spontaneous abortions",
              "href": "/helseatlas/files/gyneng_abortions.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                9.07, 5.85, 6.9, 11.28, 10.96, 5.05, 8.14, 16.07, 9.03, 5.4,
                3.13, 6.97, 5.28, 5.82, 7.03, 4.61, 4.58, 6.2, 6.81, 7.87, 5.71
              ],
              "comparisonValues": [6.43],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Inhabitants" },
                {
                  "name": "metatext",
                  "value": "A spontaneous abortion is the involuntary loss of a pregnancy before week 22. An incomplete abortion could involve a degree of vaginal bleeding, but some non-viable pregnancy tissue remains in the uterus. If the uterus has not emptied within two week, pharmacological treatment will be attempted to make the uterus contract. In some cases, pregnancy tissue remains in the uterus, and surgical removal may be necessary. Surgical treatment is recommended for signs of infection and retained pregnancy tissue.<br><br>Rate: Number of procedures in connection with spontaneous abortions per 10,000 women aged 16-55 years. Adjusted for age. Average per year 2015 - 2017.<br><br>Ratio (highest/lowest rate) = 5,1 <br><br>Source: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    17, 28, 23, 21, 35, 43, 52, 41, 110, 24, 31, 50, 71, 47, 37,
                    19, 43, 76, 38, 32, 44
                  ],
                  "comparisonValues": [884]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    19353, 48925, 34418, 19116, 33027, 85176, 64205, 26244,
                    119288, 44835, 97665, 73882, 135661, 78585, 52573, 40362,
                    97639, 125306, 58584, 42927, 77341
                  ],
                  "comparisonValues": [1375110]
                }
              ]
            },
            {
              "id": "i7",
              "name": "Percentage of abortions on request performed using the surgical method",
              "href": "/helseatlas/files/gyneng_abortions.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                15.49, 4.44, 10.22, 14.32, 12.48, 2.92, 8.65, 13.82, 3.92, 5.05,
                1.87, 31.39, 18.18, 20.22, 22.48, 22.35, 9.77, 5.63, 17.81,
                13.89, 8.16
              ],
              "comparisonValues": [12.55],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Percentage" },
                {
                  "name": "column_antall",
                  "value": "Number surgical abortions"
                },
                { "name": "column_innbyggere", "value": "Number abortions" },
                {
                  "name": "metatext",
                  "value": "Medical abortion was introduced in 1998, and its use increased rapidly. Around 2010, it had become the preferred abortion method. A surgical procedure is performed if repeated medical procedures are unsuccessful or if the woman requests it. <br><br>Percentage: Abortions on request performed using the surgical method as a proportion of all abortions on request by women between 16-55 years old. Adjusted for age. Average per year 2015-2017.<br><br>Ratio (highest/lowest proportion) = 16.7 <br><br>Source: Registry of Pregnancy Termination / SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    35, 23, 36, 28, 34, 21, 39, 27, 39, 15, 14, 212, 252, 172,
                    191, 105, 84, 58, 93, 52, 44
                  ],
                  "comparisonValues": [1575]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    228, 528, 353, 199, 278, 714, 456, 194, 1002, 304, 730, 677,
                    1382, 857, 857, 471, 855, 1022, 518, 378, 546
                  ],
                  "comparisonValues": [12550]
                }
              ]
            },
            {
              "id": "i8",
              "name": "In vitro fertilisation",
              "href": "/helseatlas/files/gyneng_ivf.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                20.41, 21.44, 17.68, 21.91, 23.33, 29.96, 28.0, 20.45, 26.16,
                29.94, 32.66, 28.03, 25.54, 33.93, 43.71, 32.75, 22.52, 26.56,
                28.76, 30.16, 27.91
              ],
              "comparisonValues": [27.58],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Inhabitants" },
                {
                  "name": "metatext",
                  "value": "If a couple has actively tried to become pregnant for one year without succeeding, they are defined as infertile and are eligible for help to try to become pregnant. In vitro fertilisation (IVF) is the most common method. Each couple is given three attempts at public hospitals.<br><br>Rate: Number of women who have received IVF treatment per 10,000 women aged 16-55 years, Adjusted for age. Average per year 2015 - 2017.<br><br>Ratio (highest/lowest rate) = 2,5 <br><br>Source: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    38, 103, 60, 39, 75, 257, 178, 53, 315, 134, 327, 200, 346,
                    276, 221, 133, 208, 330, 162, 123, 214
                  ],
                  "comparisonValues": [3793]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    19353, 48925, 34418, 19116, 33027, 85176, 64205, 26244,
                    119288, 44835, 97665, 73882, 135661, 78585, 52573, 40362,
                    97639, 125306, 58584, 42927, 77341
                  ],
                  "comparisonValues": [1375110]
                }
              ]
            }
          ]
        },
        {
          "id": "t2",
          "name": "Surgical treatment of gynaecological conditions",
          "indicators": [
            {
              "id": "i9",
              "name": "Endometriosis",
              "href": "/helseatlas/files/gyneng_endometriosis.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                7.83, 5.49, 6.46, 13.62, 3.54, 5.11, 6.06, 4.07, 6.86, 5.35,
                8.02, 10.35, 8.73, 11.91, 14.61, 11.63, 8.27, 11.42, 11.71,
                11.52, 6.74
              ],
              "comparisonValues": [8.63],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Inhabitants" },
                {
                  "name": "metatext",
                  "value": "Endometriosis is a condition where tissue similar to the lining of the womb (endometrium) grows in places other than the uterine cavity and causes an inflammatory condition. The acute and the chronic inflammation both cause abdominal pain. The chronic inflammation and adhesions can also cause infertility.<br><br>Rate: Number of procedures per 10,000 women aged 16-55 years. Adjusted for age. Average per year 2015 - 2017.<br><br>Ratio (highest/lowest rate) = 2,8 <br><br>Source: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    15, 27, 22, 26, 12, 43, 39, 11, 81, 24, 78, 75, 118, 97, 79,
                    47, 81, 142, 68, 49, 52
                  ],
                  "comparisonValues": [1187]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    19353, 48925, 34418, 19116, 33027, 85176, 64205, 26244,
                    119288, 44835, 97665, 73882, 135661, 78585, 52573, 40362,
                    97639, 125306, 58584, 42927, 77341
                  ],
                  "comparisonValues": [1375110]
                }
              ]
            },
            {
              "id": "i10",
              "name": "Uterine myomas",
              "href": "/helseatlas/files/gyneng_myomas.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                11.14, 11.21, 9.85, 11.27, 9.13, 8.77, 9.26, 7.15, 6.13, 9.7,
                10.51, 9.76, 9.15, 10.61, 11.49, 10.24, 11.92, 12.06, 8.67,
                11.17, 10.05
              ],
              "comparisonValues": [9.87],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Inhabitants" },
                {
                  "name": "metatext",
                  "value": "Benign tumours that develop from the uterine muscle are often called myomas or fibroids. Uterine myomas are common, and are found in 70% of women of childbearing age. It is estimated that only 15-30% experience symptoms. Uterine myomas can cause painful, prolonged and/or excessive menstruation and symptoms of pressure on the bladder and bowel. <br><br>Rate: Number of procedures per 10,000 women. Adjusted for age. Average per year 2015 - 2017.<br><br>Ratio (highest/lowest rate) = 2,0 <br><br>Source: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    34, 86, 55, 35, 49, 112, 97, 31, 109, 69, 147, 118, 191,
                    117, 63, 58, 199, 241, 83, 79, 120
                  ],
                  "comparisonValues": [2093]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    30108, 77413, 56144, 31821, 54518, 128837, 104957, 43540,
                    178531, 70749, 140197, 119927, 201911, 109435, 62639, 59811,
                    166569, 196644, 95564, 71665, 120307
                  ],
                  "comparisonValues": [2121287]
                }
              ]
            },
            {
              "id": "i11",
              "name": "Excessive and/or frequent menstruation",
              "href": "/helseatlas/files/gyneng_menstruation.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                26.12, 21.85, 22.69, 27.34, 32.84, 18.17, 25.24, 15.26, 18.38,
                26.85, 14.72, 20.54, 15.79, 8.76, 7.49, 7.41, 28.05, 19.52,
                21.74, 32.89, 28.25
              ],
              "comparisonValues": [20.11],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Inhabitants" },
                {
                  "name": "metatext",
                  "value": "Abnormal uterine bleeding occurs in approximately 15-20% of women of childbearing age. The bleeding can be regular with heavier flow and/or irregular and not follow a clear cycle. <br><br>Rate: Number of procedures per 10,000 women aged 16-55 years. Adjusted for age. Average per year 2015 - 2017.<br><br>Ratio (highest/lowest rate) = 4,4 <br><br>Source: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    52, 108, 79, 54, 110, 151, 164, 41, 211, 120, 140, 158, 221,
                    65, 26, 27, 289, 253, 132, 146, 219
                  ],
                  "comparisonValues": [2765]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    19353, 48925, 34418, 19116, 33027, 85176, 64205, 26244,
                    119288, 44835, 97665, 73882, 135661, 78585, 52573, 40362,
                    97639, 125306, 58584, 42927, 77341
                  ],
                  "comparisonValues": [1375110]
                }
              ]
            },
            {
              "id": "i12",
              "name": "Hysterectomy",
              "href": "/helseatlas/files/gyneng_hysterectomy.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                23.27, 17.14, 19.37, 26.47, 26.21, 13.9, 21.85, 13.5, 11.66,
                17.29, 11.87, 16.43, 13.99, 11.69, 10.97, 10.9, 21.88, 21.4,
                13.75, 22.06, 16.84
              ],
              "comparisonValues": [16.55],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Inhabitants" },
                {
                  "name": "metatext",
                  "value": "The surgical removal of the uterus is known as hysterectomy. If the uterus is removed due to conditions other than cancer, such as myomas, abnormal uterine bleeding or endometriosis, the ovaries will usually be left in place and hormone production will function as normal. <br><br>Rate: Number of procedures per 10,000 women. Adjusted for age. Average per year 2015 - 2017.<br><br>Ratio (highest/lowest rate) = 2,4 <br><br>Source: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    71, 133, 109, 85, 143, 177, 229, 59, 206, 122, 163, 198,
                    290, 125, 54, 61, 367, 427, 131, 157, 202
                  ],
                  "comparisonValues": [3509]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    30108, 77413, 56144, 31821, 54518, 128837, 104957, 43540,
                    178531, 70749, 140197, 119927, 201911, 109435, 62639, 59811,
                    166569, 196644, 95564, 71665, 120307
                  ],
                  "comparisonValues": [2121287]
                }
              ]
            },
            {
              "id": "i13",
              "name": "Hysterectomy, proportion performed as open",
              "href": "/helseatlas/files/gyneng_hysterectomy.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                36.95, 40.22, 21.4, 26.42, 34.96, 39.23, 33.01, 40.67, 13.92,
                18.02, 25.44, 34.56, 34.46, 28.38, 22.71, 24.28, 16.75, 16.86,
                13.88, 19.48, 29.41
              ],
              "comparisonValues": [26.02],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Percentage" },
                { "name": "column_antall", "value": "Number open" },
                { "name": "column_innbyggere", "value": "Number hysterectomy" },
                {
                  "name": "metatext",
                  "value": "There are several different hysterectomy techniques: open surgery, keyhole surgery (laparoscopic hysterectomy) or removal via the vagina without keyhole surgery (vaginal hysterectomy). The national guidelines for gynaecology recommend using the vaginal or the laparoscopic technique. <br><br>Percentage: Proportion of hysterectomies performed as open procedures. Adjusted for age, Average per year 2015–2017.<br><br>Ratio (highest/lowest proportion) = 2,9 <br><br>Source: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    26, 53, 23, 23, 50, 69, 75, 24, 29, 22, 41, 69, 101, 35, 14,
                    15, 62, 72, 19, 31, 59
                  ],
                  "comparisonValues": [913]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    71, 133, 109, 85, 143, 177, 229, 59, 206, 122, 163, 198,
                    290, 125, 54, 61, 367, 427, 131, 157, 202
                  ],
                  "comparisonValues": [3509]
                }
              ]
            },
            {
              "id": "i14",
              "name": "Transcervical surgical treatments",
              "href": "/helseatlas/files/gyneng_hysterectomy.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                16.71, 17.75, 16.01, 14.4, 17.14, 25.73, 16.75, 12.57, 11.69,
                23.98, 17.08, 18.82, 13.9, 18.33, 17.56, 18.2, 19.86, 23.78,
                17.94, 21.52, 18.89
              ],
              "comparisonValues": [18.25],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Inhabitants" },
                {
                  "name": "metatext",
                  "value": "Some conditions, such as myomas (uterine fibroids) and polyps (growths in the inner lining of the uterus/cervix), can be surgically treated by inserting an instrument via the vagina and through the cervical canal into the uterine cavity. Such procedures are often referred to as transcervical procedures.<br><br>Rate: Number of procedures per 10,000 women. Adjusted for age. Average per year 2015 - 2017.<br><br>Ratio (highest/lowest rate) = 2,2 <br><br>Source: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    51, 137, 90, 45, 92, 326, 175, 54, 208, 168, 242, 230, 286,
                    199, 99, 105, 336, 475, 172, 153, 227
                  ],
                  "comparisonValues": [3871]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    30108, 77413, 56144, 31821, 54518, 128837, 104957, 43540,
                    178531, 70749, 140197, 119927, 201911, 109435, 62639, 59811,
                    166569, 196644, 95564, 71665, 120307
                  ],
                  "comparisonValues": [2121287]
                }
              ]
            }
          ]
        },
        {
          "id": "t3",
          "name": "Surgical treatment of prolapse and incontinence",
          "indicators": [
            {
              "id": "i15",
              "name": "Pelvic organ prolapse",
              "href": "/helseatlas/files/gyneng_prolapse.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                33.92, 26.26, 20.7, 24.7, 27.0, 13.17, 20.34, 19.01, 19.92,
                26.94, 22.73, 18.72, 14.36, 13.08, 9.36, 9.52, 23.74, 18.28,
                13.91, 22.05, 19.28
              ],
              "comparisonValues": [19.13],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Inhabitants" },
                {
                  "name": "metatext",
                  "value": "The pelvic organs are supported by muscles and connective tissue, and when this support system is weakened, the organs in question can prolapse or descend into the vagina. The uterus and the vaginal portion of the cervix may descend into the vagina, the bladder can bulge backwards into and possibly out of the vagina (cystocele), or the rectum can bulge forward into and possibly out of the vagina (rectocele). Common symptoms include a sensation of a lump in the vaginal opening and a feeling of heaviness, and problems passing urine or stools.<br><br>Rate: Number of procedures per 10,000 women. Adjusted for age. Average per year 2015 - 2017.<br><br>Ratio (highest/lowest rate) = 3,6<br><br>Source: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    102, 208, 122, 84, 157, 166, 226, 87, 346, 194, 301, 234,
                    281, 126, 34, 54, 428, 365, 141, 170, 234
                  ],
                  "comparisonValues": [4059]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    30108, 77413, 56144, 31821, 54518, 128837, 104957, 43540,
                    178531, 70749, 140197, 119927, 201911, 109435, 62639, 59811,
                    166569, 196644, 95564, 71665, 120307
                  ],
                  "comparisonValues": [2121287]
                }
              ]
            },
            {
              "id": "i16",
              "name": "Urinary incontinence",
              "href": "/helseatlas/files/gyneng_incontinence.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                32.34, 17.91, 13.04, 13.57, 26.49, 15.36, 10.2, 15.82, 9.8,
                13.63, 10.28, 11.6, 6.93, 8.41, 3.77, 7.01, 13.3, 12.34, 18.13,
                15.51, 12.02
              ],
              "comparisonValues": [12.33],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Hospital referral area" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Number" },
                { "name": "column_innbyggere", "value": "Inhabitants" },
                {
                  "name": "metatext",
                  "value": "Approximately 25% of women over 20 years of age in Norway experience some degree of urinary incontinence, and the condition causes significant problems for just over one third of these women. Urinary incontinence can reduce quality of life, affect their social life and limit physical activity. <br><br>Rate: Number of procedures per 10,000 women. Adjusted for age. Average per year 2015 - 2017.<br><br>Ratio (highest/lowest rate) = 8,6 <br><br>Source: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    99, 139, 74, 44, 145, 195, 106, 69, 172, 96, 143, 139, 143,
                    92, 18, 40, 223, 245, 177, 111, 144
                  ],
                  "comparisonValues": [2614]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    30108, 77413, 56144, 31821, 54518, 128837, 104957, 43540,
                    178531, 70749, 140197, 119927, 201911, 109435, 62639, 59811,
                    166569, 196644, 95564, 71665, 120307
                  ],
                  "comparisonValues": [2121287]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
