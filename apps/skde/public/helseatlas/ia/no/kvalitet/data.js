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
        { "id": "6", "name": "St. Olav" },
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
          "name": "Hjerte-kar",
          "indicators": [
            {
              "id": "i0",
              "name": "Hjerteinfarkt STEMI, reperfusjon",
              "href": "/helseatlas/files/kvalitet_hjerteinfarkt.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                14.63, 49.15, 16.13, 26.67, 39.18, 75.97, 31.73, 24.74, 76.21,
                54.08, 71.55, 67.84, 80.27, 79.47, 79.47, 79.47, 39.45, 74.92,
                78.35, 47.89, 71.58
              ],
              "comparisonValues": [61.75],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter innlagt med STEMI som fikk reperfusjon innen anbefalt tid. Ved STEMI bør den tette blodåren åpnes så raskt som mulig for å redusere risikoen for permanente skader på hjertemuskulaturen som kan føre til hjertesvikt og død.<br>NB! OUS = Oslo. Pga manglende informasjon om bydel i data fra registeret er OUS, Lovisenberg og Diakonhjemmet slått sammen til Oslo. <br><br>Målnivå: <70% lav, 70-85% moderat, <span>&#8805;</span>85% høy<br><br>Kilde: Norsk Hjerteinfarktregister / FHI"
                },
                { "name": "customBreaks", "value": "0;70;85;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    4,
                    38,
                    10,
                    12,
                    22,
                    92,
                    33,
                    8,
                    99,
                    35,
                    85,
                    96,
                    160,
                    130,
                    "0",
                    "0",
                    86,
                    149,
                    86,
                    42,
                    89
                  ],
                  "comparisonValues": [1273]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    27,
                    78,
                    62,
                    45,
                    57,
                    121,
                    104,
                    32,
                    130,
                    65,
                    118,
                    142,
                    199,
                    164,
                    "0",
                    "0",
                    218,
                    199,
                    109,
                    87,
                    124
                  ],
                  "comparisonValues": [2062]
                }
              ]
            },
            {
              "id": "i1",
              "name": "Hjerteinfarkt NSTEMI, utredning 72 t.",
              "href": "/helseatlas/files/kvalitet_hjerteinfarkt.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                60.81, 78.84, 62.54, 58.72, 55.11, 61.79, 45.74, 59.36, 65.5,
                55.84, 44.66, 61.41, 70.64, 61.19, 61.19, 61.19, 63.36, 64.87,
                65.32, 73.92, 79.92
              ],
              "comparisonValues": [62.19],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter med NSTEMI som ble invasivt utredet innen 72 timer etter sykehusinnleggelse. Pasienter med NSTEMI skal som hovedregel utredes invasivt med koronar angiografi (røntgenundersøkelse av koronararteriene). <br>NB! OUS = Oslo. Pga manglende informasjon om bydel i data fra registeret er OUS, Lovisenberg og Diakonhjemmet slått sammen til Oslo. <br><br>Målnivå: <50% lav, 50-80% moderat, <span>&#8805;</span>80% høy<br><br>Kilde: Norsk Hjerteinfarktregister / FHI"
                },
                { "name": "customBreaks", "value": "0;50;80;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    85,
                    195,
                    133,
                    67,
                    101,
                    224,
                    145,
                    87,
                    325,
                    131,
                    224,
                    247,
                    296,
                    315,
                    "0",
                    "0",
                    345,
                    300,
                    162,
                    160,
                    191
                  ],
                  "comparisonValues": [3732]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    140,
                    247,
                    213,
                    115,
                    183,
                    362,
                    317,
                    146,
                    496,
                    234,
                    502,
                    402,
                    419,
                    515,
                    "0",
                    "0",
                    544,
                    463,
                    248,
                    216,
                    239
                  ],
                  "comparisonValues": [6001]
                }
              ]
            },
            {
              "id": "i2",
              "name": "Karkirurgi, carotisstenose",
              "href": "/helseatlas/files/kvalitet_karkirurgi.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                90.0, 92.86, 86.21, 84.62, 67.5, 73.02, 86.21, 60.0, 50.0,
                64.71, 61.29, 86.11, 92.0, 81.52, 81.52, 81.52, 78.7, 86.78,
                74.07, 66.67, 68.35
              ],
              "comparisonValues": [76.82],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter med forsnevring av halspulsåren som har hatt et drypp eller hjerneslag (symptomatisk carotisstenose) som ble operert innen 14 dager. Pasienten opereres for carotisstenose for å forebygge ytterligere hjerneslag og inngrepet skal derfor gjøres snarest mulig. <br>NB! OUS = Oslo. Pga manglende informasjon om bydel i data fra registeret er OUS, Lovisenberg og Diakonhjemmet slått sammen til Oslo. <br><br>Målnivå: <60% lav, 60-80% moderat, <span>&#8805;</span>80% høy<br><br>Kilde: Norsk karkirurgisk register / FHI"
                },
                { "name": "customBreaks", "value": "0;60;80;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    18,
                    65,
                    25,
                    11,
                    27,
                    46,
                    50,
                    6,
                    33,
                    22,
                    38,
                    62,
                    46,
                    75,
                    "0",
                    "0",
                    85,
                    105,
                    60,
                    50,
                    54
                  ],
                  "comparisonValues": [878]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    20,
                    70,
                    29,
                    13,
                    40,
                    63,
                    58,
                    10,
                    66,
                    34,
                    62,
                    72,
                    50,
                    92,
                    "0",
                    "0",
                    108,
                    121,
                    81,
                    75,
                    79
                  ],
                  "comparisonValues": [1143]
                }
              ]
            },
            {
              "id": "i3",
              "name": "Hjerneslag, trombolyse",
              "href": "/helseatlas/files/kvalitet_hjerneslag.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                11.64, 20.59, 19.46, 17.48, 17.65, 14.61, 20.76, 27.89, 30.84,
                18.59, 30.48, 22.74, 20.88, 18.47, 18.47, 18.47, 19.5, 21.07,
                22.93, 20.28, 21.71
              ],
              "comparisonValues": [21.34],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter med hjerneinfarkt (blodpropp i hjernen) som ble behandlet med trombolyse (nedbrytning av blodpropp ved medisiner). Indikasjon for trombolyse vil avhenge av hvor alvorlig hjerneinfarktet er, hvor lang tid det er gått fra symptomdebut til behandlingen kan starte, samt en vurdering av risiko for alvorlige bivirkninger.<br>NB! OUS = Oslo. Pga manglende informasjon om bydel i data fra registeret er OUS, Lovisenberg og Diakonhjemmet slått sammen til Oslo. <br><br>Målnivå: <10% lav, 10-15% moderat, <span>&#8805;</span>15% høy<br><br>Kilde: Norsk Hjerneslagregister / FHI"
                },
                { "name": "customBreaks", "value": "0;10;15;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    14,
                    81,
                    45,
                    24,
                    51,
                    80,
                    93,
                    37,
                    165,
                    52,
                    144,
                    110,
                    94,
                    124,
                    "0",
                    "0",
                    140,
                    134,
                    89,
                    53,
                    85
                  ],
                  "comparisonValues": [1608]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    116,
                    393,
                    233,
                    137,
                    287,
                    548,
                    448,
                    133,
                    535,
                    280,
                    471,
                    482,
                    449,
                    673,
                    "0",
                    "0",
                    716,
                    638,
                    387,
                    260,
                    390
                  ],
                  "comparisonValues": [7537]
                }
              ]
            },
            {
              "id": "i4",
              "name": "Invasiv kardiologi, trykkmåling",
              "href": "/helseatlas/files/kvalitet_invasiv_kardio.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                16.28, 16.51, 16.37, 16.8, 23.91, 25.31, 22.39, 22.34, 24.12,
                19.39, 21.51, 17.16, 24.6, 19.72, 19.72, 19.72, 18.74, 21.73,
                19.51, 18.61, 18.34
              ],
              "comparisonValues": [20.36],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel prosedyrer der trykkmåling ble utført for å vurdere grad av innsnevring i kransårene. Ved moderat grad av innsnevring i årene kan det være vanskelig å vurdere om innsnevringen i blodåren er så trang at den har betydning for blodstrømmen. For å avgjøre dette kan det være nødvendig med tilleggsundersøkelser som intrakoronar trykkmåling.<br>NB! OUS = Oslo. Pga manglende informasjon om bydel i data fra registeret er OUS, Lovisenberg og Diakonhjemmet slått sammen til Oslo. <br><br>Målnivå: <30% lav, <span>&#8805;</span>30% høy<br><br>Kilde: Norsk register for invasiv kardiologi / FHI"
                },
                { "name": "customBreaks", "value": "0;30;30;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    43,
                    88,
                    68,
                    36,
                    51,
                    164,
                    108,
                    34,
                    137,
                    83,
                    169,
                    117,
                    209,
                    210,
                    "0",
                    "0",
                    169,
                    201,
                    85,
                    77,
                    162
                  ],
                  "comparisonValues": [2211]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    262,
                    531,
                    415,
                    214,
                    215,
                    648,
                    482,
                    154,
                    569,
                    426,
                    784,
                    684,
                    850,
                    1065,
                    "0",
                    "0",
                    900,
                    927,
                    437,
                    412,
                    883
                  ],
                  "comparisonValues": [10859]
                }
              ]
            }
          ]
        },
        {
          "id": "t1",
          "name": "Kreft",
          "indicators": [
            {
              "id": "i5",
              "name": "Tykktarmskreft, laparoskopi",
              "href": "/helseatlas/files/kvalitet_tarmkreft.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                68.0, 54.4, 76.65, 66.04, 45.63, 54.21, 49.56, 23.44, 58.39,
                58.75, 64.13, 67.55, 51.23, 60.22, 48.89, 54.62, 73.16, 78.16,
                52.2, 80.21, 64.91
              ],
              "comparisonValues": [60.71],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter med tykktarmskreft stadium I-III operert med laparoskopi. Fordelene med laparoskopisk teknikk er at pasienten får mindre operasjonssår og mindre smerter, og kommer raskere til hektene etter operasjonen. Laparoskopisk teknikk er likeverdig med åpen kirurgi med tanke på langtidsresulter for behandling av kreft i tykk- og endetarm.<br><br>Målnivå: <60% lav, <span>&#8805;</span>60% høy<br><br>Kilde: Nasjonalt kvalitetsregister for tykk- og endetarmskreft"
                },
                { "name": "customBreaks", "value": "0;60;60;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    17, 45, 43, 23, 31, 54, 57, 10, 82, 47, 70, 85, 83, 37, 11,
                    24, 103, 113, 55, 51, 74
                  ],
                  "comparisonValues": [1116]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    25, 83, 56, 35, 69, 99, 114, 43, 141, 80, 110, 126, 162, 62,
                    23, 43, 140, 145, 106, 64, 114
                  ],
                  "comparisonValues": [1838]
                }
              ]
            },
            {
              "id": "i6",
              "name": "Endetarmskreft, laparoskopi",
              "href": "/helseatlas/files/kvalitet_tarmkreft.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                71.43, 75.0, 92.5, 91.89, 31.67, 62.07, 77.27, 41.18, 79.59,
                37.88, 75.4, 72.9, 67.97, 56.34, 70.83, 60.0, 87.27, 69.08,
                58.41, 78.79, 84.15
              ],
              "comparisonValues": [70.78],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter med endetarmskreft stadium I-III operert med laparoskopi. Fordelene med laparoskopisk teknikk er at pasienten får mindre operasjonssår og mindre smerter, og kommer raskere til hektene etter operasjonen. Laparoskopisk teknikk er likeverdig med åpen kirurgi med tanke på langtidsresulter for behandling av kreft i tykk- og endetarm.<br><br>Målnivå: <60% lav, <span>&#8805;</span>60% høy<br><br>Kilde: Nasjonalt kvalitetsregister for tykk- og endetarmskreft"
                },
                { "name": "customBreaks", "value": "0;60;60;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    15, 66, 74, 34, 19, 72, 85, 14, 117, 25, 95, 78, 104, 40,
                    17, 24, 144, 105, 66, 52, 69
                  ],
                  "comparisonValues": [1315]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    21, 88, 80, 37, 60, 116, 110, 34, 147, 66, 126, 107, 153,
                    71, 24, 40, 165, 152, 113, 66, 82
                  ],
                  "comparisonValues": [1858]
                }
              ]
            },
            {
              "id": "i7",
              "name": "Endetarmskreft, uten tilbakefall",
              "href": "/helseatlas/files/kvalitet_tarmkreft.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                97.41, 93.79, 93.31, 96.72, 97.91, 96.17, 97.17, 98.07, 94.42,
                96.1, 95.92, 93.81, 94.01, 96.74, 96.88, 91.28, 95.36, 96.05,
                94.1, 97.44, 98.87
              ],
              "comparisonValues": [95.63],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Estimert andel pasienter med endetarmskreft stadium I-III uten lokalt tilbakefall fem år etter operasjon. Nasjonalt kvalitetsregister for tykk- og endetarmskreft følger pasientene i inntil 5 år etter operasjonen. Indikatoren er viktig for å vurdere kvaliteten på både utredning og behandling av endetarmskreft.<br><br>Målnivå: <95% lav, <span>&#8805;</span>95% høy<br><br>Kilde: Nasjonalt kvalitetsregister for tykk- og endetarmskreft / SSB"
                },
                { "name": "customBreaks", "value": "0;95;95;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    25, 88, 76, 35, 60, 132, 128, 50, 187, 76, 133, 116, 192,
                    74, 30, 37, 167, 188, 106, 73, 88
                  ],
                  "comparisonValues": [2070]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    25, 94, 82, 36, 62, 138, 131, 51, 198, 79, 138, 124, 204,
                    77, 31, 40, 175, 195, 113, 75, 89
                  ],
                  "comparisonValues": [2164]
                }
              ]
            },
            {
              "id": "i8",
              "name": "Tykktarmskreft, overlevelse",
              "href": "/helseatlas/files/kvalitet_tarmkreft.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                98.65, 98.06, 95.88, 96.3, 97.03, 98.34, 96.99, 96.15, 97.49,
                97.97, 97.15, 96.61, 96.4, 95.11, 100.0, 95.52, 95.97, 96.37,
                97.43, 94.12, 97.87
              ],
              "comparisonValues": [96.87],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter som er i live 100 dager etter operasjon. Moderne behandling gjør at død relatert til behandling kan inntreffe relativt lang tid etter operasjonstidspunktet. Et intervall på 100 dager vil imidlertid også omfatte noen tilfeller av død grunnet andre årsaker enn kreftbehandlingen. <br><br>Målnivå: <95% lav, <span>&#8805;</span>95% høy<br><br>Kilde: Nasjonalt kvalitetsregister for tykk- og endetarmskreft"
                },
                { "name": "customBreaks", "value": "0;95;95;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    24, 84, 54, 35, 65, 99, 118, 50, 168, 80, 102, 123, 188, 58,
                    23, 43, 135, 150, 101, 59, 107
                  ],
                  "comparisonValues": [1866]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    25, 86, 57, 36, 67, 101, 122, 52, 172, 82, 105, 128, 195,
                    61, 23, 45, 141, 156, 104, 62, 109
                  ],
                  "comparisonValues": [1926]
                }
              ]
            },
            {
              "id": "i9",
              "name": "Brystkreft, primærkirurgi",
              "href": "/helseatlas/files/kvalitet_brystkreft.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                98.15, 92.31, 90.91, 89.57, 90.37, 90.91, 88.89, 90.98, 92.82,
                93.07, 92.09, 86.68, 92.37, 93.52, 92.74, 88.2, 92.95, 92.73,
                93.0, 94.88, 94.18
              ],
              "comparisonValues": [91.94],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel kvinner som kun har fått utført ett kirurgisk inngrep på primærtumor. At det har vært utført kun ett kirurgisk inngrep på primærtumor vil si at det ikke har vært behov for å operere kvinnen på nytt etter første operasjon for brystkreft. Det er uttrykk for god diagnostikk og behandling. <br><br>Målnivå: <80% lav, 80-90% moderat, <span>&#8805;</span>90% høy<br><br>Kilde: Nasjonalt kvalitetsregister for brystkreft"
                },
                { "name": "customBreaks", "value": "0;80;90;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    18, 64, 60, 34, 66, 117, 107, 37, 181, 85, 128, 128, 258,
                    101, 38, 52, 171, 234, 106, 80, 124
                  ],
                  "comparisonValues": [2190]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    18, 69, 66, 38, 73, 128, 120, 41, 195, 91, 139, 148, 280,
                    108, 41, 59, 184, 252, 114, 85, 132
                  ],
                  "comparisonValues": [2382]
                }
              ]
            },
            {
              "id": "i10",
              "name": "Brystkreft, brystbevarende kirurgi",
              "href": "/helseatlas/files/kvalitet_brystkreft.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                77.78, 82.3, 88.24, 81.4, 85.71, 76.86, 79.34, 78.1, 83.29,
                62.96, 77.51, 76.22, 83.17, 77.34, 76.92, 69.8, 73.31, 85.47,
                83.38, 75.59, 70.68
              ],
              "comparisonValues": [79.06],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel brystbevarende operasjoner, tumorstørrelse under 30 mm. En brystbevarende operasjon kan utføres hvis området som skal fjernes ikke er for stort i forhold til størrelsen på brystet eller ligger i en ugunstig posisjon. Forskning har vist at brystbevarende operasjoner gir minst like god prognose som det å fjerne hele brystet.<br><br>Målnivå: <70% lav, 70-85% moderat, <span>&#8805;</span>85% høy<br><br>Kilde: Nasjonalt kvalitetsregister for brystkreft"
                },
                { "name": "customBreaks", "value": "0;70;85;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    16, 62, 45, 23, 50, 93, 104, 27, 118, 40, 87, 114, 193, 66,
                    23, 35, 115, 186, 90, 54, 72
                  ],
                  "comparisonValues": [1615]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    21, 75, 51, 29, 58, 121, 131, 35, 142, 63, 113, 150, 232,
                    85, 30, 50, 157, 218, 108, 71, 102
                  ],
                  "comparisonValues": [2042]
                }
              ]
            },
            {
              "id": "i11",
              "name": "Lungekreft, kurativ behandling",
              "href": "/helseatlas/files/kvalitet_lungekreft.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                44.33, 42.36, 30.98, 37.7, 39.7, 48.68, 42.67, 31.39, 40.4,
                40.32, 44.94, 35.24, 37.86, 39.65, 41.29, 37.42, 31.35, 43.25,
                36.9, 33.52, 40.63
              ],
              "comparisonValues": [39.34],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter med lungekreft som er kurativt behandlet. Kurativ behandling tar sikte på at pasienten skal bli frisk.<br><br>Målnivå: <30% lav, 30-35% moderat, <span>&#8805;</span>35% høy<br><br>Kilde: Nasjonalt kvalitetsregister for lungekreft"
                },
                { "name": "customBreaks", "value": "0;30;35;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    30, 57, 31, 23, 35, 80, 76, 23, 102, 50, 95, 82, 122, 45,
                    21, 19, 68, 105, 52, 40, 90
                  ],
                  "comparisonValues": [1246]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    68, 135, 99, 61, 89, 164, 177, 74, 252, 124, 211, 234, 321,
                    114, 52, 52, 218, 242, 140, 120, 221
                  ],
                  "comparisonValues": [3168]
                }
              ]
            },
            {
              "id": "i12",
              "name": "Lungekreft, overlevelse",
              "href": "/helseatlas/files/kvalitet_lungekreft.pdf",
              "type": "numeric",
              "precision": "1",
              "values": [
                12.77, 13.7, 13.17, 11.77, 11.33, 12.43, 13.47, 11.33, 14.3,
                15.03, 13.67, 10.97, 12.23, 16.8, 10.3, 16.13, 10.73, 11.63,
                9.93, 11.5, 14.8
              ],
              "comparisonValues": [12.63],
              "properties": [
                { "name": "precision", "value": 1 },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Måneder" },
                { "name": "column_innbyggere", "value": "Personer" },
                {
                  "name": "metatext",
                  "value": "Median overlevelse i antall måneder indikerer hvor lang tid det tok før 50% av pasientene som fikk en lungekreftdiagnose i perioden 2017-2019, uansett stadium, var døde. <br><br>Målnivå: <12 måneder lav, 12-14 måneder moderat, <span>&#8805;</span>14 måneder høy<br><br>Kilde: Nasjonalt kvalitetsregister for lungekreft / SSB"
                },
                { "name": "customBreaks", "value": "0;12;14;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    13, 14, 13, 12, 11, 12, 13, 11, 14, 15, 14, 11, 12, 17, 10,
                    16, 11, 12, 10, 12, 15
                  ],
                  "comparisonValues": [13]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    298, 607, 467, 262, 435, 793, 823, 356, 1236, 594, 946,
                    1068, 1500, 516, 235, 243, 1067, 1182, 762, 558, 1059
                  ],
                  "comparisonValues": [15044]
                }
              ]
            },
            {
              "id": "i13",
              "name": "Prostatakreft, radikal behandling",
              "href": "/helseatlas/files/kvalitet_prostatakreft.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                71.43, 76.6, 75.0, 77.55, 57.45, 59.86, 72.03, 88.33, 80.85,
                75.47, 84.13, 83.46, 70.45, 75.0, 72.5, 72.62, 80.11, 71.29,
                58.52, 69.06, 78.79
              ],
              "comparisonValues": [74.39],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel høyrisikopasienter som ble radikalt behandlet. Alternativet til radikal behandling er aktiv overvåkning av sykdommen, men pasienter i høyrisikogruppen bør i hovedsak behandles radikalt, såfremt pasienten selv ønsker det og er frisk nok til å tåle en slik behandling. <br><br>Målnivå: <70% lav, <span>&#8805;</span>70% høy<br><br>Kilde: Nasjonalt kvalitetsregister for brystkreft"
                },
                { "name": "customBreaks", "value": "0;70;70;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    15, 54, 38, 19, 27, 44, 43, 27, 114, 20, 88, 106, 109, 48,
                    15, 31, 71, 108, 40, 48, 65
                  ],
                  "comparisonValues": [1126]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    21, 71, 50, 25, 47, 74, 59, 30, 141, 27, 104, 127, 154, 64,
                    20, 42, 88, 152, 68, 70, 83
                  ],
                  "comparisonValues": [1513]
                }
              ]
            },
            {
              "id": "i14",
              "name": "Prostatakreft, fri rand",
              "href": "/helseatlas/files/kvalitet_prostatakreft.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                81.58, 85.09, 68.54, 76.19, 76.92, 77.4, 78.82, 92.73, 90.96,
                87.23, 75.68, 87.39, 83.76, 90.57, 86.36, 90.0, 78.5, 91.92,
                86.96, 81.88, 88.33
              ],
              "comparisonValues": [83.49],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel menn med fri rand ved operasjon for kreftsvulster i prostata, pT2. Etter operasjonen hvor prostatakjertel fjernes undersøkes vevet av en patolog. For å være sikker på at alle kreftceller er fjernet må det være friskt vev i ytterkanten av vevet som er operert bort. Hvis det er normale celler i snittkanten kalles det fri rand. <br><br>Målnivå: <75% lav, 75-85% moderat, <span>&#8805;</span>85% høy<br><br>Kilde: Nasjonalt kvalitetsregister for prostatakreft"
                },
                { "name": "customBreaks", "value": "0;75;85;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    10, 32, 20, 11, 20, 38, 53, 17, 57, 27, 47, 65, 76, 16, 6,
                    18, 56, 61, 27, 38, 35
                  ],
                  "comparisonValues": [730]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    13, 38, 30, 14, 26, 49, 68, 18, 63, 31, 62, 74, 90, 18, 7,
                    20, 71, 66, 31, 46, 40
                  ],
                  "comparisonValues": [874]
                }
              ]
            }
          ]
        },
        {
          "id": "t2",
          "name": "Diabetes",
          "indicators": [
            {
              "id": "i15",
              "name": "Diabetes barn, HbA1c < 53 mmol",
              "href": "/helseatlas/files/kvalitet_barnediabetes.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                30.19, 27.95, 20.18, 20.47, 25.75, 32.54, 21.89, 24.57, 14.17,
                34.75, 24.27, 28.19, 25.27, 20.13, 20.13, 20.13, 31.44, 23.6,
                31.82, 16.04, 27.44
              ],
              "comparisonValues": [25.09],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter med langtidsblodsukker (HbA1c) under 53 mmol/mol. HbA1c måler hvor godt pasientens blodsukker er regulert. Internasjonalt og nasjonalt finnes det retningslinjer for hva HbA1c bør være, og dette målet er satt for i størst mulig grad å forebygge utviklingen av senkomplikasjoner. <br>NB! OUS = Oslo. Pga manglende informasjon om bydel i data fra registeret er OUS, Lovisenberg og Diakonhjemmet slått sammen til Oslo. <br><br>Målnivå: <20% lav, 20-40% moderat, <span>&#8805;</span>40% høy<br><br>Kilde: Nasjonalt medisinsk kvalitetsregister for barne- og ungdomsdiabetes"
                },
                { "name": "customBreaks", "value": "0;20;40;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    11,
                    28,
                    15,
                    9,
                    20,
                    46,
                    36,
                    19,
                    30,
                    44,
                    42,
                    46,
                    54,
                    42,
                    "0",
                    "0",
                    65,
                    52,
                    37,
                    16,
                    53
                  ],
                  "comparisonValues": [663]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    35,
                    99,
                    76,
                    42,
                    78,
                    140,
                    166,
                    77,
                    214,
                    126,
                    172,
                    162,
                    214,
                    207,
                    "0",
                    "0",
                    206,
                    220,
                    117,
                    98,
                    194
                  ],
                  "comparisonValues": [2643]
                }
              ]
            },
            {
              "id": "i16",
              "name": "Diabetes barn, HbA1c < 75 mmol",
              "href": "/helseatlas/files/kvalitet_barnediabetes.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                83.02, 89.23, 90.35, 88.98, 90.99, 90.74, 90.56, 95.69, 85.67,
                90.98, 84.66, 90.12, 84.24, 85.67, 85.67, 85.67, 92.71, 86.84,
                96.59, 94.2, 93.65
              ],
              "comparisonValues": [89.36],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter med langtidsblodsukker (HbA1c) under 75 mmol/mol. HbA1c måler hvor godt pasientens blodsukker er regulert. Internasjonalt og nasjonalt finnes det retningslinjer for hva HbA1c bør være, og dette målet er satt for i størst mulig grad å forebygge utviklingen av senkomplikasjoner. <br>NB! OUS = Oslo. Pga manglende informasjon om bydel i data fra registeret er OUS, Lovisenberg og Diakonhjemmet slått sammen til Oslo. <br><br>Målnivå: <90% lav, 90-95% moderat, <span>&#8805;</span>95% høy<br><br>Kilde: Nasjonalt medisinsk kvalitetsregister for barne- og ungdomsdiabetes"
                },
                { "name": "customBreaks", "value": "0;90;95;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    29,
                    88,
                    69,
                    38,
                    71,
                    127,
                    150,
                    74,
                    183,
                    114,
                    145,
                    146,
                    180,
                    177,
                    "0",
                    "0",
                    191,
                    191,
                    113,
                    92,
                    182
                  ],
                  "comparisonValues": [2362]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    35,
                    99,
                    76,
                    42,
                    78,
                    140,
                    166,
                    77,
                    214,
                    126,
                    172,
                    162,
                    214,
                    207,
                    "0",
                    "0",
                    206,
                    220,
                    117,
                    98,
                    194
                  ],
                  "comparisonValues": [2643]
                }
              ]
            },
            {
              "id": "i17",
              "name": "Diabetes voksne, HbA1c <= 53 mmol",
              "href": "/helseatlas/files/kvalitet_voksendiabetes.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                21.35, 24.52, 28.15, 22.89, 30.66, 29.66, 27.23, 37.08, 29.07,
                26.75, 27.5, 18.73, 26.72, 29.23, 25.29, 36.17, 24.6, 30.05,
                23.63, 25.98, 27.74
              ],
              "comparisonValues": [27.03],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter med langtidsblodsukker (HbA1c) under eller lik 53 mmol/mol. HbA1c måler hvor godt pasientens blodsukker er regulert. Internasjonalt og nasjonalt finnes det retningslinjer for hva HbA1c bør være, og dette målet er satt for i størst mulig grad å forebygge utviklingen av senkomplikasjoner.<br><br>Målnivå: <20% lav, 20-25% moderat, <span>&#8805;</span>25% høy <br><br>Kilde: Norsk diabetesregister for voksne"
                },
                { "name": "customBreaks", "value": "0;20;25;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    32, 159, 130, 62, 145, 255, 187, 134, 356, 170, 371, 192,
                    343, 239, 66, 106, 311, 328, 171, 22, 298
                  ],
                  "comparisonValues": [3880]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    148, 647, 461, 272, 473, 857, 679, 361, 1223, 637, 1349,
                    1025, 1283, 818, 262, 294, 1263, 1090, 724, 85, 1075
                  ],
                  "comparisonValues": [14356]
                }
              ]
            },
            {
              "id": "i18",
              "name": "Diabetes voksne, HbA1c < 75 mmol",
              "href": "/helseatlas/files/kvalitet_voksendiabetes.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                79.33, 80.42, 86.61, 79.56, 87.58, 85.19, 84.51, 86.35, 84.09,
                83.19, 87.03, 79.19, 83.42, 87.12, 86.28, 91.27, 82.37, 87.65,
                82.13, 79.53, 85.68
              ],
              "comparisonValues": [84.37],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter med langtidsblodsukker (HbA1c) under 75 mmol/mol. HbA1c måler hvor godt pasientens blodsukker er regulert. Internasjonalt og nasjonalt finnes det retningslinjer for hva HbA1c bør være, og dette målet er satt for i størst mulig grad å forebygge utviklingen av senkomplikasjoner. <br><br>Målnivå: <80% lav, 80-85% moderat, <span>&#8805;</span>85% høy<br><br>Kilde: Norsk diabetesregister for voksne"
                },
                { "name": "customBreaks", "value": "0;80;85;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    118, 520, 399, 217, 414, 731, 575, 312, 1029, 530, 1174,
                    812, 1070, 712, 226, 268, 1040, 956, 594, 67, 921
                  ],
                  "comparisonValues": [12112]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    148, 647, 461, 272, 473, 857, 679, 361, 1223, 637, 1349,
                    1025, 1283, 818, 262, 294, 1263, 1090, 724, 85, 1075
                  ],
                  "comparisonValues": [14356]
                }
              ]
            }
          ]
        },
        {
          "id": "t3",
          "name": "Øvrige",
          "indicators": [
            {
              "id": "i19",
              "name": "Hoftebrudd, sementert stamme",
              "href": "/helseatlas/files/kvalitet_hoftebrudd.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                89.4, 60.6, 99.33, 93.51, 95.0, 97.37, 99.15, 48.19, 95.18,
                98.55, 96.25, 92.6, 98.87, 83.92, 83.92, 83.92, 84.97, 92.5,
                99.64, 94.51, 47.25
              ],
              "comparisonValues": [89.11],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter med feilstilt lårhalsbrudd som fikk protese med sementert stamme. Nasjonale retningslinjer anbefaler at pasienter som er eldre enn 70 år behandles med innsetting av en protese med sementert stamme. Det er vist at dette gir lavere risiko for reoperasjon og komplikasjoner (Nasjonalt hoftebruddregister 2020).<br>NB! OUS = Oslo. Pga manglende informasjon om bydel i data fra registeret er OUS, Lovisenberg og Diakonhjemmet slått sammen til Oslo. <br><br>Målnivå: <80% lav, 80-90% moderat, <span>&#8805;</span>90% høy<br><br>Kilde: Nasjonalt Hoftebruddregister"
                },
                { "name": "customBreaks", "value": "0;80;90;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    23,
                    74,
                    99,
                    72,
                    82,
                    185,
                    195,
                    31,
                    224,
                    113,
                    171,
                    225,
                    233,
                    256,
                    "0",
                    "0",
                    283,
                    312,
                    184,
                    138,
                    80
                  ],
                  "comparisonValues": [2980]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    25,
                    123,
                    100,
                    77,
                    87,
                    190,
                    197,
                    64,
                    235,
                    115,
                    178,
                    243,
                    236,
                    305,
                    "0",
                    "0",
                    333,
                    338,
                    184,
                    146,
                    170
                  ],
                  "comparisonValues": [3344]
                }
              ]
            },
            {
              "id": "i20",
              "name": "Hoftebrudd, operasjon innen 48 t.",
              "href": "/helseatlas/files/kvalitet_hoftebrudd.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                81.82, 78.71, 80.48, 86.4, 84.85, 82.87, 89.18, 89.75, 85.14,
                86.55, 85.73, 77.55, 75.97, 84.91, 84.91, 84.91, 86.74, 89.27,
                82.03, 90.01, 85.52
              ],
              "comparisonValues": [84.41],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter operert innen 48 timer etter bruddtidspunkt. Hoftebrudd bør opereres innen 24 timer (Nasjonal faglig retningslinje), og senest 48 timer etter bruddtidspunktet (Nasjonalt hoftebruddregister 2020) for å redusere dødelighet og risiko for medisinske komplikasjoner.<br>NB! OUS = Oslo. Pga manglende informasjon om bydel i data fra registeret er OUS, Lovisenberg og Diakonhjemmet slått sammen til Oslo. <br><br>Målnivå: <80% lav, 80-90% moderat, <span>&#8805;</span>90% høy<br><br>Kilde: Nasjonalt Hoftebruddregister"
                },
                { "name": "customBreaks", "value": "0;80;90;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    60,
                    216,
                    180,
                    150,
                    187,
                    308,
                    357,
                    155,
                    422,
                    238,
                    280,
                    396,
                    380,
                    582,
                    "0",
                    "0",
                    578,
                    610,
                    356,
                    276,
                    291
                  ],
                  "comparisonValues": [6023]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    73,
                    274,
                    224,
                    174,
                    220,
                    372,
                    401,
                    172,
                    496,
                    275,
                    327,
                    511,
                    501,
                    685,
                    "0",
                    "0",
                    666,
                    684,
                    434,
                    307,
                    341
                  ],
                  "comparisonValues": [7135]
                }
              ]
            },
            {
              "id": "i21",
              "name": "Nyre, blodtrykk < 130/80",
              "href": "/helseatlas/files/kvalitet_nyre.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                40.2, 41.94, 40.54, 32.87, 36.64, 37.3, 44.01, 54.91, 52.36,
                50.56, 36.79, 61.49, 36.84, 42.81, 42.81, 42.81, 45.38, 40.84,
                35.23, 41.6, 41.65
              ],
              "comparisonValues": [43.01],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel nyretransplanterte pasienter med blodtrykk under 130/80 mmHg. Forhøyet blodtrykk gir økt risiko for at en transplantert nyre svikter. Faglige retningslinjer anbefaler at blodtrykket hos nyretransplanterte er lavere enn 130/80 mmHg.<br>NB! OUS = Oslo. Pga manglende informasjon om bydel i data fra registeret er OUS, Lovisenberg og Diakonhjemmet slått sammen til Oslo. <br><br>Målnivå: <70% lav, 70-80% moderat, <span>&#8805;</span>80% høy<br><br>Kilde: Norsk nyreregister"
                },
                { "name": "customBreaks", "value": "0;70;80;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    14,
                    50,
                    40,
                    16,
                    32,
                    76,
                    71,
                    32,
                    122,
                    45,
                    76,
                    124,
                    102,
                    185,
                    "0",
                    "0",
                    133,
                    137,
                    56,
                    49,
                    81
                  ],
                  "comparisonValues": [1438]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    34,
                    120,
                    99,
                    48,
                    87,
                    205,
                    161,
                    58,
                    233,
                    90,
                    206,
                    202,
                    276,
                    431,
                    "0",
                    "0",
                    292,
                    335,
                    158,
                    117,
                    194
                  ],
                  "comparisonValues": [3344]
                }
              ]
            },
            {
              "id": "i22",
              "name": "Nyre, hemodialyse",
              "href": "/helseatlas/files/kvalitet_nyre.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                73.68, 78.33, 84.76, 70.0, 73.58, 71.98, 80.0, 85.11, 52.99,
                80.16, 82.95, 34.31, 66.95, 72.92, 72.92, 72.92, 72.85, 73.24,
                77.38, 79.55, 64.43
              ],
              "comparisonValues": [70.48],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter med ukentlig Kt/V over fastsatt grense (hemodialyse). Ukentlig Kt/V måler effekten av behandling med hemodialyse. God dialyse er viktig for pasientens overlevelse og for reduksjon av helseproblemer forbundet med kronisk nyresykdom.<br>NB! OUS = Oslo. Pga manglende informasjon om bydel i data fra registeret er OUS, Lovisenberg og Diakonhjemmet slått sammen til Oslo. <br><br>Målnivå: <70% lav, 70-80% moderat, <span>&#8805;</span>80% høy<br><br>Kilde: Norsk nyreregister"
                },
                { "name": "customBreaks", "value": "0;70;80;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    12,
                    31,
                    30,
                    16,
                    39,
                    56,
                    56,
                    27,
                    44,
                    34,
                    60,
                    27,
                    53,
                    105,
                    "0",
                    "0",
                    73,
                    69,
                    22,
                    35,
                    42
                  ],
                  "comparisonValues": [830]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    16,
                    40,
                    35,
                    23,
                    53,
                    77,
                    70,
                    31,
                    84,
                    42,
                    72,
                    80,
                    79,
                    144,
                    "0",
                    "0",
                    101,
                    95,
                    28,
                    44,
                    65
                  ],
                  "comparisonValues": [1178]
                }
              ]
            },
            {
              "id": "i23",
              "name": "Nyre, hjemmedialyse",
              "href": "/helseatlas/files/kvalitet_nyre.pdf",
              "type": "numeric",
              "precision": "0",
              "values": [
                26.98, 25.75, 22.09, 28.18, 17.95, 20.83, 11.15, 16.38, 12.08,
                13.82, 16.98, 14.57, 35.57, 29.01, 29.01, 29.01, 25.93, 13.77,
                28.36, 26.4, 23.17
              ],
              "comparisonValues": [21.85],
              "properties": [
                { "name": "precision", "value": "0" },
                { "name": "column_name", "value": "Opptaksområde" },
                { "name": "column_value", "value": "Andel(%)" },
                { "name": "column_antall", "value": "N" },
                { "name": "column_innbyggere", "value": "Aktuelle" },
                {
                  "name": "metatext",
                  "value": "Andel pasienter i hjemmedialyse. Fordelene med hjemmedialyse er at pasienten ikke må reise til behandlingstedet, dialysen kan gjennomføres når det passer for pasienten og pasienten kan utføre dialyse hyppigere og med lengre varighet med følgende bedre behandlingseffekt.<br>NB! OUS = Oslo. Pga manglende informasjon om bydel i data fra registeret er OUS, Lovisenberg og Diakonhjemmet slått sammen til Oslo. <br><br>Målnivå: <30% lav, <span>&#8805;</span>30% høy<br><br>Kilde: Norsk nyreregister"
                },
                { "name": "customBreaks", "value": "0;30;30;100" }
              ],
              "associates": [
                {
                  "name": "antall",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    6,
                    14,
                    13,
                    10,
                    12,
                    20,
                    10,
                    6,
                    12,
                    7,
                    15,
                    15,
                    42,
                    63,
                    "0",
                    "0",
                    40,
                    17,
                    13,
                    17,
                    20
                  ],
                  "comparisonValues": [351]
                },
                {
                  "name": "innbyggere",
                  "type": "numeric",
                  "precision": "0",
                  "values": [
                    21,
                    56,
                    57,
                    37,
                    65,
                    96,
                    93,
                    39,
                    99,
                    51,
                    88,
                    101,
                    119,
                    216,
                    "0",
                    "0",
                    153,
                    121,
                    45,
                    66,
                    86
                  ],
                  "comparisonValues": [1608]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
