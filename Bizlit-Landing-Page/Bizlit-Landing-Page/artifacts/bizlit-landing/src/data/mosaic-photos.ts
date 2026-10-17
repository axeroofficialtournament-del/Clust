/*
 * The photographs behind the "hand it over" wall: the appliances, furniture,
 * tools and vehicles that actually come out of a clearance, plus the houses
 * the work happens in.
 *
 * Every file in `public/img/mosaic/` is a freely licensed photograph from
 * Wikimedia Commons (CC0, CC BY, CC BY-SA or public domain), centre-cropped to
 * a square and re-encoded as WebP. The `credit` block is the licence trail for
 * each file, kept here so the source of every photograph stays recorded.
 */

export type MosaicPhoto = {
  src: string;
  alt: string;
  credit: { title: string; author: string; licence: string; href: string };
};

export const MOSAIC_PHOTOS = {
  washer: {
    src: "/img/mosaic/washer.webp",
    alt: "A front-loading washing machine",
    credit: {
      title: "Fagor washing machine front FF6314",
      author: "Dany kg",
      licence: "Public domain",
      href: "https://commons.wikimedia.org/wiki/File:Fagor_washing_machine_front_FF6314.jpg",
    },
  },
  fridge: {
    src: "/img/mosaic/fridge.webp",
    alt: "A white refrigerator in a kitchen",
    credit: {
      title: "EFTA00000104 - Modern kitchen with cream cabinets a white refrigerator stainless steel appliances and gray countertops",
      author: "Federal Bureau of Investigation",
      licence: "Public domain",
      href: "https://commons.wikimedia.org/wiki/File:EFTA00000104_-_Modern_kitchen_with_cream_cabinets_a_white_refrigerator_stainless_steel_appliances_and_gray_countertops.jpg",
    },
  },
  sofa: {
    src: "/img/mosaic/sofa.webp",
    alt: "A white sofa in a living room",
    credit: {
      title: "EFTA00000889 - Modern living room features a white sofa black-and-white framed photographs on wood-paneled walls and a glass coffee table filled with books and colorful candy",
      author: "Federal Bureau of Investigation",
      licence: "Public domain",
      href: "https://commons.wikimedia.org/wiki/File:EFTA00000889_-_Modern_living_room_features_a_white_sofa_black-and-white_framed_photographs_on_wood-paneled_walls_and_a_glass_coffee_table_filled_with_books_and_colorful_candy.jpg",
    },
  },
  bicycle: {
    src: "/img/mosaic/bicycle.webp",
    alt: "A bicycle parked against a low wall",
    credit: {
      title: "Bicycle parked at the Lower Agoda Fort",
      author: "iMahesh",
      licence: "CC BY-SA 4.0",
      href: "https://commons.wikimedia.org/wiki/File:Bicycle_parked_at_the_Lower_Agoda_Fort.jpg",
    },
  },
  drill: {
    src: "/img/mosaic/drill.webp",
    alt: "A cordless drill among hand tools",
    credit: {
      title: "Tools 66",
      author: "Wilfredor",
      licence: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Tools_66.jpg",
    },
  },
  television: {
    src: "/img/mosaic/television.webp",
    alt: "A vintage television set",
    credit: {
      title: "Mitsubishi television set 2022-12-25",
      author: "Asanagi",
      licence: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Mitsubishi_television_set_2022-12-25.jpg",
    },
  },
  microwave: {
    src: "/img/mosaic/microwave.webp",
    alt: "A microwave oven in a kitchen",
    credit: {
      title: "Hotel room kitchen at St. Marie Hotel, New Orleans",
      author: "Michael Neel",
      licence: "CC BY 2.0",
      href: "https://commons.wikimedia.org/wiki/File:Hotel_room_kitchen_at_St._Marie_Hotel,_New_Orleans.jpg",
    },
  },
  armchair: {
    src: "/img/mosaic/armchair.webp",
    alt: "A black wingback armchair",
    credit: {
      title: "Wingbacks03",
      author: "Pressattomdixon",
      licence: "CC BY-SA 3.0",
      href: "https://commons.wikimedia.org/wiki/File:Wingbacks03.jpg",
    },
  },
  guitar: {
    src: "/img/mosaic/guitar.webp",
    alt: "An acoustic guitar leaning on a wall",
    credit: {
      title: "Fender California Series Acoustic Guitar (serial no. CSC10001615) (2018-04-26 13.21.46 Piqsels.com id olkmb)",
      author: "Unknown author",
      licence: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Fender_California_Series_Acoustic_Guitar_(serial_no._CSC10001615)_(2018-04-26_13.21.46_Piqsels.com_id_olkmb).jpg",
    },
  },
  laptop: {
    src: "/img/mosaic/laptop.webp",
    alt: "An open laptop computer",
    credit: {
      title: "Dual touch screen laptop",
      author: "Wikideas1",
      licence: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Dual_touch_screen_laptop.jpg",
    },
  },
  sewing: {
    src: "/img/mosaic/sewing.webp",
    alt: "An antique sewing machine on its table",
    credit: {
      title: "Sewing machine in Guingamp",
      author: "Syced",
      licence: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Sewing_machine_in_Guingamp.jpg",
    },
  },
  books: {
    src: "/img/mosaic/books.webp",
    alt: "A stack of books beside a lamp",
    credit: {
      title: "Books in stack with lamps (Unsplash)",
      author: "chuttersnap",
      licence: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Books_in_stack_with_lamps_(Unsplash).jpg",
    },
  },
  house: {
    src: "/img/mosaic/house.webp",
    alt: "A half-timbered family house with flowers in the window",
    credit: {
      title: "Gönnheim Bahnhofstraße 5 7 003 2020 01 04",
      author: "Friedrich Haag",
      licence: "CC BY-SA 4.0",
      href: "https://commons.wikimedia.org/wiki/File:G%C3%B6nnheim_Bahnhofstra%C3%9Fe_5_7_003_2020_01_04.jpg",
    },
  },
} satisfies Record<string, MosaicPhoto>;
