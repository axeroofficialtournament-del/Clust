/*
 * The service photography, with the licence trail attached.
 *
 * Every file in `public/img/services/` is a freely licensed photograph from
 * Wikimedia Commons (CC0, CC BY or CC BY-SA), cropped to 16:10 and re-encoded
 * as WebP. The `credit` block is the licence trail for each file — it is kept
 * here so the source of every photograph stays recorded with the photo.
 *
 * To swap in the client's own photography, drop a 1600×1000 image into
 * `public/img/services/` under the same name and update `credit` — nothing in
 * the page markup has to change.
 */

export type ServicePhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: { title: string; author: string; licence: string; href: string };
};

const SIZED = { width: 1600, height: 1000 } as const;

export const SERVICE_PHOTOS = {
  storage: {
    src: "/img/services/storage.webp",
    alt: "A row of self-storage unit doors along a lit corridor",
    ...SIZED,
    credit: {
      title: "Storage units",
      author: "Hankwang",
      licence: "CC BY-SA 3.0",
      href: "https://commons.wikimedia.org/w/index.php?curid=5633573",
    },
  },
  property: {
    src: "/img/services/property.webp",
    alt: "An abandoned house standing alone behind an overgrown yard",
    ...SIZED,
    credit: {
      title: "Abandoned house, Lawrence, Mississippi",
      author: "Ktkvtsh",
      licence: "CC BY 4.0",
      href: "https://commons.wikimedia.org/wiki/File:Abandoned_House_in_Lawrence,_Mississippi_02.jpg",
    },
  },
  estate: {
    src: "/img/services/estate.webp",
    alt: "An attic room filled with bags and clothing left behind",
    ...SIZED,
    credit: {
      title: "Cluttered interior, Bregenz",
      author: "Asurnipal",
      licence: "CC BY-SA 4.0",
      href: "https://commons.wikimedia.org/wiki/File:Bregenz-Cluttered_interiors_(compulsive_hoarding)-living_room-02ASD.jpg",
    },
  },
  commercial: {
    src: "/img/services/commercial.webp",
    alt: "The faded frontage of an abandoned corner shop with its door shut",
    ...SIZED,
    credit: {
      title: "Abandoned shop, Kraków",
      author: "Dwxn",
      licence: "CC BY-SA 4.0",
      href: "https://commons.wikimedia.org/wiki/File:Abandoned_shop,_Krak%C3%B3w.jpg",
    },
  },
  yardSale: {
    src: "/img/services/yard-sale.webp",
    alt: "A community yard sale with tables and blankets of second-hand goods in front of a house",
    ...SIZED,
    credit: {
      title: "Community yard sale on Florida's A1A",
      author: "U.S. National Archives (NARA)",
      licence: "Public domain",
      href: "https://commons.wikimedia.org/wiki/File:A1A_Scenic_and_Historic_Coastal_Byway_-_Community_Yard_Sale_on_Florida's_A1A_-_NARA_-_7716672.jpg",
    },
  },
  junk: {
    src: "/img/services/junk.webp",
    alt: "A scrap yard stacked with tangled metal under an industrial crane",
    ...SIZED,
    credit: {
      title: "Metal scrap yard, Daikoku Pier",
      author: "Syced",
      licence: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Metal_scrap_yard_on_Daikoku_Pier_3.jpg",
    },
  },
  clustered: {
    src: "/img/services/furnished.webp",
    alt: "A living room packed with furniture and belongings before clearing",
    ...SIZED,
    credit: {
      title: "Cluttered living room",
      author: "Adam73",
      licence: "CC BY-SA 3.0",
      href: "https://commons.wikimedia.org/w/index.php?curid=31234411",
    },
  },
  cleared: {
    src: "/img/services/cleared.webp",
    alt: "An empty apartment room with bare walls and clean wooden flooring",
    ...SIZED,
    credit: {
      title: "Empty apartment room",
      author: "aismallard",
      licence: "CC BY-SA 3.0",
      href: "https://commons.wikimedia.org/wiki/File:Empty_apartment_room_with_extension_cord.jpg",
    },
  },
  crew: {
    src: "/img/services/crew.webp",
    alt: "A moving truck loaded with stacked cardboard boxes ready to unload",
    ...SIZED,
    credit: {
      title: "Moving boxes in a truck",
      author: "brownpau",
      licence: "CC BY 2.0",
      href: "https://commons.wikimedia.org/w/index.php?curid=50576123",
    },
  },
} satisfies Record<string, ServicePhoto>;
