export type TimelineTitle = {
  id: string;
  number: string;
  title: string;
  universe: string;
  type: string;
  year: string;
  length: string;
  episodes: number | null;
  poster: string;
};

export type TimelineVolume = {
  volume: string;
  cards: TimelineTitle[];
};

export const timelineVolumes: TimelineVolume[] = [
  {
    "cards": [
      {
        "episodes": 4,
        "id": "eyes-of-wakanda",
        "length": "4 capítulos",
        "number": "01",
        "poster": "https://www.impawards.com/tv/posters/eyes_of_wakanda_ver6_xlg.jpg",
        "title": "Eyes of Wakanda",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "1260 a. C.–1896"
      },
      {
        "episodes": null,
        "id": "captain-america-first-avenger",
        "length": "2 h 4 min",
        "number": "02",
        "poster": "https://cdn-ak.f.st-hatena.com/images/fotolife/m/mikotoharuto/20190410/20190410203949.jpg",
        "title": "Capitán América: El primer vengador",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "1943–1945"
      },
      {
        "episodes": null,
        "id": "agent-carter-one-shot",
        "length": "15 min",
        "number": "03",
        "poster": "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/26/Ajrq9fWmqDhk3OYVuBrNHzcRENKkO5fYUW6HmX8q.jpg",
        "title": "Marvel One-Shot: Agente Carter",
        "type": "Corto",
        "universe": "Tierra-616",
        "year": "1946"
      },
      {
        "episodes": 8,
        "id": "agent-carter-s1",
        "length": "8 capítulos",
        "number": "04",
        "poster": "https://d32qys9a6wm9no.cloudfront.net/images/tvs/poster/5e/ea4c201c429514aaefc23fa0c25909c8_original.jpg?t=1638278701",
        "title": "Agente Carter · Temporada 1",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "1946"
      },
      {
        "episodes": 10,
        "id": "agent-carter-s2",
        "length": "10 capítulos",
        "number": "05",
        "poster": "https://images.plex.tv/photo?scale=1&size=large-1920&url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FvI94zqLLPBetfRvRsEskjBHwN9N.jpg",
        "title": "Agente Carter · Temporada 2",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "1947"
      },
      {
        "episodes": null,
        "id": "captain-marvel",
        "length": "2 h 3 min",
        "number": "06",
        "poster": "https://laentradaalcine.com/wp-content/uploads/2019/03/Capitana-Marvel-poster.jpg",
        "title": "Capitana Marvel",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "1995"
      },
      {
        "episodes": null,
        "id": "iron-man",
        "length": "2 h 6 min",
        "number": "07",
        "poster": "https://artofthemovies.co.uk/cdn/shop/files/IMG_0675.jpg?v=1758025709",
        "title": "Iron Man",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2010"
      },
      {
        "episodes": null,
        "id": "iron-man-2",
        "length": "2 h 5 min",
        "number": "08",
        "poster": "https://m.netinfo.bg/media/images/32907/32907080/r-orig-orig-filmi-marvel.jpg",
        "title": "Iron Man 2",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2011"
      },
      {
        "episodes": null,
        "id": "funny-thing-thors-hammer",
        "length": "4 min",
        "number": "09",
        "poster": "https://www.acmodasi.in/amdb/images/movie/c/e/marvel-one-shot-a-funny-thing-happened-on-the-way-to-thors-hammer-2011-VTM4PQ.jpg",
        "title": "Algo divertido ocurrió de camino al martillo de Thor",
        "type": "Corto",
        "universe": "Tierra-616",
        "year": "2011"
      },
      {
        "episodes": null,
        "id": "incredible-hulk",
        "length": "1 h 52 min",
        "number": "10",
        "poster": "https://www.comicmoviedb.com/wp-content/uploads/2024/08/the-incredible-hulk-2008-poster.jpg",
        "title": "El increíble Hulk",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2011"
      },
      {
        "episodes": null,
        "id": "thor",
        "length": "1 h 55 min",
        "number": "11",
        "poster": "https://i.pinimg.com/originals/0d/58/28/0d58285370102cbe9d0f3ec15028cc90.jpg",
        "title": "Thor",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2011"
      },
      {
        "episodes": null,
        "id": "the-consultant",
        "length": "4 min",
        "number": "12",
        "poster": "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak%3D/v3/t/assets/p21114149_p_v10_aa.jpg",
        "title": "Marvel One-Shot: El consultor",
        "type": "Corto",
        "universe": "Tierra-616",
        "year": "2011"
      },
      {
        "episodes": null,
        "id": "the-avengers",
        "length": "2 h 23 min",
        "number": "13",
        "poster": "https://www.vintagemovieposters.co.uk/wp-content/uploads/2023/03/IMG_1887-scaled.jpeg",
        "title": "Los Vengadores",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2012"
      },
      {
        "episodes": null,
        "id": "item-47",
        "length": "12 min",
        "number": "14",
        "poster": "https://www.impawards.com/shorts/2012/posters/marvel_one_shot_item_forty_seven_xlg.jpg",
        "title": "Marvel One-Shot: Artículo 47",
        "type": "Corto",
        "universe": "Tierra-616",
        "year": "2012"
      }
    ],
    "volume": "Antes de los Vengadores"
  },
  {
    "cards": [
      {
        "episodes": null,
        "id": "thor-dark-world",
        "length": "1 h 52 min",
        "number": "15",
        "poster": "https://cdn.wallpapersafari.com/71/79/ABPkK1.jpg",
        "title": "Thor: El mundo oscuro",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2013"
      },
      {
        "episodes": null,
        "id": "iron-man-3",
        "length": "2 h 10 min",
        "number": "16",
        "poster": "https://moviepostermexico.com/cdn/shop/products/iron_man_three_ver7_xxlg_1024x1024%402x.jpg?v=1573235642",
        "title": "Iron Man 3",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2013"
      },
      {
        "episodes": null,
        "id": "all-hail-the-king",
        "length": "14 min",
        "number": "17",
        "poster": "https://media-cache.cinematerial.com/p/500x/nix6yedw/marvel-one-shot-all-hail-the-king-poster.jpg?v=1456343902",
        "title": "Marvel One-Shot: Todos aclaman al rey",
        "type": "Corto",
        "universe": "Tierra-616",
        "year": "2013"
      },
      {
        "episodes": null,
        "id": "winter-soldier",
        "length": "2 h 16 min",
        "number": "18",
        "poster": "https://cdn.prod.website-files.com/695bcdbb71945b83b122e2f4/69a826de0ff9a7010ec76870_MV5BNWY1NjFmNDItZDhmOC00NjI1LWE0ZDItMTM0MjBjZThiOTQ2XkEyXkFqcGc%40._V1_.jpg",
        "title": "Capitán América: El soldado de invierno",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2014"
      },
      {
        "episodes": null,
        "id": "guardians-1",
        "length": "2 h 1 min",
        "number": "19",
        "poster": "https://resizing.flixster.com/SneFHH-BDOhBkh7h1A-aNwcrxLM%3D/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2U3YTY2YTQzLTU5NDgtNDNiMC04ZTI1LTFiZDYyMTMxMjc5MC5qcGc%3D",
        "title": "Guardianes de la Galaxia",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2014"
      },
      {
        "episodes": null,
        "id": "guardians-2",
        "length": "2 h 17 min",
        "number": "20",
        "poster": "https://artofthemovies.co.uk/cdn/shop/files/guardians_of_the_galaxy_vol_2_advance_SD18104_B-528908_d5021325-824a-400a-acda-816cf1aa4a2c.jpg?v=1692973697",
        "title": "Guardianes de la Galaxia Vol. 2",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2014"
      },
      {
        "episodes": 5,
        "id": "i-am-groot-s1",
        "length": "5 capítulos",
        "number": "21",
        "poster": "https://image.tmdb.org/t/p/original/yOs6WRx6IfCHM2HuvetE5c6oQJr.jpg",
        "title": "Yo Soy Groot · Temporada 1",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2014"
      },
      {
        "episodes": 5,
        "id": "i-am-groot-s2",
        "length": "5 capítulos",
        "number": "22",
        "poster": "https://timworthington.org/wp-content/uploads/2024/12/showimage_iamgrootb.jpg",
        "title": "Yo Soy Groot · Temporada 2",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2014"
      },
      {
        "episodes": 13,
        "id": "daredevil-s1",
        "length": "13 capítulos",
        "number": "23",
        "poster": "https://p3-sdbk2-media.byteimg.com/tos-cn-i-xv4ileqgde/2684a3aef6314a9793ce7990dd0951e7~tplv-xv4ileqgde-resize-w%3A750.image",
        "title": "Daredevil · Temporada 1",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2014–2015"
      },
      {
        "episodes": 13,
        "id": "jessica-jones-s1",
        "length": "13 capítulos",
        "number": "24",
        "poster": "https://1263469901.rsc.cdn77.org/images/2025/01/25/external_file_11641506882647224822.jpg",
        "title": "Jessica Jones · Temporada 1",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2015"
      },
      {
        "episodes": null,
        "id": "age-of-ultron",
        "length": "2 h 21 min",
        "number": "25",
        "poster": "https://vignette2.wikia.nocookie.net/marvelmovies/images/c/c7/Avengers_Age_Of_Ultron-poster1.jpg/revision/latest?cb=20150224202317",
        "title": "Vengadores: La era de Ultrón",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2015"
      },
      {
        "episodes": null,
        "id": "ant-man",
        "length": "1 h 57 min",
        "number": "26",
        "poster": "https://moviepostermexico.com/cdn/shop/products/ant_man_ver3_xxlg_1024x1024%402x.jpg?v=1575350061",
        "title": "Ant-Man",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2015"
      },
      {
        "episodes": 13,
        "id": "daredevil-s2",
        "length": "13 capítulos",
        "number": "27",
        "poster": "https://images.justwatch.com/poster/8635981/s718/season-2.jpg",
        "title": "Daredevil · Temporada 2",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2015"
      },
      {
        "episodes": 13,
        "id": "luke-cage-s1",
        "length": "13 capítulos",
        "number": "28",
        "poster": "https://i.ebayimg.com/images/g/0zcAAOSw56pbPnoX/s-l1200.jpg",
        "title": "Luke Cage · Temporada 1",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2015"
      },
      {
        "episodes": 13,
        "id": "iron-fist-s1",
        "length": "13 capítulos",
        "number": "29",
        "poster": "https://image.tmdb.org/t/p/original/5xGmyQgjsn4YqXF6gfOToAPMYyS.jpg",
        "title": "Iron Fist · Temporada 1",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2016"
      },
      {
        "episodes": 8,
        "id": "the-defenders",
        "length": "8 capítulos",
        "number": "30",
        "poster": "https://tecolotito.elsiglodedurango.com.mx/cdn-cgi/image/format%3Dauto%2Cwidth%3D1024/i/2017/08/613819.jpeg",
        "title": "Los Defensores",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2016"
      },
      {
        "episodes": null,
        "id": "civil-war",
        "length": "2 h 27 min",
        "number": "31",
        "poster": "https://image.ceneostatic.pl/data/products/48449847/i-kapitan-ameryka-wojna-bohaterow-plakat.jpg",
        "title": "Capitán América: Civil War",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2016"
      }
    ],
    "volume": "Camino a Civil War"
  },
  {
    "cards": [
      {
        "episodes": null,
        "id": "black-widow",
        "length": "2 h 14 min",
        "number": "32",
        "poster": "https://ocdn.eu/images/pulscms/ZmM7MDA_/c6c56b9b112916ad3f7ae694c98ffdd1.jpg",
        "title": "Viuda Negra",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2016"
      },
      {
        "episodes": null,
        "id": "black-panther",
        "length": "2 h 14 min",
        "number": "33",
        "poster": "https://u100s.s3.amazonaws.com/articles_images/i0/1519710650720/image.jpg",
        "title": "Black Panther",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2016"
      },
      {
        "episodes": null,
        "id": "spider-man-homecoming",
        "length": "2 h 13 min",
        "number": "34",
        "poster": "https://media.filfan.com/NewsPics/FilfanNew/large/4040_12.jpg",
        "title": "Spider-Man: Homecoming",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2016"
      },
      {
        "episodes": 13,
        "id": "punisher-s1",
        "length": "13 capítulos",
        "number": "35",
        "poster": "https://image.tmdb.org/t/p/original/gTn3seWzhr7D6dZcDGPXHhATuhF.jpg",
        "title": "The Punisher · Temporada 1",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2016"
      },
      {
        "episodes": null,
        "id": "doctor-strange",
        "length": "1 h 55 min",
        "number": "36",
        "poster": "https://www.heyuguys.com/images/2016/04/Doctor-Strange-1.jpg",
        "title": "Doctor Strange",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2016–2017"
      },
      {
        "episodes": 13,
        "id": "jessica-jones-s2",
        "length": "13 capítulos",
        "number": "37",
        "poster": "https://image.tmdb.org/t/p/w500/9C3cDKLOAQj2jzcBTaS08DaYfAU.jpg",
        "title": "Jessica Jones · Temporada 2",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2017"
      },
      {
        "episodes": 13,
        "id": "luke-cage-s2",
        "length": "13 capítulos",
        "number": "38",
        "poster": "https://townsquare.media/site/442/files/2018/05/luke-cage-photos-1-pic.jpg",
        "title": "Luke Cage · Temporada 2",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2017"
      },
      {
        "episodes": 10,
        "id": "iron-fist-s2",
        "length": "10 capítulos",
        "number": "39",
        "poster": "https://images.justwatch.com/poster/316697612/s718/season-2.jpg",
        "title": "Iron Fist · Temporada 2",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2017"
      },
      {
        "episodes": 13,
        "id": "daredevil-s3",
        "length": "13 capítulos",
        "number": "40",
        "poster": "https://geektyrant.com/s/Dpv5jiuWsAE5942-1.jpg",
        "title": "Daredevil · Temporada 3",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2017"
      },
      {
        "episodes": null,
        "id": "thor-ragnarok",
        "length": "2 h 10 min",
        "number": "41",
        "poster": "https://www.aceshowbiz.com/images/still/thor-ragnarok-poster01.jpg",
        "title": "Thor: Ragnarok",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2017"
      },
      {
        "episodes": 13,
        "id": "punisher-s2",
        "length": "13 capítulos",
        "number": "42",
        "poster": "https://i.ido.bi/assets/review/2019/01/PUNISHER_S2_Vertical-Main_RGB.jpg",
        "title": "The Punisher · Temporada 2",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2017"
      },
      {
        "episodes": 13,
        "id": "jessica-jones-s3",
        "length": "13 capítulos",
        "number": "43",
        "poster": "https://i.ido.bi/assets/post/2019/06/JessicaJones_FinalSeason_Vertical-Main_RGB_PRE_US.jpg",
        "title": "Jessica Jones · Temporada 3",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2018"
      },
      {
        "episodes": null,
        "id": "ant-man-and-wasp",
        "length": "1 h 58 min",
        "number": "44",
        "poster": "https://papik.pro/grafic/uploads/posts/2023-03/1680301942_papik-pro-p-poster-chelovek-7.jpg",
        "title": "Ant-Man y la Avispa",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2018"
      },
      {
        "episodes": null,
        "id": "infinity-war",
        "length": "2 h 29 min",
        "number": "45",
        "poster": "https://m.media-amazon.com/images/M/MV5BNzdhMWZlYjQtMWViYS00MjA3LTg2YjAtMmI3YzE2MTRjZjQ0XkEyXkFqcGc%40._V1_.jpg",
        "title": "Vengadores: Infinity War",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2018"
      },
      {
        "episodes": null,
        "id": "endgame",
        "length": "3 h 1 min",
        "number": "46",
        "poster": "https://www.impawards.com/2019/posters/avengers_endgame_ver44_xlg.jpg",
        "title": "Vengadores: Endgame",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2018–2023"
      }
    ],
    "volume": "La Guerra del Infinito"
  },
  {
    "cards": [
      {
        "episodes": 6,
        "id": "loki-s1",
        "length": "6 capítulos",
        "number": "47",
        "poster": "https://media.senscritique.com/media/000020084967/0/loki.jpg",
        "title": "Loki · Temporada 1",
        "type": "Serie",
        "universe": "Multiverso",
        "year": "Fuera del tiempo"
      },
      {
        "episodes": 9,
        "id": "what-if-s1",
        "length": "9 capítulos",
        "number": "48",
        "poster": "https://artofthemovies.co.uk/cdn/shop/products/special_what_if_tv_EB14931_B_ad50c2fd-ba3e-4bcc-a067-f01df927d370.jpg?v=1681318264",
        "title": "What If…? · Temporada 1",
        "type": "Serie",
        "universe": "Multiverso",
        "year": "Multiversal"
      },
      {
        "episodes": 4,
        "id": "marvel-zombies",
        "length": "4 capítulos",
        "number": "49",
        "poster": "https://image.tmdb.org/t/p/w1280/yejoqsN1xZj6kTPjmF90u5hfnKa.jpg",
        "title": "Marvel Zombies",
        "type": "Serie",
        "universe": "Multiverso",
        "year": "Realidad alternativa"
      },
      {
        "episodes": 9,
        "id": "wandavision",
        "length": "9 capítulos",
        "number": "50",
        "poster": "https://media.glamour.mx/photos/61905be42d97bd4c522a3f6d/master/w_1600%2Cc_limit/249454.jpeg",
        "title": "Bruja Escarlata y Visión",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2023"
      },
      {
        "episodes": null,
        "id": "shang-chi",
        "length": "2 h 12 min",
        "number": "51",
        "poster": "https://lumiere-a.akamaihd.net/v1/images/stmb_simu_rings_v4_lg_54adcaab.jpeg",
        "title": "Shang-Chi y la Leyenda de los Diez Anillos",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2024"
      },
      {
        "episodes": 6,
        "id": "falcon-winter-soldier",
        "length": "6 capítulos",
        "number": "52",
        "poster": "https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2020/12/11/falcon-and-the-winter-soldier-promo-art.jpg",
        "title": "Falcon y el Soldado de Invierno",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2024"
      },
      {
        "episodes": null,
        "id": "far-from-home",
        "length": "2 h 9 min",
        "number": "53",
        "poster": "https://www.marvel-cineverse.fr/medias/images/official-ffh-us-poster.jpg",
        "title": "Spider-Man: Far From Home",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2024"
      },
      {
        "episodes": null,
        "id": "eternals",
        "length": "2 h 36 min",
        "number": "54",
        "poster": "https://okay.uz/uploads/media2/eternals2021rweb-dlrip_1642055592.jpg",
        "title": "Eternals",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2024"
      },
      {
        "episodes": null,
        "id": "no-way-home",
        "length": "2 h 28 min",
        "number": "55",
        "poster": "https://gamebomb.ru/files/galleries/001/5/5d/393241.jpg",
        "title": "Spider-Man: No Way Home",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2024"
      },
      {
        "episodes": null,
        "id": "multiverse-of-madness",
        "length": "2 h 6 min",
        "number": "56",
        "poster": "https://m.media-amazon.com/images/I/91axu2LYHwL._AC_SL1500_.jpg",
        "title": "Doctor Strange en el Multiverso de la Locura",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2024"
      },
      {
        "episodes": 6,
        "id": "hawkeye",
        "length": "6 capítulos",
        "number": "57",
        "poster": "https://es.web.img2.acsta.net/pictures/21/12/21/17/32/4932150.jpg",
        "title": "Ojo de Halcón",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "Navidad de 2024"
      },
      {
        "episodes": 6,
        "id": "moon-knight",
        "length": "6 capítulos",
        "number": "58",
        "poster": "https://cdn.hk01.com/di/media/images/dw/20220807/633012408352247808214695.jpeg/I7rSCB_XgJzczMMX14139fqNhDYSrrze3HDrENxw6xA?v=w1920",
        "title": "Caballero Luna",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2025"
      },
      {
        "episodes": null,
        "id": "wakanda-forever",
        "length": "2 h 41 min",
        "number": "59",
        "poster": "https://images.thedirect.com/media/photos/Untitled-1_0000_Layer_7.jpg",
        "title": "Black Panther: Wakanda Forever",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2025"
      },
      {
        "episodes": 5,
        "id": "echo",
        "length": "5 capítulos",
        "number": "60",
        "poster": "https://images4.alphacoders.com/134/1346767.jpeg",
        "title": "Echo",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2025"
      },
      {
        "episodes": 9,
        "id": "she-hulk",
        "length": "9 capítulos",
        "number": "61",
        "poster": "https://media.sellfy.com/images/Iw0UIy7V/rxrF/she_hulk.jpeg?w=1200",
        "title": "She-Hulk: Abogada Hulka",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2025"
      },
      {
        "episodes": 6,
        "id": "ms-marvel",
        "length": "6 capítulos",
        "number": "62",
        "poster": "https://static.cnbetacdn.com/article/2022/0513/252b98b69cbc4c4.jpg",
        "title": "Ms. Marvel",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2025"
      },
      {
        "episodes": null,
        "id": "love-and-thunder",
        "length": "1 h 59 min",
        "number": "63",
        "poster": "https://lumiere-a.akamaihd.net/v1/images/01fe70e80a0ac867c9a9470641df6848_2764x4096_86b89bf5.jpeg?region=0%2C0%2C2764%2C4096",
        "title": "Thor: Love and Thunder",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2025"
      },
      {
        "episodes": 6,
        "id": "ironheart",
        "length": "6 capítulos",
        "number": "64",
        "poster": "https://lrmonline.com/wp-content/uploads/2025/05/Ironheart-Poster.jpg",
        "title": "Ironheart",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2025"
      },
      {
        "episodes": null,
        "id": "werewolf-by-night",
        "length": "53 min",
        "number": "65",
        "poster": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aa454069-1f38-4db1-a9e3-75d6b00c42e8/dfgpsob-15a3880a-2f83-4982-be72-d320ab81a5bb.jpg/v1/fill/w_748%2Ch_1069%2Cq_70%2Cstrp/werewolf_by_night_full_moon_poster_colored_by_akithefull_dfgpsob-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTgyOSIsInBhdGgiOiIvZi9hYTQ1NDA2OS0xZjM4LTRkYjEtYTllMy03NWQ2YjAwYzQyZTgvZGZncHNvYi0xNWEzODgwYS0yZjgzLTQ5ODItYmU3Mi1kMzIwYWI4MWE1YmIuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.sYW9vCF8VKjxlxNdrKvptZTNgFaDK11j-ChxC7y7n_E",
        "title": "Werewolf by Night",
        "type": "Especial",
        "universe": "Tierra-616",
        "year": "2025"
      },
      {
        "episodes": null,
        "id": "guardians-holiday",
        "length": "42 min",
        "number": "66",
        "poster": "https://br.web.img2.acsta.net/pictures/22/11/14/17/17/2637256.jpg",
        "title": "Guardianes de la Galaxia: Especial de las fiestas",
        "type": "Especial",
        "universe": "Tierra-616",
        "year": "Navidad de 2025"
      },
      {
        "episodes": null,
        "id": "quantumania",
        "length": "2 h 5 min",
        "number": "67",
        "poster": "https://www.actuabd.com/IMG/jpg/amatwq_family_payoff2_1-sht_v4_lg.jpg",
        "title": "Ant-Man y la Avispa: Quantumania",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2026"
      },
      {
        "episodes": null,
        "id": "guardians-3",
        "length": "2 h 30 min",
        "number": "68",
        "poster": "https://www.impawards.com/2023/posters/guardians_of_the_galaxy_vol_three_ver2_xxlg.jpg",
        "title": "Guardianes de la Galaxia Vol. 3",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2026"
      },
      {
        "episodes": 6,
        "id": "secret-invasion",
        "length": "6 capítulos",
        "number": "69",
        "poster": "https://lumiere-a.akamaihd.net/v1/images/secretinvasion_teaser_digital_ka_v8b_lg_79a1fa00.jpeg",
        "title": "Invasión Secreta",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2026"
      },
      {
        "episodes": null,
        "id": "the-marvels",
        "length": "1 h 45 min",
        "number": "70",
        "poster": "https://amc-theatres-res.cloudinary.com/v1694553743/amc-cdn/production/2/movies/56500/56464/PosterDynamic/157171.jpg",
        "title": "The Marvels",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2026"
      },
      {
        "episodes": 6,
        "id": "loki-s2",
        "length": "6 capítulos",
        "number": "71",
        "poster": "https://cdn.imweb.me/upload/S20210927e14f9f0cf71bc/2b6dcecb81c15.png",
        "title": "Loki · Temporada 2",
        "type": "Serie",
        "universe": "Multiverso",
        "year": "Fuera del tiempo"
      },
      {
        "episodes": 9,
        "id": "what-if-s2",
        "length": "9 capítulos",
        "number": "72",
        "poster": "https://images.justwatch.com/poster/310374853/s718/season-2.jpg",
        "title": "What If…? · Temporada 2",
        "type": "Serie",
        "universe": "Multiverso",
        "year": "Multiversal"
      }
    ],
    "volume": "Después de Endgame"
  },
  {
    "cards": [
      {
        "episodes": null,
        "id": "xmen-first-class",
        "length": "2 h 12 min",
        "number": "73",
        "poster": "https://image.tmdb.org/t/p/original/7R0hsOiICCevMoF2yI0tOAQeJVw.jpg",
        "title": "X-Men: Primera generación",
        "type": "Película",
        "universe": "X-Men / Fox",
        "year": "1962"
      },
      {
        "episodes": null,
        "id": "xmen-origins-wolverine",
        "length": "1 h 47 min",
        "number": "74",
        "poster": "https://thecinematicpackrat.wordpress.com/wp-content/uploads/2014/06/wolverine.jpg",
        "title": "X-Men Orígenes: Wolverine",
        "type": "Película",
        "universe": "X-Men / Fox",
        "year": "Principalmente 1979"
      },
      {
        "episodes": null,
        "id": "xmen",
        "length": "1 h 44 min",
        "number": "75",
        "poster": "https://image.tmdb.org/t/p/original/fIwjhRbrBGplBMY5WSgT3bq4sXq.jpg",
        "title": "X-Men",
        "type": "Película",
        "universe": "X-Men / Fox",
        "year": "Comienzos de los 2000"
      },
      {
        "episodes": null,
        "id": "x2",
        "length": "2 h 14 min",
        "number": "76",
        "poster": "https://1.bp.blogspot.com/-Yt83ylNA6O0/VzO1qMU6J0I/AAAAAAAATDE/VCqtpQt_57Es1EwJOGOT9nJZyt7KrEpJACKgB/s1600/x2-movie-poster.jpg",
        "title": "X-Men 2",
        "type": "Película",
        "universe": "X-Men / Fox",
        "year": "Después de X-Men"
      },
      {
        "episodes": null,
        "id": "xmen-last-stand",
        "length": "1 h 44 min",
        "number": "77",
        "poster": "https://uh.gsstatic.es/vips/eventos/2016/12/29/375984/pierda-men-decision-final.jpg",
        "title": "X-Men: La batalla final",
        "type": "Película",
        "universe": "X-Men / Fox",
        "year": "Después de X-Men 2"
      },
      {
        "episodes": null,
        "id": "the-wolverine",
        "length": "2 h 6 min",
        "number": "78",
        "poster": "https://miro.medium.com/1%2AbgPX1sx7J3I1kbXCtgW8cw.jpeg",
        "title": "Wolverine: Inmortal",
        "type": "Película",
        "universe": "X-Men / Fox",
        "year": "Después de La batalla final"
      },
      {
        "episodes": null,
        "id": "days-of-future-past",
        "length": "2 h 12 min",
        "number": "79",
        "poster": "https://vignette1.wikia.nocookie.net/xmenmovies/images/7/79/X-Men_Days_of_Future_Past_Official_poster_004.jpg/revision/latest?cb=20140324234813",
        "title": "X-Men: Días del futuro pasado",
        "type": "Película",
        "universe": "X-Men / Fox",
        "year": "1973 / 2023"
      }
    ],
    "volume": "Saga X-Men · Línea original"
  },
  {
    "cards": [
      {
        "episodes": null,
        "id": "xmen-apocalypse",
        "length": "2 h 24 min",
        "number": "80",
        "poster": "https://d-tv.ppstatic.pl/images/tv-tv/17/d6/prg23800053_831261597_large.jpg",
        "title": "X-Men: Apocalipsis",
        "type": "Película",
        "universe": "X-Men / Fox",
        "year": "1983"
      },
      {
        "episodes": null,
        "id": "dark-phoenix",
        "length": "1 h 54 min",
        "number": "81",
        "poster": "https://amc-theatres-res.cloudinary.com/v1557516085/amc-cdn/production/2/movies/52600/52560/PosterDynamic/76382.jpg",
        "title": "X-Men: Fénix Oscura",
        "type": "Película",
        "universe": "X-Men / Fox",
        "year": "1992"
      },
      {
        "episodes": null,
        "id": "deadpool",
        "length": "1 h 48 min",
        "number": "82",
        "poster": "https://cdn.wallpapersafari.com/49/23/tdqo9z.jpg",
        "title": "Deadpool",
        "type": "Película",
        "universe": "X-Men / Fox",
        "year": "Década de 2010"
      },
      {
        "episodes": null,
        "id": "deadpool-2",
        "length": "1 h 59 min",
        "number": "83",
        "poster": "https://vignette.wikia.nocookie.net/marvelmovies/images/d/d4/Deadpool_2_Final_Poster.jpg/revision/latest/scale-to-width-down/2000?cb=20180507160517",
        "title": "Deadpool 2",
        "type": "Película",
        "universe": "X-Men / Fox",
        "year": "Después de Deadpool"
      },
      {
        "episodes": null,
        "id": "new-mutants",
        "length": "1 h 34 min",
        "number": "84",
        "poster": "https://m.media-amazon.com/images/S/pv-target-images/c1ebd2a08ba281116c66f17cb4639a090f93117294f8b9b06fa1d4b9a4752388.jpg",
        "title": "Los nuevos mutantes",
        "type": "Película",
        "universe": "X-Men / Fox",
        "year": "Finales de la década de 2010"
      },
      {
        "episodes": null,
        "id": "logan",
        "length": "2 h 17 min",
        "number": "85",
        "poster": "https://hustonsite.files.wordpress.com/2016/10/logan_onesheet.jpg",
        "title": "Logan",
        "type": "Película",
        "universe": "X-Men / Fox",
        "year": "2029"
      }
    ],
    "volume": "Saga X-Men · Línea modificada"
  },
  {
    "cards": [
      {
        "episodes": null,
        "id": "deadpool-and-wolverine",
        "length": "2 h 8 min",
        "number": "86",
        "poster": "https://www.posterhub.com.sg/images/detailed/145/112022_Deadpool___Wolverine_Final_B.jpg",
        "title": "Deadpool y Lobezno",
        "type": "Película",
        "universe": "Multiverso",
        "year": "TVA / 2024"
      },
      {
        "episodes": 9,
        "id": "agatha-all-along",
        "length": "9 capítulos",
        "number": "87",
        "poster": "https://storage.evrimagaci.org/mi/5ed9273a-0e6d-4e6f-a278-965db86a303a.jpeg",
        "title": "Agatha, ¿quién si no?",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2026"
      },
      {
        "episodes": 8,
        "id": "what-if-s3",
        "length": "8 capítulos",
        "number": "88",
        "poster": "https://wallpapers.com/images/hd/marvel-what-if-disney-plus-rg72peedgpe9p4u7.jpg",
        "title": "What If…? · Temporada 3",
        "type": "Serie",
        "universe": "Multiverso",
        "year": "Multiversal"
      },
      {
        "episodes": 9,
        "id": "daredevil-born-again-s1",
        "length": "9 capítulos",
        "number": "89",
        "poster": "https://cdn.sinemalar.com/images/movie/277126/poster/disneys-daredevil-1737014369.jpg",
        "title": "Daredevil: Born Again · Temporada 1",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2026–2027"
      },
      {
        "episodes": null,
        "id": "brave-new-world",
        "length": "1 h 58 min",
        "number": "90",
        "poster": "https://images.ottplay.com/images/big/captain-1743516712.jpeg",
        "title": "Capitán América: Brave New World",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2027"
      },
      {
        "episodes": null,
        "id": "thunderbolts",
        "length": "2 h 7 min",
        "number": "91",
        "poster": "https://images.squarespace-cdn.com/content/v1/5f07844537c8ba699ac3a65a/0667fa9b-6b08-4c42-aa8e-3e4341cf5e8f/THUNDERBOLTS__Payoff_Digital_1Sht_v2_Lg.jpg",
        "title": "Thunderbolts*",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2027"
      },
      {
        "episodes": null,
        "id": "fantastic-four-first-steps",
        "length": "1 h 54 min",
        "number": "92",
        "poster": "https://i.ebayimg.com/images/g/t40AAeSwRyhom6GO/s-l1200.jpg",
        "title": "Los 4 Fantásticos: Primeros pasos",
        "type": "Película",
        "universe": "Tierra-828",
        "year": "1964 alternativo"
      },
      {
        "episodes": 8,
        "id": "wonder-man",
        "length": "8 capítulos",
        "number": "93",
        "poster": "https://cdn.marvel.com/content/2x/wonderman_lob_crd_03.jpg",
        "title": "Wonder Man",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2025–2027"
      },
      {
        "episodes": 8,
        "id": "daredevil-born-again-s2",
        "length": "8 capítulos",
        "number": "94",
        "poster": "https://filmofil.ba/images/januar-februar-2026/Daredevil_Born_Again_S21769788646.jpg",
        "title": "Daredevil: Born Again · Temporada 2",
        "type": "Serie",
        "universe": "Tierra-616",
        "year": "2027"
      },
      {
        "episodes": null,
        "id": "punisher-one-last-kill",
        "length": "48 min",
        "number": "95",
        "poster": "https://resizing.flixster.com/6pRJyskWzZHpMcwD4awtFZWd0vo%3D/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzJkYjJkZWYwLTQ0NDItNDg0ZC05YTUyLTcyODMxNzk5MzRjOC5qcGc%3D",
        "title": "The Punisher: One Last Kill",
        "type": "Especial",
        "universe": "Tierra-616",
        "year": "2027"
      },
      {
        "episodes": null,
        "id": "spider-man-brand-new-day",
        "length": "2 h 25 min",
        "number": "96",
        "poster": "https://s.movieinsider.com/images/p/964462_m1773880192.jpg",
        "title": "Spider-Man: Brand New Day",
        "type": "Película",
        "universe": "Tierra-616",
        "year": "2028"
      }
    ],
    "volume": "Convergencia multiversal"
  }
];

