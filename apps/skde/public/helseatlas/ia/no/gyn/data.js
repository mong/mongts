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
      "comparisonFeatures": [{ "id": "1", "name": "Norge" }],
      "filters": [{ "id": "filter4", "name": "Fylke" }],
      "themes": [
        {
          "id": "t0",
          "name": "Diagnostikk og utredninger",
          "indicators": [
            {
              "id": "i0",
              "name": "Postmenopausale blødninger",
              "href": "/helseatlas/files/gyn_postmenblod.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                98.26, 114.82, 87.85, 109.69, 92.75, 77.5, 84.24, 73.49, 94.73,
                108.77, 101.89, 99.94, 93.7, 92.69, 84.51, 92.06, 90.23, 107.44,
                107.48, 107.58, 107.77
              ],
              "comparisonValues": [96.8],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Antall" },
                { "name": "column_innbyggere", "value": "Innbyggere" },
                {
                  "name": "metatext",
                  "value": "Blødning som kommer mer enn ett år etter siste spontane menstruasjonsblødning kalles postmenopausal blødning og skal utredes, da kreft eller forstadier til kreft kan være årsaken.<br><br>Rate: Antall polikliniske kontakter pr. 10 000 kvinner, 50 år eller eldre. Aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste rate/laveste rate) = 1,6<br><br>Kilde: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    137, 412, 239, 174, 245, 431, 420, 155, 712, 350, 575, 578,
                    818, 377, 119, 225, 764, 984, 500, 381, 588
                  ],
                  "comparisonValues": [9186]
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
              "name": "Diagnostikk av endometriet",
              "href": "/helseatlas/files/gyn_diagendo.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                120.24, 115.06, 151.02, 145.46, 87.03, 89.66, 75.3, 77.26,
                72.63, 80.34, 111.73, 95.2, 80.66, 100.37, 81.8, 90.57, 130.17,
                113.41, 111.98, 117.71, 98.16
              ],
              "comparisonValues": [99.63],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Antall" },
                { "name": "column_innbyggere", "value": "Innbyggere" },
                {
                  "name": "metatext",
                  "value": "De fleste kvinner som får diagnosen endometriekreft (kreft i livmorslimhinnen) har i forkant hatt vaginale blødningersforstyrrelser. Ved mistanke om kreft tas ofte en vevsprøve fra livmorslimhinnen.<br><br>Rate: Antall kontakter med endometriebiopsi (polikliniske kontakter og kontakter hos fastlege/legevakt) og inngrep med utskrapning. pr. 10 000 kvinner, aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste rate/laveste rate) = 2,1 <br><br>Kilde: NPR/KUHR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    365, 895, 876, 471, 486, 1143, 792, 344, 1273, 568, 1555,
                    1166, 1642, 1052, 397, 516, 2191, 2264, 1096, 863, 1182
                  ],
                  "comparisonValues": [21136]
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
              "name": "Andel utskrapning",
              "href": "/helseatlas/files/gyn_diagendo.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                37.79, 18.21, 12.28, 23.09, 19.4, 3.93, 24.2, 27.35, 17.87,
                18.53, 23.74, 12.97, 13.78, 8.55, 11.78, 9.66, 19.57, 16.45,
                16.88, 23.61, 16.97
              ],
              "comparisonValues": [16.93],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "Antall utskrapning" },
                {
                  "name": "column_innbyggere",
                  "value": "Antall diagnostikk av endometr"
                },
                {
                  "name": "metatext",
                  "value": "Ved mistanke om kreft i livmorslimhinnen tas en vevsprøve fra livmorslimhinnen, som regel en mindre vevsprøve som kan tas uten bruk av anestesi (endometriebiopsi). Hvis det fortsatt er usikkerhet eller behov for mer informasjon om krefttype mm., tas en større vevsprøve ved at det gjøres en utskrapning (abrasio) av livmorslimhinnen. Et slik inngrep krever anestesi, oftest narkose. <br><br>Andel: Kontakter med utskrapning av livmorslimhinnen som andel av kontakter i spesialisthelsetjenesten med endometriebiopsi eller utskrapning. Aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste andel/laveste andel)= 9,7 <br><br>Kilde: NPR/SSB"
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
                    342, 881, 850, 446, 409, 1117, 708, 280, 1174, 556, 1507,
                    1139, 1552, 1018, 380, 509, 2019, 2109, 1073, 772, 1167
                  ],
                  "comparisonValues": [20009]
                }
              ]
            },
            {
              "id": "i3",
              "name": "Kolposkopi og/eller vevsprøve av livmorhalsen",
              "href": "/helseatlas/files/gyn_kolposkopi.pdf",
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
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Antall" },
                { "name": "column_innbyggere", "value": "Innbyggere" },
                {
                  "name": "metatext",
                  "value": "Ved mistanke om kreft eller forstadier til kreft, vanligvis basert på celleprøve og/eller HPV-test, er det grunn til å undersøke livmorhalsen med kolposkop. Et kolposkop er et slags mikroskop som gir forstørrelse og godt lys og bidrar til å identifisere celleforandringer på livmorhalsen som er aktuelle for vevsprøve. Kolposkopi er derfor viktig også ved kontroll av pasienter som tidligere er behandlet for celleforandringer.<br><br>Rate: Antall polikliniske kontakter med kolposkopi og/eller vevsprøve av livmorhalsen pr. 10 000 kvinner, aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste rate/laveste rate) = 17,3 <br><br>Kilde: NPR/SSB"
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
              "name": "Vevsprøve av livmorhalsen",
              "href": "/helseatlas/files/gyn_kolposkopi.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                136.11, 161.35, 323.22, 151.6, 87.57, 93.16, 44.98, 94.29,
                84.27, 76.83, 91.5, 73.08, 56.53, 65.65, 79.07, 67.43, 63.28,
                48.78, 84.8, 61.29, 57.72
              ],
              "comparisonValues": [82.49],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Antall" },
                { "name": "column_innbyggere", "value": "Innbyggere" },
                {
                  "name": "metatext",
                  "value": "Ved mistanke om kreft eller forstadier til kreft, vanligvis basert på celleprøve og/eller HPV-test, tas vevsprøver av livmorhalsen.<br><br>Rate: Antall polikliniske kontakter med vevsprøve av livmorhalsen. pr. 10 000 kvinner, aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste rate/laveste rate) = 7,2<br><br>Kilde: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    403, 1231, 1793, 454, 456, 1212, 454, 394, 1545, 539, 1335,
                    846, 1155, 768, 645, 426, 992, 947, 789, 421, 692
                  ],
                  "comparisonValues": [17497]
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
          "name": "Reproduktiv helse",
          "indicators": [
            {
              "id": "i5",
              "name": "Sterilisering",
              "href": "/helseatlas/files/gyn_sterilisering.pdf",
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
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Antall" },
                { "name": "column_innbyggere", "value": "Innbyggere" },
                {
                  "name": "metatext",
                  "value": "Sterilisering er en svært sikker prevensjonsmetode, og utføres ved at egglederne kuttes over og lukkes. Dermed hindres sædceller fra å komme i kontakt med egg fra eggstokkene, slik at befruktning ikke kan finne sted. Sterilisering gjøres oftest ved kikkhullsteknikk (laparoskopi) i narkose, men også ved planlagte keisersnitt.<br><br>Rate: Antall inngrep for sterilisering pr. 10 000 kvinner i alderen 25–55 år, aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste rate/laveste rate) = 5,9 <br><br>Kilde: NPR/SSB"
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
              "name": "Kirurgisk behandling ved spontanabort",
              "href": "/helseatlas/files/gyn_abort.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                9.07, 5.85, 6.9, 11.28, 10.96, 5.05, 8.14, 16.07, 9.03, 5.4,
                3.13, 6.97, 5.28, 5.82, 7.03, 4.61, 4.58, 6.2, 6.81, 7.87, 5.71
              ],
              "comparisonValues": [6.43],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Antall" },
                { "name": "column_innbyggere", "value": "Innbyggere" },
                {
                  "name": "metatext",
                  "value": "Ved en spontanabort der livmoren ikke tømmes helt for svangerskapsprodukter, anbefales avventende behandling i en-to uker, forutsatt at kvinnen ikke har sterke smerter eller blødninger. Dersom livmoren ikke tømmer seg i denne perioden vil medikamentell behandling forsøkes. I noen tilfeller vil det ligge igjen svangerskapsrester i livmoren og kirurgisk fjerning kan bli nødvendig. Ved tegn til infeksjon og rester anbefales kirurgisk behandling.<br><br>Rate: Antall inngrep i forbindelse med spontanabort pr. 10 000 kvinner i alderen 16–55 år, aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste rate/laveste rate) = 5,1 <br><br>Kilde: NPR/SSB"
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
              "name": "Andel kirurgisk behandling ved selvbestemt abort",
              "href": "/helseatlas/files/gyn_abort.pdf",
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
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                {
                  "name": "column_antall",
                  "value": "Antall kirurgisk behandling"
                },
                {
                  "name": "column_innbyggere",
                  "value": "Antall selvbestemt abort"
                },
                {
                  "name": "metatext",
                  "value": "Medikamentell abort ble introdusert i 1998, økte raskt i omfang og ble den foretrukne metode rundt 2010. Kirurgisk abort utføres hvis medikamentell behandling ikke fungerer, eller hvis kvinnen selv ønsker det. <br><br>Andel: Selvbestemte aborter utført med kirurgisk metode som andel av alle selvbestemte aborter for kvinner i alderen 16–55 år. Aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste andel/laveste andel) = 16.7 <br><br>Kilde: Abortreg./SSB"
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
              "name": "Prøverørsbehandling",
              "href": "/helseatlas/files/gyn_proveror.pdf",
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
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Antall" },
                { "name": "column_innbyggere", "value": "Innbyggere" },
                {
                  "name": "metatext",
                  "value": "Dersom et par aktivt har forsøkt å bli gravide i ett år uten å lykkes defineres de som ufrivillig barnløse. Ufrivillig barneløse kan få hjelp til å forsøke å bli gravide. IVF-behandling, (in vitro-fertilisering), også kalt prøverørsbehandling, er den mest benyttede metoden for assistert befruktning. Hvert par får tre behandlingsforsøk ved offentlige sykehus. <br><br>Rate: Antall kvinner som har fått prøverørsbehandling pr. 10 000 kvinner i alderen 16–55 år , aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste rate/laveste rate) = 2,5 <br><br>Kilde: NPR/SSB"
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
          "name": "Kirurgisk behandling av gynekologiske tilstander",
          "indicators": [
            {
              "id": "i9",
              "name": "Endometriose",
              "href": "/helseatlas/files/gyn_endometriose.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                7.83, 5.49, 6.46, 13.62, 3.54, 5.11, 6.06, 4.07, 6.84, 5.35,
                7.98, 10.35, 8.73, 11.91, 14.61, 11.63, 8.27, 11.42, 11.71,
                11.52, 6.74
              ],
              "comparisonValues": [8.63],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Antall" },
                { "name": "column_innbyggere", "value": "Innbyggere" },
                {
                  "name": "metatext",
                  "value": "Endometriose er en tilstand der livmorslimhinne (endometrium) er lokalisert andre steder enn i livmorhulen. Dette kan gi sterke menstruasjonssmerter og en kronisk betennelsestilstand i bukhulen med fare for sammenvoksninger av organer og infertilitet. <br><br>Rate: Antall inngrep pr. 10 000 kvinner i alderen 16–55 år, aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste rate/laveste rate) = 2,8 <br><br>Kilde: NPR/SSB"
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
                  "comparisonValues": [1186]
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
              "name": "Muskelknuter i livmor (myomer)",
              "href": "/helseatlas/files/gyn_myomer.pdf",
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
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Antall" },
                { "name": "column_innbyggere", "value": "Innbyggere" },
                {
                  "name": "metatext",
                  "value": "Godartede svulster som utgår fra muskulaturen i livmor kalles gjerne myomer eller muskelknuter. Myomer er hyppig forekommende og finnes hos rundt 70 % av fertile kvinner, men bare 15–30 % har symptomer i form av langvarige og/eller kraftige menstruasjonsblødninger og trykksymptomer mot blære og tarm. <br><br>Rate: Antall inngrep pr. 10 000 kvinner, aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste rate/laveste rate) = 2,0 <br><br>Kilde: NPR/SSB"
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
              "name": "Kraftige og/eller hyppige blødninger",
              "href": "/helseatlas/files/gyn_kraftigblodning.pdf",
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
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Antall" },
                { "name": "column_innbyggere", "value": "Innbyggere" },
                {
                  "name": "metatext",
                  "value": "Blødningsforstyrrelse finnes hos ca. 15–20 % av kvinner i fertil alder. Blødningene kan være regelmessige med økt mengde blødning pr. menstruasjon, og/eller de kan være uregelmessige og ikke følge noen klar syklus. <br><br>Rate: Antall inngrep pr. 10 000 kvinner i alderen 16–55 år, aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste rate/laveste rate) = 4,4 <br><br>Kilde: NPR/SSB"
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
              "name": "Hysterektomi",
              "href": "/helseatlas/files/gyn_hysterektomi.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                23.27, 17.14, 19.37, 26.38, 26.21, 13.9, 21.85, 13.5, 11.66,
                17.29, 11.87, 16.43, 13.99, 11.69, 10.97, 10.9, 21.88, 21.4,
                13.75, 22.06, 16.87
              ],
              "comparisonValues": [16.55],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Antall" },
                { "name": "column_innbyggere", "value": "Innbyggere" },
                {
                  "name": "metatext",
                  "value": "Kirurgisk fjerning av livmoren (hysterektomi) gjøres av flere grunner. Muskelknuter i livmoren, blødningsforstyrrelser og endometriose er mulige årsaker til at livmoren fjernes hos pasienter som ikke har kreft. <br><br>Rate: Antall inngrep pr. 10 000 kvinner, aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste rate/laveste rate) = 2,4 <br><br>Kilde: NPR/SSB"
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
              "name": "Hysterektomi, andel åpne inngrep",
              "href": "/helseatlas/files/gyn_hysterektomi.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                36.95, 40.22, 21.4, 26.17, 34.96, 39.23, 33.01, 40.67, 13.92,
                18.02, 25.44, 34.56, 34.46, 28.38, 22.71, 24.28, 16.75, 16.86,
                13.88, 19.48, 29.53
              ],
              "comparisonValues": [26.02],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "Antall åpne inngrep" },
                { "name": "column_innbyggere", "value": "Antall hysterektomi" },
                {
                  "name": "metatext",
                  "value": "Det er ulike kirurgiske teknikker for fjerning av livmor,- åpen kirurgi, kikkhullsoperasjon (laparoskopisk hysterektomi) eller fjernelse via skjeden uten kikkhullsskirurgi (vaginal hysterektomi). I nasjonal veileder for gynekologi anbefales vaginal eller laparoskopisk teknikk.<br><br>Andel: Andel hysterektomier gjennomført som åpne inngrep, aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste andel/laveste andel) = 2,9 <br><br>Kilde: NPR/SSB"
                }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    26, 53, 23, 22, 50, 69, 75, 24, 29, 22, 41, 69, 101, 35, 14,
                    15, 62, 72, 19, 31, 60
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
              "name": "Transcervikale inngrep",
              "href": "/helseatlas/files/gyn_hysterektomi.pdf",
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
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Antall" },
                { "name": "column_innbyggere", "value": "Innbyggere" },
                {
                  "name": "metatext",
                  "value": "Noen tilstander som for eksempel blødningsforstyrrelser, myomer (muskelknuter i livmoren) og polypper (utvekster på slimhinnen i livmoren/livmorhalsen), kan behandles kirurgisk ved å føre et instrument via skjeden og gjennom kanalen i livmorhalsen (cervix), til livmorhulen. Denne typen inngrep kalles ofte transcervikale inngrep. <br><br>Rate: Antall inngrep pr. 10 000 kvinner, aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste rate/laveste rate) = 2,2 <br><br>Kilde: NPR/SSB"
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
          "name": "Kirurgisk behandling av fremfall og inkontinens",
          "indicators": [
            {
              "id": "i15",
              "name": "Skjede- og livmorfremfall",
              "href": "/helseatlas/files/gyn_fremfall.pdf",
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
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Antall" },
                { "name": "column_innbyggere", "value": "Innbyggere" },
                {
                  "name": "metatext",
                  "value": "Bekkenorganene støttes opp av bindevev og muskulatur. Ved svekkelse av dette støtteapparatet kan det skje et såkalt fremfall av aktuelle organ via skjeden. Livmor med livmortappen kan synke ned i skjeden, urinblæren kan buke bakover og eventuelt ut av skjeden (cystocele) eller endetarmen kan buke fremover og eventuelt ut av skjeden (rectocele). Vanlige plager er at kvinnen merker en kul i skjedeåpningen, og kjenner på tyngdefølelse, har problemer ved vannlatning eller avføring.<br><br>Rate: Antall inngrep pr. 10 000 kvinner, aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste rate/laveste rate) = 3,6<br><br>Kilde: NPR/SSB"
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
              "name": "Urininkontinens",
              "href": "/helseatlas/files/gyn_urininkontinens.pdf",
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
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Rate" },
                { "name": "column_antall", "value": "Antall" },
                { "name": "column_innbyggere", "value": "Innbyggere" },
                {
                  "name": "metatext",
                  "value": "Norske tall viser at ca 25 % av den kvinnelige befolkningen over 20 år har noen grad av urininkontinens, og vel en tredjedel av disse er betydelig plaget. Urininkontinens kan for mange medføre reduksjon i livskvalitet, endre sosiale vaner og innskrenke fysisk utfoldelse. <br><br>Rate: Antall inngrep pr. 10 000 kvinner, aldersjustert, gjennomsnitt pr. år for 2015–2017.<br><br>Forholdstall (høyeste rate/laveste rate) = 8,6 <br><br>Kilde: NPR/SSB"
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
