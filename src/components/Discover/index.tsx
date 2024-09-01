import React from "react";
import './styles.scss';
import { TopChart } from "./TopChart";
import { Suggestions } from "./Suggestions";

const albums = [
  {
    "id": "14799536",
    "name": "Believer",
    "description": "",
    "url": "https://www.jiosaavn.com/album/believer/tXjhb4AnRtk_",
    "year": 2019,
    "type": "album",
    "playCount": null,
    "language": "english",
    "explicitContent": false,
    "artists": {
      "primary": [
        {
          "id": "599452",
          "name": "Imagine Dragons",
          "role": "primary_artists",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/imagine-dragons-songs/f0aFxsa231o_"
        }
      ],
      "featured": [],
      "all": [
        {
          "id": "599453",
          "name": "Dan Reynolds",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/dan-reynolds-songs/xoeLrr0aTEU_"
        },
        {
          "id": "599454",
          "name": "Wayne Sermon",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/wayne-sermon-songs/,WHkVDnJnD8_"
        },
        {
          "id": "599455",
          "name": "Ben Mckee",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/ben-mckee-songs/EA7FaJms-k8_"
        },
        {
          "id": "914898",
          "name": "Daniel Platzman",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/daniel-platzman-songs/hOWrEJ6eC9I_"
        },
        {
          "id": "683491",
          "name": "Robin Fredriksson",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/robin-fredriksson-songs/jRGk4sF83Ko_"
        },
        {
          "id": "634862",
          "name": "Mattias Larsson",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/mattias-larsson-songs/d6thUM5GwSE_"
        },
        {
          "id": "633532",
          "name": "Justin Tranter",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/justin-tranter-songs/MUdaah321CU_"
        },
        {
          "id": "562818",
          "name": "Dwayne Carter",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/dwayne-carter-songs/yY6srjGpiSQ_"
        },
        {
          "id": "599452",
          "name": "Imagine Dragons",
          "role": "singers",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/imagine-dragons-songs/f0aFxsa231o_"
        }
      ]
    },
    "image": [
      {
        "quality": "50x50",
        "url": "https://c.saavncdn.com/128/Believer-English-2018-20190107213710-50x50.jpg"
      },
      {
        "quality": "150x150",
        "url": "https://c.saavncdn.com/128/Believer-English-2018-20190107213710-150x150.jpg"
      },
      {
        "quality": "500x500",
        "url": "https://c.saavncdn.com/128/Believer-English-2018-20190107213710-500x500.jpg"
      }
    ]
  },
  {
    "id": "10958035",
    "name": "Believer (Kaskade Remix)",
    "description": "",
    "url": "https://www.jiosaavn.com/album/believer-kaskade-remix/HwBysb2hWiE_",
    "year": 2017,
    "type": "album",
    "playCount": null,
    "language": "english",
    "explicitContent": false,
    "artists": {
      "primary": [
        {
          "id": "599452",
          "name": "Imagine Dragons",
          "role": "primary_artists",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/imagine-dragons-songs/f0aFxsa231o_"
        },
        {
          "id": "598340",
          "name": "Kaskade",
          "role": "primary_artists",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/kaskade-songs/w0yNbChy8Yw_"
        }
      ],
      "featured": [],
      "all": [
        {
          "id": "599453",
          "name": "Dan Reynolds",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/dan-reynolds-songs/xoeLrr0aTEU_"
        },
        {
          "id": "599454",
          "name": "Wayne Sermon",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/wayne-sermon-songs/,WHkVDnJnD8_"
        },
        {
          "id": "599455",
          "name": "Ben Mckee",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/ben-mckee-songs/EA7FaJms-k8_"
        },
        {
          "id": "914898",
          "name": "Daniel Platzman",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/daniel-platzman-songs/hOWrEJ6eC9I_"
        },
        {
          "id": "683491",
          "name": "Robin Fredriksson",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/robin-fredriksson-songs/jRGk4sF83Ko_"
        },
        {
          "id": "634862",
          "name": "Mattias Larsson",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/mattias-larsson-songs/d6thUM5GwSE_"
        },
        {
          "id": "633532",
          "name": "Justin Tranter",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/justin-tranter-songs/MUdaah321CU_"
        },
        {
          "id": "599452",
          "name": "Imagine Dragons",
          "role": "singers",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/imagine-dragons-songs/f0aFxsa231o_"
        },
        {
          "id": "598340",
          "name": "Kaskade",
          "role": "singers",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/kaskade-songs/w0yNbChy8Yw_"
        }
      ]
    },
    "image": [
      {
        "quality": "50x50",
        "url": "https://c.saavncdn.com/261/Believer-Kaskade-Remix--English-2017-50x50.jpg"
      },
      {
        "quality": "150x150",
        "url": "https://c.saavncdn.com/261/Believer-Kaskade-Remix--English-2017-150x150.jpg"
      },
      {
        "quality": "500x500",
        "url": "https://c.saavncdn.com/261/Believer-Kaskade-Remix--English-2017-500x500.jpg"
      }
    ]
  },
  {
    "id": "10217739",
    "name": "Believer (Tribute to Imagine Dragons)",
    "description": "",
    "url": "https://www.jiosaavn.com/album/believer-tribute-to-imagine-dragons/M39ksWqIIOs_",
    "year": 2017,
    "type": "album",
    "playCount": null,
    "language": "english",
    "explicitContent": false,
    "artists": {
      "primary": [
        {
          "id": "2660023",
          "name": "Barberry Records",
          "role": "primary_artists",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/barberry-records-songs/FIySPEwaHAQ_"
        }
      ],
      "featured": [],
      "all": [
        {
          "id": "2660023",
          "name": "Barberry Records",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/barberry-records-songs/FIySPEwaHAQ_"
        },
        {
          "id": "2660023",
          "name": "Barberry Records",
          "role": "singers",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/barberry-records-songs/FIySPEwaHAQ_"
        }
      ]
    },
    "image": [
      {
        "quality": "50x50",
        "url": "https://c.saavncdn.com/087/Believer-Tribute-to-Imagine-Dragons--English-2017-50x50.jpg"
      },
      {
        "quality": "150x150",
        "url": "https://c.saavncdn.com/087/Believer-Tribute-to-Imagine-Dragons--English-2017-150x150.jpg"
      },
      {
        "quality": "500x500",
        "url": "https://c.saavncdn.com/087/Believer-Tribute-to-Imagine-Dragons--English-2017-500x500.jpg"
      }
    ]
  },
  {
    "id": "26957312",
    "name": "Believers",
    "description": "",
    "url": "https://www.jiosaavn.com/album/believers/e0ZNk0mmxbg_",
    "year": 2021,
    "type": "album",
    "playCount": null,
    "language": "english",
    "explicitContent": false,
    "artists": {
      "primary": [
        {
          "id": "1335467",
          "name": "Alan Walker",
          "role": "primary_artists",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/alan-walker-songs/wbWcxgUNzyo_"
        },
        {
          "id": "715131",
          "name": "Conor Maynard",
          "role": "primary_artists",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/conor-maynard-songs/1OtNT7fjh8c_"
        }
      ],
      "featured": [],
      "all": [
        {
          "id": "1335467",
          "name": "Alan Walker",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/alan-walker-songs/wbWcxgUNzyo_"
        },
        {
          "id": "715131",
          "name": "Conor Maynard",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/conor-maynard-songs/1OtNT7fjh8c_"
        },
        {
          "id": "1425075",
          "name": "Anders Frøen",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/anders-froen-songs/Wj4QA5E85tc_"
        },
        {
          "id": "1671861",
          "name": "Gaute Ormåsen",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/gaute-ormasen-songs/-wVQtpu2zVE_"
        },
        {
          "id": "711903",
          "name": "Victor Thell",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/victor-thell-songs/q9yrVyR9euw_"
        },
        {
          "id": "1363566",
          "name": "Jonas Jurström",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/jonas-jurstrom-songs/wBY9IIjQhu4_"
        },
        {
          "id": "1584282",
          "name": "Fredrik Borch Olsen",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/fredrik-borch-olsen-songs/iq2hSfiwJTE_"
        },
        {
          "id": "3333917",
          "name": "Marcus Arnbekk",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/marcus-arnbekk-songs/aAij0Two6rU_"
        },
        {
          "id": "659013",
          "name": "Carl Hovind",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/carl-hovind-songs/h1VoDMs3MuI_"
        },
        {
          "id": "1584281",
          "name": "Øyvind Sauvik",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/oyvind-sauvik-songs/,PQoc6ZC7ys_"
        },
        {
          "id": "1625408",
          "name": "Gunnar Greve",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/gunnar-greve-songs/MYLcGokRN0w_"
        },
        {
          "id": "1335467",
          "name": "Alan Walker",
          "role": "singers",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/alan-walker-songs/wbWcxgUNzyo_"
        },
        {
          "id": "715131",
          "name": "Conor Maynard",
          "role": "singers",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/conor-maynard-songs/1OtNT7fjh8c_"
        },
        {
          "id": "10470453",
          "name": "Alan Walker",
          "role": "singers",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/alan-walker-songs/YbM1X0EXNkw_"
        },
        {
          "id": "9421714",
          "name": "Conor Maynard",
          "role": "singers",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/conor-maynard-songs/T8f3T,eLaCE_"
        },
        {
          "id": "",
          "name": "Bigeyes",
          "role": "singers",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/bigeyes-songs/"
        }
      ]
    },
    "image": [
      {
        "quality": "50x50",
        "url": "https://c.saavncdn.com/351/Believers-English-2021-20210503232242-50x50.jpg"
      },
      {
        "quality": "150x150",
        "url": "https://c.saavncdn.com/351/Believers-English-2021-20210503232242-150x150.jpg"
      },
      {
        "quality": "500x500",
        "url": "https://c.saavncdn.com/351/Believers-English-2021-20210503232242-500x500.jpg"
      }
    ]
  }
]

const songs = [
  {
    "id": "q3rXyZA6",
    "name": "Mass",
    "type": "song",
    "year": "2004",
    "releaseDate": null,
    "duration": 250,
    "label": "Aditya Music",
    "explicitContent": false,
    "playCount": 1289352,
    "language": "telugu",
    "hasLyrics": true,
    "lyricsId": null,
    "url": "https://www.jiosaavn.com/song/mass/AVsZaQ1qdgU",
    "copyright": "©  2004 Aditya Music",
    "album": {
      "id": "1038086",
      "name": "Mass",
      "url": "https://www.jiosaavn.com/album/mass/VIhvayOUg6U_"
    },
    "artists": {
      "primary": [
        {
          "id": "455170",
          "name": "Devi Sri Prasad",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Devi_Sri_Prasad_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Devi_Sri_Prasad_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Devi_Sri_Prasad_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/devi-sri-prasad-songs/M0dlT,PMjDs_"
        },
        {
          "id": "455270",
          "name": "Mano",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Mano_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Mano_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Mano_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/mano-songs/4wKto0-DIr0_"
        },
        {
          "id": "455315",
          "name": "Ravi Varma",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/477/Red-Alert-Telugu-2015-50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/477/Red-Alert-Telugu-2015-150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/477/Red-Alert-Telugu-2015-500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/ravi-varma-songs/PsdPLopqMSE_"
        }
      ],
      "featured": [],
      "all": [
        {
          "id": "455170",
          "name": "Devi Sri Prasad",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Devi_Sri_Prasad_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Devi_Sri_Prasad_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Devi_Sri_Prasad_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/devi-sri-prasad-songs/M0dlT,PMjDs_"
        },
        {
          "id": "455270",
          "name": "Mano",
          "role": "singer",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Mano_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Mano_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Mano_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/mano-songs/4wKto0-DIr0_"
        },
        {
          "id": "455315",
          "name": "Ravi Varma",
          "role": "singer",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/477/Red-Alert-Telugu-2015-50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/477/Red-Alert-Telugu-2015-150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/477/Red-Alert-Telugu-2015-500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/ravi-varma-songs/PsdPLopqMSE_"
        },
        {
          "id": "716403",
          "name": "Sahithi",
          "role": "lyricist",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Sahithi_Galidevara_000_20220404112810.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Sahithi_Galidevara_000_20220404112810.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Sahithi_Galidevara_000_20220404112810.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/sahithi-songs/VKn9wR8zr,A_"
        },
        {
          "id": "457221",
          "name": "Nagarjuna",
          "role": "starring",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Nagarjuna_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Nagarjuna_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Nagarjuna_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/nagarjuna-songs/er92DnwuINI_"
        },
        {
          "id": "455245",
          "name": "Jyothika",
          "role": "starring",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Jyothika_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Jyothika_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Jyothika_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/jyothika-songs/HBRS,fv3Jhk_"
        }
      ]
    },
    "image": [
      {
        "quality": "50x50",
        "url": "https://c.saavncdn.com/086/Mass-2004-50x50.jpg"
      },
      {
        "quality": "150x150",
        "url": "https://c.saavncdn.com/086/Mass-2004-150x150.jpg"
      },
      {
        "quality": "500x500",
        "url": "https://c.saavncdn.com/086/Mass-2004-500x500.jpg"
      }
    ],
    "downloadUrl": [
      {
        "quality": "12kbps",
        "url": "https://aac.saavncdn.com/086/caca5b891583be77cb36d998f3fe7435_12.mp4"
      },
      {
        "quality": "48kbps",
        "url": "https://aac.saavncdn.com/086/caca5b891583be77cb36d998f3fe7435_48.mp4"
      },
      {
        "quality": "96kbps",
        "url": "https://aac.saavncdn.com/086/caca5b891583be77cb36d998f3fe7435_96.mp4"
      },
      {
        "quality": "160kbps",
        "url": "https://aac.saavncdn.com/086/caca5b891583be77cb36d998f3fe7435_160.mp4"
      },
      {
        "quality": "320kbps",
        "url": "https://aac.saavncdn.com/086/caca5b891583be77cb36d998f3fe7435_320.mp4"
      }
    ]
  },
  {
    "id": "jYhoRWbC",
    "name": "Massu Maranam (From &quot;Petta (Telugu)&quot;)",
    "type": "song",
    "year": "2018",
    "releaseDate": null,
    "duration": 216,
    "label": "Sony Music Entertainment India Pvt. Ltd.",
    "explicitContent": false,
    "playCount": 5821993,
    "language": "telugu",
    "hasLyrics": false,
    "lyricsId": null,
    "url": "https://www.jiosaavn.com/song/massu-maranam-from-petta-telugu/GjEDXiZnVXA",
    "copyright": "(P) 2018 Sony Music Entertainment India Pvt. Ltd.",
    "album": {
      "id": "14685332",
      "name": "Petta (Telugu) (Original Motion Picture Soundtrack)",
      "url": "https://www.jiosaavn.com/album/petta-telugu-original-motion-picture-soundtrack/btg3Cf78lp4_"
    },
    "artists": {
      "primary": [
        {
          "id": "455663",
          "name": "Anirudh Ravichander",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/anirudh-ravichander-songs/lBzQd8c-xCY_"
        },
        {
          "id": "455270",
          "name": "Mano",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Mano_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Mano_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Mano_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/mano-songs/4wKto0-DIr0_"
        }
      ],
      "featured": [],
      "all": [
        {
          "id": "455663",
          "name": "Anirudh Ravichander",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/anirudh-ravichander-songs/lBzQd8c-xCY_"
        },
        {
          "id": "455663",
          "name": "Anirudh Ravichander",
          "role": "singer",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/anirudh-ravichander-songs/lBzQd8c-xCY_"
        },
        {
          "id": "455270",
          "name": "Mano",
          "role": "singer",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Mano_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Mano_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Mano_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/mano-songs/4wKto0-DIr0_"
        },
        {
          "id": "456746",
          "name": "Ananta Sriram",
          "role": "lyricist",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Anantha_Sriram_20180502124137_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Anantha_Sriram_20180502124137_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Anantha_Sriram_20180502124137_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/ananta-sriram-songs/PcZ7QTA-ErU_"
        },
        {
          "id": "457969",
          "name": "Rajinikanth",
          "role": "starring",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Rajinikanth_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Rajinikanth_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Rajinikanth_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/rajinikanth-songs/E-hZmoCP5VU_"
        },
        {
          "id": "792620",
          "name": "Simran Bagga",
          "role": "starring",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/simran-bagga-songs/qW4QOfGEC7Q_"
        }
      ]
    },
    "image": [
      {
        "quality": "50x50",
        "url": "https://c.saavncdn.com/699/Petta-Telugu--Telugu-2018-20181220071359-50x50.jpg"
      },
      {
        "quality": "150x150",
        "url": "https://c.saavncdn.com/699/Petta-Telugu--Telugu-2018-20181220071359-150x150.jpg"
      },
      {
        "quality": "500x500",
        "url": "https://c.saavncdn.com/699/Petta-Telugu--Telugu-2018-20181220071359-500x500.jpg"
      }
    ],
    "downloadUrl": [
      {
        "quality": "12kbps",
        "url": "https://aac.saavncdn.com/699/e80638202684ecce1ac1c2b2168ab442_12.mp4"
      },
      {
        "quality": "48kbps",
        "url": "https://aac.saavncdn.com/699/e80638202684ecce1ac1c2b2168ab442_48.mp4"
      },
      {
        "quality": "96kbps",
        "url": "https://aac.saavncdn.com/699/e80638202684ecce1ac1c2b2168ab442_96.mp4"
      },
      {
        "quality": "160kbps",
        "url": "https://aac.saavncdn.com/699/e80638202684ecce1ac1c2b2168ab442_160.mp4"
      },
      {
        "quality": "320kbps",
        "url": "https://aac.saavncdn.com/699/e80638202684ecce1ac1c2b2168ab442_320.mp4"
      }
    ]
  },
  {
    "id": "Ly0iQIo6",
    "name": "Masstaani",
    "type": "song",
    "year": "2019",
    "releaseDate": null,
    "duration": 254,
    "label": "Speed Records",
    "explicitContent": false,
    "playCount": 8992731,
    "language": "punjabi",
    "hasLyrics": true,
    "lyricsId": null,
    "url": "https://www.jiosaavn.com/song/masstaani/PBFbWCV5WAU",
    "copyright": "© 2019 Speed Records",
    "album": {
      "id": "14923074",
      "name": "Masstaani",
      "url": "https://www.jiosaavn.com/album/masstaani/llzUW2rXvcQ_"
    },
    "artists": {
      "primary": [
        {
          "id": "788130",
          "name": "B Praak",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/B_Praak_001_20191118112005_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/B_Praak_001_20191118112005_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/B_Praak_001_20191118112005_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/b-praak-songs/CfABr-vmQdw_"
        }
      ],
      "featured": [],
      "all": [
        {
          "id": "788130",
          "name": "B Praak",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/B_Praak_001_20191118112005_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/B_Praak_001_20191118112005_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/B_Praak_001_20191118112005_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/b-praak-songs/CfABr-vmQdw_"
        },
        {
          "id": "788130",
          "name": "B Praak",
          "role": "singer",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/B_Praak_001_20191118112005_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/B_Praak_001_20191118112005_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/B_Praak_001_20191118112005_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/b-praak-songs/CfABr-vmQdw_"
        },
        {
          "id": "680475",
          "name": "Jaani",
          "role": "lyricist",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Jaani_002_20240516064211_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Jaani_002_20240516064211_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Jaani_002_20240516064211_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/jaani-songs/a0Vk-AlzJu8_"
        }
      ]
    },
    "image": [
      {
        "quality": "50x50",
        "url": "https://c.saavncdn.com/845/Masstaani-Punjabi-2019-20190122151435-50x50.jpg"
      },
      {
        "quality": "150x150",
        "url": "https://c.saavncdn.com/845/Masstaani-Punjabi-2019-20190122151435-150x150.jpg"
      },
      {
        "quality": "500x500",
        "url": "https://c.saavncdn.com/845/Masstaani-Punjabi-2019-20190122151435-500x500.jpg"
      }
    ],
    "downloadUrl": [
      {
        "quality": "12kbps",
        "url": "https://aac.saavncdn.com/845/ee9593b2c7b03e378016c849e3d407e9_12.mp4"
      },
      {
        "quality": "48kbps",
        "url": "https://aac.saavncdn.com/845/ee9593b2c7b03e378016c849e3d407e9_48.mp4"
      },
      {
        "quality": "96kbps",
        "url": "https://aac.saavncdn.com/845/ee9593b2c7b03e378016c849e3d407e9_96.mp4"
      },
      {
        "quality": "160kbps",
        "url": "https://aac.saavncdn.com/845/ee9593b2c7b03e378016c849e3d407e9_160.mp4"
      },
      {
        "quality": "320kbps",
        "url": "https://aac.saavncdn.com/845/ee9593b2c7b03e378016c849e3d407e9_320.mp4"
      }
    ]
  },
  {
    "id": "gRqEdZja",
    "name": "Marana Mass (From &quot;Petta&quot;)",
    "type": "song",
    "year": "2018",
    "releaseDate": null,
    "duration": 216,
    "label": "Sony Music Entertainment India Pvt. Ltd.",
    "explicitContent": false,
    "playCount": 24319164,
    "language": "tamil",
    "hasLyrics": true,
    "lyricsId": null,
    "url": "https://www.jiosaavn.com/song/marana-mass-from-petta/FzoadBBqXVI",
    "copyright": "(P) 2018 Sony Music Entertainment India Pvt. Ltd.",
    "album": {
      "id": "14570310",
      "name": "Marana Mass (From &quot;Petta&quot;)",
      "url": "https://www.jiosaavn.com/album/marana-mass-from-petta/cvC7G436Kco_"
    },
    "artists": {
      "primary": [
        {
          "id": "455663",
          "name": "Anirudh Ravichander",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/anirudh-ravichander-songs/lBzQd8c-xCY_"
        },
        {
          "id": "741999",
          "name": "S. P. Balasubrahmanyam",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/S_P_Balasubrahmanyam_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/S_P_Balasubrahmanyam_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/S_P_Balasubrahmanyam_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/s.-p.-balasubrahmanyam-songs/Ix5AC5h7LSg_"
        }
      ],
      "featured": [],
      "all": [
        {
          "id": "455663",
          "name": "Anirudh Ravichander",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/anirudh-ravichander-songs/lBzQd8c-xCY_"
        },
        {
          "id": "455663",
          "name": "Anirudh Ravichander",
          "role": "singer",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/anirudh-ravichander-songs/lBzQd8c-xCY_"
        },
        {
          "id": "741999",
          "name": "S. P. Balasubrahmanyam",
          "role": "singer",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/S_P_Balasubrahmanyam_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/S_P_Balasubrahmanyam_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/S_P_Balasubrahmanyam_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/s.-p.-balasubrahmanyam-songs/Ix5AC5h7LSg_"
        },
        {
          "id": "5755241",
          "name": "Anirudh Ravichander &amp; S.P. Balasubrahmanyam",
          "role": "singer",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/anirudh-ravichander-s.p.-balasubrahmanyam-songs/-IcPdiXTBzs_"
        },
        {
          "id": "489907",
          "name": "Vivek",
          "role": "lyricist",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/294/Swamy-Saranam-Ayyappa-Malayalam-Malayalam-2009-50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/294/Swamy-Saranam-Ayyappa-Malayalam-Malayalam-2009-150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/294/Swamy-Saranam-Ayyappa-Malayalam-Malayalam-2009-500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/vivek-songs/2jAsGY5wW4s_"
        },
        {
          "id": "457969",
          "name": "Rajinikanth",
          "role": "starring",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Rajinikanth_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Rajinikanth_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Rajinikanth_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/rajinikanth-songs/E-hZmoCP5VU_"
        },
        {
          "id": "792620",
          "name": "Simran Bagga",
          "role": "starring",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/simran-bagga-songs/qW4QOfGEC7Q_"
        }
      ]
    },
    "image": [
      {
        "quality": "50x50",
        "url": "https://c.saavncdn.com/479/Marana-Mass-From-Petta--Tamil-2018-20181207063608-50x50.jpg"
      },
      {
        "quality": "150x150",
        "url": "https://c.saavncdn.com/479/Marana-Mass-From-Petta--Tamil-2018-20181207063608-150x150.jpg"
      },
      {
        "quality": "500x500",
        "url": "https://c.saavncdn.com/479/Marana-Mass-From-Petta--Tamil-2018-20181207063608-500x500.jpg"
      }
    ],
    "downloadUrl": [
      {
        "quality": "12kbps",
        "url": "https://aac.saavncdn.com/479/5161a0e860ed2482d7540e7f1fafd309_12.mp4"
      },
      {
        "quality": "48kbps",
        "url": "https://aac.saavncdn.com/479/5161a0e860ed2482d7540e7f1fafd309_48.mp4"
      },
      {
        "quality": "96kbps",
        "url": "https://aac.saavncdn.com/479/5161a0e860ed2482d7540e7f1fafd309_96.mp4"
      },
      {
        "quality": "160kbps",
        "url": "https://aac.saavncdn.com/479/5161a0e860ed2482d7540e7f1fafd309_160.mp4"
      },
      {
        "quality": "320kbps",
        "url": "https://aac.saavncdn.com/479/5161a0e860ed2482d7540e7f1fafd309_320.mp4"
      }
    ]
  },
  {
    "id": "VlZYRcfQ",
    "name": "Mastaaru Mastaaru",
    "type": "song",
    "year": "2022",
    "releaseDate": null,
    "duration": 225,
    "label": "Aditya Music",
    "explicitContent": false,
    "playCount": 55843282,
    "language": "telugu",
    "hasLyrics": true,
    "lyricsId": null,
    "url": "https://www.jiosaavn.com/song/mastaaru-mastaaru/JgQxaCZTUWI",
    "copyright": "© 2023 Aditya Music",
    "album": {
      "id": "39831026",
      "name": "Sir",
      "url": "https://www.jiosaavn.com/album/sir/T0ftvKZ4Akw_"
    },
    "artists": {
      "primary": [
        {
          "id": "455454",
          "name": "G.V. Prakash Kumar",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/G_V__Prakash_Kumar_002_20230609103801_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/G_V__Prakash_Kumar_002_20230609103801_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/G_V__Prakash_Kumar_002_20230609103801_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/g.v.-prakash-kumar-songs/b2CMYiogn3E_"
        },
        {
          "id": "505320",
          "name": "Shweta Mohan",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Shweta_Mohan_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Shweta_Mohan_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Shweta_Mohan_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/shweta-mohan-songs/X6g,E4O9qX4_"
        }
      ],
      "featured": [],
      "all": [
        {
          "id": "455454",
          "name": "G.V. Prakash Kumar",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/G_V__Prakash_Kumar_002_20230609103801_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/G_V__Prakash_Kumar_002_20230609103801_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/G_V__Prakash_Kumar_002_20230609103801_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/g.v.-prakash-kumar-songs/b2CMYiogn3E_"
        },
        {
          "id": "455454",
          "name": "G.V. Prakash Kumar",
          "role": "singer",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/G_V__Prakash_Kumar_002_20230609103801_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/G_V__Prakash_Kumar_002_20230609103801_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/G_V__Prakash_Kumar_002_20230609103801_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/g.v.-prakash-kumar-songs/b2CMYiogn3E_"
        },
        {
          "id": "505320",
          "name": "Shweta Mohan",
          "role": "singer",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Shweta_Mohan_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Shweta_Mohan_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Shweta_Mohan_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/shweta-mohan-songs/X6g,E4O9qX4_"
        },
        {
          "id": "455178",
          "name": "Ramajogayya Sastry",
          "role": "lyricist",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Ramajogayya_Sastry_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Ramajogayya_Sastry_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Ramajogayya_Sastry_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/ramajogayya-sastry-songs/TDgyy8jb,eQ_"
        },
        {
          "id": "455662",
          "name": "Dhanush",
          "role": "starring",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Dhanush_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Dhanush_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Dhanush_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/dhanush-songs/RFaelly2oNI_"
        },
        {
          "id": "4621701",
          "name": "Samyuktha Menon",
          "role": "starring",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Samyuktha_Menon_20190312092907_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Samyuktha_Menon_20190312092907_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Samyuktha_Menon_20190312092907_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/samyuktha-menon-songs/kUAewxJ7jkQ_"
        }
      ]
    },
    "image": [
      {
        "quality": "50x50",
        "url": "https://c.saavncdn.com/blob/026/Sir-Telugu-2022-20230211174608-50x50.jpg"
      },
      {
        "quality": "150x150",
        "url": "https://c.saavncdn.com/blob/026/Sir-Telugu-2022-20230211174608-150x150.jpg"
      },
      {
        "quality": "500x500",
        "url": "https://c.saavncdn.com/blob/026/Sir-Telugu-2022-20230211174608-500x500.jpg"
      }
    ],
    "downloadUrl": [
      {
        "quality": "12kbps",
        "url": "https://aac.saavncdn.com/000/be9f5d9003cc9114189bc6c3551e4743_12.mp4"
      },
      {
        "quality": "48kbps",
        "url": "https://aac.saavncdn.com/000/be9f5d9003cc9114189bc6c3551e4743_48.mp4"
      },
      {
        "quality": "96kbps",
        "url": "https://aac.saavncdn.com/000/be9f5d9003cc9114189bc6c3551e4743_96.mp4"
      },
      {
        "quality": "160kbps",
        "url": "https://aac.saavncdn.com/000/be9f5d9003cc9114189bc6c3551e4743_160.mp4"
      },
      {
        "quality": "320kbps",
        "url": "https://aac.saavncdn.com/000/be9f5d9003cc9114189bc6c3551e4743_320.mp4"
      }
    ]
  },
  {
    "id": "yU_Zx3mf",
    "name": "Dum Masala",
    "type": "song",
    "year": "2023",
    "releaseDate": null,
    "duration": 206,
    "label": "Aditya Music",
    "explicitContent": false,
    "playCount": 16162087,
    "language": "telugu",
    "hasLyrics": true,
    "lyricsId": null,
    "url": "https://www.jiosaavn.com/song/dum-masala/CT00awwDWlU",
    "copyright": "© 2023 Aditya Music",
    "album": {
      "id": "49567583",
      "name": "Guntur Kaaram",
      "url": "https://www.jiosaavn.com/album/guntur-kaaram/d28KxzEcK-Q_"
    },
    "artists": {
      "primary": [
        {
          "id": "544471",
          "name": "Thaman S",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Thaman_S__007_20231106094011_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Thaman_S__007_20231106094011_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Thaman_S__007_20231106094011_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/thaman-s-songs/WEGez,XokRM_"
        },
        {
          "id": "3560654",
          "name": "Sanjith Hegde",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Sanjith_Hegde_002_20230413072406_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Sanjith_Hegde_002_20230413072406_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Sanjith_Hegde_002_20230413072406_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/sanjith-hegde-songs/VuV2sMTbXe8_"
        }
      ],
      "featured": [],
      "all": [
        {
          "id": "544471",
          "name": "Thaman S",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Thaman_S__007_20231106094011_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Thaman_S__007_20231106094011_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Thaman_S__007_20231106094011_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/thaman-s-songs/WEGez,XokRM_"
        },
        {
          "id": "544471",
          "name": "Thaman S",
          "role": "singer",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Thaman_S__007_20231106094011_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Thaman_S__007_20231106094011_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Thaman_S__007_20231106094011_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/thaman-s-songs/WEGez,XokRM_"
        },
        {
          "id": "3560654",
          "name": "Sanjith Hegde",
          "role": "singer",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Sanjith_Hegde_002_20230413072406_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Sanjith_Hegde_002_20230413072406_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Sanjith_Hegde_002_20230413072406_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/sanjith-hegde-songs/VuV2sMTbXe8_"
        },
        {
          "id": "455178",
          "name": "Ramajogayya Sastry",
          "role": "lyricist",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Ramajogayya_Sastry_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Ramajogayya_Sastry_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Ramajogayya_Sastry_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/ramajogayya-sastry-songs/TDgyy8jb,eQ_"
        },
        {
          "id": "461646",
          "name": "Mahesh Babu",
          "role": "starring",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Mahesh_Babu_002_20240625102633_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Mahesh_Babu_002_20240625102633_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Mahesh_Babu_002_20240625102633_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/mahesh-babu-songs/YUoW7QRKAE8_"
        },
        {
          "id": "11731368",
          "name": "Sreeleela",
          "role": "starring",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Sreeleela_001_20240624192020_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Sreeleela_001_20240624192020_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Sreeleela_001_20240624192020_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/sreeleela-songs/bia9,ngjEOc_"
        },
        {
          "id": "11455690",
          "name": "Meenakshii Chaudhary",
          "role": "starring",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Meenakshi_Chaudhary_000_20220216131341_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Meenakshi_Chaudhary_000_20220216131341_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Meenakshi_Chaudhary_000_20220216131341_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/meenakshii-chaudhary-songs/JGq3ibCBzls_"
        }
      ]
    },
    "image": [
      {
        "quality": "50x50",
        "url": "https://c.saavncdn.com/000/Guntur-Kaaram-Telugu-2023-20240126145901-50x50.jpg"
      },
      {
        "quality": "150x150",
        "url": "https://c.saavncdn.com/000/Guntur-Kaaram-Telugu-2023-20240126145901-150x150.jpg"
      },
      {
        "quality": "500x500",
        "url": "https://c.saavncdn.com/000/Guntur-Kaaram-Telugu-2023-20240126145901-500x500.jpg"
      }
    ],
    "downloadUrl": [
      {
        "quality": "12kbps",
        "url": "https://aac.saavncdn.com/000/a20063ed2317350eb8f7e13728847e40_12.mp4"
      },
      {
        "quality": "48kbps",
        "url": "https://aac.saavncdn.com/000/a20063ed2317350eb8f7e13728847e40_48.mp4"
      },
      {
        "quality": "96kbps",
        "url": "https://aac.saavncdn.com/000/a20063ed2317350eb8f7e13728847e40_96.mp4"
      },
      {
        "quality": "160kbps",
        "url": "https://aac.saavncdn.com/000/a20063ed2317350eb8f7e13728847e40_160.mp4"
      },
      {
        "quality": "320kbps",
        "url": "https://aac.saavncdn.com/000/a20063ed2317350eb8f7e13728847e40_320.mp4"
      }
    ]
  },
  {
    "id": "Ota9Iw3S",
    "name": "The Mass Of Power Paandi - Soorakaathu",
    "type": "song",
    "year": "2017",
    "releaseDate": null,
    "duration": 173,
    "label": "Divo TV Private Limited",
    "explicitContent": false,
    "playCount": 1153122,
    "language": "tamil",
    "hasLyrics": true,
    "lyricsId": null,
    "url": "https://www.jiosaavn.com/song/the-mass-of-power-paandi-soorakaathu/PxwKCD1HBGA",
    "copyright": "℗ 2017 Divo Tv Private Limited",
    "album": {
      "id": "10367384",
      "name": "Power Paandi",
      "url": "https://www.jiosaavn.com/album/power-paandi/BAHNSYM6PXA_"
    },
    "artists": {
      "primary": [
        {
          "id": "455662",
          "name": "Dhanush",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Dhanush_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Dhanush_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Dhanush_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/dhanush-songs/RFaelly2oNI_"
        }
      ],
      "featured": [],
      "all": [
        {
          "id": "455662",
          "name": "Dhanush",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Dhanush_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Dhanush_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Dhanush_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/dhanush-songs/RFaelly2oNI_"
        },
        {
          "id": "718103",
          "name": "Sean Roldan",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Sean_Roldan_002_20240319071510_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Sean_Roldan_002_20240319071510_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Sean_Roldan_002_20240319071510_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/sean-roldan-songs/qCcNJ,PyWBw_"
        }
      ]
    },
    "image": [
      {
        "quality": "50x50",
        "url": "https://c.saavncdn.com/658/Power-Paandi-Tamil-2017-20240809164858-50x50.jpg"
      },
      {
        "quality": "150x150",
        "url": "https://c.saavncdn.com/658/Power-Paandi-Tamil-2017-20240809164858-150x150.jpg"
      },
      {
        "quality": "500x500",
        "url": "https://c.saavncdn.com/658/Power-Paandi-Tamil-2017-20240809164858-500x500.jpg"
      }
    ],
    "downloadUrl": [
      {
        "quality": "12kbps",
        "url": "https://aac.saavncdn.com/658/63b2347159a44ef41296559f0433a556_12.mp4"
      },
      {
        "quality": "48kbps",
        "url": "https://aac.saavncdn.com/658/63b2347159a44ef41296559f0433a556_48.mp4"
      },
      {
        "quality": "96kbps",
        "url": "https://aac.saavncdn.com/658/63b2347159a44ef41296559f0433a556_96.mp4"
      },
      {
        "quality": "160kbps",
        "url": "https://aac.saavncdn.com/658/63b2347159a44ef41296559f0433a556_160.mp4"
      },
      {
        "quality": "320kbps",
        "url": "https://aac.saavncdn.com/658/63b2347159a44ef41296559f0433a556_320.mp4"
      }
    ]
  },
  {
    "id": "d-O4NgD6",
    "name": "Mast Magan",
    "type": "song",
    "year": "2014",
    "releaseDate": null,
    "duration": 280,
    "label": "T-Series",
    "explicitContent": false,
    "playCount": 119205087,
    "language": "hindi",
    "hasLyrics": true,
    "lyricsId": null,
    "url": "https://www.jiosaavn.com/song/mast-magan/FEUkBTpXcwU",
    "copyright": "©  2014 T-Series",
    "album": {
      "id": "1152075",
      "name": "2 States",
      "url": "https://www.jiosaavn.com/album/2-states/IZ-74lIYo14_"
    },
    "artists": {
      "primary": [
        {
          "id": "455280",
          "name": "Shankar-Ehsaan-Loy",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Shankar_Ehsaan_Loy_002_20231107064353_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Shankar_Ehsaan_Loy_002_20231107064353_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Shankar_Ehsaan_Loy_002_20231107064353_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/shankar-ehsaan-loy-songs/gaOQwwdJkNo_"
        },
        {
          "id": "459320",
          "name": "Arijit Singh",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Arijit_Singh_002_20230323062147_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Arijit_Singh_002_20230323062147_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Arijit_Singh_002_20230323062147_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/arijit-singh-songs/LlRWpHzy3Hk_"
        },
        {
          "id": "1984879",
          "name": "Chinmayi Sripada",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Chinmayi_Sripaada_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Chinmayi_Sripaada_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Chinmayi_Sripaada_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/chinmayi-sripada-songs/dUPdrrGYfPk_"
        }
      ],
      "featured": [],
      "all": [
        {
          "id": "455280",
          "name": "Shankar-Ehsaan-Loy",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Shankar_Ehsaan_Loy_002_20231107064353_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Shankar_Ehsaan_Loy_002_20231107064353_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Shankar_Ehsaan_Loy_002_20231107064353_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/shankar-ehsaan-loy-songs/gaOQwwdJkNo_"
        },
        {
          "id": "459320",
          "name": "Arijit Singh",
          "role": "singer",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Arijit_Singh_002_20230323062147_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Arijit_Singh_002_20230323062147_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Arijit_Singh_002_20230323062147_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/arijit-singh-songs/LlRWpHzy3Hk_"
        },
        {
          "id": "1984879",
          "name": "Chinmayi Sripada",
          "role": "singer",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Chinmayi_Sripaada_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Chinmayi_Sripaada_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Chinmayi_Sripaada_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/chinmayi-sripada-songs/dUPdrrGYfPk_"
        },
        {
          "id": "458681",
          "name": "Amitabh Bhattacharya",
          "role": "lyricist",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Amitabh_Bhattacharya_000_20220916184017.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Amitabh_Bhattacharya_000_20220916184017.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Amitabh_Bhattacharya_000_20220916184017.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/amitabh-bhattacharya-songs/hsNRL6ZmJmo_"
        },
        {
          "id": "473371",
          "name": "Arjun Kapoor",
          "role": "starring",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Arjun_Kapoor_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Arjun_Kapoor_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Arjun_Kapoor_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/arjun-kapoor-songs/xS,nRhjt3Tk_"
        },
        {
          "id": "511658",
          "name": "Alia Bhatt",
          "role": "starring",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Alia_Bhatt_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Alia_Bhatt_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Alia_Bhatt_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/alia-bhatt-songs/,henzzVDXDQ_"
        },
        {
          "id": "455634",
          "name": "Amrita Singh",
          "role": "starring",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Amrita_Singh_20191127083227_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Amrita_Singh_20191127083227_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Amrita_Singh_20191127083227_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/amrita-singh-songs/8V2RIx7NWW0_"
        },
        {
          "id": "455319",
          "name": "Ronit Roy",
          "role": "starring",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/808/Visva-Vina-Music-Of-The-Universe-2002-50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/808/Visva-Vina-Music-Of-The-Universe-2002-150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/808/Visva-Vina-Music-Of-The-Universe-2002-500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/ronit-roy-songs/9j,km7GWK8M_"
        }
      ]
    },
    "image": [
      {
        "quality": "50x50",
        "url": "https://c.saavncdn.com/930/2-States-2014-50x50.jpg"
      },
      {
        "quality": "150x150",
        "url": "https://c.saavncdn.com/930/2-States-2014-150x150.jpg"
      },
      {
        "quality": "500x500",
        "url": "https://c.saavncdn.com/930/2-States-2014-500x500.jpg"
      }
    ],
    "downloadUrl": [
      {
        "quality": "12kbps",
        "url": "https://aac.saavncdn.com/930/951f2d707e9ea617fce5e5d8338393ae_12.mp4"
      },
      {
        "quality": "48kbps",
        "url": "https://aac.saavncdn.com/930/951f2d707e9ea617fce5e5d8338393ae_48.mp4"
      },
      {
        "quality": "96kbps",
        "url": "https://aac.saavncdn.com/930/951f2d707e9ea617fce5e5d8338393ae_96.mp4"
      },
      {
        "quality": "160kbps",
        "url": "https://aac.saavncdn.com/930/951f2d707e9ea617fce5e5d8338393ae_160.mp4"
      },
      {
        "quality": "320kbps",
        "url": "https://aac.saavncdn.com/930/951f2d707e9ea617fce5e5d8338393ae_320.mp4"
      }
    ]
  },
  {
    "id": "P83tzfL4",
    "name": "Deewani Mastani",
    "type": "song",
    "year": "2015",
    "releaseDate": null,
    "duration": 339,
    "label": "Eros Now Music",
    "explicitContent": false,
    "playCount": 7899850,
    "language": "hindi",
    "hasLyrics": false,
    "lyricsId": null,
    "url": "https://www.jiosaavn.com/song/deewani-mastani/IFBYRQ5Wewc",
    "copyright": "(P) 2015 Eros Now Music",
    "album": {
      "id": "33276288",
      "name": "Bajirao Mastani",
      "url": "https://www.jiosaavn.com/album/bajirao-mastani/TwpAYSvPokU_"
    },
    "artists": {
      "primary": [
        {
          "id": "455130",
          "name": "Shreya Ghoshal",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Shreya_Ghoshal_006_20240318080459_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Shreya_Ghoshal_006_20240318080459_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Shreya_Ghoshal_006_20240318080459_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/shreya-ghoshal-songs/lIHlwHaxTZ0_"
        },
        {
          "id": "776509",
          "name": "Ganesh Chandanshive",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/732/Bajirao-Mastani-Hindi-2015-50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/732/Bajirao-Mastani-Hindi-2015-150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/732/Bajirao-Mastani-Hindi-2015-500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/ganesh-chandanshive-songs/VGNCdUgb2bw_"
        },
        {
          "id": "594048",
          "name": "Mujtaba Aziz Naza",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/986/Hasbi-Rabbi-Naat-From-Marjaavaan--Hindi-2019-20191127231544-50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/986/Hasbi-Rabbi-Naat-From-Marjaavaan--Hindi-2019-20191127231544-150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/986/Hasbi-Rabbi-Naat-From-Marjaavaan--Hindi-2019-20191127231544-500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/mujtaba-aziz-naza-songs/xGFnEQY5CL4_"
        },
        {
          "id": "595114",
          "name": "Farhan Sabri",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/074/Mohabbat-Hindi-2018-20181128172239-50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/074/Mohabbat-Hindi-2018-20181128172239-150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/074/Mohabbat-Hindi-2018-20181128172239-500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/farhan-sabri-songs/kLCQl5iOwoU_"
        },
        {
          "id": "677149",
          "name": "Siddharth Garima",
          "role": "primary_artists",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/siddharth-garima-songs/ftVD5tjFzrs_"
        },
        {
          "id": "459232",
          "name": "Nasir Faraaz",
          "role": "primary_artists",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/nasir-faraaz-songs/Zp4nxvpF9Hs_"
        },
        {
          "id": "459325",
          "name": "Shadab Faridi",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Shadab_Faridi_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Shadab_Faridi_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Shadab_Faridi_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/shadab-faridi-songs/IcPgWuDD3N4_"
        },
        {
          "id": "481520",
          "name": "Altamash Faridi",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Altamash_Faridi_002_20240429085417_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Altamash_Faridi_002_20240429085417_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Altamash_Faridi_002_20240429085417_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/altamash-faridi-songs/OmA4hfy6YiM_"
        }
      ],
      "featured": [],
      "all": [
        {
          "id": "455130",
          "name": "Shreya Ghoshal",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Shreya_Ghoshal_006_20240318080459_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Shreya_Ghoshal_006_20240318080459_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Shreya_Ghoshal_006_20240318080459_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/shreya-ghoshal-songs/lIHlwHaxTZ0_"
        },
        {
          "id": "776509",
          "name": "Ganesh Chandanshive",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/732/Bajirao-Mastani-Hindi-2015-50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/732/Bajirao-Mastani-Hindi-2015-150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/732/Bajirao-Mastani-Hindi-2015-500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/ganesh-chandanshive-songs/VGNCdUgb2bw_"
        },
        {
          "id": "594048",
          "name": "Mujtaba Aziz Naza",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/986/Hasbi-Rabbi-Naat-From-Marjaavaan--Hindi-2019-20191127231544-50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/986/Hasbi-Rabbi-Naat-From-Marjaavaan--Hindi-2019-20191127231544-150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/986/Hasbi-Rabbi-Naat-From-Marjaavaan--Hindi-2019-20191127231544-500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/mujtaba-aziz-naza-songs/xGFnEQY5CL4_"
        },
        {
          "id": "459325",
          "name": "Shadab Faridi",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Shadab_Faridi_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Shadab_Faridi_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Shadab_Faridi_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/shadab-faridi-songs/IcPgWuDD3N4_"
        },
        {
          "id": "481520",
          "name": "Altamash Faridi",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Altamash_Faridi_002_20240429085417_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Altamash_Faridi_002_20240429085417_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Altamash_Faridi_002_20240429085417_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/altamash-faridi-songs/OmA4hfy6YiM_"
        },
        {
          "id": "595114",
          "name": "Farhan Sabri",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/074/Mohabbat-Hindi-2018-20181128172239-50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/074/Mohabbat-Hindi-2018-20181128172239-150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/074/Mohabbat-Hindi-2018-20181128172239-500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/farhan-sabri-songs/kLCQl5iOwoU_"
        },
        {
          "id": "677149",
          "name": "Siddharth Garima",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/siddharth-garima-songs/ftVD5tjFzrs_"
        },
        {
          "id": "459232",
          "name": "Nasir Faraaz",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/nasir-faraaz-songs/Zp4nxvpF9Hs_"
        },
        {
          "id": "464882",
          "name": "Sanjay Leela Bhansali",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Sanjay_Leela_Bhansali_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Sanjay_Leela_Bhansali_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Sanjay_Leela_Bhansali_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/sanjay-leela-bhansali-songs/jffFT7ULsxg_"
        },
        {
          "id": "776509",
          "name": "Ganesh Chandanshive",
          "role": "lyricist",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/732/Bajirao-Mastani-Hindi-2015-50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/732/Bajirao-Mastani-Hindi-2015-150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/732/Bajirao-Mastani-Hindi-2015-500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/ganesh-chandanshive-songs/VGNCdUgb2bw_"
        },
        {
          "id": "677149",
          "name": "Siddharth Garima",
          "role": "lyricist",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/siddharth-garima-songs/ftVD5tjFzrs_"
        },
        {
          "id": "459232",
          "name": "Nasir Faraaz",
          "role": "lyricist",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/nasir-faraaz-songs/Zp4nxvpF9Hs_"
        },
        {
          "id": "464882",
          "name": "Sanjay Leela Bhansali",
          "role": "lyricist",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Sanjay_Leela_Bhansali_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Sanjay_Leela_Bhansali_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Sanjay_Leela_Bhansali_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/sanjay-leela-bhansali-songs/jffFT7ULsxg_"
        },
        {
          "id": "469703",
          "name": "A.M. Turaz",
          "role": "lyricist",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/a.m.-turaz-songs/3MHSTgRWdQA_"
        },
        {
          "id": "467238",
          "name": "Prashant Ingole",
          "role": "lyricist",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Prashant_Ingole_003_20211214132313_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Prashant_Ingole_003_20211214132313_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Prashant_Ingole_003_20211214132313_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/prashant-ingole-songs/P71HNkqAwBI_"
        }
      ]
    },
    "image": [
      {
        "quality": "50x50",
        "url": "https://c.saavncdn.com/324/Bajirao-Mastani-Hindi-2015-20230901132949-50x50.jpg"
      },
      {
        "quality": "150x150",
        "url": "https://c.saavncdn.com/324/Bajirao-Mastani-Hindi-2015-20230901132949-150x150.jpg"
      },
      {
        "quality": "500x500",
        "url": "https://c.saavncdn.com/324/Bajirao-Mastani-Hindi-2015-20230901132949-500x500.jpg"
      }
    ],
    "downloadUrl": [
      {
        "quality": "12kbps",
        "url": "https://aac.saavncdn.com/324/28f261216f885485262ab852136757cf_12.mp4"
      },
      {
        "quality": "48kbps",
        "url": "https://aac.saavncdn.com/324/28f261216f885485262ab852136757cf_48.mp4"
      },
      {
        "quality": "96kbps",
        "url": "https://aac.saavncdn.com/324/28f261216f885485262ab852136757cf_96.mp4"
      },
      {
        "quality": "160kbps",
        "url": "https://aac.saavncdn.com/324/28f261216f885485262ab852136757cf_160.mp4"
      },
      {
        "quality": "320kbps",
        "url": "https://aac.saavncdn.com/324/28f261216f885485262ab852136757cf_320.mp4"
      }
    ]
  },
  {
    "id": "qcPyT233",
    "name": "Radha Rani (Bhajan Mashup)",
    "type": "song",
    "year": "2022",
    "releaseDate": null,
    "duration": 544,
    "label": "The Brajkeepers Studio",
    "explicitContent": false,
    "playCount": 7401215,
    "language": "hindi",
    "hasLyrics": false,
    "lyricsId": null,
    "url": "https://www.jiosaavn.com/song/radha-rani-bhajan-mashup/AQs7SCACBAA",
    "copyright": "(P) 2022 The Brajkeepers Studio",
    "album": {
      "id": "37856155",
      "name": "Radha Rani (Bhajan Mashup)",
      "url": "https://www.jiosaavn.com/album/radha-rani-bhajan-mashup/JsUGfZBASH0_"
    },
    "artists": {
      "primary": [
        {
          "id": "1946214",
          "name": "Dhruv Sharma",
          "role": "primary_artists",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Dhruv_Sharma_20180214073539_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Dhruv_Sharma_20180214073539_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Dhruv_Sharma_20180214073539_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/dhruv-sharma-songs/iu4JQ9Okcto_"
        },
        {
          "id": "13002068",
          "name": "Swarna Shri",
          "role": "primary_artists",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/swarna-shri-songs/NRxmOXnyD5Y_"
        }
      ],
      "featured": [],
      "all": [
        {
          "id": "1946214",
          "name": "Dhruv Sharma",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/artists/Dhruv_Sharma_20180214073539_50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/artists/Dhruv_Sharma_20180214073539_150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/artists/Dhruv_Sharma_20180214073539_500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/dhruv-sharma-songs/iu4JQ9Okcto_"
        },
        {
          "id": "13002068",
          "name": "Swarna Shri",
          "role": "music",
          "image": [],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/swarna-shri-songs/NRxmOXnyD5Y_"
        },
        {
          "id": "455090",
          "name": "Traditional",
          "role": "music",
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/186/Krishna-Bhajans-Hindi-2010-50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/186/Krishna-Bhajans-Hindi-2010-150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/186/Krishna-Bhajans-Hindi-2010-500x500.jpg"
            }
          ],
          "type": "artist",
          "url": "https://www.jiosaavn.com/artist/traditional-songs/1W8p9iMeXm4_"
        }
      ]
    },
    "image": [
      {
        "quality": "50x50",
        "url": "https://c.saavncdn.com/788/Radha-Rani-Bhajan-Mashup-Hindi-2022-20220902020355-50x50.jpg"
      },
      {
        "quality": "150x150",
        "url": "https://c.saavncdn.com/788/Radha-Rani-Bhajan-Mashup-Hindi-2022-20220902020355-150x150.jpg"
      },
      {
        "quality": "500x500",
        "url": "https://c.saavncdn.com/788/Radha-Rani-Bhajan-Mashup-Hindi-2022-20220902020355-500x500.jpg"
      }
    ],
    "downloadUrl": [
      {
        "quality": "12kbps",
        "url": "https://aac.saavncdn.com/788/154a859adda5bd1b831dea58ce4942a3_12.mp4"
      },
      {
        "quality": "48kbps",
        "url": "https://aac.saavncdn.com/788/154a859adda5bd1b831dea58ce4942a3_48.mp4"
      },
      {
        "quality": "96kbps",
        "url": "https://aac.saavncdn.com/788/154a859adda5bd1b831dea58ce4942a3_96.mp4"
      },
      {
        "quality": "160kbps",
        "url": "https://aac.saavncdn.com/788/154a859adda5bd1b831dea58ce4942a3_160.mp4"
      },
      {
        "quality": "320kbps",
        "url": "https://aac.saavncdn.com/788/154a859adda5bd1b831dea58ce4942a3_320.mp4"
      }
    ]
  }
]
export const Discover = () => {
    return (
        <article className='discover-section'>
            <h1 className='discover-section__header'>Discover <br/> New music</h1>
            <TopChart albums={albums} />
            <Suggestions songs={songs} />
        </article>
    );
};